export type Difficulty = 'easy' | 'medium' | 'hard';

export type TeamHistory = {
  team: string;
  seasons: string[];
};

export type Player = {
  slug: string;
  name: string;
  imageUrl: string;
  starPower: number;
  dataProfile?: 'historical' | 'roster_snapshot';
  teams: TeamHistory[];
};

export type RetrievedEvidence = {
  player: Player;
  matchingTeams: {
    team: string;
    seasons: string[];
  }[];
};

export type TeammateCheckResult = {
  isTeammates: boolean;
  overlappingSeasons: {
    team: string;
    seasons: string[];
  }[];
  evidence: [RetrievedEvidence, RetrievedEvidence];
  reasoning: string;
};

export type GameRound = {
  playerA: Player;
  playerB: Player;
  difficulty: Difficulty;
};

export type PairDifficultyProfile = {
  bucket: Difficulty;
  score: number;
  reasons: string[];
};
