import { API_ROOT } from '../../config';
import { BaseRequest } from '../BaseRequest';

export class MastercardRequest extends BaseRequest {
  async getUserBalance(alias: string) {
    const url = `${API_ROOT.v2}/mastercard/token-balance/${alias}`;
    const data: any = await this.get(url);
    return data;
  }
}
