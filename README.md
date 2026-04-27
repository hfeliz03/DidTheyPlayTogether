# Teammates?

## Title and Summary
`Teammates?` is a browser-based NBA trivia game built with React, TypeScript, Vite, and Tailwind CSS. It asks a simple but surprisingly sticky question: did two NBA players ever play on the same team for at least one season?

What makes the project interesting is that the answer is not hardcoded into the UI. The app uses a lightweight local retrieval workflow: it pulls player team-season histories from a structured knowledge base, compares overlaps, and produces a verdict plus a short explanation. The result is a game that feels fast and visual, while still using AI/RAG-style reasoning principles instead of static quiz answers.

## Original Project (Modules 1-3)
My original project from Modules 1-3 was also called `Teammates?`. The original goal was to build an engaging sports trivia experience that could answer teammate questions using structured NBA data rather than manually scripted responses. In its earlier form, the focus was on proving the core retrieval logic, validating that player/team/season overlap could be computed correctly, and shaping that logic into a usable interactive game.

## Why This Project Matters
This project matters because it shows how AI-style retrieval and reasoning can improve a small, consumer-facing product. Instead of treating “AI” as a chatbot wrapper, I used it as a design pattern:

- retrieve relevant facts
- reason over those facts
- explain the answer clearly

That pattern scales beyond trivia. The same approach applies to internal knowledge tools, search systems, support assistants, and workflow copilots where correctness depends on retrieving the right evidence first.

## Features
- Responsive landing page with difficulty selection
- Side-by-side player cards with real player headshots
- True / False gameplay loop with score and streak tracking
- Local knowledge base of 300+ players
- Evidence-based teammate checking using team/season overlap
- Difficulty generation based on matchup familiarity and obscurity
- Balanced round generation so the game does not skew heavily toward `False`
- Short explanation after each guess

## Architecture Overview
At a high level, the system has four layers:

1. `UI Layer`
   React components render the landing page, player cards, score display, answer buttons, and explanation panel.

2. `Knowledge Base`
   Player data lives locally in TypeScript/JSON-style structures. Each player record includes a name, headshot, star power rating, and team-season history.

3. `Retrieval + Reasoning Layer`
   The game logic retrieves the two selected player histories, finds shared teams, checks season overlap, and decides whether the answer is true or false.

4. `Difficulty + Matchmaking Layer`
   A round generator scores candidate matchups based on factors like player popularity, team popularity, number of shared seasons, recency, and whether a pair is a near-miss. It then selects a matchup that fits the chosen difficulty and keeps the true/false distribution reasonable.

If I were drawing the system diagram as a flow, it would look like this:

`User input -> Difficulty selection -> Round generator -> Retrieve two player records -> Compare team-season histories -> Produce verdict -> Render explanation`

## Project Structure
- `src/App.tsx`
  Main application flow and state management.
- `src/components/`
  Reusable UI pieces such as player cards, scoreboard, and explanation panel.
- `src/data/players.ts`
  Local player knowledge base.
- `src/data/headshotIds.json`
  Official NBA headshot ID mapping used to guarantee real player images.
- `src/utils/game.ts`
  Match generation, difficulty scoring, retrieval, and teammate checking logic.

## Setup Instructions
Run the project locally with the following steps:

1. Clone the repository.
2. Move into the project folder.
3. Install dependencies.
4. Start the development server.

```bash
git clone <your-repo-url>
cd DidTheyPlayTogether
npm install
npm run dev
```

Then open the local Vite URL shown in your terminal, usually:

```bash
http://localhost:5173
```

## How the AI/RAG-Style Logic Works
The app uses a local retrieval pattern instead of embedding answers in the interface.

For each round:

1. The generator selects two players.
2. The system retrieves both players’ team histories.
3. It checks for matching team names.
4. It checks whether those teams overlap in at least one season.
5. If they overlap, the answer is `True`.
6. If not, the answer is `False`.
7. The system returns a short explanation based on the retrieved evidence.

Example internal reasoning:

- Player A: LeBron James -> Cleveland Cavaliers (`2014-15`, `2015-16`, `2016-17`)
- Player B: Kyrie Irving -> Cleveland Cavaliers (`2014-15`, `2015-16`, `2016-17`)
- Overlap found -> `True`

## Sample Interactions
These are representative examples of the game’s behavior.

