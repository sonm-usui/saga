import { createAsyncThunk } from '@reduxjs/toolkit';
import { GET_CURRENT_USER, LOGIN_BY_WALLET, LOGOUT } from './action.types';
import { RequestFactory } from '../../requests';
import RequestEnum from '../../requests/Request.enum';
import { IPostLoginParams, IPostLogoutParams } from '../../requests/Auth/AuthRequest.type';
import { AuthRequest } from '../../requests/Auth/AuthRequest';

export const actionPostLoginByWallet = createAsyncThunk<
  any,
  {
    params: IPostLoginParams;
    callback: (isSuccess: boolean) => void;
  }
>(LOGIN_BY_WALLET, async ({ params, callback }, { rejectWithValue }) => {
  try {
    const response = await RequestFactory.getRequest<AuthRequest>(
      RequestEnum.AuthRequest
    ).loginByWallet(params);
    callback(true);
    return response;
  } catch (err) {
    callback(false);
    return rejectWithValue(err);
  }
});

export const actionGetCurrentUser = createAsyncThunk<
  any,
  {
    callback?: (...body: any) => any;
  }
>(GET_CURRENT_USER, async ({ callback }, { rejectWithValue }) => {
  try {
    const response = await RequestFactory.getRequest<AuthRequest>(
      RequestEnum.AuthRequest
    ).getCurrentUser();
    return response;
  } catch (err) {
    return rejectWithValue(err);
  } finally {
    callback && callback();
  }
});

export const actionLogout = createAsyncThunk<
  void,
  {
    params: IPostLogoutParams;
    callback: (isSuccess: boolean) => any;
  }
>(LOGOUT, async ({ callback, params }, { rejectWithValue }) => {
  try {
    const response = await RequestFactory.getRequest<AuthRequest>(RequestEnum.AuthRequest).logout(
      params
    );
    callback(true);
    return response;
  } catch (err) {
    callback(false);
    return rejectWithValue(err);
  }
});

export const LOGIN_FULFILLED = actionPostLoginByWallet.fulfilled.toString();
export const LOGIN_REJECTED = actionPostLoginByWallet.rejected.toString();
export const LOGOUT_FULLFILLED = actionLogout.fulfilled.toString();
export const GET_CURRENT_USER_FULFILLED = actionGetCurrentUser.fulfilled.toString();
export const GET_CURRENT_USER_REJECTED = actionGetCurrentUser.rejected.toString();
