import React, { useEffect, useState } from 'react';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { TOAST_MESSAGES } from '../../config/constants';
import connectors, {
  activateInjectedProvider,
  ConnectorName,
  connectorObject
} from '../../utils/connector';
import './ConnectWallet.scss';
import { APP_ENVIRONMENTS } from '../../config/env';
import { NoEthereumProviderError, UserRejectedRequestError } from '@web3-react/injected-connector';

import { isIOS, isMobile, isTablet } from 'react-device-detect';
import { Modal, message } from 'antd';
import MetaMaskSvg from '../../assets/images/svgs/MetaMaskSvg';
import CoinbaseSvg from '../../assets/images/svgs/CoinbaseSvg';
import WalletConnectSvg from '../../assets/images/svgs/WalletConnectSvg';
import closeIcon from '../../assets/images/pngs/close.png';
import { authService } from '../../services';
import { useAppSelector } from '../../store';
import { selectorPostLoginByWalletError } from '../../store/Auth/selectors';

interface ConnectWalletProps {
  className?: string;
  open: boolean;
  onClose: () => void;
}

const ConnectWallet: React.FC<ConnectWalletProps> = ({ open, onClose, className = '' }) => {
  const { activate, account } = useWeb3React();
  const { IS_PRODUCTION, METAMASK_DEEP_LINK, COINBASE_DEEP_LINK, SITE_PROD_URL } = APP_ENVIRONMENTS;
  const errorNetwork = IS_PRODUCTION
    ? TOAST_MESSAGES.metamask.not_supported_network_mainnet
    : TOAST_MESSAGES.metamask.not_supported_network_testnet;
  const [connectorNameConnected, setConnectorNameConnected] = useState('');
  const [messageApi, contextHolder] = message.useMessage();

  const { ethereum } = window as any;
  const { handleLoginByWallet } = authService();
  const loginByWalletErrors = useAppSelector(selectorPostLoginByWalletError);

  useEffect(() => {
    if (!account || !connectorNameConnected) return;
    localStorage.setItem(APP_ENVIRONMENTS.CONNECTOR_NAME, connectorNameConnected);
    handleLoginByWallet();
  }, [account, connectorNameConnected]);

  const getErrorMessage = (error: any) => {
    if (!error) return;

    if (error instanceof NoEthereumProviderError) {
      messageApi.error(TOAST_MESSAGES.metamask.not_installed_wallet);
    } else if (error instanceof UnsupportedChainIdError) {
      messageApi.error(errorNetwork);
    } else if (error instanceof UserRejectedRequestError) {
      messageApi.error(TOAST_MESSAGES.metamask.user_rejected_request);
    } else {
      messageApi.error(TOAST_MESSAGES.metamask.unknown_error);
    }
  };

  const mobileOpenWallet = (connectorName: string) => {
    if (connectorName === ConnectorName.Injected && !ethereum) {
      return window.open(METAMASK_DEEP_LINK, '_blank', 'rel=noopener noreferrer');
    }
    if (connectorName === ConnectorName.CoinbaseWallet && !ethereum) {
      if (isIOS) {
        return window.open(
          `cbwallet://dapp?url=${SITE_PROD_URL}`,
          '_blank',
          'rel=noopener noreferrer'
        );
      }
      return window.open(COINBASE_DEEP_LINK, '_blank', 'rel=noopener noreferrer');
    }
  };

  const handleConnectWallet = async (connectorName: string) => {
    let errorFlag = false;

    if (
      connectorName === ConnectorName.Injected ||
      connectorName === ConnectorName.CoinbaseWallet
    ) {
      activateInjectedProvider(connectorName as any);
      onClose();
    }

    // handle mobile connect
    if (isMobile || isTablet) {
      mobileOpenWallet(connectorName);
    }
    // end handle mobile connect

    const currentConnector = connectors[connectorName as ConnectorName];

    await activate(currentConnector, (error) => {
      localStorage.removeItem(APP_ENVIRONMENTS.CONNECTOR_NAME);
      getErrorMessage(error);
      errorFlag = true;
      onClose();
    });

    if (errorFlag) return;

    try {
      const provider = await currentConnector.getProvider();
      if (provider) {
        errorFlag = false;
        setConnectorNameConnected(connectorName);
        if (connectorName === ConnectorName.WalletConnect) {
          onClose();
        }
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const renderWalletIcon = (connectorName: string) => {
    if (connectorName === ConnectorName.Injected) {
      return <MetaMaskSvg className="wallets-item-icon" />;
    }
    if (connectorName === ConnectorName.CoinbaseWallet) {
      return <CoinbaseSvg className="wallets-item-icon" />;
    }
    return <WalletConnectSvg className="wallets-item-icon" />;
  };

  useEffect(() => {
    if (!loginByWalletErrors) return;
    messageApi.error(loginByWalletErrors);
  }, [loginByWalletErrors]);

  return (
    <>
      <Modal
        title="Connect Wallet"
        open={open}
        onCancel={onClose}
        className={`connect-wallet-modal ${className}`}
        footer={null}
        maskClosable={false}
        closeIcon={<img src={closeIcon} alt="close" />}>
        <div className="wallets">
          {Object.entries(connectors).map(([connectorName], index) => {
            return (
              <div
                style={{ cursor: 'pointer' }}
                onClick={() => handleConnectWallet(connectorName)}
                className="wallets-item"
                key={index}>
                {renderWalletIcon(connectorName)}
                <span className="wallets-item-name">
                  {connectorObject[connectorName as ConnectorName].name}
                </span>
              </div>
            );
          })}
        </div>
      </Modal>

      {contextHolder}
    </>
  );
};

export default ConnectWallet;
