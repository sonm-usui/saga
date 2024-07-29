import { createReducer } from '@reduxjs/toolkit';
import {
  actionAdminGetProjectsList,
  actionGetAdminProjectDetail,
  actionGetOperatorAddress,
  actionGetProjectDetail,
  actionGetProjectList,
  actionGetRelatedProjects,
  actionGetStatisticsAccess,
  actionLeaveGetAdminProjectDetail,
  actionLeaveGetAdminProjectsList,
  actionLeaveGetOperatorAddressProject,
  actionLeaveGetProjectDetail,
  actionLeaveGetProjectList,
  actionLeaveGetRelatedProjects,
  actionLeaveGetStatisticsAccess,
  actionLeavePostPaymentProject,
  actionLeavePostProposeProject,
  actionLeavePutAdminProject,
  actionLeavePutApproveProject,
  actionLeavePutRejectProject,
  actionPostPayment,
  actionPostProposeProject,
  actionPutApproveProject,
  actionPutRejectProject,
  actionUpdateAdminProject
} from './actions';

interface IProjectsState {
  projects: any;
  relatedProjects: any;
  projectDetail: any;
  operatorAddress: any;
  adminProjects: any;
  adminProjectDetail: any;
  fundProject: any;
  statisticsAccess: any;
  errors: {
    projects: {
      one: unknown;
      many: unknown;
      getRelated: unknown;
      proposeProject: string | undefined;
      putAdminProject: string | undefined;
      adminGetProjects: string | undefined;
      adminProjectDetail: string | undefined;
      rejectProject: string | undefined;
      approveProject: string | undefined;
      fundProject: string | undefined;
    };
  };
}

const initialState: IProjectsState = {
  projects: {},
  relatedProjects: [],
  projectDetail: {},
  operatorAddress: {},
  fundProject: '',
  adminProjects: {},
  adminProjectDetail: {},
  statisticsAccess: {},
  errors: {
    projects: {
      one: undefined,
      many: undefined,
      getRelated: undefined,
      proposeProject: undefined,
      putAdminProject: undefined,
      adminGetProjects: undefined,
      adminProjectDetail: undefined,
      rejectProject: undefined,
      approveProject: undefined,
      fundProject: undefined
    }
  }
};

