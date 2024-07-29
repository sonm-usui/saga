import { useAppDispatch } from '../../store';
import { useNavigate } from 'react-router-dom';
import { appPaths } from '../../constants';
import { message } from 'antd';
import {
  actionAdminCreateUser,
  actionGetAdminUsersList,
  actionLeaveAdminCreateUser,
  actionLeaveGetAdminUsersList,
  actionLeaveGetAdminUsersExportCsv,
  actionGetAdminUsersExportCsv,
  actionGetAdminUsersImportCsv,
  actionLeaveGetAdminUsersImportCsv
} from '../../store/Users/actions';
import {
  IAdminCreateUserParams,
  IGetAdminUsersListParams
} from '../../requests/Users/UsersRequest.type';
import { PAGINATES, TOAST_MESSAGES } from '../../config';
import { useState } from 'react';

export const usersService = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loadingExportCsv, setLoadingExportCsv] = useState(false);
  const [loadingImportCsv, setLoadingImportCsv] = useState(false);

  const handleCreateUser = async ({
    params,
    setSubmitting,
    resetForm
  }: {
    params: IAdminCreateUserParams;
    setSubmitting: (isSubmitting: boolean) => void;
    resetForm: () => void;
  }) => {
    dispatch(
      actionAdminCreateUser({
        params,
        callback: (isSuccess) => {
          if (isSuccess) {
            navigate(appPaths.adminDonorsList.path);
            message.success(TOAST_MESSAGES.users.create_donor_success);
            setSubmitting(false);
            resetForm();
          }
          setSubmitting(false);
        }
      })
    );
    return dispatch(actionLeaveAdminCreateUser());
  };

  const handleGetAdminUsersList = async ({
    page_index,
    sort_created,
    filter_role
  }: IGetAdminUsersListParams) => {
    dispatch(
      actionGetAdminUsersList({
        params: {
          page_size: PAGINATES.users.adminUsersList.pageSize,
          page_index: page_index ?? 1,
          sort_created: sort_created ?? 'desc',
          filter_role: filter_role ?? ''
        }
      })
    );

    return dispatch(actionLeaveGetAdminUsersList());
  };

  const handlePostAdminUserExportCsv = async () => {
    setLoadingExportCsv(true);
    dispatch(
      actionGetAdminUsersExportCsv({
        callback: (isSuccess) => {
          if (isSuccess) {
            setLoadingExportCsv(false);
          }
          setLoadingExportCsv(false);
        }
      })
    );
    return dispatch(actionLeaveGetAdminUsersExportCsv());
  };

  const handlePostAdminUserImportCsv = async (file: File) => {
    setLoadingImportCsv(true);
    dispatch(
      actionGetAdminUsersImportCsv({
        file,
        callback: (isSuccess) => {
          if (isSuccess) {
            setLoadingImportCsv(false);
          }
          setLoadingImportCsv(false);
        }
      })
    );
    return dispatch(actionLeaveGetAdminUsersImportCsv());
  };

  return {
    handleCreateUser,
    handleGetAdminUsersList,
    handlePostAdminUserExportCsv,
    loadingExportCsv,
    handlePostAdminUserImportCsv,
    loadingImportCsv
  };
};
