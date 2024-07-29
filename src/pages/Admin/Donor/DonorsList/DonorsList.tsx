import React, { useEffect, useState } from 'react';
import './DonorsList.scss';
import { useSelector } from 'react-redux';

import { Button, Flex, Table, message } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { Link } from 'react-router-dom';
import { appPaths } from '../../../../constants';
import { PAGINATES, ROLES, TIME_FORMAT, TOAST_MESSAGES } from '../../../../config';
import { AuthWrapper } from '../../../Global';
import { useAppSelector } from '../../../../store';
import { selectorGetUser } from '../../../../store/Auth/selectors';
import { usersService } from '../../../../services/Users/users.service';
import {
  selectorGetAdminUsersCsv,
  selectorGetAdminUsersImportCsv,
  selectorGetAdminUsersList
} from '../../../../store/Users/selectors';
import { IGetAdminUsersListParams } from '../../../../requests/Users/UsersRequest.type';
import moment from 'moment';
import { AdminMenu } from '../../../../Components/Shared';
import { map, size } from 'lodash';
import RequestAccessModal from '../../../../Components/Modals/RequestAccessModal/RequestAccessModal';

export const DonorsList: React.FC = () => {
  const user = useAppSelector(selectorGetUser);
  const {
    handleGetAdminUsersList,
    handlePostAdminUserExportCsv,
    loadingExportCsv,
    handlePostAdminUserImportCsv,
    loadingImportCsv
  } = usersService();
  const adminUsersList = useSelector(selectorGetAdminUsersList);
  const adminUsersCsvData = useAppSelector(selectorGetAdminUsersCsv);
  const adminImportCsvData = useAppSelector(selectorGetAdminUsersImportCsv);
  const [errorsImportCsv, setErrorsImportCsv] = useState<string[]>([]);

  const [isShowModalRequest, setIsShowModalRequest] = useState(false);
  const [requestDataAccess, setRequestDataAccess] = useState<any>({});

  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: PAGINATES.users.adminUsersList.pageSize
  });

  interface DataType {
    key: string;
    name: string;
    email: string;
    physical_address: string;
    organization: string;
    created: string;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true
    },
    {
      title: 'Email',
      key: 'email',
      dataIndex: 'email'
    },
    {
      title: 'Address',
      key: 'physical_address',
      dataIndex: 'physical_address'
    },
    {
      title: 'Wallet Address',
      dataIndex: 'digital_wallet_address',
      key: 'address',
      ellipsis: true
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      ellipsis: true,
      width: '80px'
    },
    {
      title: 'Organisation',
      dataIndex: 'organization',
      key: 'organization',
      ellipsis: true
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
      key: 'action',
      width: 130,
      render: (_, record) => (
        <Flex gap={5}>
          <Button
            danger
            onClick={() => {
              setRequestDataAccess({ user_key: record?.key });
              setIsShowModalRequest(true);
            }}>
            Add Access
          </Button>
        </Flex>
      )
    }
  ];

  const fetchUsersList = async ({ page_index, filter_role }: IGetAdminUsersListParams) => {
    handleGetAdminUsersList({ page_index, filter_role });
  };

  const handleExportCsv = () => {
    if (!adminUsersCsvData) return;
    const rows = adminUsersCsvData.replaceAll(',,', ',"",').split('\n').slice(1);
    const filterDonors = rows.filter((row) => row.includes(ROLES.DONOR));
    const data = filterDonors.map((row) => {
      // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
      const [key, role, name, email, organization, walletAddress, organizationId] =
        row.split('","');
      return { name, email, walletAddress, organization };
    });

    const headers = ['name', 'email', 'wallet address', 'organization'];
    const separator = ',';
    const keys = Object.keys(data[0]);

    const csvContent =
      headers.join(separator) +
      '\n' +
      data
        .map((item: any) =>
          keys
            .map((key) => item[key]?.replace(/"/g, '')?.replace(/\\n/g, '\n')?.replace(/,/g, ''))
            .join(separator)
        )
        .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const fileName = `Users-donor_${moment().format(TIME_FORMAT.DATE_TIME_12H)}.csv`;
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImportCsv = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', '.csv');
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      setErrorsImportCsv([]);
      handlePostAdminUserImportCsv(file);
    };
    input.click();
  };

  useEffect(() => {
    if (!user?.loaded) return;
    fetchUsersList({
      page_index: pagination.current,
      filter_role: ROLES.DONOR
    });
  }, [user, pagination.current]);

  useEffect(() => {
    if (!adminUsersList?.total_count) return;
    setPagination((prevPagination) => ({
      ...prevPagination,
      total: adminUsersList?.total_count
    }));
  }, [adminUsersList]);

  useEffect(() => {
    handleExportCsv();
  }, [adminUsersCsvData]);

  useEffect(() => {
    if (adminImportCsvData?.success_count === 0) {
      message.error(TOAST_MESSAGES.users.import_donor_csv_error);
    }
    if (size(adminImportCsvData?.import_errors) > 0) {
      const errors = adminImportCsvData?.import_errors.map((error: any) => {
        return `Line: ${error?.line} - ${error?.error}`;
      });
      return setErrorsImportCsv(errors);
    }
    if (adminImportCsvData?.success_count > 0) {
      message.success(TOAST_MESSAGES.users.import_donor_csv_success);
      fetchUsersList({
        page_index: pagination.current,
        filter_role: ROLES.DONOR
      });
    }
  }, [adminImportCsvData]);

  return (
    <AuthWrapper role={[ROLES.ADMIN]}>
      <div className="admin-users-donor">
        <div className="container">
          <AdminMenu />
          <h1 className="title">Donors List</h1>
          <div className="top-buttons">
            <Link to={appPaths.adminCreateDonor.path}>
              <Button danger size="small">
                Create Donor
              </Button>
            </Link>
            <Button
              size="small"
              type="primary"
              loading={loadingImportCsv}
              onClick={handleImportCsv}>
              Import CSV
            </Button>
            <Button
              size="small"
              type="primary"
              loading={loadingExportCsv}
              onClick={handlePostAdminUserExportCsv}>
              Export CSV
            </Button>
          </div>

          <div className="import-csv-errors">
            {map(errorsImportCsv, (error: string, index: number) => {
              return (
                <p key={index} className="error-message">
                  {error}
                </p>
              );
            })}
          </div>

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
