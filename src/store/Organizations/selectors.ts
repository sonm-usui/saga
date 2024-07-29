import { RootState } from '..';

export const selectorGetOrganizationsList = (state: RootState) => state.organizations.organizations;
export const selectorGetOrganizationDetail = (state: RootState) =>
  state.organizations.organizationDetail;
export const selectorGetDonorRequest = (state: RootState) => state.organizations.donorRequest;
export const selectorGetOrganisationAdditional = (state: RootState) =>
  state.organizations.organisationAdditional;
export const selectorAdminGetOrganizationsList = (state: RootState) =>
  state.organizations.adminOrganisations;
export const selectorAdminGetOrganisationDetail = (state: RootState) =>
  state.organizations.adminOrganisationDetail;
export const selectorGetOrganisationDocuments = (state: RootState) =>
  state.organizations.organisationDocuments;
export const selectorOrganisationDocumentsLoading = (state: RootState) =>
  state.organizations.loading.organizationDocuments;
export const selectorOrganisationDocumentResponse = (state: RootState, type: string) =>
  state.organizations.documentResponse[type];
export const selectorOrganisationDocumentLoading = (state: RootState, type: string) =>
  state.organizations.documentLoading[type];
export const selectorGetOrgsByKeys = (state: RootState) => state.organizations.orgsByKeys;

// errors
export const selectorPostCreateOrganisationErrors = (state: RootState) =>
  state.organizations.errors.createOrganisation;
export const selectorPutApproveOrganisationErrors = (state: RootState) =>
  state.organizations.errors.approveOrganisation;
export const selectorPutRejectOrganisationErrors = (state: RootState) =>
  state.organizations.errors.rejectOrganisation;
export const selectorGetDonorRequestErrors = (state: RootState) =>
  state.organizations.errors.donorRequest;
export const selectorPostApproveDonorRequestErrors = (state: RootState) =>
  state.organizations.errors.approveDonorRequest;
export const selectorPostRejectDonorRequestErrors = (state: RootState) =>
  state.organizations.errors.rejectDonorRequest;
export const selectorPostDonorRequestAdditionalErrors = (state: RootState) =>
  state.organizations.errors.donorRequestAdditional;
export const selectorGetOrganisationAdditionalErrors = (state: RootState) =>
  state.organizations.errors.organisationAdditional;
export const selectorPutEditOrganisationErrors = (state: RootState) =>
  state.organizations.errors.editOrganization;
export const selectorGetOrgsByKeysErrors = (state: RootState) =>
  state.organizations.errors.orgsByKeys;
