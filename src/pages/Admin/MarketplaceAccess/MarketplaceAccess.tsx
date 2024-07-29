import React, { useEffect, useState } from 'react';
import './MarketplaceAccess.scss';
import { Button, TablePaginationConfig, Tag, Typography } from 'antd';
import { PAGINATES, ROLES, STATUS } from '../../../config';
import moment from 'moment';
import { AdminMenu } from '../../../Components/Shared';
import { AuthWrapper } from '../../Global';
import { useAppDispatch, useAppSelector } from '../../../store';
import { selectorGetUser } from '../../../store/Auth/selectors';
import Table, { ColumnsType } from 'antd/es/table';
import { useSelector } from 'react-redux';
import { selectorGetMarketplaceAccessList } from '../../../store/MarketplaceAccess/selectors';
import { marketplaceAccessService } from '../../../services/MarketplaceAccess/marketplaceAccess.service';
import RequestAccessModal from '../../../Components/Modals/RequestAccessModal/RequestAccessModal';
import { Link as LinkRouter } from 'react-router-dom';
import { appPaths } from '../../../constants';
import { capitalize, filter, find, isEmpty, map, startCase, uniq } from 'lodash';
import { IGetMarketplaceAccessListParams } from '../../../requests/MarketplaceAccess/MarketplaceAccess.type';
import { actionGetUsersByKeys, actionLeaveGetUsersByKeys } from '../../../store/Users/actions';
import { selectorGetUsersByKeys } from '../../../store/Users/selectors';
import {
  actionGetOrgsByKeys,
  actionLeaveGetOrgsByKeys
} from '../../../store/Organizations/actions';
import { selectorGetOrgsByKeys } from '../../../store/Organizations/selectors';
const { Link } = Typography;

