import { RootState } from '..';

export const selectorNftUserStats = (state: RootState) => state.nft.nftUserStats;
export const selectorNftUserTokens = (state: RootState) => state.nft.nftUserTokens;
