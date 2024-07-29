import { RootState } from '..';
export const selectorGetUser = (state: RootState) => state.auth.user;

// errors
export const selectorPostLoginByWalletError = (state: RootState) => state.auth.errors.loginByWallet;
