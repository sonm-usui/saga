import { ethers } from 'ethers';
import { APP_ENVIRONMENTS } from '../config';

const { RPC_ETHEREUM } = APP_ENVIRONMENTS;

export const connectEthereumProvider = (walletProvider?: any) => {
  if (walletProvider) {
    return new ethers.providers.Web3Provider(walletProvider);
  }
  return ethers.getDefaultProvider(RPC_ETHEREUM);
};
