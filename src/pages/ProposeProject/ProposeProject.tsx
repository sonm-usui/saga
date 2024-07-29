import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { appPaths } from '../../constants';
import { ProposeProjectNormal } from './ProjectNormal/ProjectNormal';
import { ProposeProjectNrcSudan } from './ProjectNrcSudan/ProjectNrcSudan';
import { useSelector } from 'react-redux';
import { selectorGetListMarketplaceApprove } from '../../store/MarketplaceAccess/selectors';
import { marketplaceAccessService } from '../../services';
import { selectorGetUser } from '../../store/Auth/selectors';
import { find, toLower } from 'lodash';
import { MarketPlaces } from '../../Components/UI/Button/enums';
import ConnectWallet from '../../Components/ConnectWallet/ConnectWallet';
import UnauthorisedModal from './Modals/UnauthorisedModal';

export const ProposeProject: React.FC = () => {
  const navigate = useNavigate();
  const { marketplace } = useParams<{ marketplace: string }>();
  const listMarketplace = useSelector(selectorGetListMarketplaceApprove);
  const { getListMarketplaceApprove } = marketplaceAccessService();
  const user = useSelector(selectorGetUser);
  const [authorized, setAuthorized] = useState(false);
  const [connectWalletOpen, setConnectWalletOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getListMarketplaceApprove();
    }

    if (!user?.digital_wallet_address) {
      setConnectWalletOpen(true);
    } else {
      setConnectWalletOpen(false);
    }
  }, [user]);

  useEffect(() => {
    if (!marketplace) {
      return navigate(appPaths.home.path);
    }

    if (listMarketplace) {
      const marketplaceCurrent = find(
        listMarketplace,
        (item: any) => toLower(item.value) === toLower(marketplace)
      );
      if (marketplaceCurrent) {
        setAuthorized(true);
      }
      setLoading(false);
    }
  }, [listMarketplace, marketplace, navigate]);

  if (loading) {
    return null;
  }

  if (!user?.digital_wallet_address) {
    return (
      <ConnectWallet
        open={connectWalletOpen && !user?.digital_wallet_address}
        onClose={() => {
          setConnectWalletOpen(false);
        }}
      />
    );
  }

  if (!authorized) {
    return (
      <UnauthorisedModal
        onClose={() => {
          navigate(appPaths.home.path);
        }}
      />
    );
  }

  return marketplace?.toUpperCase() === MarketPlaces.NRC_SUDAN ? (
    <ProposeProjectNrcSudan marketplace={marketplace?.toUpperCase() || ''} />
  ) : (
    <ProposeProjectNormal marketplace={marketplace?.toUpperCase() || ''} />
  );
};
