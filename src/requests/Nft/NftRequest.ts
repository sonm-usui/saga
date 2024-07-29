import { API_ROOT } from '../../config';

import { BaseRequest } from '../BaseRequest';

export class NftRequest extends BaseRequest {
  async getNftUserStats(params: { user_address: string }) {
    const url = `${API_ROOT.v2}/users/stats/${params.user_address}`;
    const data: any = await this.get(url);
    return data;
  }
  async getNftUserTokens(params: { user_address: string }) {
    const url = `${API_ROOT.v2}/users/tokens/${params.user_address}`;
    const data: any = await this.get(url);
    return data;
  }
}
