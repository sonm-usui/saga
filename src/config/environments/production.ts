import { IEnv } from '../../types/Env.type';
import { ABI_ARRAY as ABI_ARRAY_MTN } from '../../contract/contractMTN';

const SITE_URL = 'https://coalapay.org';

export const PRODUCTION_ENVIRONMENTS: IEnv = {
  IS_PRODUCTION: true,

  API_ROOT_URL: 'https://federation.coalapay.org',
  S3_URL: 'https://assets.coalapay.org',

  ACCESS_TOKEN: 'ACCESS_TOKEN',
  REFRESH_TOKEN: 'REFRESH_TOKEN',
  USER: 'USER',

  RPC_ETHEREUM: 'https://mainnet.infura.io/v3/76eee0a4cf684cbc81cd97b8f4eb6b79',
  SITE_PROD_URL: SITE_URL,
  METAMASK_DEEP_LINK: `https://metamask.app.link/dapp/${SITE_URL}`,
  COINBASE_DEEP_LINK: `https://go.cb-w.com/dapp?cb_url=${SITE_URL}`,
  SUPPORTED_CHAIN_IDS: [1],
  CONNECTOR_NAME: 'CONNECTOR_NAME',

  ABI_ARRAY_MTN: ABI_ARRAY_MTN,
  CONTRACT_ADDRESS_MTN: '0x5ca8233c2b5930a115a93dd55ca759daf843e36f',
  CHAIN_ID_MTN: '1223532587',
  RPC_MTN_FULL:
    'https://u0bp2e7tzk-u0cpuj9soo-rpc.us0-aws.kaleido.io?user=u0tt8qsavt&password=xmEDxu6zG-OyHQHZkpXAa7r9K3NBKSr-yGp94Eusp6M',
  CPAY_CONTRACT: '0xB92391Af2C4d89B295695e0B95288daDEC04FB4C',
  CPAY_SUDAN_CONTRACT: '0x431B1B80f19B392EA7064fb0dBDeEbe138060fC0',
  CPAY_PUBLIC_CONTRACT: '0xDbc28D74a576C187f6bfa89F17c4D625BF499bdF',
  USDT_ADDRESS: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  RPC_URL: 'https://mainnet.infura.io/v3/cf45b1e59a7d4662a96da31a00b72fea',
  CHAIN_ID: 1,
  CHAIN_NAME: 'ETHEREUM MAINNET NETWORK',
  PRIVACY_POLICY_VERSION: '2'
};
