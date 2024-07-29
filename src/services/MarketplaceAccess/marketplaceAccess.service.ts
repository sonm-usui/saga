import { useAppDispatch } from '../../store';
import { actionLeaveGetAdminUsersList } from '../../store/Users/actions';
import { PAGINATES, TOAST_MESSAGES } from '../../config';
import {
  actionGetListMarketplaceApprove,
  actionGetListOptions,
  actionGetMarketplaceAccessList,
  actionLeaveGetListMarketplaceApprove,
  actionLeaveGetListOptions,
  actionLeavePutApproveRequest,
  actionLeavePutRejectRequest,
  actionLeaveRequestAccess,
  actionPutApproveRequest,
  actionPutRejectRequest,
  actionRequestAccess
} from '../../store/MarketplaceAccess/actions';
import {
  IGetMarketplaceAccessListParams,
  IPostRequestAccessParams
} from '../../requests/MarketplaceAccess/MarketplaceAccess.type';
import { message } from 'antd';

export const marketplaceAccessService = () => {
  const dispatch = useAppDispatch();

  const handleGetMarketplaceAccessRequest = async ({
    page_index,
    sort_created,
    filter_organization_key
  }: IGetMarketplaceAccessListParams) => {
    dispatch(
      actionGetMarketplaceAccessList({
        params: {
          page_size: PAGINATES.marketplaceAccess.pageSize,
          page_index: page_index ?? 1,
          sort_created: sort_created ?? 'desc',
          filter_organization_key: filter_organization_key
        }
      })
    );

    return dispatch(actionLeaveGetAdminUsersList());
  };

  const handleRequestAccess = async ({
    params,
    setSubmitting,
    resetForm,
    onClose,
    fetchData
  }: {
    params: IPostRequestAccessParams;
    setSubmitting: (isSubmitting: boolean) => void;
    resetForm: () => void;
    onClose: () => void;
    fetchData?: () => void;
  }) => {
    dispatch(
      actionRequestAccess({
        params,
        callback: (isSuccess) => {
          if (isSuccess) {
            // navigate(appPaths.adminDonorsList.path);
            message.success(TOAST_MESSAGES.users.create_request_access_success);
            setSubmitting(false);
            resetForm();
            onClose();
            fetchData && fetchData();
          }
          setSubmitting(false);
        }
      })
    );
    return dispatch(actionLeaveRequestAccess());
  };

  const getListOptionsByUser = async (requestData: any) => {
    dispatch(actionGetListOptions({ params: requestData }));
    return dispatch(actionLeaveGetListOptions());
  };

  const getListMarketplaceApprove = async () => {
    dispatch(actionGetListMarketplaceApprove({ params: {} }));
    return dispatch(actionLeaveGetListMarketplaceApprove());
  };

  const handleApproveRequest = async (key: string, fetchData: () => void) => {
    dispatch(
      actionPutApproveRequest({
        key,
        callback: (isSuccess) => {
          if (isSuccess) {
            message.success('Approve request access successfully');
            fetchData();
          }
        }
      })
    );
    return dispatch(actionLeavePutApproveRequest());
  };

  const handleRejectRequest = async (key: string, fetchData: () => void) => {
    dispatch(
      actionPutRejectRequest({
        key,
        callback: (isSuccess) => {
          if (isSuccess) {
            message.success('Reject request access successfully');
            fetchData();
          }
        }
      })
    );
    return dispatch(actionLeavePutRejectRequest());
  };

  return {
    handleGetMarketplaceAccessRequest,
    handleRequestAccess,
    getListOptionsByUser,
    handleApproveRequest,
    handleRejectRequest,
    getListMarketplaceApprove
  };
};
