import { AuthRequest } from './Auth/AuthRequest';
import { CommonRequest } from './Common/CommonRequest';
import { MarketplaceAccessRequest } from './MarketplaceAccess/MarketplaceAccess';
import { OrganizationsRequest } from './Organizations/OrganizationsRequest';
import { ProjectsRequest } from './Projects/ProjectsRequest';
import RequestEnum from './Request.enum';
import { UsersRequest } from './Users/UsersRequest';
import { MastercardRequest } from './Mastercard/MastercardRequest';
import { NftRequest } from './Nft/NftRequest';

const RequestMap = {
  [RequestEnum.ProjectsRequest]: ProjectsRequest,
  [RequestEnum.OrganizationsRequest]: OrganizationsRequest,
  [RequestEnum.CommonRequest]: CommonRequest,
  [RequestEnum.AuthRequest]: AuthRequest,
  [RequestEnum.UsersRequest]: UsersRequest,
  [RequestEnum.MarketplaceAccessRequest]: MarketplaceAccessRequest,
  [RequestEnum.MastercardRequest]: MastercardRequest,
  [RequestEnum.NftRequest]: NftRequest
};

const instances: any = {};

export class RequestFactory {
  static getRequest<T>(className: RequestEnum): T {
    const RequestClass = RequestMap[className];
    if (!RequestClass) {
      throw new Error(`Invalid request class name: ${className}`);
    }

    let requestInstance = instances[className];
    if (!requestInstance) {
      requestInstance = new RequestClass();
      instances[className] = requestInstance;
    }
    return requestInstance;
  }
}

export * from './Projects/ProjectsRequest';
