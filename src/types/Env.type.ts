export interface IEnv {
  IS_PRODUCTION: boolean;

  API_ROOT_URL: string;
  S3_URL: string;

  ACCESS_TOKEN: string;
  REFRESH_TOKEN: string;
  USER: string;

  RPC_ETHEREUM: string;
  SITE_PROD_URL: string;
  METAMASK_DEEP_LINK: string;
  COINBASE_DEEP_LINK: string;
  SUPPORTED_CHAIN_IDS: number[];
  CONNECTOR_NAME: string;

  ABI_ARRAY_MTN: any;
  CONTRACT_ADDRESS_MTN: string;
  CHAIN_ID_MTN: string;
  RPC_MTN_FULL: string;
  CPAY_CONTRACT: string;
  CPAY_SUDAN_CONTRACT: string;
  CPAY_PUBLIC_CONTRACT: string;
  USDT_ADDRESS: string;
  RPC_URL: string;
  CHAIN_ID: number;
  CHAIN_NAME: string;
  PRIVACY_POLICY_VERSION: string;
}
