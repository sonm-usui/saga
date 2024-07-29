export interface IGetNonceTextParams {
  address: string;
}
export interface IPostLoginParams {
  wallet_address: string;
  signature: string;
}

export interface IPostLogoutParams {
  refresh_token: string;
}
