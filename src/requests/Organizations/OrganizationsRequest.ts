import { UploadFile } from 'antd';
import { API_ROOT } from '../../config';
import { BaseRequest } from '../BaseRequest';
import { IGetDetailParams, IGetOrganizationsListParams } from '../Types';
import {
  IAdminGetOrganisationsListParams,
  IGetDonorRequestParams,
  IGetOrganisationAdditionalParams,
  IGetOrganisationDocuments,
  IGetOrgs,
  IPostCreateOrganisation,
  IPutEditOrganization,
  IPutOrganisationDocument
} from './OrganizationsRequest.type';

export class OrganizationsRequest extends BaseRequest {
  async getOrganizationsList(params: IGetOrganizationsListParams) {
    // TODO: spell organizations correctly
    const url = `${API_ROOT.v2}/orgs/brief`;
    const data: any = await this.get(url, params);
    return data;
  }
  async getOrganizationDetail(params: IGetDetailParams) {
    // TODO: spell organizations correctly
    const url = `${API_ROOT.v2}/orgs/brief/${params.key}`;
    const data: any = await this.get(url);
    return data;
  }

  async getAdminOrganizationsList(params: IAdminGetOrganisationsListParams) {
    const url = `${API_ROOT.v2}/orgs`;
    const data: any = await this.get(url, params);
    return data;
  }

  async getAdminOrganisationDetail(key: string) {
    const url = `${API_ROOT.v2}/orgs/key/${key}`;
    const data: any = await this.get(url);
    return data;
  }

  async postCreateOrganisation(params: IPostCreateOrganisation) {
    const formData = new FormData();
    for (const [key, value] of Object.entries(params)) {
      if (key === 'staff_members' || key === 'key_staff' || key === 'references') {
        formData.append(key, JSON.stringify(value));
      } else if (
        key === 'proofs_of_registration' ||
        key === 'other_founding_documents' ||
        key === 'other_financials_documents' ||
        key === 'responsible_person_documents' ||
        key === 'responsible_person_other_documents' ||
        key === 'non_registration_attestation_documents' ||
        key === 'other_person_manager_digital_wallet_documents' ||
        key === 'letter_of_authorization_wallet_funds' ||
        key === 'due_diligence_checklist' ||
        key === 'organizational_chart' ||
        key === 'most_recent_audited_financials' ||
        key === 'most_recent_annual_impact_report' ||
        key === 'identification_ceo' ||
        key === 'identification_cfo' ||
        key === 'identification_chair'
      ) {
        for (const i in value) {
          formData.append(key, value[i]);
        }
      } else {
        formData.append(key, value);
      }
    }
    const url = `${API_ROOT.v2}/orgs`;
    const data: any = await this.post(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return data;
  }

  async putEditOrganisation(params: IPutEditOrganization) {
    const formData = new FormData();
    for (const [key, value] of Object.entries(params)) {
      if (key === 'staff_members' || key === 'key_staff' || key === 'references') {
        formData.append(key, JSON.stringify(value));
      } else if (
        key === 'proofs_of_registration' ||
        key === 'other_founding_documents' ||
        key === 'other_financials_documents' ||
        key === 'responsible_person_documents' ||
        key === 'responsible_person_other_documents' ||
        key === 'non_registration_attestation_documents' ||
        key === 'other_person_manager_digital_wallet_documents' ||
        key === 'letter_of_authorization_wallet_funds' ||
        key === 'due_diligence_checklist' ||
        key === 'organizational_chart' ||
        key === 'most_recent_audited_financials' ||
        key === 'most_recent_annual_impact_report' ||
        key === 'identification_ceo' ||
        key === 'identification_cfo' ||
        key === 'identification_chair'
      ) {
        for (const i in value) {
          formData.append(key, value[i]);
        }
      } else {
        formData.append(key, value);
      }
    }
    const url = `${API_ROOT.v2}/orgs/key/${params?.key}/update`;
    const data: any = await this.put(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return data;
  }

  async putRejectOrganization(key: string) {
    const url = `${API_ROOT.v2}/orgs/key/${key}/reject`;
    const data: any = await this.put(url);
    return data;
  }

  async putApproveOrganization(key: string) {
    const url = `${API_ROOT.v2}/orgs/key/${key}/approve`;
    const data: any = await this.put(url);
    return data;
  }

  async getDonorRequest(params: IGetDonorRequestParams) {
    const organisationKey = params?.organization_key;
    const url = `${API_ROOT.v2}/orgs/additional/${organisationKey}/logs`;
    const data: any = await this.get(url, params);
    return data;
  }

  async postDonorRequestAdditional(key: string) {
    const url = `${API_ROOT.v2}/orgs/additional/${key}/request`;
    const data: any = await this.post(url);
    return data;
  }

  async postRejectDonorRequest(key: string) {
    const url = `${API_ROOT.v2}/orgs/additional/${key}/reject`;
    const data: any = await this.post(url);
    return data;
  }

  async postApproveDonorRequest(key: string) {
    const url = `${API_ROOT.v2}/orgs/additional/${key}/approve`;
    const data: any = await this.post(url);
    return data;
  }

  async getOrganisationAdditional(params: IGetOrganisationAdditionalParams) {
    const { key, nonce } = params;
    const url = `${API_ROOT.v2}/orgs/additional/${key}/view?nonce=${nonce}`;
    const data: any = await this.get(url);
    return data;
  }

  async getOrganisationDocuments(params: IGetOrganisationDocuments) {
    const { key } = params;
    const url = `${API_ROOT.v2}/orgs/documents/${key}`;
    const data: any = await this.get(url);
    return data;
  }

  async putOrganisationDocument(params: IPutOrganisationDocument) {
    const formData = new FormData();
    for (const [key, value] of Object.entries(params)) {
      if (key === 'documents') {
        const files = value.map((file: UploadFile) => file.originFileObj);
        for (const i in files) {
          formData.append('files', files[i]);
        }
      } else {
        formData.append(key, value);
      }
    }
    const url = `${API_ROOT.v2}/orgs/documents/${params?.organization_key}`;
    const data: any = await this.put(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return data;
  }

  async getOrgsByKeys(keys: IGetOrgs) {
    const url = `${API_ROOT.v2}/orgs/keys`;
    const data: any = await this.get(url, keys);
    return data;
  }
}
