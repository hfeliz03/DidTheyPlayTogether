import { players } from '../data/players';
import type {
  Difficulty,
  GameRound,
  PairDifficultyProfile,
  Player,
  TeammateCheckResult,
} from '../types';

const TEAM_POPULARITY: Record<string, number> = {
  'Los Angeles Lakers': 10,
  'Boston Celtics': 10,
  'Golden State Warriors': 10,
  'Chicago Bulls': 9,
  'Miami Heat': 9,
  'New York Knicks': 9,
  'Brooklyn Nets': 7,
  'LA Clippers': 7,
  'Los Angeles Clippers': 7,
  'Phoenix Suns': 7,
  'Dallas Mavericks': 8,
  'Milwaukee Bucks': 8,
  'Denver Nuggets': 7,
  'Philadelphia 76ers': 8,
  'Houston Rockets': 7,
  'Cleveland Cavaliers': 7,
  'Oklahoma City Thunder': 6,
  'San Antonio Spurs': 8,
  'Toronto Raptors': 7,
  'Memphis Grizzlies': 5,
  'New Orleans Pelicans': 4,
  'New Orleans Hornets': 4,
  'Portland Trail Blazers': 6,
  'Indiana Pacers': 5,
  'Detroit Pistons': 6,
  'Sacramento Kings': 5,
  'Utah Jazz': 5,
  'Atlanta Hawks': 5,
  'Orlando Magic': 5,
  'Minnesota Timberwolves': 5,
  'Washington Wizards': 4,
  'Charlotte Hornets': 4,
  'Seattle SuperSonics': 6,
};

const CHAMPIONSHIP_SEASONS: Record<string, string[]> = {
  'Miami Heat': ['2011-12', '2012-13'],
  'Golden State Warriors': ['2014-15', '2016-17', '2017-18', '2021-22'],
  'Cleveland Cavaliers': ['2015-16'],
  'Los Angeles Lakers': ['2009-10', '2019-20'],
  'Milwaukee Bucks': ['2020-21'],
  'Denver Nuggets': ['2022-23'],
  'Toronto Raptors': ['2018-19'],
  'Boston Celtics': ['2007-08'],
};

const intersect = (left: string[], right: string[]) =>
  left.filter((season) => right.includes(season));

const clamp = (value: number, min = 0, max = 100) => Math.min(max, Math.max(min, value));

const seasonEndYear = (season: string) => Number(season.split('-')[1]);

const formatSeasonSpan = (seasons: string[]) =>
  seasons.length === 1 ? seasons[0] : `${seasons[0]} to ${seasons[seasons.length - 1]}`;

const getCareerYears = (player: Player) => {
  const seasons = player.teams.flatMap((team) => team.seasons).map(seasonEndYear);
  return {
    start: Math.min(...seasons),
    end: Math.max(...seasons),
  };
};

const getSharedFranchiseNearMisses = (playerA: Player, playerB: Player) =>
  playerA.teams.flatMap((teamA) => {
    const teamB = playerB.teams.find((entry) => entry.team === teamA.team);
    if (!teamB) {
      return [];
    }

    const overlap = intersect(teamA.seasons, teamB.seasons);
    if (overlap.length > 0) {
      return [];
    }

    const yearsA = teamA.seasons.map(seasonEndYear);
    const yearsB = teamB.seasons.map(seasonEndYear);
    const smallestGap = Math.min(...yearsA.flatMap((yearA) => yearsB.map((yearB) => Math.abs(yearA - yearB))));

    return [{ team: teamA.team, smallestGap }];
  });

const averageStarPower = (playerA: Player, playerB: Player) =>
  (playerA.starPower + playerB.starPower) / 2;

const historicalPlayers = players.filter((player) => player.dataProfile === 'historical');
const snapshotPlayers = players.filter((player) => player.dataProfile === 'roster_snapshot');

const getDesiredTruthValue = (shownTrue: number, shownFalse: number) => {
  const total = shownTrue + shownFalse;
  if (total === 0) {
    return Math.random() < 0.5;
  }

  const trueRate = shownTrue / total;
  if (trueRate < 0.4) {
    return true;
  }
  if (trueRate > 0.6) {
    return false;
  }

  return Math.random() < 0.5;
};

