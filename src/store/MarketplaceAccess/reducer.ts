import { createReducer } from '@reduxjs/toolkit';
import {
  actionGetListMarketplaceApprove,
  actionGetListOptions,
  actionGetMarketplaceAccessList,
  actionLeaveGetListMarketplaceApprove,
  actionLeaveGetListOptions,
  actionLeaveGetMarketplaceAccessList,
  actionLeavePutApproveRequest,
  actionLeavePutRejectRequest,
  actionLeaveRequestAccess,
  actionPutApproveRequest,
  actionPutRejectRequest,
  actionRequestAccess
} from './actions';

interface IUsersState {
  marketplaceAccessList: any;
  requestAccess: any;
  listOptions: any;
  listMarketplace: any;
  errors: {
    marketplaceAccessList: string | undefined;
    requestAccess: string | undefined;
    listOptions: string | undefined;
    approveRequest: string | undefined;
    rejectRequest: string | undefined;
    listMarketplace: string | undefined;
  };
}

const initialState: IUsersState = {
  marketplaceAccessList: {},
  requestAccess: {},
  listOptions: [],
  listMarketplace: undefined,
  errors: {
    marketplaceAccessList: undefined,
    requestAccess: undefined,
    listOptions: undefined,
    approveRequest: undefined,
    rejectRequest: undefined,
    listMarketplace: undefined
  }
};

export default createReducer(initialState, (builder) => {
  builder

    // actionGetMarketplaceAccessList
    .addCase(actionGetMarketplaceAccessList.fulfilled, (state, action) => {
      state.marketplaceAccessList = action.payload;
      state.errors.marketplaceAccessList = undefined;
    })
    .addCase(actionGetMarketplaceAccessList.rejected, (state, action) => {
      const payload = action.payload as any;
      state.marketplaceAccessList = {};
      state.errors.marketplaceAccessList = payload?.error?.message;
    })
    .addCase(actionLeaveGetMarketplaceAccessList, (state) => {
      state.marketplaceAccessList = {};
      state.errors.marketplaceAccessList = undefined;
    })

    // actionpostRequestAccess
    .addCase(actionRequestAccess.fulfilled, (state, action) => {
      state.requestAccess = action.payload;
      state.errors.requestAccess = undefined;
    })
    .addCase(actionRequestAccess.rejected, (state, action) => {
      const payload = action.payload as any;
      state.requestAccess = {};
      state.errors.requestAccess = payload?.error?.message;
    })
    .addCase(actionLeaveRequestAccess, (state) => {
      state.requestAccess = {};
      state.errors.requestAccess = undefined;
    })

    // actionGetListOptions
    .addCase(actionGetListOptions.fulfilled, (state, action) => {
      state.listOptions = action.payload;
      state.errors.listOptions = undefined;
    })
    .addCase(actionGetListOptions.rejected, (state, action) => {
      const payload = action.payload as any;
      state.listOptions = [];
      state.errors.listOptions = payload?.error?.message;
    })
    .addCase(actionLeaveGetListOptions, (state) => {
      state.listOptions = [];
      state.errors.listOptions = undefined;
    })

    // actionPutApproveRequest
    .addCase(actionPutApproveRequest.rejected, (state, action) => {
      const payload = action.payload as any;
      state.errors.approveRequest = payload?.error?.message;
    })
    .addCase(actionLeavePutApproveRequest, (state) => {
      state.errors.approveRequest = undefined;
    })

    // actionPutRejectRequest
    .addCase(actionPutRejectRequest.rejected, (state, action) => {
      const payload = action.payload as any;
      state.errors.rejectRequest = payload?.error?.message;
    })
    .addCase(actionLeavePutRejectRequest, (state) => {
      state.errors.rejectRequest = undefined;
    })

    // actionGetListMarketplaceApprove
    .addCase(actionGetListMarketplaceApprove.fulfilled, (state, action) => {
      state.listMarketplace = action.payload;
      state.errors.listMarketplace = undefined;
    })
    .addCase(actionGetListMarketplaceApprove.rejected, (state, action) => {
      const payload = action.payload as any;
      state.listMarketplace = [];
      state.errors.listMarketplace = payload?.error?.message;
    })
    .addCase(actionLeaveGetListMarketplaceApprove, (state) => {
      state.listMarketplace = undefined;
      state.errors.listMarketplace = undefined;
    });
});
