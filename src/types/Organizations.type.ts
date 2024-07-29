import { IMedia, ISocials } from './Common.type';

export interface IOrganizationItem {
  key: string;
  image: IMedia;
  social: ISocials;
  organization_name: string;
  brief_organization_overview: string;
  organization_sector_description: string;
  due_diligence_checklist: string[];
}

export interface IOrganizationDocument {
  key: string;
  organization_key: string;
  document_type: string;
  documents: any[];
  response_text: string;
  response_value: boolean;
}
