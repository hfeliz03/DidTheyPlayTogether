import { useState } from 'react';
import { ExplanationPanel } from './components/ExplanationPanel';
import { PlayerCard } from './components/PlayerCard';
import { Scoreboard } from './components/Scoreboard';
import type { Difficulty, GameRound, TeammateCheckResult } from './types';
import { checkTeammates, getRandomRound, getRoundKey } from './utils/game';

type Screen = 'landing' | 'playing';

type AnswerState = {
  result: TeammateCheckResult;
  guessedCorrectly: boolean;
};

const difficultyCopy: Record<Difficulty, string> = {
  easy: 'Iconic duos, recent pairings, and obvious misses.',
  medium: 'Familiar pairings that need real NBA memory.',
  hard: 'Sneaky overlaps, near-misses, and deep roster trivia.',
};

function App() {
  const [screen, setScreen] = useState<Screen>('landing');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [usedRounds, setUsedRounds] = useState<Set<string>>(new Set());
  const [round, setRound] = useState<GameRound | null>(null);
  const [answerMix, setAnswerMix] = useState({ shownTrue: 0, shownFalse: 0 });
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [answerState, setAnswerState] = useState<AnswerState | null>(null);

  const startGame = (selectedDifficulty: Difficulty) => {
    const freshAnswerMix = { shownTrue: 0, shownFalse: 0 };
    const nextRound = getRandomRound(selectedDifficulty, new Set(), freshAnswerMix);
    setDifficulty(selectedDifficulty);
    setUsedRounds(new Set([getRoundKey(nextRound.playerA, nextRound.playerB)]));
    setAnswerMix(freshAnswerMix);
    setRound(nextRound);
    setScore(0);
    setStreak(0);
    setAnswerState(null);
    setScreen('playing');
  };

  const submitGuess = (guess: boolean) => {
    if (!round || answerState) {
      return;
    }

    const result = checkTeammates(round.playerA, round.playerB);
    const guessedCorrectly = result.isTeammates === guess;
    const nextStreak = guessedCorrectly ? streak + 1 : 0;

    setAnswerState({ result, guessedCorrectly });
    setStreak(nextStreak);
    setBestStreak((current) => Math.max(current, nextStreak));
    if (guessedCorrectly) {
      setScore((current) => current + 1);
    }
  };

  const nextRound = () => {
    const updatedUsedRounds = new Set(usedRounds);
    if (round) {
      updatedUsedRounds.add(getRoundKey(round.playerA, round.playerB));
    }

    const nextMix = answerState?.result.isTeammates
      ? { shownTrue: answerMix.shownTrue + 1, shownFalse: answerMix.shownFalse }
      : { shownTrue: answerMix.shownTrue, shownFalse: answerMix.shownFalse + 1 };

    const freshRound = getRandomRound(difficulty, updatedUsedRounds, nextMix);
    updatedUsedRounds.add(getRoundKey(freshRound.playerA, freshRound.playerB));
    setUsedRounds(updatedUsedRounds);
    setAnswerMix(nextMix);
    setRound(freshRound);
    setAnswerState(null);
  };

  return (
    <main className="relative isolate h-screen overflow-hidden text-white">
      <div className="absolute inset-0 -z-10 bg-court-grid bg-[size:32px_32px] opacity-[0.08]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[32rem] bg-gradient-to-b from-accent-500/10 via-transparent to-transparent" />
      <div className="mx-auto flex h-screen max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between py-2">
          <div>
            <p className="text-xs uppercase tracking-[0.45em] text-accent-300">Basketball Trivia</p>
            <h1 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">Teammates?</h1>
          </div>
          {screen === 'playing' && (
            <button
              onClick={() => setScreen('landing')}
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-zinc-200 transition hover:border-accent-400/40 hover:bg-white/10"
            >
              Reset
            </button>
          )}
        </header>

        {screen === 'landing' && (
          <section className="my-auto grid items-center gap-8 py-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="max-w-2xl">
              <div className="inline-flex animate-pulseGlow rounded-full border border-accent-400/20 bg-accent-500/10 px-4 py-2 text-sm font-medium text-accent-100">
                RAG-style NBA teammate challenge
              </div>
              <h2 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl">
                Two stars.
                <br />
                One question.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-zinc-300">
                Each round pulls from a 300-plus player knowledge base, scores the matchup for difficulty, and asks whether the two players ever shared a roster for at least one season.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {(['easy', 'medium', 'hard'] as Difficulty[]).map((level) => (
                  <button
                    key={level}
                    onClick={() => startGame(level)}
                    className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 text-left shadow-glow transition duration-300 hover:-translate-y-1 hover:border-accent-400/40 hover:bg-white/10"
                  >
                    <p className="text-sm uppercase tracking-[0.3em] text-accent-300">{level}</p>
                    <p className="mt-3 text-2xl font-bold capitalize text-white">{level}</p>
                    <p className="mt-3 text-sm leading-6 text-zinc-300">{difficultyCopy[level]}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-black/30 p-5 shadow-glow backdrop-blur-md">
              <p className="text-xs uppercase tracking-[0.35em] text-zinc-400">How it works</p>
              <div className="mt-5 space-y-4 text-sm leading-7 text-zinc-300">
                <p>1. Pick a difficulty and get a generated matchup.</p>
                <p>2. The game scores iconicity, recency, shared seasons, titles, and team popularity.</p>
                <p>3. Guess True or False, then review the final verdict and keep the streak alive.</p>
              </div>
              <div className="mt-6 rounded-[1.5rem] border border-accent-400/20 bg-accent-500/10 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-accent-200/80">Best streak</p>
                <p className="mt-2 text-4xl font-black text-white">{bestStreak}</p>
              </div>
            </div>
          </section>
        )}

        {screen === 'playing' && round && (
          <section className="flex min-h-0 flex-1 flex-col gap-4 py-2">
            <Scoreboard difficulty={difficulty} score={score} streak={streak} />

            <div className="grid items-center gap-4 lg:grid-cols-[1fr_auto_1fr]">
              <PlayerCard player={round.playerA} />
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-accent-400/30 bg-gradient-to-br from-accent-400 to-accent-500 text-xl font-black text-black shadow-glow sm:h-20 sm:w-20">
                &
              </div>
              <PlayerCard player={round.playerB} />
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-black/30 p-4 shadow-glow backdrop-blur-md">
              {!answerState ? (
                <>
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.35em] text-zinc-400">Question</p>
                      <h3 className="mt-1 text-lg font-bold text-white sm:text-2xl">
                        Did these two players ever play together on the same NBA team for at least one season?
                      </h3>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <button
                      onClick={() => submitGuess(true)}
                      className="rounded-[1.25rem] border border-emerald-400/25 bg-emerald-500/10 px-6 py-4 text-lg font-bold text-emerald-100 transition hover:-translate-y-1 hover:bg-emerald-500/20"
                    >
                      True
                    </button>
                    <button
                      onClick={() => submitGuess(false)}
                      className="rounded-[1.25rem] border border-rose-400/25 bg-rose-500/10 px-6 py-4 text-lg font-bold text-rose-100 transition hover:-translate-y-1 hover:bg-rose-500/20"
                    >
                      False
                    </button>
                  </div>
                </>
              ) : (
                <div className="grid gap-3">
                  <ExplanationPanel result={answerState.result} guessedCorrectly={answerState.guessedCorrectly} />
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <button
                      onClick={nextRound}
                      className="rounded-full bg-gradient-to-r from-accent-400 to-accent-500 px-6 py-2.5 text-sm font-bold text-black transition hover:scale-[1.01]"
                    >
                      Next Round
                    </button>
                    <button
                      onClick={() => startGame(difficulty)}
                      className="rounded-full border border-white/15 bg-white/5 px-6 py-2.5 text-sm font-semibold text-zinc-200 transition hover:border-accent-400/40 hover:bg-white/10"
                    >
                      Restart Difficulty
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

export default App;
