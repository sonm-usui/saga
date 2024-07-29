import { RootState } from '..';

export const selectorGetMarketplaceAccessList = (state: RootState) =>
  state.marketplaceAccess.marketplaceAccessList;
export const selectorPostRequestAccess = (state: RootState) =>
  state.marketplaceAccess.requestAccess;
export const selectorGetListOptions = (state: RootState) => state.marketplaceAccess.listOptions;
export const selectorGetListMarketplaceApprove = (state: RootState) =>
  state.marketplaceAccess.listMarketplace;

// errors
export const selectorGetAdminUsersListErrors = (state: RootState) =>
  state.marketplaceAccess.errors.marketplaceAccessList;
export const selectorPostRequestAccessErrors = (state: RootState) =>
  state.marketplaceAccess.errors.requestAccess;
export const selectorGetListOptionsErrors = (state: RootState) =>
  state.marketplaceAccess.errors.listOptions;
export const selectorPutApproveRequestErrors = (state: RootState) =>
  state.marketplaceAccess.errors.approveRequest;
export const selectorPutRejectRequestErrors = (state: RootState) =>
  state.marketplaceAccess.errors.rejectRequest;
export const selectorGetListmarketplaceApproveErrors = (state: RootState) =>
  state.marketplaceAccess.errors.listMarketplace;