export const getRoundKey = (playerA: Player, playerB: Player) =>
  [playerA.slug, playerB.slug].sort().join('::');

export const checkTeammates = (playerA: Player, playerB: Player): TeammateCheckResult => {
  const overlappingSeasons = playerA.teams.flatMap((teamA) => {
    const teamB = playerB.teams.find((entry) => entry.team === teamA.team);
    if (!teamB) {
      return [];
    }

    const seasons = intersect(teamA.seasons, teamB.seasons);
    return seasons.length > 0 ? [{ team: teamA.team, seasons }] : [];
  });

  const evidence: TeammateCheckResult['evidence'] = [
    {
      player: playerA,
      matchingTeams: overlappingSeasons.map((entry) => ({ team: entry.team, seasons: entry.seasons })),
    },
    {
      player: playerB,
      matchingTeams: overlappingSeasons.map((entry) => ({ team: entry.team, seasons: entry.seasons })),
    },
  ];

  const isTeammates = overlappingSeasons.length > 0;
  const primaryOverlap = overlappingSeasons[0];
  const reasoning = isTeammates
    ? `${playerA.name} and ${playerB.name} played together on the ${primaryOverlap.team} from ${formatSeasonSpan(primaryOverlap.seasons)}.`
    : `${playerA.name} and ${playerB.name} never shared an NBA team.`;

  return { isTeammates, overlappingSeasons, evidence, reasoning };
};

export const scorePairDifficulty = (playerA: Player, playerB: Player): PairDifficultyProfile => {
  const result = checkTeammates(playerA, playerB);
  const reasons: string[] = [];
  const starPower = averageStarPower(playerA, playerB);

  let easeScore = 0;

  if (result.isTeammates) {
    const bestOverlap = result.overlappingSeasons.reduce((best, current) =>
      current.seasons.length > best.seasons.length ? current : best,
    );
    const sharedTeamPopularity = TEAM_POPULARITY[bestOverlap.team] ?? 5;
    const titlesTogether = intersect(bestOverlap.seasons, CHAMPIONSHIP_SEASONS[bestOverlap.team] ?? []).length;
    const recentYear = Math.max(...bestOverlap.seasons.map(seasonEndYear));
    const recencyScore = clamp(((recentYear - 8) / 16) * 100, 0, 100);
    const tenureScore = clamp((bestOverlap.seasons.length / 5) * 100, 0, 100);
    const teamScore = sharedTeamPopularity * 10;
    const trophyScore = clamp(titlesTogether * 32, 0, 100);
    const fameScore = starPower * 10;

    easeScore =
      tenureScore * 0.28 +
      recencyScore * 0.18 +
      teamScore * 0.18 +
      trophyScore * 0.22 +
      fameScore * 0.14;

    reasons.push(`${bestOverlap.seasons.length} shared season${bestOverlap.seasons.length > 1 ? 's' : ''}`);
    if (titlesTogether > 0) {
      reasons.push(`${titlesTogether} championship season${titlesTogether > 1 ? 's' : ''} together`);
    }
    reasons.push(`${bestOverlap.team} visibility score ${sharedTeamPopularity}/10`);
  } else {
    const nearMisses = getSharedFranchiseNearMisses(playerA, playerB);
    const sharedFranchise = nearMisses[0];
    const yearsA = getCareerYears(playerA);
    const yearsB = getCareerYears(playerB);
    const careerOverlap = Math.max(0, Math.min(yearsA.end, yearsB.end) - Math.max(yearsA.start, yearsB.start) + 1);
    const closeness = sharedFranchise ? clamp(100 - sharedFranchise.smallestGap * 18, 0, 100) : 0;
    const sameEraScore = clamp((careerOverlap / 10) * 100, 0, 100);
    const obviousNoScore = sharedFranchise ? 20 : 80;
    const fameScore = starPower * 10;

    easeScore =
      obviousNoScore * 0.45 +
      fameScore * 0.2 +
      (100 - closeness) * 0.2 +
      (100 - sameEraScore) * 0.15;

    if (sharedFranchise) {
      reasons.push(`same franchise, different eras on ${sharedFranchise.team}`);
    }
    if (careerOverlap > 0) {
      reasons.push(`careers overlapped for ${careerOverlap} season${careerOverlap > 1 ? 's' : ''}`);
    }
  }

  const difficultyScore = clamp(100 - easeScore);
  const bucket: Difficulty =
    difficultyScore < 34 ? 'easy' : difficultyScore < 67 ? 'medium' : 'hard';

  return { bucket, score: difficultyScore, reasons };
};

