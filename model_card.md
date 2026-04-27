# Model Card: Teammates?

## Model / System Name
`Teammates?` retrieval-based NBA teammate reasoning system

## Intended Use
This system is intended for interactive sports trivia. It answers whether two NBA players were ever teammates by retrieving local player team histories, comparing season overlap, and returning a verdict, explanation, and confidence score.

It is not intended for:
- real-time roster intelligence
- betting or financial decision-making
- claims beyond the seasons represented in the local dataset

## Base Project
The base project from Modules 1-3 was `Teammates?`, an NBA teammate trivia concept focused on using structured player/team/season data instead of static quiz logic.

## How AI Collaboration Was Used
AI collaboration was used as a coding and system-design partner rather than as the runtime answer engine. The assistant helped scaffold the frontend, structure the local knowledge base, refine the retrieval logic, expand the player roster, improve the documentation, and identify data-quality issues during iteration.

The final runtime behavior is deterministic and code-based:
- retrieve player records
- compare team/season overlap
- produce a verdict

## Data Sources and Inputs
- Local player data in `src/data/players.ts`
- Headshot mappings in `src/data/headshotIds.json`
- User-selected difficulty and `True`/`False` guesses

## Outputs
- `True` or `False` verdict
- explanation sentence
- confidence percentage
- score and streak updates

## Strengths
- Clear evidence path from data to output
- Fast local execution with no backend dependency
- Strong visual polish for a portfolio-friendly demo
- Confidence score gives a useful signal instead of forcing false certainty

## Limitations
- Some players still rely on snapshot-era roster data rather than full historical trajectories
- The system is only as current as the local data
- Confidence is heuristic, not statistically calibrated
- The game is designed for NBA teammate history only

## Biases and Risks
### Data freshness bias
The biggest risk is stale roster data. A player trade can make an old false answer incorrect if the dataset is not updated.

### Popularity bias
Difficulty scoring includes star power and team popularity, which means the game privileges culturally recognizable players and teams over smaller-market or lower-profile cases.

### Coverage bias
The system is strongest on players represented in the full historical tier and weaker on players included only through snapshot expansion.

## Testing Results
### Informal functional testing
I tested known true pairs and known false pairs by hand and verified whether the retrieval logic matched expected NBA history.

### Reliability measures included in the product
- confidence scoring
- data-tier separation between historical and snapshot records
- safe round generation rules to avoid unsafe false negatives

### Failures discovered
- false-matchup generation was initially unsafe for snapshot-only players
- some answers became wrong because the dataset was behind current NBA movement
- image fallback logic initially masked missing-data problems

### What changed after testing
- snapshot-only players are no longer used to generate unsafe false matchups
- every player in the fixed roster now has a mapped headshot
- the confidence score was added to communicate trust level

## Human Evaluation
Human review was part of the validation strategy. Suspicious outputs were compared against known NBA facts and used to improve the dataset and generator rules. This was especially important for identifying stale data issues that a purely mechanical overlap check would not catch.

## What I Learned About AI and Problem-Solving
This project taught me that AI systems should be evaluated on their evidence pipeline, not just their output style. A response can look convincing while still being wrong if the retrieved facts are stale or incomplete. Building trust required better data boundaries, more honest confidence signals, and clearer separation between strong and weak evidence.

## Future Improvements
- Add automated regression tests for curated matchup cases
- Expand all players into full historical trajectories
- Version the dataset by season coverage
- Add logging for unexpected low-confidence or disputed results
