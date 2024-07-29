import React, { useEffect, useState } from 'react';
import './Organisations.scss';
import { organisationService } from '../../../services';
import { selectorAdminGetOrganizationsList } from '../../../store/Organizations/selectors';
import { useSelector } from 'react-redux';
import { capitalize, replace, startCase } from 'lodash';

import { Button, Flex, Table, Tag } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { Link } from 'react-router-dom';
import { appPaths } from '../../../constants';
import { PAGINATES, ROLES, STATUS, TYPE_MARKETPLACES } from '../../../config';
import { IAdminGetOrganisationsListParams } from '../../../requests/Organizations/OrganizationsRequest.type';
import { AuthWrapper } from '../../Global';
import { useAppSelector } from '../../../store';
import { selectorGetUser } from '../../../store/Auth/selectors';
import { AdminMenu } from '../../../Components/Shared';
import RequestAccessModal from '../../../Components/Modals/RequestAccessModal/RequestAccessModal';

export const Organisations: React.FC = () => {
  const user = useAppSelector(selectorGetUser);
  const { handleAdminGetOrganisationsList } = organisationService();
  const adminOrganisationList = useSelector(selectorAdminGetOrganizationsList);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: PAGINATES.organisations.adminOrgianisationList.pageSize
  });

  const [showMarketplace, setShowMarketplaces] = useState(false);
  const [isShowModalRequest, setIsShowModalRequest] = useState(false);
  const [requestDataAccess, setRequestDataAccess] = useState<any>({});

  interface DataType {
    key: string;
    name: string;
    description: string;
    address: string;
    status: string;
    marketplace: string;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'organization_name',
      key: 'name',
      ellipsis: true
    },
    {
      title: 'Description',
      dataIndex: 'brief_organization_overview',
      key: 'description',
      ellipsis: true
    },
    {
      title: 'Head Email',
      dataIndex: 'head_email',
      key: 'email',
      ellipsis: true
    },
    {
      title: 'Wallet Address',
      dataIndex: 'digital_wallet_address',
      key: 'address',
      ellipsis: true
    },
    {
      title: 'Marketplace',
      dataIndex: 'marketplace',
      key: 'marketplace',
      render: (marketplace: string) => {
        return <>{startCase(marketplace?.replace('_', ' ').toLowerCase())}</>;
      }
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
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
      title: 'Action',
      key: 'action',
      width: 270,
      render: (_, record) => (
        <Flex gap={5}>
          <Link to={replace(appPaths.adminOrganisationsDetail.path, ':key', record?.key)}>
            <Button type="primary">Details</Button>
          </Link>
          <Link to={replace(appPaths.organisationDocs.path, ':key', record?.key)}>
            <Button type="primary">Docs</Button>
          </Link>
          <Button
            danger
            onClick={() => {
              setRequestDataAccess({ org_key: record?.key });
              setIsShowModalRequest(true);
            }}>
            Add Access
          </Button>
        </Flex>
      )
    }
  ];

  const fetchOrganisationsList = async ({
    page_index,
    sort_created
  }: IAdminGetOrganisationsListParams) => {
    handleAdminGetOrganisationsList({ page_index, sort_created });
  };

  useEffect(() => {
    if (!user?.loaded) return;
    fetchOrganisationsList({
      page_index: pagination.current
    });
  }, [user, pagination.current]);

  useEffect(() => {
    if (!adminOrganisationList?.total_count) return;
    setPagination((prevPagination) => ({
      ...prevPagination,
      total: adminOrganisationList?.total_count
    }));
  }, [adminOrganisationList]);

  return (
    <AuthWrapper role={[ROLES.ADMIN]}>
      <div className="admin-organisations">
        <div className="container">
          <AdminMenu />
          <h1 className="title">Organisations List</h1>
          <div className="top-buttons">
            <Button
              danger
              size="small"
              onClick={() => {
                setShowMarketplaces(true);
              }}>
              Create Organisation
            </Button>
          </div>
          {showMarketplace && (
            <div className="options-marketplace">
              {TYPE_MARKETPLACES.map((item: any, index) => (
                <Link
                  to={appPaths.dueDiligenceForm.path.replace(':marketplace', item.value)}
                  key={index}>
                  <Button type="primary" onClick={() => setShowMarketplaces(true)}>
                    {item.label}
                  </Button>
                </Link>
              ))}
            </div>
          )}
          <div className="organisation-list">
            <Table
              columns={columns}
              dataSource={adminOrganisationList?.items}
              bordered
              size="middle"
              pagination={pagination}
              onChange={(pagination) => {
                setPagination(pagination);
              }}
            />
          </div>
          {isShowModalRequest && (
            <RequestAccessModal
              onClose={() => setIsShowModalRequest(false)}
              requestData={requestDataAccess}
            />
          )}
        </div>
      </div>
    </AuthWrapper>
  );
};
