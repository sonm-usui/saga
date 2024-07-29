import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { AuthRequest } from '../../requests/Auth/AuthRequest';
import { RequestFactory } from '../../requests';
import RequestEnum from '../../requests/Request.enum';
import { useAppDispatch } from '../../store';
import { actionGetCurrentUser, actionPostLoginByWallet } from '../../store/Auth/actions';
import { toLower } from 'lodash';
import { message } from 'antd';
import { APP_ENVIRONMENTS } from '../../config';

const { CONNECTOR_NAME } = APP_ENVIRONMENTS;

export const authService = () => {
  const { account, library, deactivate } = useWeb3React();
  const authRequest = RequestFactory.getRequest<AuthRequest>(RequestEnum.AuthRequest);
  const dispatch = useAppDispatch();

  const handleSignMessage = async (nonceText: string) => {
    if (!library) return;
    try {
      return await library.getSigner().signMessage(nonceText);
    } catch (error) {
      //
    }
  };

  const handleLoginByWallet = async () => {
    if (!account) return;
    let nonceText = '';

    try {
      const { nonce_text } = await authRequest.getNonceText({ address: account });
      nonceText = nonce_text;
    } catch (error: any) {
      deactivate();
      message.error(error?.error?.message);
    }

    if (!nonceText) return;
    const signature = await handleSignMessage(nonceText);

    if (!signature) return;

    dispatch(
      actionPostLoginByWallet({
        params: {
          wallet_address: toLower(account),
          signature
        },
        callback: (isSuccess) => {
          if (isSuccess) {
            return message.success('Login success');
          }
          deactivate();
          localStorage.removeItem(CONNECTOR_NAME);
        }
      })
    );
  };

  const handleGetCurrentUser = async () => {
    dispatch(actionGetCurrentUser({}));
  };

  return {
    handleLoginByWallet,
    handleGetCurrentUser
  };
};
