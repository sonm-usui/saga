import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { IGetDetailParams, IGetOrganizationsListParams } from '../../requests/Types';
import {
  GET_ADMIN_ORGANISATION_DETAIL,
  GET_ADMIN_ORGANIZATIONS_LIST,
  GET_DONOR_REQUEST,
  GET_ORGANISATION_ADDITIONAL,
  GET_ORGANIZATIONS_LIST,
  GET_ORGANIZATION_DETAIL,
  GET_ORGANIZATION_DOCUMENTS,
  GET_ORGS_BY_KEYS,
  LEAVE_GET_ADMIN_ORGANISATION_DETAIL,
  LEAVE_GET_ADMIN_ORGANIZATIONS_LIST,
  LEAVE_GET_DONOR_REQUEST,
  LEAVE_GET_ORGANISATION_ADDITIONAL,
  LEAVE_GET_ORGANIZATIONS_LIST,
  LEAVE_GET_ORGANIZATION_DETAIL,
  LEAVE_GET_ORGANIZATION_DOCUMENTS,
  LEAVE_GET_ORGS_BY_KEYS,
  LEAVE_POST_APPROVE_DONOR_REQUEST,
  LEAVE_POST_CREATE_ORGANISATION,
  LEAVE_POST_DONOR_REQUEST_ADDITIONAL,
  LEAVE_POST_REJECT_DONOR_REQUEST,
  LEAVE_PUT_APPROVE_ORGANISATION,
  LEAVE_PUT_EDIT_ORGANIZATION,
  LEAVE_PUT_ORGANIZATION_DOCUMENTS,
  LEAVE_PUT_REJECT_ORGANISATION,
  POST_APPROVE_DONOR_REQUEST,
  POST_CREATE_ORGANISATION,
  POST_DONOR_REQUEST_ADDITIONAL,
  POST_REJECT_DONOR_REQUEST,
  PUT_APPROVE_ORGANISATION,
  PUT_EDIT_ORGANIZATION,
  PUT_ORGANIZATION_DOCUMENTS,
  PUT_REJECT_ORGANISATION
} from './action.types';
import { RequestFactory } from '../../requests';
import RequestEnum from '../../requests/Request.enum';
import { OrganizationsRequest } from '../../requests/Organizations/OrganizationsRequest';
import {
  IAdminGetOrganisationsListParams,
  IGetDonorRequestParams,
  IGetOrganisationAdditionalParams,
  IGetOrganisationDocuments,
  IGetOrgs,
  IPostCreateOrganisation,
  IPutEditOrganization,
  IPutOrganisationDocument
} from '../../requests/Organizations/OrganizationsRequest.type';

export const actionGetOrganizationsList = createAsyncThunk<
  any,
  {
    params: IGetOrganizationsListParams;
  }
