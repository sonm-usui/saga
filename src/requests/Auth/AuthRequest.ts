import { API_ROOT } from '../../config';
import { BaseRequest } from '../BaseRequest';
import { IGetNonceTextParams, IPostLoginParams, IPostLogoutParams } from './AuthRequest.type';

export class AuthRequest extends BaseRequest {
  async getCurrentUser() {
    const url = `${API_ROOT.v2}/users/me`;
    return await this.get(url);
  }

  async getNonceText(params: IGetNonceTextParams) {
    const { address } = params;
    const url = `${API_ROOT.v2}/auth/${address}/connect`;
    return await this.post(url, params);
  }

  async loginByWallet(params: IPostLoginParams) {
    const url = `${API_ROOT.v2}/auth/eth/login`;
    const data: any = await this.post(url, params);
    return data;
  }

  async logout(params: IPostLogoutParams) {
    const url = `${API_ROOT.v2}/auth/logout`;
    const data: any = await this.post(url, params);
    return data;
  }
}
