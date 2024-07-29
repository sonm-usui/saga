import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { IGetDetailParams, IGetProjectListParams } from '../../requests/Types';
import {
  GET_PROJECTS_LIST,
  GET_PROJECT_DETAIL,
  GET_RELATED_PROJECTS,
  LEAVE_GET_PROJECTS_LIST,
  LEAVE_GET_PROJECT_DETAIL,
  LEAVE_GET_RELATED_PROJECTS,
  LEAVE_POST_PROPOSE_PROJECT,
  POST_PROPOSE_PROJECT,
  GET_ADMIN_PROJECTS_LIST,
  LEAVE_GET_ADMIN_PROJECTS_LIST,
  GET_ADMIN_PROJECT_DETAIL,
  LEAVE_GET_ADMIN_PROJECT_DETAIL,
  PUT_REJECT_PROJECT,
  PUT_APPROVE_PROJECT,
  LEAVE_PUT_REJECT_PROJECT,
  LEAVE_PUT_APPROVE_PROJECT,
  LEAVE_POST_PAYMENT_PROJECT,
  LEAVE_GET_OPERATOR_ADDRESS_PROJECT,
  GET_OPERATOR_ADDRESS_PROJECT,
  POST_PAYMENT_PROJECT,
  PUT_PROJECT,
  LEAVE_PUT_ADMIN_PROJECT,
  GET_STATISTICS_ACCESS,
  LEAVE_GET_STATISTICS_ACCESS
} from './action.types';
import { ProjectsRequest, RequestFactory } from '../../requests';
import RequestEnum from '../../requests/Request.enum';
import {
  IAdminGetProjectsListParams,
  IPostProposeProjectParams
} from '../../requests/Projects/ProjectsRequest.type';

export const actionGetProjectList = createAsyncThunk<
  any,
  {
    params: IGetProjectListParams;
  }
