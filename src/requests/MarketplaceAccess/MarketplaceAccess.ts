import { API_ROOT } from '../../config';
import { BaseRequest } from '../BaseRequest';
import {
  IGetListOptionsRequestAccessParams,
  IGetMarketplaceAccessListParams,
  IPostRequestAccessParams
} from './MarketplaceAccess.type';

export class MarketplaceAccessRequest extends BaseRequest {
  async getMarketplaceAccessList(params: IGetMarketplaceAccessListParams) {
    const url = `${API_ROOT.v2}/access-request`;
    const data: any = await this.get(url, params);
    return data;
  }

  async postRequestAccess(params: IPostRequestAccessParams) {
    const url = `${API_ROOT.v2}/access-request/${params.marketplace}`;
    const data: any = await this.post(url, {
      user_key: params?.user_key,
      org_key: params?.org_key
    });
    return data;
  }

  async putRejectRequest(key: string) {
    const url = `${API_ROOT.v2}/access-request/${key}/reject`;
    const data: any = await this.put(url);
    return data;
  }

  async putApproveRequest(key: string) {
    const url = `${API_ROOT.v2}/access-request/${key}/approve`;
    const data: any = await this.put(url);
    return data;
  }

  async getListOptions(params: IGetListOptionsRequestAccessParams) {
    const url = `${API_ROOT.v2}/access-request/marketplaces/user`;
    const data: any = await this.get(url, params);
    return data;
  }

  async getListMarketplaceApprove() {
    const url = `${API_ROOT.v2}/access-request/marketplaces/approve`;
    const data: any = await this.get(url);
    return data;
  }
}
