import {
  actionAdminGetOrganizationsList,
  actionGetAdminOrganisationDetail,
  actionGetDonorRequest,
  actionGetOrganisationAdditional,
  actionGetOrganisationDocuments,
  actionLeaveAdminGetOrganisationsDetail,
  actionLeaveAdminGetOrganizationsList,
  actionLeaveGetDonorRequest,
  actionLeaveGetOrganisationAdditional,
  actionLeaveGetOrganisationDocuments,
  actionLeavePostApproveDonorRequest,
  actionLeavePostCreateOrganisation,
  actionLeavePostDonorRequestAdditional,
  actionLeavePostRejectDonorRequest,
  actionLeavePutApproveOrganisation,
  actionLeavePutEditOrganization,
  actionLeavePutOrganisationDocument,
  actionLeavePutRejectOrganisation,
  actionPostApproveDonorRequest,
  actionPostDonorRequestAdditional,
  actionPostRejectDonorRequest,
  actionPutApproveOrganisation,
  actionPutEditOrganization,
  actionPutOrganisationDocument,
  actionPutRejectOrganisation
} from '../../store/Organizations/actions';
import { useState } from 'react';
import { useAppDispatch } from '../../store';
import { actionPostCreateOrganisation } from '../../store/Organizations/actions';
import { IPostCreateOrganisationParams } from './organisation.service.type';
import { PAGINATES, TOAST_MESSAGES } from '../../config';
import {
  IAdminGetOrganisationsListParams,
  IGetDonorRequestParams,
  IGetOrganisationAdditionalParams,
  IGetOrganisationDocuments,
  IPutEditOrganization,
  IPutOrganisationDocument
} from '../../requests/Organizations/OrganizationsRequest.type';
import { useNavigate } from 'react-router-dom';
import { appPaths } from '../../constants';
import { message, Modal } from 'antd';
import { replace } from 'lodash';
import { MarketPlaces } from '../../Components/UI/Button/enums';

