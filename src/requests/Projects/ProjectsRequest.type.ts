export interface IPostProposeProjectParams {
  name: string;
  type: string;
  country: string;
  state?: string;
  township?: string;
  period_of_delivery: string;
  estimated_beneficiaries: number;
  description_burmese?: string;
  description_english?: string;
  summary?: string;
  fund_eth: number;
  facebook?: string;
  telegram?: string;
  twitter?: string;
  mobile_numbers?: string;
  image: any;
  token_id?: number;
  start_date: Date;
  end_date: Date;
  marketplace: string;

  //
  target_group?: string;
  project_goal?: string;
  key_activities?: string;

  main_activities?: any[];

  activity_reason_and_connection?: string;
  supporting_evidence_and_collection_method?: string;
  coordination_and_permissions?: string;
  accountability_and_feedback?: string;
  safety_and_risk_management?: string;
  financial_management_experience?: string;
  verification_of_results?: string;
  support_needed_from_NRC?: string;
  long_term_partnership_intent?: string;

  budget?: File | undefined;
  removed_budget?: boolean;
}

export interface IAdminGetProjectsListParams {
  page_size?: number;
  page_index?: number;
  sort_created?: string;
  filter_organization_key?: string;
}
