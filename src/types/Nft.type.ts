export interface UserStats {
  beneficiaries_count: number;
  countries_count: number;
  usd: number;
  activities: Activity[];
  countries_data: Activity[];
}
interface Activity {
  name: string;
  amount: number;
}

export interface UserTokens {
  total_count: number;
  page_index: number;
  page_size: number;
  has_next_page: boolean;
  total_pages: number;
  items: Item[];
}
interface Item {
  onchain_metadata: Onchainmetadata;
  key: string;
  organization_key: string;
  name: string;
  type: string;
  country: string;
  state: string;
  township: string;
  period_of_delivery: string;
  estimated_beneficiaries: number;
  tags: any[];
  fund_eth: number;
  status: string;
  removed: boolean;
  start_date: string;
  end_date: string;
  marketplace: string;
  target_group?: string;
  project_goal?: string;
  key_activities?: string;
  main_activities: Mainactivity[];
  activity_reason_and_connection?: string;
  supporting_evidence_and_collection_method?: string;
  coordination_and_permissions?: string;
  accountability_and_feedback?: string;
  safety_and_risk_management?: string;
  financial_management_experience?: string;
  verification_of_results?: string;
  support_needed_from_NRC?: string;
  long_term_partnership_intent?: string;
  budget?: Budget;
  created: string;
  modified: string;
  token_id: string;
  social?: Social;
  description_burmese?: string;
  description_english?: string;
  summary?: string;
  mobile_numbers?: string;
  image?: Image;
}
interface Image {
  original: string;
  large: string;
  medium: string;
  small: string;
}
interface Social {
  facebook: string;
  twitter: string;
  telegram: string;
}
interface Budget {
  fieldname: string;
  name: string;
  location: string;
  key: string;
}
interface Mainactivity {
  delivered_by: string;
  geo_location: string;
  inputs_required: string;
  number_of_supported: string;
  planned_activities: string;
  verification_means: string;
  when: string;
  cost_usd: number;
}
interface Onchainmetadata {
  fund_eth: string;
  funded_by: string;
  txn_hash: string;
}
