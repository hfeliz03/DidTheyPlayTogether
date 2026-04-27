import type { TeammateCheckResult } from '../types';

type ExplanationPanelProps = {
  result: TeammateCheckResult;
  guessedCorrectly: boolean;
};

export function ExplanationPanel({ result, guessedCorrectly }: ExplanationPanelProps) {
  const verdictTone = guessedCorrectly
    ? 'border-emerald-400/30 bg-emerald-500/10 text-emerald-200'
    : 'border-rose-400/30 bg-rose-500/10 text-rose-200';

  return (
    <section className="rounded-[1.5rem] border border-white/10 bg-black/30 p-4 shadow-glow backdrop-blur-md">
      <div className="flex flex-wrap items-center gap-2">
        <div className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-semibold ${verdictTone}`}>
          {guessedCorrectly ? 'Correct' : 'Incorrect'}
        </div>
        <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-200">
          Confidence {result.confidence}%
        </div>
      </div>

      <div className="mt-3 rounded-2xl border border-accent-400/20 bg-accent-500/10 p-4">
        <p className="text-sm leading-6 text-zinc-100">{result.reasoning}</p>
      </div>
    </section>
  );
}
