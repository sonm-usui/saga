import { API_ROOT } from '../../config';
import { BaseRequest } from '../BaseRequest';
import { IPostSupportParams, IPostSurveyParams } from '../Types';

export class CommonRequest extends BaseRequest {
  async postSurvey(params: IPostSurveyParams) {
    const url = `${API_ROOT.v1}/surveys`;
    const data: any = await this.post(url, params);
    return data;
  }

  async postSupport(params: IPostSupportParams) {
    const url = `${API_ROOT.v2}/supports`;
    const data: any = await this.post(url, params);
    return data;
  }
}