export const MarketplaceAccess: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectorGetUser);
  const adminUsersList = useSelector(selectorGetMarketplaceAccessList);
  const { handleGetMarketplaceAccessRequest, handleApproveRequest, handleRejectRequest } =
    marketplaceAccessService();
  const [isShowModalRequest, setIsShowModalRequest] = useState(false);
  const [loadingApprove, setLoadingApprove] = useState<boolean>(false);
  const [loadingReject, setLoadingReject] = useState<boolean>(false);

  const listDonors = useAppSelector(selectorGetUsersByKeys);
  const listDOrgs = useAppSelector(selectorGetOrgsByKeys);

  const [requestDataAccess, setRequestDataAccess] = useState<any>({});

  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: PAGINATES.marketplaceAccess.pageSize
  });

  useEffect(() => {
    if (!adminUsersList?.total_count) return;
    setPagination((prevPagination) => ({
      ...prevPagination,
      total: adminUsersList?.total_count
    }));
  }, [adminUsersList]);

  const fetchListDonors = async (keys: string) => {
    dispatch(
      actionGetUsersByKeys({
        params: {
          keys
        }
      })
    );
    return dispatch(actionLeaveGetUsersByKeys());
  };

  const fetchListOrgs = async (keys: string) => {
    dispatch(
      actionGetOrgsByKeys({
        params: {
          keys
        }
      })
    );
    return dispatch(actionLeaveGetOrgsByKeys());
  };

  useEffect(() => {
    if (!isEmpty(adminUsersList.items)) {
      let _keysOrgs: any = filter(adminUsersList.items, (item: any) => {
        return item?.user_role === ROLES.ORG;
      });
      _keysOrgs = uniq(
        map(_keysOrgs, (item: any) => {
          return item.organization_key;
        })
      )?.toString();
      if (_keysOrgs) {
        fetchListOrgs(_keysOrgs);
      }

      let _keysDonors: any = filter(adminUsersList.items, (item: any) => {
        return item?.user_role === ROLES.DONOR;
      });
      _keysDonors = uniq(
        map(_keysDonors, (item: any) => {
          return item.user_key;
        })
      )?.toString();
      if (_keysDonors) {
        fetchListDonors(_keysDonors);
      }
    }
  }, [adminUsersList]);

  const handleApprove = async (key: string) => {
    setLoadingApprove(true);
    await handleApproveRequest(key, fetchData);
    setLoadingApprove(false);
  };

  const handleReject = async (key: string) => {
    setLoadingReject(true);
    await handleRejectRequest(key, fetchData);
    setLoadingReject(false);
  };

  interface DataType {
    key: string;
    user_role?: string;
    organization_key?: string;
    user_key?: string;
    marketplace: string;
    status: string;
    created: string;
    modified: string;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'Entity',
      dataIndex: 'organization_key',
      key: 'organization_key',
      render: (_, record) => {
        return record?.user_role === ROLES.ORG ? (
          <LinkRouter
            to={appPaths.adminOrganisationsDetail.path.replace(
              ':key',
              record?.organization_key || ''
            )}>
            <Link>
              {find(listDOrgs, (item: any) => record?.organization_key?.toLowerCase() === item?.key)
                ?.organization_name || record?.organization_key}
            </Link>
          </LinkRouter>
        ) : (
          find(listDonors, (item: any) => record?.user_key?.toLowerCase() === item?.key)?.name
        );
      }
    },
    {
      title: 'Marketplace',
      key: 'marketplace',
      dataIndex: 'marketplace',
      render: (marketplace: string) => {
        return <>{startCase(marketplace.replace('_', ' ').toLowerCase())}</>;
      }
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      ellipsis: true,
      render: (_, record) => {
        return <>{record?.user_role}</>;
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        switch (status) {
          case STATUS.PENDING:
            return <Tag color="processing">{capitalize(status)}</Tag>;

          case STATUS.REJECTED:
            return <Tag color="error">{capitalize(status)}</Tag>;

          case STATUS.PENDING_REVIEW:
            return <Tag color="warning">{capitalize(status).replace('_', ' ')}</Tag>;

          default:
            return <Tag color="success">{capitalize(status)}</Tag>;
        }
      }
    },
    {
      title: 'Created',
      key: 'created',
      render: (_, record) => {
        const time = moment(record?.created).local().format('DD-MM-YYYY HH:mm:ss');
        return time;
      }
    },
    {
      title: 'Action',
      key: '',
      render: (_, record) => {
        return record?.status === STATUS.PENDING ? (
          user?.role === ROLES.ADMIN ? (
            <div>
              <Button
                type="primary"
                onClick={() => handleApprove(record.key)}
                loading={loadingApprove}>
                Approve
              </Button>
              &nbsp;&nbsp;
              <Button
                type="primary"
                danger
                onClick={() => handleReject(record.key)}
                loading={loadingReject}>
                Reject
              </Button>
            </div>
          ) : (
            <></>
          )
        ) : (
          ''
        );
      }
    }
  ];

  const fetchMarketplaceRequest = async ({
    page_index,
    sort_created,
    filter_organization_key
  }: IGetMarketplaceAccessListParams) => {
    handleGetMarketplaceAccessRequest({ page_index, sort_created, filter_organization_key });
  };

  useEffect(() => {
    if (!user?.loaded || user?.role === ROLES.DONOR) return;
    fetchMarketplaceRequest({
      page_index: pagination.current,
      filter_organization_key: user?.organization_key
    });
  }, [user, pagination.current]);

  const fetchData = () => {
    fetchMarketplaceRequest({
      page_index: pagination.current,
      filter_organization_key: user?.organization_key
    });
  };

  return (
    <AuthWrapper role={[ROLES.ADMIN, ROLES.ORG, ROLES.DONOR]}>
      <div className="admin-marketplace-access">
        <div className="container">
          <AdminMenu />
          {user?.role !== ROLES.DONOR && <h1 className="title">Marketplace Access List</h1>}
          {(user?.role === ROLES.ORG || user?.role === ROLES.DONOR) && (
            <div className="top-buttons">
              <Button
                danger
                size="small"
                onClick={() => {
                  setRequestDataAccess({ user_key: user?.key, org_key: user?.organization_key });
                  setIsShowModalRequest(true);
                }}>
                Request Access
              </Button>
            </div>
          )}
          {user?.role !== ROLES.DONOR && (
            <div className="project-list">
              <Table
                columns={columns}
                dataSource={adminUsersList?.items}
                bordered
                size="middle"
                pagination={pagination}
                onChange={(pagination) => {
                  setPagination(pagination);
                }}
              />
            </div>
          )}
          {isShowModalRequest && (
            <RequestAccessModal
              onClose={() => setIsShowModalRequest(false)}
              fetchData={fetchData}
              requestData={requestDataAccess}
            />
          )}
        </div>
      </div>
    </AuthWrapper>
  );
};
