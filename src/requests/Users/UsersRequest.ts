import { API_ROOT } from '../../config';
import { BaseRequest } from '../BaseRequest';
import { IAdminCreateUserParams, IGetAdminUsersListParams, IGetUsers } from './UsersRequest.type';

export class UsersRequest extends BaseRequest {
  async postAdminCreateUser(params: IAdminCreateUserParams) {
    const url = `${API_ROOT.v2}/users`;
    const data: any = await this.post(url, params);
    return data;
  }
  async getAdminUsersList(params: IGetAdminUsersListParams) {
    const url = `${API_ROOT.v2}/users`;
    const data: any = await this.get(url, params);
    return data;
  }
  async postAdminUsersImportCsv(file: File) {
    const configHeaders = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
    const formData = new FormData();
    formData.append('file', file);
    const url = `${API_ROOT.v2}/users/import`;
    const data: any = await this.post(url, formData, configHeaders);
    return data;
  }
  async getAdminUsersExportCsv() {
    const url = `${API_ROOT.v2}/users/export`;
    const data: any = await this.get(url);
    return data;
  }

  async getUsersByKeys(params: IGetUsers) {
    const url = `${API_ROOT.v2}/users/keys`;
    const data: any = await this.get(url, params);
    return data;
  }
}
