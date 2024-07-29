import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { APP_ENVIRONMENTS } from '../config/env';

const { SUPPORTED_CHAIN_IDS, RPC_ETHEREUM } = APP_ENVIRONMENTS;

const infuraId = RPC_ETHEREUM;

export enum ConnectorName {
  Injected = 'injected',
  WalletConnect = 'walletConnect',
  CoinbaseWallet = 'coinbaseWallet'
}

export const connectorObject = {
  [ConnectorName.Injected]: {
    name: 'MetaMask'
  },
  [ConnectorName.WalletConnect]: {
    name: 'Wallet Connect'
  },
  [ConnectorName.CoinbaseWallet]: {
    name: 'Coinbase Wallet'
  }
};

// metamask
export const injected = new InjectedConnector({});

// wallet connect
export const WalletConnect = new WalletConnectConnector({
  rpc: RPC_ETHEREUM,
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true
});

// coinbase wallet
export const CoinbaseWallet = new WalletLinkConnector({
  url: infuraId,
  appName: 'Coala Pay'
});

const connectors: any = {
  [ConnectorName.Injected]: injected,
  [ConnectorName.WalletConnect]: WalletConnect,
  [ConnectorName.CoinbaseWallet]: CoinbaseWallet
};

export default connectors;

export const activateInjectedProvider = (
  providerName: ConnectorName.CoinbaseWallet | ConnectorName.Injected
) => {
  const { ethereum }: any = window;

  if (!ethereum?.providers) {
    return undefined;
  }

  let provider;
  switch (providerName) {
    case ConnectorName.CoinbaseWallet:
      provider = ethereum.providers.find(({ isCoinbaseWallet }: any) => isCoinbaseWallet);
      break;
    case ConnectorName.Injected:
      provider = ethereum.providers.find(({ isMetaMask }: any) => isMetaMask);
      break;
  }

  if (provider) {
    ethereum.setSelectedProvider(provider);
  }
};
