import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { RequestFactory } from '../../requests';
import RequestEnum from '../../requests/Request.enum';
import { GET_NFT_USER_STATS, GET_NFT_USER_TOKEN } from './action.types';
import { NftRequest } from '../../requests/Nft/NftRequest';
export const actionGetNftUserStats = createAsyncThunk<
  any,
  {
    params: any;
  }
>(GET_NFT_USER_STATS, async ({ params }, { rejectWithValue }) => {
  try {
    const response = await RequestFactory.getRequest<NftRequest>(
      RequestEnum.NftRequest
    ).getNftUserStats(params);
    return response;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const actionGetNftUserTokens = createAsyncThunk<
  any,
  {
    params: any;
  }
>(GET_NFT_USER_TOKEN, async ({ params }, { rejectWithValue }) => {
  try {
    const response = await RequestFactory.getRequest<NftRequest>(
      RequestEnum.NftRequest
    ).getNftUserTokens(params);
    return response;
  } catch (err) {
    return rejectWithValue(err);
  }
});
