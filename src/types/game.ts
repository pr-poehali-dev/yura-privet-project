export interface Province {
  id: number;
  name: string;
  owner: 'player' | 'ai' | 'neutral';
  army: number;
  income: number;
  continent: 'europe' | 'asia' | 'africa' | 'americas' | 'oceania';
  neighbors: number[];
  isCapital?: boolean;
  terrain: 'plains' | 'mountains' | 'desert' | 'forest' | 'coast';
  x: number;
  y: number;
}

export interface GameStats {
  turn: number;
  territoriesConquered: number;
  territoriesLost: number;
  battlesWon: number;
  battlesLost: number;
  goldSpent: number;
  goldEarned: number;
}

export interface HistoryEvent {
  turn: number;
  type: 'conquest' | 'defense' | 'purchase' | 'diplomacy';
  description: string;
  timestamp: number;
}

export type Difficulty = 'easy' | 'medium' | 'hard';
export type GameScreen = 'menu' | 'game' | 'tutorial' | 'settings';
