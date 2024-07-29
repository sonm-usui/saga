import { RootState } from '..';

export const selectorGetAdminUsersList = (state: RootState) => state.users.adminUsersList;
export const selectorGetAdminUsersCsv = (state: RootState) => state.users.adminUsersCsv;
export const selectorGetAdminUsersImportCsv = (state: RootState) => state.users.adminUsersImportCsv;
export const selectorGetUsersByKeys = (state: RootState) => state.users.usersByKeys;

// errors
export const selectorAdminCreateUserErrors = (state: RootState) =>
  state.users.errors.adminCreateUser;
export const selectorGetAdminUsersListErrors = (state: RootState) =>
  state.users.errors.adminUsersList;
export const selectorGetAdminUsersExportCsvErrors = (state: RootState) =>
  state.users.errors.adminUsersExportCsv;
export const selectorGetUsersByKeysErrors = (state: RootState) => state.users.errors.usersByKeys;