### Example 1
Input:
- Difficulty: `Easy`
- Players: `Stephen Curry` and `Klay Thompson`
- User guess: `True`

AI/game output:
- Verdict: `Correct`
- Explanation: `Stephen Curry and Klay Thompson played together on the Golden State Warriors from 2011-12 to 2023-24.`

### Example 2
Input:
- Difficulty: `Medium`
- Players: `Ja Morant` and `Derrick Rose`
- User guess: `True`

AI/game output:
- Verdict: `Correct`
- Explanation: `Ja Morant and Derrick Rose played together on the Memphis Grizzlies from 2023-24.`

### Example 3
Input:
- Difficulty: `Hard`
- Players: `Kevin Durant` and `Dwight Howard`
- User guess: `True`

AI/game output:
- Verdict: `Incorrect`
- Explanation: `Kevin Durant and Dwight Howard never shared an NBA team.`

## Design Decisions
I made several deliberate design choices while building this project.

### 1. Local knowledge base instead of live API queries
I kept the dataset local because the game needs to feel instant, deterministic, and easy to run for evaluation. This avoids API latency, authentication issues, and rate limits.

Trade-off:
- Faster and more reliable locally
- But requires manual care to keep roster and history data current

### 2. Retrieval-driven verdicts instead of hardcoded answers
I wanted the answer to come from the same data model the explanation uses. This makes the system more trustworthy and much easier to scale.

Trade-off:
- Cleaner logic and better explainability
- More effort required to structure and validate the player data

### 3. Fixed player pool with real headshots
The app uses a fixed roster so every player in the experience has a known image source and known trajectory quality.

Trade-off:
- Better polish and consistency
- Not as broad as a fully live, league-wide database

### 4. Two-tier data trust model
The project distinguishes between:
- `historical` player records with multi-season trajectories
- `roster_snapshot` records that came from a fixed-season expansion

This was necessary because a stale one-season roster is safe for generating some `True` matchups, but unsafe for generating all `False` matchups.

Trade-off:
- Better correctness
- More complex round-generation logic

### 5. Difficulty as a scoring formula
Instead of hand-authoring every round, I built a formula that estimates difficulty from:
- player popularity
- team popularity
- shared championships
- number of seasons together
- recency
- near-miss situations

Trade-off:
- Much more replayability
- Requires tuning and can still produce edge cases if the data is stale

## Testing Summary
### What worked
- Core teammate overlap logic worked well once the player histories were structured consistently.
- Real headshot mapping worked after I generated a complete player-to-ID map.
- The true/false round mix improved significantly after balancing was added.
- The single-screen game layout became much smoother after compressing the play state and swapping answer/explanation content in the same panel.

### What did not work initially
- Random pair generation strongly overproduced `False` answers because most NBA players have never been teammates.
- Some expanded roster entries were based on a frozen season snapshot, which created stale false negatives when real-life trades changed teams later.
- The image system briefly regressed when card state reused the previous image and when placeholder behavior masked missing data too aggressively.

### What I learned from testing
- Data quality matters more than UI polish when a product claims factual correctness.
- “Works on sample cases” is not enough when the generator can produce edge-case combinations.
- For AI-style products, the trust boundary is the data model, not the interface.

## Reflection
This project taught me that AI problem-solving is often less about generating text and more about building a reliable reasoning pipeline. The most important work was not the final explanation sentence, but making sure the app retrieved the right facts, used those facts consistently, and respected uncertainty in weaker data.

It also reinforced a practical lesson: when you build systems that appear intelligent, users judge them on the first obvious failure. A single incorrect sports fact can undermine confidence in the whole experience. That pushed me to think more carefully about data freshness, fallback strategies, and where a system should refuse to make claims unless the underlying evidence is strong enough.

From a portfolio perspective, this project represents more than a trivia game. It shows that I can:

- design a full-stack-feeling frontend application
- structure local knowledge for retrieval-based reasoning
- debug product correctness issues, not just syntax issues
- make trade-offs between replayability, polish, and factual trust

## Future Improvements
- Upgrade the historical dataset so all 300+ players use full multi-season trajectories
- Add a visible “data freshness” policy to clarify what seasons are covered
- Add unit tests for overlap logic and difficulty scoring
- Add analytics to tune difficulty using real player behavior
- Add animation/sound polish for even stronger game feel
