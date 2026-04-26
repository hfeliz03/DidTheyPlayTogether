import type { Difficulty } from '../types';
import { getDifficultyLabel } from '../utils/game';

type ScoreboardProps = {
  difficulty: Difficulty;
  score: number;
  streak: number;
};

export function Scoreboard({ difficulty, score, streak }: ScoreboardProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">Difficulty</p>
        <p className="mt-2 text-2xl font-bold text-white">{getDifficultyLabel(difficulty)}</p>
      </div>
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">Score</p>
        <p className="mt-2 text-2xl font-bold text-white">{score}</p>
      </div>
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">Streak</p>
        <p className="mt-2 text-2xl font-bold text-white">{streak}</p>
      </div>
    </div>
  );
}
