import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
  POST_ADMIN_CREATE_USER,
  LEAVE_ADMIN_CREATE_USER,
  GET_ADMIN_USERS_LIST,
  LEAVE_GET_ADMIN_USERS_LIST,
  GET_ADMIN_USERS_EXPORT_CSV,
  LEAVE_GET_ADMIN_USERS_EXPORT_CSV,
  GET_ADMIN_USERS_IMPORT_CSV,
  LEAVE_GET_ADMIN_USERS_IMPORT_CSV,
  GET_USERS_BY_KEYS,
  LEAVE_GET_USERS_BY_KEYS
} from './action.types';
import { RequestFactory } from '../../requests';
import RequestEnum from '../../requests/Request.enum';
import {
  IAdminCreateUserParams,
  IGetAdminUsersListParams,
  IGetUsers
} from '../../requests/Users/UsersRequest.type';
import { UsersRequest } from '../../requests/Users/UsersRequest';

export const actionAdminCreateUser = createAsyncThunk<
  any,
  {
    params: IAdminCreateUserParams;
    callback: (isSuccess: boolean) => void;
  }
>(POST_ADMIN_CREATE_USER, async ({ params, callback }, { rejectWithValue }) => {
  try {
    const response = await RequestFactory.getRequest<UsersRequest>(
      RequestEnum.UsersRequest
    ).postAdminCreateUser(params);
    callback(true);
    return response;
  } catch (err) {
    callback(false);
    return rejectWithValue(err);
  }
});

export const actionGetAdminUsersList = createAsyncThunk<
  any,
  {
    params: IGetAdminUsersListParams;
  }
>(GET_ADMIN_USERS_LIST, async ({ params }, { rejectWithValue }) => {
  try {
    const response = await RequestFactory.getRequest<UsersRequest>(
      RequestEnum.UsersRequest
    ).getAdminUsersList(params);
    return response;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const actionGetAdminUsersExportCsv = createAsyncThunk<
  any,
  {
    callback: (isSuccess: boolean) => void;
  }
>(GET_ADMIN_USERS_EXPORT_CSV, async ({ callback }, { rejectWithValue }) => {
  try {
    const response = await RequestFactory.getRequest<UsersRequest>(
      RequestEnum.UsersRequest
    ).getAdminUsersExportCsv();
    callback(true);
    return response;
  } catch (err) {
    callback(false);
    return rejectWithValue(err);
  }
});

export const actionGetAdminUsersImportCsv = createAsyncThunk<
  any,
  {
    file: File;
    callback: (isSuccess: boolean) => void;
  }
>(GET_ADMIN_USERS_IMPORT_CSV, async ({ file, callback }, { rejectWithValue }) => {
  try {
    const response = await RequestFactory.getRequest<UsersRequest>(
      RequestEnum.UsersRequest
    ).postAdminUsersImportCsv(file);
    callback(true);
    return response;
  } catch (err) {
    callback(false);
    return rejectWithValue(err);
  }
});

export const actionGetUsersByKeys = createAsyncThunk<
  any,
  {
    params: IGetUsers;
  }
>(GET_USERS_BY_KEYS, async ({ params }, { rejectWithValue }) => {
  try {
    const response = await RequestFactory.getRequest<UsersRequest>(
      RequestEnum.UsersRequest
    ).getUsersByKeys(params);
    return response;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const actionLeaveAdminCreateUser = createAction(LEAVE_ADMIN_CREATE_USER);
export const actionLeaveGetAdminUsersList = createAction(LEAVE_GET_ADMIN_USERS_LIST);
export const actionLeaveGetAdminUsersExportCsv = createAction(LEAVE_GET_ADMIN_USERS_EXPORT_CSV);
export const actionLeaveGetAdminUsersImportCsv = createAction(LEAVE_GET_ADMIN_USERS_IMPORT_CSV);
export const actionLeaveGetUsersByKeys = createAction(LEAVE_GET_USERS_BY_KEYS);
