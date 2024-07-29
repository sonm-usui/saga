import { createReducer } from '@reduxjs/toolkit';
import {
  actionAdminCreateUser,
  actionGetAdminUsersList,
  actionLeaveAdminCreateUser,
  actionLeaveGetAdminUsersList,
  actionLeaveGetAdminUsersExportCsv,
  actionGetAdminUsersExportCsv,
  actionGetAdminUsersImportCsv,
  actionLeaveGetAdminUsersImportCsv,
  actionGetUsersByKeys,
  actionLeaveGetUsersByKeys
} from './actions';

interface IUsersState {
  adminUsersList: any;
  adminUsersCsv: string | undefined;
  adminUsersImportCsv: any;
  usersByKeys: any;
  errors: {
    adminCreateUser: string | undefined;
    adminUsersList: string | undefined;
    adminUsersExportCsv: string | undefined;
    usersByKeys: string | undefined;
  };
}

const initialState: IUsersState = {
  adminUsersList: {},
  adminUsersCsv: undefined,
  adminUsersImportCsv: undefined,
  usersByKeys: [],
  errors: {
    adminCreateUser: undefined,
    adminUsersList: undefined,
    adminUsersExportCsv: undefined,
    usersByKeys: undefined
  }
};

export default createReducer(initialState, (builder) => {
  builder

    // actionAdminCreateUser
    .addCase(actionAdminCreateUser.rejected, (state, action) => {
      const payload = action.payload as any;
      state.errors.adminCreateUser = payload?.error?.message;
    })
    .addCase(actionLeaveAdminCreateUser, (state) => {
      state.errors.adminCreateUser = undefined;
    })

    // actionGetAdminUsersList
    .addCase(actionGetAdminUsersList.fulfilled, (state, action) => {
      state.adminUsersList = action.payload;
      state.errors.adminUsersList = undefined;
    })
    .addCase(actionGetAdminUsersList.rejected, (state, action) => {
      const payload = action.payload as any;
      state.adminUsersList = {};
      state.errors.adminUsersList = payload?.error?.message;
    })
    .addCase(actionLeaveGetAdminUsersList, (state) => {
      state.adminUsersList = {};
      state.errors.adminUsersList = undefined;
    })

    // actionGetAdminUsersExportCsv
    .addCase(actionGetAdminUsersExportCsv.fulfilled, (state, action) => {
      state.adminUsersCsv = action.payload;
      state.errors.adminUsersExportCsv = undefined;
    })
    .addCase(actionGetAdminUsersExportCsv.rejected, (state, action) => {
      const payload = action.payload as any;
      state.errors.adminUsersExportCsv = payload?.error?.message;
    })
    .addCase(actionLeaveGetAdminUsersExportCsv, (state) => {
      state.errors.adminUsersExportCsv = undefined;
    })

    // actionGetAdminUsersImportCsv
    .addCase(actionGetAdminUsersImportCsv.fulfilled, (state, action) => {
      state.adminUsersImportCsv = action.payload;
    })
    .addCase(actionGetAdminUsersImportCsv.rejected, (state, action) => {
      const payload = action.payload as any;
      state.adminUsersImportCsv = payload?.error?.message;
    })
    .addCase(actionLeaveGetAdminUsersImportCsv, (state) => {
      state.adminUsersImportCsv = undefined;
    })

    // actionGetUsersByKeys
    .addCase(actionGetUsersByKeys.fulfilled, (state, action) => {
      state.usersByKeys = action.payload;
      state.errors.usersByKeys = undefined;
    })
    .addCase(actionGetUsersByKeys.rejected, (state, action) => {
      state.usersByKeys = [];
      state.errors.usersByKeys = (action.payload as any)?.error;
    })
    .addCase(actionLeaveGetUsersByKeys, (state) => {
      state.usersByKeys = [];
      state.errors.usersByKeys = undefined;
    });
});
