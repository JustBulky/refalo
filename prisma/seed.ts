import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "path";
import { BRANDS } from "../lib/brands";

const dbPath = path.join(__dirname, "dev.db");
const adapter = new PrismaBetterSqlite3({ url: dbPath });
const prisma = new PrismaClient({ adapter } as ConstructorParameters<typeof PrismaClient>[0]);

async function main() {
  console.log("Seeding brands...");
  for (const brand of BRANDS) {
    await prisma.brand.upsert({
      where: { slug: brand.slug },
      update: {
        name: brand.name,
        description: brand.description,
        category: brand.category,
      },
      create: {
        slug: brand.slug,
        name: brand.name,
        description: brand.description,
        category: brand.category,
      },
    });
  }
  console.log(`Seeded ${BRANDS.length} brands.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
