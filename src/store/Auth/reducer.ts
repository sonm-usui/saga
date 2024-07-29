import { createReducer } from '@reduxjs/toolkit';
import { actionGetCurrentUser, actionLogout, actionPostLoginByWallet } from './actions';

interface IAuthState {
  user: any;
  errors: {
    loginByWallet: any;
    getCurrentUser: unknown;
  };
}

const initialState: IAuthState = {
  user: {
    loaded: false
  },
  errors: {
    loginByWallet: undefined,
    getCurrentUser: undefined
  }
};

export default createReducer(initialState, (builder) => {
  builder
    // actionPostLoginByWallet
    .addCase(actionPostLoginByWallet.fulfilled, (state, action) => {
      const { user, access_token, refresh_token } = action.payload;
      state.errors.loginByWallet = undefined;
      return {
        ...state,
        user: {
          ...user,
          accessToken: access_token,
          refreshToken: refresh_token,
          loaded: true
        }
      };
    })
    .addCase(actionPostLoginByWallet.rejected, (state, action) => {
      const payload = action.payload as any;
      state.user = {
        loaded: false
      };
      state.errors.loginByWallet = payload?.error?.message;
    })

    // actionGetCurrentUser
    .addCase(actionGetCurrentUser.fulfilled, (state, action) => {
      return {
        ...state,
        user: { ...action.payload, loaded: true } || {}
      };
    })
    .addCase(actionGetCurrentUser.rejected, (state, action) => {
      state.user = {
        loaded: false
      };
      state.errors.getCurrentUser = (action.payload as any)?.error;
    })

    // actionLogout
    .addCase(actionLogout.fulfilled, (state) => {
      state.user = {};
    });
});
