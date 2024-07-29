import { createReducer } from '@reduxjs/toolkit';
import { actionGetUserBalance } from './actions';
import { IMastercardUserBalance } from '../../types/Mastercard.type';

interface IMastercardState {
  userBalance: IMastercardUserBalance | undefined;
  userBalanceLoading: boolean;
}

const initialState: IMastercardState = {
  userBalance: undefined,
  userBalanceLoading: false
};

export default createReducer(initialState, (builder) => {
  builder.addCase(actionGetUserBalance.fulfilled, (state, action) => {
    state.userBalance = action.payload;
    state.userBalanceLoading = false;
  });
  builder.addCase(actionGetUserBalance.pending, (state) => {
    state.userBalanceLoading = true;
  });
  builder.addCase(actionGetUserBalance.rejected, (state) => {
    state.userBalanceLoading = false;
  });
});
