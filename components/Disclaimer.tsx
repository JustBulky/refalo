export default function Disclaimer({ brandName }: { brandName: string }) {
  return (
    <div className="mt-10 rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 text-xs text-zinc-500">
      <span className="font-medium text-zinc-400">Disclaimer: </span>
      Posting your referral link may violate {brandName}&apos;s Terms of Service.
      By submitting your link, you accept full responsibility for any consequences
      including account suspension or removal from the referral program. Refalo is
      not responsible for any outcomes resulting from posted links.
    </div>
  );
}
