import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
  GET_LIST_MARKETPLACE_APPROVE,
  GET_LIST_OPTIONS_BY_USER,
  GET_MARKETPLACE_ACCESS_LIST,
  LEAVE_GET_LIST_MARKETPLACE_APPROVE,
  LEAVE_GET_LIST_OPTIONS_BY_USER,
  LEAVE_GET_MARKETPLACE_ACCESS_LIST,
  LEAVE_POST_REQUEST_ACCESS,
  LEAVE_PUT_APPROVE_REQUEST,
  LEAVE_PUT_REJECT_REQUEST,
  POST_REQUEST_ACCESS,
  PUT_APPROVE_REQUEST,
  PUT_REJECT_REQUEST
} from './action.types';
import { RequestFactory } from '../../requests';
import RequestEnum from '../../requests/Request.enum';
import {
  IGetListOptionsRequestAccessParams,
  IGetMarketplaceAccessListParams,
  IPostRequestAccessParams
} from '../../requests/MarketplaceAccess/MarketplaceAccess.type';
import { MarketplaceAccessRequest } from '../../requests/MarketplaceAccess/MarketplaceAccess';

export const actionGetMarketplaceAccessList = createAsyncThunk<
  any,
  {
    params: IGetMarketplaceAccessListParams;
  }
>(GET_MARKETPLACE_ACCESS_LIST, async ({ params }, { rejectWithValue }) => {
  try {
    const response = await RequestFactory.getRequest<MarketplaceAccessRequest>(
      RequestEnum.MarketplaceAccessRequest
    ).getMarketplaceAccessList(params);
    return response;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const actionRequestAccess = createAsyncThunk<
  any,
  {
    params: IPostRequestAccessParams;
    callback: (isSuccess: boolean) => void;
  }
>(POST_REQUEST_ACCESS, async ({ params, callback }, { rejectWithValue }) => {
  try {
    const response = await RequestFactory.getRequest<MarketplaceAccessRequest>(
      RequestEnum.MarketplaceAccessRequest
    ).postRequestAccess(params);
    callback(true);
    return response;
  } catch (err) {
    callback(false);
    return rejectWithValue(err);
  }
});

export const actionGetListOptions = createAsyncThunk<
  any,
  {
    params: IGetListOptionsRequestAccessParams;
  }
>(GET_LIST_OPTIONS_BY_USER, async ({ params }, { rejectWithValue }) => {
  try {
    const response = await RequestFactory.getRequest<MarketplaceAccessRequest>(
      RequestEnum.MarketplaceAccessRequest
    ).getListOptions(params);
    return response;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const actionGetListMarketplaceApprove = createAsyncThunk<
  any,
  {
    params: any;
  }
>(GET_LIST_MARKETPLACE_APPROVE, async ({ params }, { rejectWithValue }) => {
  try {
    const response = await RequestFactory.getRequest<MarketplaceAccessRequest>(
      RequestEnum.MarketplaceAccessRequest
    ).getListMarketplaceApprove();
    return response;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const actionPutRejectRequest = createAsyncThunk<
  any,
  {
    key: string;
    callback: (isSuccess: boolean) => any;
  }
>(PUT_REJECT_REQUEST, async ({ key, callback }, { rejectWithValue }) => {
  try {
    const response = await RequestFactory.getRequest<MarketplaceAccessRequest>(
      RequestEnum.MarketplaceAccessRequest
    ).putRejectRequest(key);
    callback(true);
    return response;
  } catch (err) {
    callback(false);
    return rejectWithValue(err);
  }
});

export const actionPutApproveRequest = createAsyncThunk<
  any,
  {
    key: string;
    callback: (isSuccess: boolean) => any;
  }
>(PUT_APPROVE_REQUEST, async ({ key, callback }, { rejectWithValue }) => {
  try {
    const response = await RequestFactory.getRequest<MarketplaceAccessRequest>(
      RequestEnum.MarketplaceAccessRequest
    ).putApproveRequest(key);
    callback(true);
    return response;
  } catch (err) {
    callback(false);
    return rejectWithValue(err);
  }
});

export const actionLeaveGetMarketplaceAccessList = createAction(LEAVE_GET_MARKETPLACE_ACCESS_LIST);
export const actionLeaveRequestAccess = createAction(LEAVE_POST_REQUEST_ACCESS);
export const actionLeaveGetListOptions = createAction(LEAVE_GET_LIST_OPTIONS_BY_USER);
export const actionLeavePutApproveRequest = createAction(LEAVE_PUT_APPROVE_REQUEST);
export const actionLeavePutRejectRequest = createAction(LEAVE_PUT_REJECT_REQUEST);
export const actionLeaveGetListMarketplaceApprove = createAction(
  LEAVE_GET_LIST_MARKETPLACE_APPROVE
);
