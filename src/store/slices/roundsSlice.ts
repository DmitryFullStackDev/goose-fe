import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Round {
  id: number;
  title: string;
  startAt: string;
  endAt: string;
  totalPoints: number;
  createdAt: string;
  updatedAt: string;
  status?: 'active' | 'cooldown' | 'finished';
  myScore?: number;
  winner?: {
    username: string;
    score: number;
  };
}

export interface RoundDetails {
  round: Round;
  timeUntilStart: number;
  winner: {
    username: string;
    score: number;
  } | null;
  userPoints: number;
}

export interface RoundsConfig {
  roundDuration: number;
  cooldownDuration: number;
}

interface RoundsState {
  rounds: Round[];
  currentRound: Round | null;
  currentRoundDetails: RoundDetails | null;
  config: RoundsConfig | null;
  loading: boolean;
  error: string | null;
}

const initialState: RoundsState = {
  rounds: [],
  currentRound: null,
  currentRoundDetails: null,
  config: null,
  loading: false,
  error: null,
};

export const calculateRoundStatus = (round: Round): 'active' | 'cooldown' | 'finished' => {
  const now = new Date().getTime();
  const start = new Date(round.startAt).getTime();
  const end = new Date(round.endAt).getTime();

  if (now < start) {
    return 'cooldown';
  } else if (now >= start && now <= end) {
    return 'active';
  } else {
    return 'finished';
  }
};

const roundsSlice = createSlice({
  name: 'rounds',
  initialState,
  reducers: {
    fetchRoundsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchRoundsSuccess: (state, action: PayloadAction<{ rounds: Round[], config: RoundsConfig }>) => {
      state.rounds = action.payload.rounds.map(round => ({
        ...round,
        status: calculateRoundStatus(round)
      }));
      state.config = action.payload.config;
      state.loading = false;
      state.error = null;
    },
    fetchRoundsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setCurrentRound: (state, action: PayloadAction<Round>) => {
      state.currentRound = {
        ...action.payload,
        status: calculateRoundStatus(action.payload)
      };
    },
    clearCurrentRound: (state) => {
      state.currentRound = null;
    },
    tapRequest: (state, action: PayloadAction<number>) => {
      state.loading = true;
      state.error = null;
    },
    tapSuccess: (state, action: PayloadAction<{ roundId: number; score: number }>) => {
      state.loading = false;
      if (state.currentRound?.id === action.payload.roundId) {
        state.currentRound.myScore = action.payload.score;
      }
      const roundIndex = state.rounds.findIndex(r => r.id === action.payload.roundId);
      if (roundIndex !== -1) {
        state.rounds[roundIndex].myScore = action.payload.score;
      }
    },
    tapFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateRoundStatuses: (state) => {
      state.rounds = state.rounds.map(round => ({
        ...round,
        status: calculateRoundStatus(round)
      }));
      if (state.currentRound) {
        state.currentRound.status = calculateRoundStatus(state.currentRound);
      }
    },
    createRoundRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    createRoundSuccess: (state, action: PayloadAction<Round>) => {
      state.loading = false;
      state.rounds = [...state.rounds, { ...action.payload, status: calculateRoundStatus(action.payload) }];
      state.error = null;
    },
    createRoundFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchRoundDetailsRequest: (state, action: PayloadAction<number>) => {
      state.loading = true;
      state.error = null;
    },
    fetchRoundDetailsSuccess: (state, action: PayloadAction<RoundDetails>) => {
      state.loading = false;
      state.currentRoundDetails = action.payload;
      state.error = null;
    },
    fetchRoundDetailsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearRoundDetails: (state) => {
      state.currentRoundDetails = null;
    },
    fetchRoundRequest: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },
    fetchRoundSuccess: (state, action: PayloadAction<Round>) => {
      state.loading = false;
      state.currentRound = {
        ...action.payload,
        status: calculateRoundStatus(action.payload)
      };
      state.error = null;
    },
    fetchRoundFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchRoundsRequest,
  fetchRoundsSuccess,
  fetchRoundsFailure,
  setCurrentRound,
  clearCurrentRound,
  tapRequest,
  tapSuccess,
  tapFailure,
  updateRoundStatuses,
  createRoundRequest,
  createRoundSuccess,
  createRoundFailure,
  fetchRoundDetailsRequest,
  fetchRoundDetailsSuccess,
  fetchRoundDetailsFailure,
  clearRoundDetails,
  fetchRoundRequest,
  fetchRoundSuccess,
  fetchRoundFailure,
} = roundsSlice.actions;

export default roundsSlice.reducer; 