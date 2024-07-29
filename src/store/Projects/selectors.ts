import { RootState } from '..';

export const selectorGetProjectsList = (state: RootState) => state.projects.projects;
export const selectorGetProjectDetail = (state: RootState) => state.projects.projectDetail;
export const selectorGetRelatedProjects = (state: RootState) => state.projects.relatedProjects;
export const selectorGetOperaAddress = (state: RootState) => state.projects.operatorAddress;
export const selectorPostPaymentProject = (state: RootState) => state.projects.fundProject;
export const selectorAdminGetProjectsList = (state: RootState) => state.projects.adminProjects;
export const selectorAdminGetProjectDetail = (state: RootState) =>
  state.projects.adminProjectDetail;
export const selectorGetStatisticsAccess = (state: RootState) => state.projects.statisticsAccess;

// errors
export const selectorPostProposeProjectErrors = (state: RootState) =>
  state.projects.errors.projects.proposeProject;
export const selectorPutAdminProjectErrors = (state: RootState) =>
  state.projects.errors.projects.putAdminProject;
export const selectorGetAdminProjectDetailErrors = (state: RootState) =>
  state.projects.errors.projects.adminProjectDetail;
export const selectorPutApproveProjectErrors = (state: RootState) =>
  state.projects.errors.projects.approveProject;
export const selectorPutRejectProjectErrors = (state: RootState) =>
  state.projects.errors.projects.rejectProject;
export const selectorPostPaymentProjectErrors = (state: RootState) =>
  state.projects.errors.projects.fundProject;
