import { createReducer } from '@reduxjs/toolkit';
import { actionGetNftUserStats, actionGetNftUserTokens } from './actions';
import { UserStats, UserTokens } from '../../types/Nft.type';

interface NftState {
  nftUserStats: UserStats | undefined;
  nftUserTokens: UserTokens | undefined;
  errors: {
    nftUserStats: string | undefined;
    nftUserTokens: string | undefined;
  };
}

const initialState: NftState = {
  nftUserStats: undefined,
  nftUserTokens: undefined,
  errors: {
    nftUserStats: undefined,
    nftUserTokens: undefined
  }
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(actionGetNftUserStats.fulfilled, (state, action) => {
      state.nftUserStats = action.payload;
      state.errors.nftUserStats = undefined;
    })
    .addCase(actionGetNftUserStats.rejected, (state, action) => {
      const payload = action.payload as any;
      state.nftUserStats = undefined;
      state.errors.nftUserStats = payload?.error?.message;
    })

    .addCase(actionGetNftUserTokens.fulfilled, (state, action) => {
      state.nftUserTokens = action.payload;
      state.errors.nftUserTokens = undefined;
    })
    .addCase(actionGetNftUserTokens.rejected, (state, action) => {
      const payload = action.payload as any;
      state.nftUserTokens = undefined;
      state.errors.nftUserTokens = payload?.error?.message;
    });
});
