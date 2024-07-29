import { message } from 'antd';
import { createReducer } from '@reduxjs/toolkit';
import {
  actionAdminGetOrganizationsList,
  actionGetAdminOrganisationDetail,
  actionGetDonorRequest,
  actionGetOrganisationAdditional,
  actionGetOrganisationDocuments,
  actionGetOrganizationDetail,
  actionGetOrganizationsList,
  actionGetOrgsByKeys,
  actionLeaveAdminGetOrganisationsDetail,
  actionLeaveAdminGetOrganizationsList,
  actionLeaveGetDonorRequest,
  actionLeaveGetOrganisationAdditional,
  actionLeaveGetOrganisationDocuments,
  actionLeaveGetOrganizationDetail,
  actionLeaveGetOrganizationsList,
  actionLeaveGetOrgsByKeys,
  actionLeavePostApproveDonorRequest,
  actionLeavePostCreateOrganisation,
  actionLeavePostDonorRequestAdditional,
  actionLeavePostRejectDonorRequest,
  actionLeavePutApproveOrganisation,
  actionLeavePutEditOrganization,
  actionLeavePutRejectOrganisation,
  actionPostApproveDonorRequest,
  actionPostCreateOrganisation,
  actionPostDonorRequestAdditional,
  actionPostRejectDonorRequest,
  actionPutApproveOrganisation,
  actionPutEditOrganization,
  actionPutOrganisationDocument,
  actionPutRejectOrganisation
} from './actions';
import { IOrganizationDocument } from '../../types/Organizations.type';

interface IOrganisationState {
  organizations: any;
  organizationDetail: any;
  adminOrganisations: any;
  adminOrganisationDetail: any;
  donorRequest: any;
  organisationAdditional: any;
  organisationDocuments: IOrganizationDocument[] | undefined;
  documentResponse: { [key: string]: IOrganizationDocument | undefined };
  documentLoading: { [key: string]: boolean };
  orgsByKeys: any;
  errors: {
    getList: unknown;
    detail: unknown;
    createOrganisation: string | undefined;
    adminGetList: any;
    adminGetOrganisationDetail: string | undefined;
    rejectOrganisation: string | undefined;
    approveOrganisation: string | undefined;
    donorRequest: string | undefined;
    rejectDonorRequest: string | undefined;
    approveDonorRequest: string | undefined;
    donorRequestAdditional: string | undefined;
    organisationAdditional: string | undefined;
    editOrganization: string | undefined;
    organisationDocuments: string | undefined;
    orgsByKeys: string | undefined;
  };
  loading: {
    organizationDocuments: boolean;
  };
}

const initialState: IOrganisationState = {
  organizations: {},
  organizationDetail: {},
  adminOrganisations: {},
  adminOrganisationDetail: {},
  donorRequest: {},
  organisationAdditional: {},
  organisationDocuments: undefined,
  documentResponse: {},
  documentLoading: {},
  orgsByKeys: [],
  errors: {
    getList: undefined,
    detail: undefined,
    createOrganisation: undefined,
    adminGetList: undefined,
    adminGetOrganisationDetail: undefined,
    rejectOrganisation: undefined,
    approveOrganisation: undefined,
    donorRequest: undefined,
    rejectDonorRequest: undefined,
    approveDonorRequest: undefined,
    donorRequestAdditional: undefined,
    organisationAdditional: undefined,
    editOrganization: undefined,
    organisationDocuments: undefined,
    orgsByKeys: undefined
  },
  loading: {
    organizationDocuments: false
  }
};

