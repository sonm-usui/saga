import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { connectEthereumProvider } from '../../../utils/ethereum';
import { useAppSelector } from '../../../store';
import { selectorGetUser } from '../../../store/Auth/selectors';
import EthereumSvg from '../../../assets/images/svgs/EthereumSvg';
import { isEmpty } from 'lodash';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const AccountBalance: React.FC = () => {
  const [accountBalance, setAccountBalance] = useState<string | null>(null);
  const user = useAppSelector(selectorGetUser);

  const getBalance = async () => {
    const provider = connectEthereumProvider(window.ethereum);
    if (provider && user?.digital_wallet_address) {
      const balance = await provider.getBalance(user?.digital_wallet_address);
      const formattedBalance = ethers.utils.formatEther(balance);
      setAccountBalance(Number(formattedBalance).toFixed(4));
    }
  };

  useEffect(() => {
    if (isEmpty(user)) setAccountBalance(null);
    getBalance();
  }, [user]);

  return (
    <>
      <EthereumSvg />
      <span style={{ color: 'white' }}>{accountBalance ?? 0}</span>
    </>
  );
};
