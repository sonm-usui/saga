export interface IAdminCreateUserParams {
  name: string;
  email: string;
  physical_address: string;
  digital_wallet_address: string;
  organization: string;
  role: string;
}

export interface IGetAdminUsersListParams {
  page_size?: number;
  page_index?: number;
  sort_created?: string;
  filter_role?: string;
}

export interface IGetUsers {
  keys: string;
}
