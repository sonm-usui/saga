import React, { useEffect, useState } from 'react';
import './DonorRequest.scss';
import { organisationService } from '../../../services';
import {
  selectorGetDonorRequest,
  selectorPostApproveDonorRequestErrors,
  selectorPostRejectDonorRequestErrors
} from '../../../store/Organizations/selectors';
import { useSelector } from 'react-redux';
import { capitalize } from 'lodash';

import { Button, Space, Table, Tag, message } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { PAGINATES, ROLES, STATUS } from '../../../config';
import { IGetDonorRequestParams } from '../../../requests/Organizations/OrganizationsRequest.type';
import { AuthWrapper } from '../../Global';
import { useAppSelector } from '../../../store';
import { selectorGetUser } from '../../../store/Auth/selectors';
import { AdminMenu } from '../../../Components/Shared';
import moment from 'moment';

export const DonorRequest: React.FC = () => {
  const user = useAppSelector(selectorGetUser);
  const { handleGetDonorRequest, handleApproveDonorRequest, handleRejectDonorRequest } =
    organisationService();
  const donorRequest = useSelector(selectorGetDonorRequest);
  const approveDonorRequestErrors = useSelector(selectorPostApproveDonorRequestErrors);
  const rejectDonorRequestErrors = useSelector(selectorPostRejectDonorRequestErrors);
  const [loadingApprove, setLoadingApprove] = useState<boolean>(false);
  const [loadingReject, setLoadingReject] = useState<boolean>(false);

  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: PAGINATES.organisations.adminOrgianisationList.pageSize
  });

  interface DataType {
    key: string;
    created: string;
    name: string;
    email: string;
    address: string;
    status: string;
    organization_name: string;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'Donor Name',
      dataIndex: 'request_user_name',
      key: 'name',
      ellipsis: true
    },
    {
      title: 'Donor Email',
      dataIndex: 'request_user_email',
      key: 'email',
      ellipsis: true
    },
    {
      title: 'Donor Address',
      dataIndex: 'address',
      key: 'address',
      ellipsis: true
    },
    {
      title: 'Organization Name',
      dataIndex: 'organization_name',
      key: 'organization_name',
      ellipsis: true
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      width: 100,
      render: (status: string) => {
        switch (status) {
          case STATUS.PENDING:
            return <Tag color="processing">{capitalize(status)}</Tag>;

          case STATUS.PENDING_REVIEW:
            return <Tag color="warning">{capitalize(status).replace('_', ' ')}</Tag>;

          case STATUS.REJECTED:
            return <Tag color="error">{capitalize(status)}</Tag>;

          default:
            return <Tag color="success">{capitalize(status)}</Tag>;
        }
      }
    },
    {
      title: 'Created',
      dataIndex: 'created',
      key: 'created',
      ellipsis: true,
      render: (time: string) => {
        return moment(time).local().format('DD-MM-YYYY HH:mm:ss');
      }
    },
    {
      title: 'Action',
      key: 'action',
      width: 200,
      render: (_, record) => {
        if (record.status !== STATUS.PENDING) return null;
        return (
          <Space size="small">
            <Button
              type="primary"
              onClick={() =>
                approveDonorRequest({ key: record.key, onRefresh: onRefreshDonorRequest })
              }
              loading={loadingApprove}>
              Approve
            </Button>
            <Button
              type="primary"
              danger
              onClick={() =>
                rejectDonorRequest({ key: record.key, onRefresh: onRefreshDonorRequest })
              }
              loading={loadingReject}>
              Reject
            </Button>
          </Space>
        );
      }
    }
  ];

  const fetchDonorRequest = async ({
    page_index,
    sort_created,
    organization_key
  }: IGetDonorRequestParams) => {
    handleGetDonorRequest({ page_index, sort_created, organization_key });
  };

  const approveDonorRequest = async ({
    key,
    onRefresh
  }: {
    key: string;
    onRefresh: () => void;
  }) => {
    if (!key) return;
    setLoadingApprove(true);
    await handleApproveDonorRequest({ key, onRefresh });
    setLoadingApprove(false);
  };

  const rejectDonorRequest = async ({ key, onRefresh }: { key: string; onRefresh: () => void }) => {
    if (!key) return;
    setLoadingReject(true);
    await handleRejectDonorRequest({ key, onRefresh });
    setLoadingReject(false);
  };

  const onRefreshDonorRequest = () => {
    fetchDonorRequest({
      page_index: pagination.current,
      organization_key: user?.organization_key
    });
  };

  useEffect(() => {
    if (!user?.loaded || !user?.organization_key) return;
    fetchDonorRequest({
      page_index: pagination.current,
      organization_key: user?.organization_key
    });
  }, [user, pagination.current]);

  useEffect(() => {
    if (!donorRequest?.total_count) return;
    setPagination((prevPagination) => ({
      ...prevPagination,
      total: donorRequest?.total_count
    }));
  }, [donorRequest]);

  useEffect(() => {
    if (!approveDonorRequestErrors) return;
    message.error(approveDonorRequestErrors);
  }, [approveDonorRequestErrors]);

  useEffect(() => {
    if (!rejectDonorRequestErrors) return;
    message.error(rejectDonorRequestErrors);
  }, [rejectDonorRequestErrors]);

  return (
    <AuthWrapper role={[ROLES.ORG]}>
      <div className="admin-organisations">
        <div className="container">
          <AdminMenu />
          <h1 className="title">Donor Request</h1>
          <div className="organisation-list">
            <Table
              columns={columns}
              dataSource={donorRequest?.items}
              bordered
              size="middle"
              pagination={pagination}
              onChange={(pagination) => {
                setPagination(pagination);
              }}
            />
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
};
