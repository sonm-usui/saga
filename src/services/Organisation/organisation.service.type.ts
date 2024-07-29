import { IPostCreateOrganisation } from '../../requests/Organizations/OrganizationsRequest.type';

export interface IPostCreateOrganisationParams {
  params: IPostCreateOrganisation;
  setSubmitting: (isSubmitting: boolean) => void;
}