>(GET_ORGANIZATIONS_LIST, async ({ params }, { rejectWithValue }) => {
  try {
    const response = await RequestFactory.getRequest<OrganizationsRequest>(
      RequestEnum.OrganizationsRequest
    ).getOrganizationsList(params);
    return response;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const actionGetOrganizationDetail = createAsyncThunk<
  any,
  {
    params: IGetDetailParams;
  }
>(GET_ORGANIZATION_DETAIL, async ({ params }, { rejectWithValue }) => {
  try {
    const response = await RequestFactory.getRequest<OrganizationsRequest>(
      RequestEnum.OrganizationsRequest
    ).getOrganizationDetail(params);
    return response;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const getOrganizationDetail = async (params: IGetDetailParams) => {
  const response = await RequestFactory.getRequest<OrganizationsRequest>(
    RequestEnum.OrganizationsRequest
  ).getOrganizationDetail(params);
  return response;
};

export const actionPostCreateOrganisation = createAsyncThunk<
  any,
  {
    params: IPostCreateOrganisation;
    callback: (isSuccess: boolean) => any;
  }
>(POST_CREATE_ORGANISATION, async ({ callback, params }, { rejectWithValue }) => {
  try {
    const response = await RequestFactory.getRequest<OrganizationsRequest>(
      RequestEnum.OrganizationsRequest
    ).postCreateOrganisation(params);
    callback(true);
    return response;
  } catch (err) {
    callback(false);
    return rejectWithValue(err);
  }
});

export const actionPutEditOrganization = createAsyncThunk<
  any,
  {
    params: IPutEditOrganization;
    callback: (isSuccess: boolean) => any;
  }
>(PUT_EDIT_ORGANIZATION, async ({ callback, params }, { rejectWithValue }) => {
  try {
    const response = await RequestFactory.getRequest<OrganizationsRequest>(
      RequestEnum.OrganizationsRequest
    ).putEditOrganisation(params);
    callback(true);
    return response;
  } catch (err) {
    callback(false);
    return rejectWithValue(err);
  }
});

export const actionAdminGetOrganizationsList = createAsyncThunk<
  any,
  {
    params: IAdminGetOrganisationsListParams;
  }
>(GET_ADMIN_ORGANIZATIONS_LIST, async ({ params }, { rejectWithValue }) => {
  try {
    const response = await RequestFactory.getRequest<OrganizationsRequest>(
      RequestEnum.OrganizationsRequest
    ).getAdminOrganizationsList(params);
    return response;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const actionGetAdminOrganisationDetail = createAsyncThunk<
  any,
  {
    key: string;
  }
>(GET_ADMIN_ORGANISATION_DETAIL, async ({ key }, { rejectWithValue }) => {
  try {
    const response = await RequestFactory.getRequest<OrganizationsRequest>(
      RequestEnum.OrganizationsRequest
    ).getAdminOrganisationDetail(key);
    return response;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const actionPutRejectOrganisation = createAsyncThunk<
  any,
  {
    key: string;
    callback: (isSuccess: boolean) => any;
  }
>(PUT_REJECT_ORGANISATION, async ({ key, callback }, { rejectWithValue }) => {
  try {
    const response = await RequestFactory.getRequest<OrganizationsRequest>(
      RequestEnum.OrganizationsRequest
    ).putRejectOrganization(key);
    callback(true);
    return response;
  } catch (err) {
    callback(false);
    return rejectWithValue(err);
  }
});

export const actionPutApproveOrganisation = createAsyncThunk<
  any,
  {
    key: string;
    callback: (isSuccess: boolean) => any;
  }
>(PUT_APPROVE_ORGANISATION, async ({ key, callback }, { rejectWithValue }) => {
  try {
    const response = await RequestFactory.getRequest<OrganizationsRequest>(
      RequestEnum.OrganizationsRequest
    ).putApproveOrganization(key);
    callback(true);
    return response;
  } catch (err) {
    callback(false);
    return rejectWithValue(err);
  }
});

export const actionGetDonorRequest = createAsyncThunk<
  any,
  {
    params: IGetDonorRequestParams;
  }
>(GET_DONOR_REQUEST, async ({ params }, { rejectWithValue }) => {
  try {
    const response = await RequestFactory.getRequest<OrganizationsRequest>(
      RequestEnum.OrganizationsRequest
    ).getDonorRequest(params);
    return response;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const actionPostRejectDonorRequest = createAsyncThunk<
  any,
  {
    key: string;
    callback: (isSuccess: boolean) => any;
  }
>(POST_REJECT_DONOR_REQUEST, async ({ key, callback }, { rejectWithValue }) => {
  try {
    const response = await RequestFactory.getRequest<OrganizationsRequest>(
      RequestEnum.OrganizationsRequest
    ).postRejectDonorRequest(key);
    callback(true);
    return response;
  } catch (err) {
    callback(false);
    return rejectWithValue(err);
  }
});

export const actionPostApproveDonorRequest = createAsyncThunk<
  any,
  {
    key: string;
    callback: (isSuccess: boolean) => any;
  }
>(POST_APPROVE_DONOR_REQUEST, async ({ key, callback }, { rejectWithValue }) => {
  try {
    const response = await RequestFactory.getRequest<OrganizationsRequest>(
      RequestEnum.OrganizationsRequest
    ).postApproveDonorRequest(key);
    callback(true);
    return response;
  } catch (err) {
    callback(false);
    return rejectWithValue(err);
  }
});

export const actionPostDonorRequestAdditional = createAsyncThunk<
  any,
  {
    key: string;
    callback: (isSuccess: boolean) => any;
  }
>(POST_DONOR_REQUEST_ADDITIONAL, async ({ key, callback }, { rejectWithValue }) => {
  try {
    const response = await RequestFactory.getRequest<OrganizationsRequest>(
      RequestEnum.OrganizationsRequest
    ).postDonorRequestAdditional(key);
    callback(true);
    return response;
  } catch (err) {
    callback(false);
    return rejectWithValue(err);
  }
});

export const actionGetOrganisationAdditional = createAsyncThunk<
  any,
  {
    params: IGetOrganisationAdditionalParams;
  }
>(GET_ORGANISATION_ADDITIONAL, async ({ params }, { rejectWithValue }) => {
  try {
    const response = await RequestFactory.getRequest<OrganizationsRequest>(
      RequestEnum.OrganizationsRequest
    ).getOrganisationAdditional(params);
    return response;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const actionGetOrganisationDocuments = createAsyncThunk<
  any,
  {
    params: IGetOrganisationDocuments;
  }
>(GET_ORGANIZATION_DOCUMENTS, async ({ params }, { rejectWithValue }) => {
  try {
    const response = await RequestFactory.getRequest<OrganizationsRequest>(
      RequestEnum.OrganizationsRequest
    ).getOrganisationDocuments(params);
    return response;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const actionPutOrganisationDocument = createAsyncThunk<
  any,
  {
    params: IPutOrganisationDocument;
    callback: (isSuccess: boolean) => any;
  }
>(PUT_ORGANIZATION_DOCUMENTS, async ({ callback, params }, { rejectWithValue }) => {
  try {
    const response = await RequestFactory.getRequest<OrganizationsRequest>(
      RequestEnum.OrganizationsRequest
    ).putOrganisationDocument(params);
    callback(true);
    return response;
  } catch (err) {
    callback(false);
    return rejectWithValue(err);
  }
});

export const actionGetOrgsByKeys = createAsyncThunk<
  any,
  {
    params: IGetOrgs;
  }
>(GET_ORGS_BY_KEYS, async ({ params }, { rejectWithValue }) => {
  try {
    const response = await RequestFactory.getRequest<OrganizationsRequest>(
      RequestEnum.OrganizationsRequest
    ).getOrgsByKeys(params);
    return response;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const actionLeaveGetOrganizationsList = createAction(LEAVE_GET_ORGANIZATIONS_LIST);
export const actionLeaveGetOrganizationDetail = createAction(LEAVE_GET_ORGANIZATION_DETAIL);
export const actionLeavePostCreateOrganisation = createAction(LEAVE_POST_CREATE_ORGANISATION);
export const actionLeavePutEditOrganization = createAction(LEAVE_PUT_EDIT_ORGANIZATION);
export const actionLeaveAdminGetOrganizationsList = createAction(
  LEAVE_GET_ADMIN_ORGANIZATIONS_LIST
);
export const actionLeaveAdminGetOrganisationsDetail = createAction(
  LEAVE_GET_ADMIN_ORGANISATION_DETAIL
);
export const actionLeavePutRejectOrganisation = createAction(LEAVE_PUT_REJECT_ORGANISATION);
export const actionLeavePutApproveOrganisation = createAction(LEAVE_PUT_APPROVE_ORGANISATION);
export const actionLeaveGetDonorRequest = createAction(LEAVE_GET_DONOR_REQUEST);
export const actionLeavePostRejectDonorRequest = createAction(LEAVE_POST_REJECT_DONOR_REQUEST);
export const actionLeavePostApproveDonorRequest = createAction(LEAVE_POST_APPROVE_DONOR_REQUEST);
export const actionLeavePostDonorRequestAdditional = createAction(
  LEAVE_POST_DONOR_REQUEST_ADDITIONAL
);
export const actionLeaveGetOrganisationAdditional = createAction(LEAVE_GET_ORGANISATION_ADDITIONAL);

export const actionLeaveGetOrganisationDocuments = createAction(LEAVE_GET_ORGANIZATION_DOCUMENTS);
export const actionLeavePutOrganisationDocument = createAction(LEAVE_PUT_ORGANIZATION_DOCUMENTS);
export const actionLeaveGetOrgsByKeys = createAction(LEAVE_GET_ORGS_BY_KEYS);