const samplePair = (): [Player, Player] => {
  const firstIndex = Math.floor(Math.random() * players.length);
  let secondIndex = Math.floor(Math.random() * players.length);
  while (secondIndex === firstIndex) {
    secondIndex = Math.floor(Math.random() * players.length);
  }

  return [players[firstIndex], players[secondIndex]];
};

const sampleHistoricalPair = (): [Player, Player] => {
  const firstIndex = Math.floor(Math.random() * historicalPlayers.length);
  let secondIndex = Math.floor(Math.random() * historicalPlayers.length);
  while (secondIndex === firstIndex) {
    secondIndex = Math.floor(Math.random() * historicalPlayers.length);
  }

  return [historicalPlayers[firstIndex], historicalPlayers[secondIndex]];
};

const teamSnapshots = new Map<string, Player[]>();
snapshotPlayers.forEach((player) => {
  const team = player.teams[0]?.team;
  if (!teamSnapshots.has(team)) {
    teamSnapshots.set(team, []);
  }
  teamSnapshots.get(team)!.push(player);
});

const snapshotTeams = Array.from(teamSnapshots.entries()).filter(([, roster]) => roster.length > 1);

const sampleSafeTruePair = (): [Player, Player] => {
  if (Math.random() < 0.45 && snapshotTeams.length > 0) {
    const [, roster] = snapshotTeams[Math.floor(Math.random() * snapshotTeams.length)];
    const firstIndex = Math.floor(Math.random() * roster.length);
    let secondIndex = Math.floor(Math.random() * roster.length);
    while (secondIndex === firstIndex) {
      secondIndex = Math.floor(Math.random() * roster.length);
    }
    return [roster[firstIndex], roster[secondIndex]];
  }

  for (let attempt = 0; attempt < 300; attempt += 1) {
    const pair = sampleHistoricalPair();
    if (checkTeammates(pair[0], pair[1]).isTeammates) {
      return pair;
    }
  }

  return samplePair();
};

const sampleSafeFalsePair = (): [Player, Player] => {
  for (let attempt = 0; attempt < 300; attempt += 1) {
    const pair = sampleHistoricalPair();
    if (!checkTeammates(pair[0], pair[1]).isTeammates) {
      return pair;
    }
  }

  return sampleHistoricalPair();
};

export const getRandomRound = (
  difficulty: Difficulty,
  usedRounds: Set<string>,
  answerStats: { shownTrue: number; shownFalse: number },
): GameRound => {
  let fallback: { playerA: Player; playerB: Player; distance: number } | null = null;
  const desiredTruthValue = getDesiredTruthValue(answerStats.shownTrue, answerStats.shownFalse);

  for (let attempt = 0; attempt < 600; attempt += 1) {
    const [playerA, playerB] = desiredTruthValue ? sampleSafeTruePair() : sampleSafeFalsePair();
    const roundKey = getRoundKey(playerA, playerB);
    if (usedRounds.has(roundKey)) {
      continue;
    }

    const result = checkTeammates(playerA, playerB);
    const profile = scorePairDifficulty(playerA, playerB);
    if (profile.bucket === difficulty && result.isTeammates === desiredTruthValue) {
      return { playerA, playerB, difficulty };
    }

    const distance =
      (difficulty === 'easy'
        ? profile.score
        : difficulty === 'medium'
          ? Math.abs(profile.score - 50)
          : 100 - profile.score) + (result.isTeammates === desiredTruthValue ? 0 : 50);

    if (!fallback || distance < fallback.distance) {
      fallback = { playerA, playerB, distance };
    }
  }

  if (fallback) {
    return { playerA: fallback.playerA, playerB: fallback.playerB, difficulty };
  }

  const [playerA, playerB] = samplePair();
  return { playerA, playerB, difficulty };
};

export const getDifficultyLabel = (difficulty: Difficulty) => {
  switch (difficulty) {
    case 'easy':
      return 'Easy';
    case 'medium':
      return 'Medium';
    case 'hard':
      return 'Hard';
  }
};
