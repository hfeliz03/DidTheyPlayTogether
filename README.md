# Teammates?

A polished React + TypeScript + Tailwind web game that asks whether two modern NBA players ever shared an NBA roster for at least one season.

## Run locally

```bash
npm install
npm run dev
```

## Structure

- `src/components/` UI building blocks
- `src/data/players.ts` local player/team/season knowledge base
- `src/utils/game.ts` retrieval and teammate-overlap logic
- `src/App.tsx` landing page and game flow

## RAG-style flow

1. Select a difficulty pool of curated player pairs.
2. Retrieve each player's local team-season history.
3. Compare matching teams and overlapping seasons.
4. Return a verdict plus evidence-based explanation text.
