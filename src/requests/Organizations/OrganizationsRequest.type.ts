import { UploadFile } from 'antd';

export enum StaffType {
  CEO = 'ceo',
  CFO = 'cfo',
  CHAIR = 'chair'
}

export interface IStaffMembers {
  type?: StaffType;
  email: string;
  first_name: string;
  last_name: string;
  possition: string;
  mobile_numbers: string;
  dob: Date;
}

export interface IPostCreateOrganisation {
  organization_name?: string;
  organization_website?: string;
  head_name?: string;
  head_email?: string;
  head_role?: string;
  organization_registered?: boolean;
  non_registration_attestation_documents?: File[] | null;
  proofs_of_registration?: File[] | null;
  has_other_founding_documents?: boolean;
  other_founding_documents?: File[] | null;
  registered_address?: string;
  registered_country?: string;
  registration_number?: string;
  vat_registration_number?: string;
  iati_code?: string;
  year_of_establishment?: string;
  country_and_areas_of_activities?: string;
  // major_income_sources_and_donors?: string;
  annual_budget_usd?: number;
  top_five_donors?: string;
  other_financials_documents?: File[] | null;
  org_responsible_name: string;
  type_of_id_responsible_person: string;
  responsible_person_documents: File[] | null;
  responsible_person_other_documents?: string;
  has_other_person_manager_digital_wallet?: boolean;
  other_person_manager_digital_wallet_documents?: File[] | null;
  letter_of_authorization_wallet_funds?: File[] | null;
  digital_wallet_address?: string;
  brief_organization_overview?: string;
  organization_sector_description?: string;
  image?: UploadFile | undefined | null;
  has_collaborated_with_armed_groups?: boolean;
  armed_groups?: string;
  staff_members: IStaffMembers[];
  key_staff: IStaffMembers[];
  facebook?: string;
  twitter?: string;
  telegram?: string;
  signal?: string;
  organizational_chart?: File[] | null;
  number_of_paid_staff?: number;
  staff_provided_social_requirements?: boolean;
  ways_of_cooperation_with_armed_groups?: string;

  has_organisation_audited_financials?: boolean;
  most_recent_audited_financials?: File[] | null;
  explain_does_not_have_most_recently_audited_financials?: string;
  most_recent_annual_impact_report?: File[] | null;
  marketplace: string;

  bank_name?: string;
  bank_account_name?: string;
  bank_branch_name?: string;
  bank_account_number?: string;
  bank_iban_code?: string;
  // number_of_contractors?: number;
  // number_of_volunteers?: number;
  references?: any;

  identification_ceo?: File[] | null;
  identification_cfo?: File[] | null;
  identification_chair?: File[] | null;
}

export interface IPutEditOrganization extends IPostCreateOrganisation {
  key: string;
}

export interface IAdminGetOrganisationsListParams {
  page_size?: number;
  page_index?: number;
  sort_created?: string;
}

export interface IGetDonorRequestParams {
  page_size?: number;
  page_index?: number;
  organization_key: string;
  sort_created?: string;
}

export interface IGetOrganisationAdditionalParams {
  key: string;
  nonce: string;
}

export interface IGetOrganisationDocuments {
  key: string;
}

export interface IPutOrganisationDocument {
  organization_key: string;
  document_type: string;
  documents: UploadFile[] | null;
  response_text: string;
  response_value: boolean;
  removed_documents: string[];
}

export interface IGetOrgs {
  keys: string;
}
