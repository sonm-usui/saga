import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { IPostSupportParams, IPostSurveyParams } from '../../requests/Types';
import { LEAVE_POST_SUPPORT, LEAVE_POST_SURVEY, POST_SUPPORT, POST_SURVEY } from './action.types';
import { RequestFactory } from '../../requests';
import RequestEnum from '../../requests/Request.enum';
import { OrganizationsRequest } from '../../requests/Organizations/OrganizationsRequest';
import { CommonRequest } from '../../requests/Common/CommonRequest';

export const actionPostSurvey = createAsyncThunk<
  any,
  {
    params: IPostSurveyParams;
    callback: (isSuccess: boolean) => void;
  }
>(POST_SURVEY, async ({ params, callback }, { rejectWithValue }) => {
  try {
    const response = await RequestFactory.getRequest<CommonRequest>(
      RequestEnum.CommonRequest
    ).postSurvey(params);
    callback(true);
    return response;
  } catch (err) {
    callback(false);
    return rejectWithValue(err);
  }
});

export const actionLeavePostSurvey = createAction(LEAVE_POST_SURVEY);

export const actionPostSupport = createAsyncThunk<
  any,
  {
    params: IPostSupportParams;
    callback: (isSuccess: boolean) => void;
  }
>(POST_SUPPORT, async ({ params, callback }, { rejectWithValue }) => {
  try {
    const response = await RequestFactory.getRequest<CommonRequest>(
      RequestEnum.CommonRequest
    ).postSupport(params);
    callback(true);
    return response;
  } catch (err) {
    callback(false);
    return rejectWithValue(err);
  }
});

export const actionLeavePostSupport = createAction(LEAVE_POST_SUPPORT);
