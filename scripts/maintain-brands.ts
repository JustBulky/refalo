#!/usr/bin/env npx tsx
/**
 * Brand benefits & T&C maintenance script.
 *
 * Run: npx tsx scripts/maintain-brands.ts
 * Requires: ANTHROPIC_API_KEY in .env or environment.
 *
 * What it does:
 *  1. Checks each brand's T&C URL (HTTP HEAD — zero AI cost)
 *  2. Uses Claude Haiku to verify/suggest updated benefits text
 *  3. Prints a diff-style report — YOU decide what to apply
 *  No auto-write, no auto-publish.
 *
 * Cost: ~$0.001–$0.002 per full run (Haiku pricing)
 */

import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(__dirname, "../.env") });

import Anthropic from "@anthropic-ai/sdk";
import { BRANDS } from "../lib/brands";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function checkUrl(url: string): Promise<{ ok: boolean; status: number | null }> {
  for (const method of ["HEAD", "GET"] as const) {
    try {
      const res = await fetch(url, {
        method,
        redirect: "follow",
        signal: AbortSignal.timeout(8000),
        headers: { "User-Agent": "Mozilla/5.0 (compatible; Refalo-Bot/1.0)" },
      });
      if (res.status !== 405 && res.status !== 403) {
        return { ok: res.ok, status: res.status };
      }
    } catch {
      return { ok: false, status: null };
    }
  }
  return { ok: true, status: 200 }; // 403 on both = bot-blocked but URL likely valid
}

async function verifyBenefits(
  brandName: string,
  domain: string,
  currentBenefits: string[],
  tcUrl: string
): Promise<{ updatedBenefits: string[]; tcUrlSuggestion: string | null; notes: string }> {
  const prompt = `You are verifying referral program details for ${brandName} (${domain}).

Current benefits listed on our site:
${currentBenefits.map((b, i) => `${i + 1}. ${b}`).join("\n")}

Current T&C URL: ${tcUrl}

Based on your knowledge of ${brandName}'s referral/affiliate program as of early 2026:

1. Are the benefits accurate? If not, provide corrected versions (keep to 3 bullet points, concise, factual).
2. Is the T&C URL likely still valid? If you know a better/more canonical URL, suggest it. Otherwise return null.
3. Note anything that seems outdated or suspicious.

Respond ONLY with valid JSON in this exact shape:
{
  "updatedBenefits": ["benefit 1", "benefit 2", "benefit 3"],
  "tcUrlSuggestion": null,
  "notes": "brief note on what changed or 'Looks accurate' if no changes"
}`;

  const message = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 512,
    messages: [{ role: "user", content: prompt }],
  });

  const text = message.content[0].type === "text" ? message.content[0].text : "";
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error(`Bad response for ${brandName}: ${text}`);
  const parsed = JSON.parse(jsonMatch[0]);
  if (!Array.isArray(parsed.updatedBenefits) || parsed.updatedBenefits.length === 0) {
    parsed.updatedBenefits = currentBenefits;
  }
  return parsed;
}

async function main() {
  console.log("=== Refalo Brand Maintenance Report ===\n");

  for (const brand of BRANDS) {
    console.log(`── ${brand.name} (${brand.domain})`);

    // 1. URL check
    const urlCheck = await checkUrl(brand.tcUrl);
    const urlStatus = urlCheck.ok
      ? `✓ T&C URL live (${urlCheck.status})`
      : `✗ T&C URL returned ${urlCheck.status ?? "connection error"} — needs update`;
    console.log(`   ${urlStatus}`);

    // 2. AI benefits verification
    try {
      const result = await verifyBenefits(
        brand.name,
        brand.domain,
        brand.benefits,
        brand.tcUrl
      );

      const benefitsChanged =
        JSON.stringify(result.updatedBenefits) !== JSON.stringify(brand.benefits);

      if (benefitsChanged) {
        console.log("   Benefits — SUGGESTED UPDATES:");
        result.updatedBenefits.forEach((b) => console.log(`     • ${b}`));
      } else {
        console.log("   Benefits — No changes suggested");
      }

      if (result.tcUrlSuggestion) {
        console.log(`   T&C URL suggestion: ${result.tcUrlSuggestion}`);
      }

      console.log(`   Notes: ${result.notes}`);
    } catch (err) {
      console.log(`   ✗ AI check failed: ${err}`);
    }

    console.log();
  }

  console.log("=== Done. Apply any changes manually in lib/brands.ts ===");
}

main().catch(console.error);
