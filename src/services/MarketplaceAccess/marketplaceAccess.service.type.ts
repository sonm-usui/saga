import { IGetMarketplaceAccessListParams } from '../../requests/MarketplaceAccess/MarketplaceAccess.type';

export interface IPostCreateOrganisationParams {
  params: IGetMarketplaceAccessListParams;
  setSubmitting: (isSubmitting: boolean) => void;
}
