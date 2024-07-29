import React, { useEffect, useState } from 'react';
import './Projects.scss';
import { marketplaceAccessService, projectsService } from '../../../services';
import { selectorAdminGetProjectsList } from '../../../store/Projects/selectors';
import { useSelector } from 'react-redux';
import { capitalize, isEmpty, replace, startCase } from 'lodash';

import { Button, Space, Table, Tag } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { Link } from 'react-router-dom';
import { appPaths } from '../../../constants';
import { PAGINATES, ROLES, STATUS } from '../../../config';
import { IAdminGetProjectsListParams } from '../../../requests/Projects/ProjectsRequest.type';
import { AuthWrapper } from '../../Global';
import { useAppSelector } from '../../../store';
import { selectorGetUser } from '../../../store/Auth/selectors';
import { AdminMenu } from '../../../Components/Shared';
import { generatorEtherscanLink } from '../../../utils';
import { selectorGetListMarketplaceApprove } from '../../../store/MarketplaceAccess/selectors';
import { PlusOutlined } from '@ant-design/icons';
import { MarketplaceAccess } from '../MarketplaceAccess/MarketplaceAccess';
import { MarketPlaces } from '../../../Components/UI/Button/enums';
import AddTokenModal from '../../../Components/Modals/AddTokenModal/AddTokenModal';

export const Projects: React.FC = () => {
  const user = useAppSelector(selectorGetUser);
  const { handleAdminGetProjectsList } = projectsService();
  const adminProjectsList = useSelector(selectorAdminGetProjectsList);
  const [showMarketplace, setShowMarketplaces] = useState(false);

  const listMarketplace = useSelector(selectorGetListMarketplaceApprove);
  const { getListMarketplaceApprove } = marketplaceAccessService();

  const [showAddToken, setShowAddToken] = useState(false);
  const [projectSelect, setProjectSelect] = useState<any>();

  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: PAGINATES.projects.adminProjectsList.pageSize
  });

  interface onChainMetadata {
    fund_eth: string;
    funded_by: string;
    txn_hash: string;
  }

  interface DataType {
    key: string;
    name: string;
    description: string;
    address: string;
    marketplace: string;
    status: string;
    onchain_metadata: onChainMetadata;
    token_id?: any;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true
    },
    {
      title: 'Organisation',
      dataIndex: 'organization',
      key: 'organization.organization_name',
      render: (organization: any) => organization?.organization_name,
      ellipsis: true
    },
    {
      title: 'Description',
      dataIndex: 'description_english',
      key: 'description',
      ellipsis: true
    },
    {
      title: 'Project Type',
      dataIndex: 'type',
      key: 'type',
      ellipsis: true
    },
    {
      title: 'Wallet Address',
      dataIndex: 'onchain_metadata',
      key: 'address',
      ellipsis: true,
      render: (onchain_metadata: any) => {
        return onchain_metadata?.contract_address;
      }
    },
    {
      title: 'Marketplace',
      key: 'marketplace',
      dataIndex: 'marketplace',
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

          case STATUS.FUNDED:
            return <Tag color="volcano">{capitalize(status)}</Tag>;

          default:
            return <Tag color="success">{capitalize(status)}</Tag>;
        }
      }
    },
    {
      title: 'Token ID',
      dataIndex: 'token_id',
      key: 'token_id',
      width: 76,
      render: (_, record) => {
        return user?.role === ROLES.ADMIN &&
          (record?.marketplace === MarketPlaces.NRC_SUDAN ||
            record?.marketplace === MarketPlaces.PUBLIC) &&
          !record?.token_id &&
          record?.status === STATUS.APPROVED ? (
          <Button
            type="primary"
            onClick={() => {
              setShowAddToken(true);
              setProjectSelect(record);
            }}>
            <PlusOutlined />
          </Button>
        ) : (
          record?.token_id
        );
      }
    },
    {
      title: 'Action',
      key: 'action',
      width: 185,
      render: (_, record) => {
        const txHash = record?.onchain_metadata?.txn_hash;
        const txnDetailLink = generatorEtherscanLink({
          transactionHash: txHash
        });
        return (
          <Space size="middle">
            <Link to={replace(appPaths.adminProjectDetail.path, ':key', record?.key)}>
              <Button type="primary">View</Button>
            </Link>
            {txHash ? (
              <Link to={txnDetailLink} target="_blank" rel="noopener noreferrer">
                <Button danger>View TX</Button>
              </Link>
            ) : (
              <Button danger disabled>
                View TX
              </Button>
            )}
          </Space>
        );
      }
    }
  ];

  const fetchProjectsList = async ({
    page_index,
    sort_created,
    filter_organization_key
  }: IAdminGetProjectsListParams) => {
    handleAdminGetProjectsList({ page_index, sort_created, filter_organization_key });
  };

  useEffect(() => {
    if (!user?.loaded) return;
    fetchProjectsList({
      page_index: pagination.current,
      filter_organization_key: user?.role === ROLES.ORG ? user?.organization_key : undefined
    });
  }, [user, pagination.current]);

  useEffect(() => {
    if (!adminProjectsList?.total_count) return;
    setPagination((prevPagination) => ({
      ...prevPagination,
      total: adminProjectsList?.total_count
    }));
  }, [adminProjectsList]);

  useEffect(() => {
    if (user && user?.role === ROLES.ORG) {
      getListMarketplaceApprove();
    }
  }, [user]);

  return (
    <AuthWrapper role={[ROLES.ADMIN, ROLES.ORG]}>
      <div className="admin-projects">
        <div className="container">
          <AdminMenu />
          <h1 className="title">Projects List</h1>
          {user?.role === ROLES.ORG && (
            <div className="top-buttons">
              <Button
                danger
                size="small"
                onClick={() => {
                  setShowMarketplaces(true);
                }}>
                Create Project
              </Button>
            </div>
          )}
          {showMarketplace && listMarketplace && (
            <div className="options-marketplace">
              {!isEmpty(listMarketplace) ? (
                listMarketplace.map((item: any, index: number) => (
                  <Link
                    to={appPaths.proposeProject.path.replace(':marketplace', item.value)}
                    key={index}>
                    <Button type="primary" onClick={() => setShowMarketplaces(true)}>
                      {item.label}
                    </Button>
                  </Link>
                ))
              ) : (
                <div className="label-not-access">You do not have access to any marketplaces</div>
              )}
            </div>
          )}
          <div className="project-list">
            <Table
              columns={columns}
              dataSource={adminProjectsList?.items}
              bordered
              size="small"
              pagination={pagination}
              onChange={(pagination) => {
                setPagination(pagination);
              }}
            />
          </div>
        </div>
      </div>
      {showAddToken && (
        <AddTokenModal
          onClose={() => {
            setShowAddToken(false);
            setProjectSelect(undefined);
          }}
          projectDetail={projectSelect}
          fetchData={() =>
            fetchProjectsList({
              page_index: pagination.current,
              filter_organization_key: user?.role === ROLES.ORG ? user?.organization_key : undefined
            })
          }
        />
      )}
    </AuthWrapper>
  );
};
