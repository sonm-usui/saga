import React, { useEffect } from 'react';
import { Button, Typography } from 'antd';
import './AdminMenu.scss';
import { appPaths } from '../../../constants';
import { Link } from 'react-router-dom';
import { selectorGetUser } from '../../../store/Auth/selectors';
import { useAppSelector } from '../../../store';
import { ROLES } from '../../../config';
import { find, replace } from 'lodash';
import { useSelector } from 'react-redux';
import { selectorGetListMarketplaceApprove } from '../../../store/MarketplaceAccess/selectors';
import { marketplaceAccessService } from '../../../services';
import { MarketPlaces } from '../../UI/Button/enums';
const { Text } = Typography;

export const AdminMenu: React.FC = () => {
  const user = useAppSelector(selectorGetUser);
  const listMarketplace = useSelector(selectorGetListMarketplaceApprove);
  const { getListMarketplaceApprove } = marketplaceAccessService();

  useEffect(() => {
    if (user && user?.role === ROLES.ORG && user?.organization_key) {
      getListMarketplaceApprove();
    }
  }, [user]);

  return (
    <>
      <div className="user-info">
        <Text type="danger" strong>
          Your Wallet: {user?.digital_wallet_address || '--'}
        </Text>{' '}
        -{' '}
        <Text type="success" strong>
          Role: {user?.role || '--'}
        </Text>
      </div>
      <div className="admin-menu">
        {user?.role === ROLES.ADMIN && (
          <>
            <Link to={appPaths.adminOrganisations.path}>
              <Button type="primary">Organisations</Button>
            </Link>
            <Link to={appPaths.adminProjects.path}>
              <Button type="primary">Projects</Button>
            </Link>
            <Link to={appPaths.adminDonorsList.path}>
              <Button type="primary">Donors</Button>
            </Link>
          </>
        )}
        {user?.role === ROLES.ORG && user?.organization_key && (
          <>
            <Link
              to={`${replace(
                appPaths.adminOrganisationsDetail.path,
                ':key',
                user?.organization_key
              )}`}>
              <Button type="primary">Organisation Details</Button>
            </Link>
            {listMarketplace &&
              find(listMarketplace, (item) => item.value === MarketPlaces.NRC_SUDAN) && (
                <Link
                  to={`${replace(appPaths.organisationDocs.path, ':key', user?.organization_key)}`}>
                  <Button type="primary">Organisation Docs</Button>
                </Link>
              )}
            <Link
              to={`${appPaths.adminProjects.path}?filter_organization_key=${user?.organization_key}`}>
              <Button type="primary">Projects</Button>
            </Link>
            <Link to={appPaths.adminDonorsRequest.path}>
              <Button type="primary">Donor Requests</Button>
            </Link>
          </>
        )}
        <Link to={appPaths.marketplaceAccess.path}>
          <Button type="primary">Marketplace Access</Button>
        </Link>
      </div>
    </>
  );
};