>(GET_PROJECTS_LIST, async ({ params }, { rejectWithValue }) => {
  try {
    const response = await RequestFactory.getRequest<ProjectsRequest>(
      RequestEnum.ProjectsRequest
    ).getProjectList(params);
    return response;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const actionGetProjectDetail = createAsyncThunk<
  any,
  {
    params: IGetDetailParams;
  }
>(GET_PROJECT_DETAIL, async ({ params }, { rejectWithValue }) => {
  try {
    const response = await RequestFactory.getRequest<ProjectsRequest>(
      RequestEnum.ProjectsRequest
    ).getProjectDetail(params);
    return response;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const actionGetRelatedProjects = createAsyncThunk<
  any,
  {
    params: IGetDetailParams;
  }
>(GET_RELATED_PROJECTS, async ({ params }, { rejectWithValue }) => {
  try {
    const response = await RequestFactory.getRequest<ProjectsRequest>(
      RequestEnum.ProjectsRequest
    ).getRelatedProjects(params);
    return response;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const actionPostProposeProject = createAsyncThunk<
  any,
  {
    params: IPostProposeProjectParams;
    callback: (isSuccess: boolean) => any;
  }
>(POST_PROPOSE_PROJECT, async ({ callback, params }, { rejectWithValue }) => {
  try {
    const response = await RequestFactory.getRequest<ProjectsRequest>(
      RequestEnum.ProjectsRequest
    ).postProposeProject(params);
    callback(true);
    return response;
  } catch (err) {
    callback(false);
    return rejectWithValue(err);
  }
});

export const actionUpdateAdminProject = createAsyncThunk<
  any,
  {
    params: IPostProposeProjectParams;
    key: string;
    callback: (isSuccess: boolean) => any;
  }
>(PUT_PROJECT, async ({ callback, params, key }, { rejectWithValue }) => {
  try {
    const response = await RequestFactory.getRequest<ProjectsRequest>(
      RequestEnum.ProjectsRequest
    ).putProject(params, key);
    callback(true);
    return response;
  } catch (err) {
    callback(false);
    return rejectWithValue(err);
  }
});

export const actionAdminGetProjectsList = createAsyncThunk<
  any,
  {
    params: IAdminGetProjectsListParams;
  }
>(GET_ADMIN_PROJECTS_LIST, async ({ params }, { rejectWithValue }) => {
  try {
    const response = await RequestFactory.getRequest<ProjectsRequest>(
      RequestEnum.ProjectsRequest
    ).getAdminProjectsList(params);
    return response;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const actionGetAdminProjectDetail = createAsyncThunk<
  any,
  {
    key: string;
  }
>(GET_ADMIN_PROJECT_DETAIL, async ({ key }, { rejectWithValue }) => {
  try {
    const response = await RequestFactory.getRequest<ProjectsRequest>(
      RequestEnum.ProjectsRequest
    ).getAdminProjectDetail(key);
    return response;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const actionPutRejectProject = createAsyncThunk<
  any,
  {
    key: string;
    callback: (isSuccess: boolean) => any;
  }
>(PUT_REJECT_PROJECT, async ({ key, callback }, { rejectWithValue }) => {
  try {
    const response = await RequestFactory.getRequest<ProjectsRequest>(
      RequestEnum.ProjectsRequest
    ).putRejectProject(key);
    callback(true);
    return response;
  } catch (err) {
    callback(false);
    return rejectWithValue(err);
  }
});

export const actionPutApproveProject = createAsyncThunk<
  any,
  {
    key: string;
    callback: (isSuccess: boolean) => any;
  }
>(PUT_APPROVE_PROJECT, async ({ key, callback }, { rejectWithValue }) => {
  try {
    const response = await RequestFactory.getRequest<ProjectsRequest>(
      RequestEnum.ProjectsRequest
    ).putApproveProject(key);
    callback(true);
    return response;
  } catch (err) {
    callback(false);
    return rejectWithValue(err);
  }
});

export const actionGetOperatorAddress = createAsyncThunk<
  any,
  {
    key: string;
  }
>(GET_OPERATOR_ADDRESS_PROJECT, async ({ key }, { rejectWithValue }) => {
  try {
    const response = await RequestFactory.getRequest<ProjectsRequest>(
      RequestEnum.ProjectsRequest
    ).getOperatorAddress(key);
    return response;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const actionPostPayment = createAsyncThunk<
  any,
  {
    key: string;
    callback: (isSuccess: boolean) => any;
  }
>(POST_PAYMENT_PROJECT, async ({ key, callback }, { rejectWithValue }) => {
  try {
    const response = await RequestFactory.getRequest<ProjectsRequest>(
      RequestEnum.ProjectsRequest
    ).postPaymentProject(key);
    callback(true);
    return response;
  } catch (err) {
    callback(false);
    return rejectWithValue(err);
  }
});

export const actionGetStatisticsAccess = createAsyncThunk<
  any,
  {
    params: IGetProjectListParams;
  }
>(GET_STATISTICS_ACCESS, async ({ params }, { rejectWithValue }) => {
  try {
    const response = await RequestFactory.getRequest<ProjectsRequest>(
      RequestEnum.ProjectsRequest
    ).getStatisticsAccess(params);
    return response;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const actionLeaveGetProjectList = createAction(LEAVE_GET_PROJECTS_LIST);
export const actionLeaveGetProjectDetail = createAction(LEAVE_GET_PROJECT_DETAIL);
export const actionLeaveGetRelatedProjects = createAction(LEAVE_GET_RELATED_PROJECTS);
export const actionLeavePostProposeProject = createAction(LEAVE_POST_PROPOSE_PROJECT);
export const actionLeavePutAdminProject = createAction(LEAVE_PUT_ADMIN_PROJECT);
export const actionLeaveGetAdminProjectsList = createAction(LEAVE_GET_ADMIN_PROJECTS_LIST);
export const actionLeaveGetAdminProjectDetail = createAction(LEAVE_GET_ADMIN_PROJECT_DETAIL);
export const actionLeavePutRejectProject = createAction(LEAVE_PUT_REJECT_PROJECT);
export const actionLeavePutApproveProject = createAction(LEAVE_PUT_APPROVE_PROJECT);
export const actionLeaveGetOperatorAddressProject = createAction(
  LEAVE_GET_OPERATOR_ADDRESS_PROJECT
);
export const actionLeavePostPaymentProject = createAction(LEAVE_POST_PAYMENT_PROJECT);
export const actionLeaveGetStatisticsAccess = createAction(LEAVE_GET_STATISTICS_ACCESS);
