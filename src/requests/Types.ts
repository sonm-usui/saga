export interface IGetProjectListParams {
  page_size?: number;
  page_index?: number;
  filter_organization_key?: string;
  sort_title?: string;
  filter_location?: string;
  filter_type?: string;
  filter_status?: string;
  sort_fund_eth?: string;
  sort_created?: string;
}

export interface IGetOrganizationsListParams {
  page_size?: number;
  page_index?: number;
}
export interface IGetDetailParams {
  key: string;
}

// survey
export interface IPostSurveyParams {
  option: number;
  name: string;
  email: string;
  investor_type: string;
  role: string;
  company_name: string;
  company_website: string;
  est_txn_month_volume: string;
  organisation_name: string;
  organisation_website: string;
}

export interface IPostSupportParams {
  email: string;
  message: string;
}
