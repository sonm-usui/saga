import { IMedia, ITag } from './Common.type';
export interface IOnchainMetadata {
  contract_address: string;
  chain: string;
  fund_eth: string;
  funded_by: string;
  txn_hash: string;
}
export interface IProjectItem {
  name: string;
  description_english: string;
  key: string;
  image: IMedia;
  link?: string;
  externalLink?: string;
  tags: ITag[];
  organization_key?: string;
  onchain_metadata: IOnchainMetadata;
  organization_short_title?: string;
  organization_avatar?: IMedia;
  fund_eth: string;
  period_of_delivery: string;
  estimated_beneficiaries: string;
  state?: string;
  country: string;
  township?: string;
  type: string;
  summary?: string;
  created: string;
  token_id?: number | string;
  start_date?: string;
  end_date?: string;
  marketplace?: string;
  main_activities?: any[];
}