export default createReducer(initialState, (builder) => {
  builder
    // actionGetProjectList
    .addCase(actionGetProjectList.fulfilled, (state, action) => {
      state.projects = action.payload;
      state.errors.projects.many = undefined;
    })
    .addCase(actionGetProjectList.rejected, (state, action) => {
      state.projects = [];
      state.errors.projects.many = (action.payload as any)?.error;
    })
    .addCase(actionLeaveGetProjectList, (state) => {
      state.projects = [];
      state.errors.projects.many = undefined;
    })
    // actionGetProjectDetail
    .addCase(actionGetProjectDetail.fulfilled, (state, action) => {
      state.projectDetail = action.payload;
      state.errors.projects.one = undefined;
    })
    .addCase(actionGetProjectDetail.rejected, (state, action) => {
      state.projectDetail = {};
      state.errors.projects.one = (action.payload as any)?.error;
    })
    .addCase(actionLeaveGetProjectDetail, (state) => {
      state.projectDetail = {};
      state.errors.projects.one = undefined;
    })
    // actionGetOperatorAddress
    .addCase(actionGetOperatorAddress.fulfilled, (state, action) => {
      state.operatorAddress = action.payload;
      state.errors.projects.one = undefined;
    })
    .addCase(actionGetOperatorAddress.rejected, (state, action) => {
      state.operatorAddress = {};
      state.errors.projects.one = (action.payload as any)?.error;
    })
    .addCase(actionLeaveGetOperatorAddressProject, (state) => {
      state.projectDetail = {};
      state.errors.projects.one = undefined;
    })
    // actionPostPayment
    .addCase(actionPostPayment.fulfilled, (state, action) => {
      state.fundProject = action.payload;
      state.errors.projects.one = undefined;
    })
    .addCase(actionPostPayment.rejected, (state, action) => {
      state.fundProject = '';
      state.errors.projects.one = (action.payload as any)?.error;
      const payload = action.payload as any;
      state.errors.projects.fundProject = payload?.error?.message;
    })
    .addCase(actionLeavePostPaymentProject, (state) => {
      state.fundProject = '';
      state.errors.projects.one = undefined;
      state.errors.projects.fundProject = undefined;
      return;
    })
    // actionGetRelatedProjects
    .addCase(actionGetRelatedProjects.fulfilled, (state, action) => {
      state.relatedProjects = action.payload;
      state.errors.projects.getRelated = undefined;
    })
    .addCase(actionGetRelatedProjects.rejected, (state, action) => {
      state.relatedProjects = [];
      state.errors.projects.getRelated = (action.payload as any)?.error;
    })
    .addCase(actionLeaveGetRelatedProjects, (state) => {
      state.relatedProjects = [];
      state.errors.projects.getRelated = undefined;
    })
    // actionPostProposeProject
    .addCase(actionPostProposeProject.rejected, (state, action) => {
      const payload = action.payload as any;
      state.errors.projects.proposeProject = payload?.error?.message;
    })
    .addCase(actionLeavePostProposeProject, (state) => {
      state.errors.projects.proposeProject = undefined;
    })
    // actionPutAdminProject
    .addCase(actionUpdateAdminProject.rejected, (state, action) => {
      const payload = action.payload as any;
      state.errors.projects.putAdminProject = payload?.error?.message;
    })
    .addCase(actionLeavePutAdminProject, (state) => {
      state.errors.projects.putAdminProject = undefined;
    })

    // actionGetAdminOrganisationList
    .addCase(actionAdminGetProjectsList.fulfilled, (state, action) => {
      state.adminProjects = action.payload;
      state.errors.projects.adminGetProjects = undefined;
    })
    .addCase(actionAdminGetProjectsList.rejected, (state, action) => {
      const payload = action.payload as any;
      state.adminProjects = {};
      state.errors.projects.adminGetProjects = payload?.error?.message;
    })
    .addCase(actionLeaveGetAdminProjectsList, (state) => {
      state.adminProjects = {};
      state.errors.projects.adminGetProjects = undefined;
    })

    // actionGetAdminProjectDetail
    .addCase(actionGetAdminProjectDetail.fulfilled, (state, action) => {
      state.adminProjectDetail = action.payload;
      state.errors.projects.adminProjectDetail = undefined;
    })
    .addCase(actionGetAdminProjectDetail.rejected, (state, action) => {
      const payload = action.payload as any;
      state.adminProjectDetail = {};
      state.errors.projects.adminProjectDetail = payload;
    })
    .addCase(actionLeaveGetAdminProjectDetail, (state) => {
      state.adminProjectDetail = {};
      state.errors.projects.adminProjectDetail = undefined;
    })

    // actionPutRejectProject
    .addCase(actionPutRejectProject.rejected, (state, action) => {
      const payload = action.payload as any;
      state.errors.projects.rejectProject = payload?.error?.message;
    })
    .addCase(actionLeavePutRejectProject, (state) => {
      state.errors.projects.rejectProject = undefined;
    })

    // actionPutApproveOrganisation
    .addCase(actionPutApproveProject.rejected, (state, action) => {
      const payload = action.payload as any;
      state.errors.projects.approveProject = payload?.error?.message;
    })
    .addCase(actionLeavePutApproveProject, (state) => {
      state.errors.projects.approveProject = undefined;
    })

    // actionGetProjectList
    .addCase(actionGetStatisticsAccess.fulfilled, (state, action) => {
      state.statisticsAccess = action.payload;
    })
    .addCase(actionGetStatisticsAccess.rejected, (state) => {
      state.statisticsAccess = [];
    })
    .addCase(actionLeaveGetStatisticsAccess, (state) => {
      state.statisticsAccess = [];
    });
});
