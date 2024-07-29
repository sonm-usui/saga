export interface IGetMarketplaceAccessListParams {
  page_size?: number;
  page_index?: number;
  sort_created?: string;
  filter_role?: string;
  filter_organization_key?: string;
}

export interface IPostRequestAccessParams {
  marketplace: string;
  user_key?: string;
  org_key?: string;
}

export interface IGetListOptionsRequestAccessParams {
  user_key?: string;
  org_key?: string;
}
