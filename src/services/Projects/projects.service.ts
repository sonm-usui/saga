import {
  actionGetAdminProjectDetail,
  actionLeaveGetAdminProjectDetail,
  actionLeavePutApproveProject,
  actionLeavePutRejectProject,
  actionPutApproveProject,
  actionPutRejectProject
} from '../../store/Projects/actions';
import { useAppDispatch } from '../../store';
import { PAGINATES } from '../../config';
import { useNavigate } from 'react-router-dom';
import { appPaths } from '../../constants';
import { message } from 'antd';
import { IAdminGetProjectsListParams } from '../../requests/Projects/ProjectsRequest.type';
import {
  actionAdminGetProjectsList,
  actionLeaveGetAdminProjectsList
} from '../../store/Projects/actions';

export const projectsService = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleAdminGetProjectsList = async ({
    page_index,
    sort_created,
    filter_organization_key
  }: IAdminGetProjectsListParams) => {
    dispatch(
      actionAdminGetProjectsList({
        params: {
          page_size: PAGINATES.projects.adminProjectsList.pageSize,
          page_index: page_index ?? 1,
          sort_created: sort_created ?? 'desc',
          filter_organization_key: filter_organization_key ?? ''
        }
      })
    );

    return dispatch(actionLeaveGetAdminProjectsList());
  };

  const handleAdminGetProjectDetail = async (key: string) => {
    dispatch(actionGetAdminProjectDetail({ key }));

    return dispatch(actionLeaveGetAdminProjectDetail());
  };

  const handleApproveProject = async (key: string) => {
    dispatch(
      actionPutApproveProject({
        key,
        callback: (isSuccess) => {
          if (isSuccess) {
            navigate(appPaths.adminProjects.path);
            message.success('Approve project successfully');
          }
        }
      })
    );
    return dispatch(actionLeavePutApproveProject());
  };

  const handleRejectProject = async (key: string) => {
    dispatch(
      actionPutRejectProject({
        key,
        callback: (isSuccess) => {
          if (isSuccess) {
            navigate(appPaths.adminProjects.path);
            message.success('Reject project successfully');
          }
        }
      })
    );
    return dispatch(actionLeavePutRejectProject());
  };

  return {
    handleAdminGetProjectsList,
    handleAdminGetProjectDetail,
    handleApproveProject,
    handleRejectProject
  };
};
