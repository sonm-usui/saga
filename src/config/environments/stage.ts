import { ABI_ARRAY as ABI_ARRAY_MTN } from '../../contract/contractMTN';
import { IEnv } from '../../types/Env.type';

const SITE_URL = 'https://stage.coalapay.org';

export const STAGE_ENVIRONMENTS: IEnv = {
  IS_PRODUCTION: false,

  API_ROOT_URL: 'https://federation-stage.coalapay.org',
  S3_URL: 'https://mittaria-assets.s3.ap-southeast-1.amazonaws.com',

  ACCESS_TOKEN: 'ACCESS_TOKEN',
  REFRESH_TOKEN: 'REFRESH_TOKEN',
  USER: 'USER',

  RPC_ETHEREUM: 'https://sepolia.drpc.org',
  SITE_PROD_URL: SITE_URL,
  METAMASK_DEEP_LINK: `https://metamask.app.link/dapp/${SITE_URL}`,
  COINBASE_DEEP_LINK: `https://go.cb-w.com/dapp?cb_url=${SITE_URL}`,
  SUPPORTED_CHAIN_IDS: [5],
  CONNECTOR_NAME: 'CONNECTOR_NAME',

  ABI_ARRAY_MTN: ABI_ARRAY_MTN,
  CONTRACT_ADDRESS_MTN: '0x5ca8233c2b5930a115a93dd55ca759daf843e36f',
  CHAIN_ID_MTN: '1223532587',
  RPC_MTN_FULL:
    'https://u0bp2e7tzk-u0cpuj9soo-rpc.us0-aws.kaleido.io?user=u0tt8qsavt&password=xmEDxu6zG-OyHQHZkpXAa7r9K3NBKSr-yGp94Eusp6M',
  CPAY_CONTRACT: '0xB92391Af2C4d89B295695e0B95288daDEC04FB4C',
  CPAY_SUDAN_CONTRACT: '0xea612df2e32cb30e59dca496a82b3e633572a9b4',
  CPAY_PUBLIC_CONTRACT: '0xDbc28D74a576C187f6bfa89F17c4D625BF499bdF',
  USDT_ADDRESS: '0x6F5fe83d5a6A8d206304185606A34993C4E5B2AB',
  RPC_URL: 'https://sepolia.drpc.org',
  CHAIN_ID: 11155111,
  CHAIN_NAME: 'SEPOLIA NETWORK',
  PRIVACY_POLICY_VERSION: '2'
};