export default createReducer(initialState, (builder) => {
  builder
    // actionGetOrganisationList
    .addCase(actionGetOrganizationsList.fulfilled, (state, action) => {
      state.organizations = action.payload;
      state.errors.getList = undefined;
    })
    .addCase(actionGetOrganizationsList.rejected, (state, action) => {
      state.organizations = {};
      state.errors.getList = (action.payload as any)?.error;
    })
    .addCase(actionLeaveGetOrganizationsList, (state) => {
      state.organizations = {};
      state.errors.getList = undefined;
    })
    // actionGetOrganizationDetail
    .addCase(actionGetOrganizationDetail.fulfilled, (state, action) => {
      state.organizationDetail = action.payload;
      state.errors.detail = undefined;
    })
    .addCase(actionGetOrganizationDetail.rejected, (state, action) => {
      state.organizationDetail = {};
      state.errors.detail = (action.payload as any)?.error;
    })
    .addCase(actionLeaveGetOrganizationDetail, (state) => {
      state.organizationDetail = {};
      state.errors.detail = undefined;
    })

    // actionPostCreateOrganisation
    .addCase(actionPostCreateOrganisation.rejected, (state, action) => {
      const payload = action.payload as any;
      state.errors.createOrganisation = payload?.error?.message;
    })
    .addCase(actionLeavePostCreateOrganisation, (state) => {
      state.errors.createOrganisation = undefined;
    })

    // actionPutEditOrganization
    .addCase(actionPutEditOrganization.rejected, (state, action) => {
      const payload = action.payload as any;
      state.errors.editOrganization = payload?.error?.message;
    })
    .addCase(actionLeavePutEditOrganization, (state) => {
      state.errors.editOrganization = undefined;
    })

    // actionGetAdminOrganisationList
    .addCase(actionAdminGetOrganizationsList.fulfilled, (state, action) => {
      state.adminOrganisations = action.payload;
      state.errors.adminGetList = undefined;
    })
    .addCase(actionAdminGetOrganizationsList.rejected, (state, action) => {
      const payload = action.payload as any;
      state.adminOrganisations = {};
      state.errors.adminGetList = payload?.error?.message;
    })
    .addCase(actionLeaveAdminGetOrganizationsList, (state) => {
      state.adminOrganisations = {};
      state.errors.adminGetList = undefined;
    })

    // actionAdminGetOrganisationDetail
    .addCase(actionGetAdminOrganisationDetail.fulfilled, (state, action) => {
      state.adminOrganisationDetail = action.payload;
      state.errors.adminGetOrganisationDetail = undefined;
    })
    .addCase(actionGetAdminOrganisationDetail.rejected, (state, action) => {
      const payload = action.payload as any;
      state.adminOrganisationDetail = {};
      state.errors.detail = payload;
    })
    .addCase(actionLeaveAdminGetOrganisationsDetail, (state) => {
      state.adminOrganisationDetail = {};
      state.errors.adminGetOrganisationDetail = undefined;
    })

    // actionPutRejectOrganisation
    .addCase(actionPutRejectOrganisation.rejected, (state, action) => {
      const payload = action.payload as any;
      state.errors.rejectOrganisation = payload?.error?.message;
    })
    .addCase(actionLeavePutRejectOrganisation, (state) => {
      state.errors.rejectOrganisation = undefined;
    })

    // actionPutApproveOrganisation
    .addCase(actionPutApproveOrganisation.rejected, (state, action) => {
      const payload = action.payload as any;
      state.errors.approveOrganisation = payload?.error?.message;
    })
    .addCase(actionLeavePutApproveOrganisation, (state) => {
      state.errors.approveOrganisation = undefined;
    })

    // actionGetDonorRequest
    .addCase(actionGetDonorRequest.fulfilled, (state, action) => {
      state.donorRequest = action.payload;
      state.errors.donorRequest = undefined;
    })
    .addCase(actionGetDonorRequest.rejected, (state, action) => {
      const payload = action.payload as any;
      state.donorRequest = {};
      state.errors.donorRequest = payload?.error?.message;
    })
    .addCase(actionLeaveGetDonorRequest, (state) => {
      state.donorRequest = {};
      state.errors.donorRequest = undefined;
    })

    // actionPostApproveDonorRequest
    .addCase(actionPostApproveDonorRequest.rejected, (state, action) => {
      const payload = action.payload as any;
      state.errors.approveDonorRequest = payload?.error?.message;
    })
    .addCase(actionLeavePostApproveDonorRequest, (state) => {
      state.errors.approveDonorRequest = undefined;
    })

    // actionPostRejectDonorRequest
    .addCase(actionPostRejectDonorRequest.rejected, (state, action) => {
      const payload = action.payload as any;
      state.errors.rejectDonorRequest = payload?.error?.message;
    })
    .addCase(actionLeavePostRejectDonorRequest, (state) => {
      state.errors.rejectDonorRequest = undefined;
    })

    // actionPostDonorRequestAdditional
    .addCase(actionPostDonorRequestAdditional.rejected, (state, action) => {
      const payload = action.payload as any;
      state.errors.donorRequestAdditional = payload?.error?.message;
    })
    .addCase(actionLeavePostDonorRequestAdditional, (state) => {
      state.errors.donorRequestAdditional = undefined;
    })

    // actionGetOrganisationAdditional
    .addCase(actionGetOrganisationAdditional.fulfilled, (state, action) => {
      state.organisationAdditional = action.payload;
      state.errors.organisationAdditional = undefined;
    })
    .addCase(actionGetOrganisationAdditional.rejected, (state, action) => {
      const payload = action.payload as any;
      state.organisationAdditional = {};
      state.errors.organisationAdditional = payload?.error?.message;
    })
    .addCase(actionLeaveGetOrganisationAdditional, (state) => {
      state.organisationAdditional = {};
      state.errors.organisationAdditional = undefined;
    })

    // actionGetOrganizationDocuments
    .addCase(actionGetOrganisationDocuments.pending, (state) => {
      state.loading.organizationDocuments = true;
    })
    .addCase(actionGetOrganisationDocuments.fulfilled, (state, action) => {
      state.organisationDocuments = action.payload;
      state.errors.organisationDocuments = undefined;
      state.loading.organizationDocuments = false;
    })
    .addCase(actionGetOrganisationDocuments.rejected, (state, action) => {
      const payload = action.payload as any;
      state.organisationDocuments = [];
      state.errors.organisationDocuments = payload?.error?.message;
      state.loading.organizationDocuments = false;
    })
    .addCase(actionLeaveGetOrganisationDocuments, (state) => {
      state.organisationDocuments = undefined;
      state.errors.organisationAdditional = undefined;
      state.loading.organizationDocuments = false;
    })

    .addCase(actionPutOrganisationDocument.pending, (state, action) => {
      state.documentLoading[action?.meta?.arg?.params?.document_type] = true;
    })
    .addCase(actionPutOrganisationDocument.rejected, (state, action) => {
      state.documentLoading[action?.meta?.arg?.params?.document_type] = true;
    })
    .addCase(actionPutOrganisationDocument.fulfilled, (state, action) => {
      state.documentResponse[action.payload.document_type] = action.payload;
      state.documentLoading[action.payload.document_type] = false;
    })

    // actionGetOrgsByKeys
    .addCase(actionGetOrgsByKeys.fulfilled, (state, action) => {
      state.orgsByKeys = action.payload;
      state.errors.orgsByKeys = undefined;
    })
    .addCase(actionGetOrgsByKeys.rejected, (state, action) => {
      state.orgsByKeys = [];
      state.errors.orgsByKeys = (action.payload as any)?.error;
    })
    .addCase(actionLeaveGetOrgsByKeys, (state) => {
      state.orgsByKeys = [];
      state.errors.orgsByKeys = undefined;
    });
});