export const organisationService = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [createOrganisationSuccess, setCreateOrganisationSuccess] = useState(false);

  const handleAdminGetOrganisationsList = async ({
    page_index,
    sort_created
  }: IAdminGetOrganisationsListParams) => {
    dispatch(
      actionAdminGetOrganizationsList({
        params: {
          page_size: PAGINATES.organisations.adminOrgianisationList.pageSize,
          page_index: page_index ?? 1,
          sort_created: sort_created ?? 'desc'
        }
      })
    );

    return dispatch(actionLeaveAdminGetOrganizationsList());
  };

  const handleAdminGetOrganisationsDetail = async (key: string) => {
    dispatch(actionGetAdminOrganisationDetail({ key }));

    return dispatch(actionLeaveAdminGetOrganisationsDetail());
  };

  const handleCreateOrganisation = async ({
    params,
    setSubmitting
  }: IPostCreateOrganisationParams) => {
    const modalTitle = params.marketplace === MarketPlaces.MEXICO ? 'Éxito' : 'Success';
    const modalContent =
      params.marketplace === MarketPlaces.MEXICO
        ? TOAST_MESSAGES.organisation.create_organisation_success_mexico
        : TOAST_MESSAGES.organisation.create_organisation_success;
    dispatch(
      actionPostCreateOrganisation({
        params,
        callback: (isSuccess) => {
          if (isSuccess) {
            setCreateOrganisationSuccess(true);
            setSubmitting(false);
            Modal.success({
              title: modalTitle,
              content: modalContent,
              onOk: () => {
                navigate(appPaths.home.path);
              }
            });
          }
          setSubmitting(false);
        }
      })
    );
    return dispatch(actionLeavePostCreateOrganisation());
  };

  const handleEditOrganization = async (params: IPutEditOrganization) => {
    dispatch(
      actionPutEditOrganization({
        params,
        callback: (isSuccess) => {
          if (isSuccess) {
            const orgDetailLink = `${replace(
              appPaths.adminOrganisationsDetail.path,
              ':key',
              params?.key
            )}`;
            Modal.success({
              title: 'Success',
              content: TOAST_MESSAGES.organisation.edit_organization_success,
              onOk: () => {
                navigate(orgDetailLink);
              }
            });
          }
        }
      })
    );
    return dispatch(actionLeavePutEditOrganization());
  };

  const handleApproveOrganisation = async (key: string) => {
    dispatch(
      actionPutApproveOrganisation({
        key,
        callback: (isSuccess) => {
          if (isSuccess) {
            navigate(appPaths.adminOrganisations.path);
            message.success('Approve organisation successfully');
          }
        }
      })
    );
    return dispatch(actionLeavePutApproveOrganisation());
  };

  const handleRejectOrganisation = async (key: string) => {
    dispatch(
      actionPutRejectOrganisation({
        key,
        callback: (isSuccess) => {
          if (isSuccess) {
            navigate(appPaths.adminOrganisations.path);
            message.success('Reject organisation successfully');
          }
        }
      })
    );
    return dispatch(actionLeavePutRejectOrganisation());
  };

  const handleGetDonorRequest = async ({
    page_index,
    sort_created,
    organization_key
  }: IGetDonorRequestParams) => {
    dispatch(
      actionGetDonorRequest({
        params: {
          page_size: PAGINATES.organisations.donorRequest.pageSize,
          page_index: page_index ?? 1,
          sort_created: sort_created ?? 'desc',
          organization_key: organization_key ?? ''
        }
      })
    );

    return dispatch(actionLeaveGetDonorRequest());
  };

  const handleApproveDonorRequest = async ({
    key,
    onRefresh
  }: {
    key: string;
    onRefresh: () => void;
  }) => {
    dispatch(
      actionPostApproveDonorRequest({
        key,
        callback: (isSuccess) => {
          if (isSuccess) {
            message.success(TOAST_MESSAGES.donor.approve_donor_request_success);
            onRefresh();
          }
        }
      })
    );
    return dispatch(actionLeavePostApproveDonorRequest());
  };

  const handleRejectDonorRequest = async ({
    key,
    onRefresh
  }: {
    key: string;
    onRefresh: () => void;
  }) => {
    dispatch(
      actionPostRejectDonorRequest({
        key,
        callback: (isSuccess) => {
          if (isSuccess) {
            message.success(TOAST_MESSAGES.donor.reject_donor_request_success);
            onRefresh();
          }
        }
      })
    );
    return dispatch(actionLeavePostRejectDonorRequest());
  };

  const handleDonorRequestAdditional = async ({
    key,
    onSuccess
  }: {
    key: string;
    onSuccess: () => void;
  }) => {
    dispatch(
      actionPostDonorRequestAdditional({
        key,
        callback: (isSuccess) => {
          if (isSuccess) {
            onSuccess();
          }
        }
      })
    );
    return dispatch(actionLeavePostDonorRequestAdditional());
  };

  const handleGetOrganisationAdditional = async (params: IGetOrganisationAdditionalParams) => {
    dispatch(actionGetOrganisationAdditional({ params }));
    return dispatch(actionLeaveGetOrganisationAdditional());
  };

  const handleGetOrganisationDocuments = async (params: IGetOrganisationDocuments) => {
    dispatch(actionGetOrganisationDocuments({ params }));
    return dispatch(actionLeaveGetOrganisationDocuments());
  };

  const handleUpdateOrganisationDocument = async (params: IPutOrganisationDocument) => {
    dispatch(
      actionPutOrganisationDocument({
        params,
        callback: (isSuccess) => {
          // if (isSuccess) {
          //   const orgDetailLink = `${replace(
          //     appPaths.adminOrganisationsDetail.path,
          //     ':key',
          //     params?.key
          //   )}`;
          //   message.success(TOAST_MESSAGES.organisation.edit_organization_success);
          //   navigate(orgDetailLink);
          // }
        }
      })
    );
    return dispatch(actionLeavePutOrganisationDocument());
  };

  return {
    handleCreateOrganisation,
    createOrganisationSuccess,
    handleAdminGetOrganisationsList,
    handleAdminGetOrganisationsDetail,
    handleApproveOrganisation,
    handleRejectOrganisation,
    handleGetDonorRequest,
    handleApproveDonorRequest,
    handleRejectDonorRequest,
    handleDonorRequestAdditional,
    handleGetOrganisationAdditional,
    handleEditOrganization,
    handleGetOrganisationDocuments,
    handleUpdateOrganisationDocument
  };
};
