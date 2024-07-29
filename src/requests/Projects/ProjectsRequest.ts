import { API_ROOT } from '../../config';
import { BaseRequest } from '../BaseRequest';
import { IGetDetailParams, IGetProjectListParams } from '../Types';
import { IAdminGetProjectsListParams, IPostProposeProjectParams } from './ProjectsRequest.type';

export class ProjectsRequest extends BaseRequest {
  async getProjectList(params: IGetProjectListParams) {
    const url = `${API_ROOT.v2}/projects`;
    const data: any = await this.get(url, params);
    return data;
  }
  async getProjectDetail(params: IGetDetailParams) {
    const url = `${API_ROOT.v2}/projects/${params.key}`;
    const data: any = await this.get(url);
    return data;
  }
  async getRelatedProjects(params: IGetDetailParams) {
    const url = `${API_ROOT.v2}/projects/${params.key}/related`;
    const data: any = await this.get(url);
    return data;
  }
  async postProposeProject(params: IPostProposeProjectParams) {
    const formData = new FormData();
    for (const [key, value] of Object.entries(params)) {
      if (key === 'main_activities') {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    }

    const url = `${API_ROOT.v2}/projects`;
    const data: any = await this.post(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return data;
  }

  async putProject(params: IPostProposeProjectParams, key: string) {
    const formData = new FormData();
    for (const [key, value] of Object.entries(params)) {
      if (key === 'main_activities') {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    }

    const url = `${API_ROOT.v2}/projects/${key}`;
    const data: any = await this.put(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return data;
  }

  async getStatisticsAccess(params: IGetProjectListParams) {
    const url = `${API_ROOT.v2}/projects/statistics/access`;
    const data: any = await this.get(url, params);
    return data;
  }

  // fund project
  async getOperatorAddress(key: string) {
    const url = `${API_ROOT.v2}/projects/${key}/mtn/operator`;
    const data: any = await this.get(url);
    return data;
  }

  async postPaymentProject(key: string) {
    const url = `${API_ROOT.v2}/projects/${key}/mtn/payment`;
    const data: any = await this.post(url);
    return data;
  }

  // admin
  async getAdminProjectsList(params: IAdminGetProjectsListParams) {
    const url = `${API_ROOT.v2}/projects`;
    const data: any = await this.get(url, params);
    return data;
  }
  async getAdminProjectDetail(key: string) {
    const url = `${API_ROOT.v2}/projects/${key}`;
    const data: any = await this.get(url);
    return data;
  }
  async putRejectProject(key: string) {
    const url = `${API_ROOT.v2}/projects/${key}/reject`;
    const data: any = await this.put(url);
    return data;
  }

  async putApproveProject(key: string) {
    const url = `${API_ROOT.v2}/projects/${key}/approve`;
    const data: any = await this.put(url);
    return data;
  }
}
