import { RootState } from '..';

export const selectorGetUserBalance = (state: RootState) => state.mastercard.userBalance;
export const selectorGetUserBalanceLoading = (state: RootState) =>
  state.mastercard.userBalanceLoading;
