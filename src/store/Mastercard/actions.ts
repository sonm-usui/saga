import { createAsyncThunk } from '@reduxjs/toolkit';
import { GET_USER_BALANCE } from './action.types';
import { RequestFactory } from '../../requests';
import RequestEnum from '../../requests/Request.enum';
import { MastercardRequest } from '../../requests/Mastercard/MastercardRequest';

export const actionGetUserBalance = createAsyncThunk<
  any,
  {
    alias: string;
  }
>(GET_USER_BALANCE, async ({ alias }, { rejectWithValue }) => {
  try {
    const response = await RequestFactory.getRequest<MastercardRequest>(
      RequestEnum.MastercardRequest
    ).getUserBalance(alias);
    return response;
  } catch (err) {
    return rejectWithValue(err);
  }
});
