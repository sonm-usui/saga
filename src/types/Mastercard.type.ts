export interface IMastercardUserBalance {
  accountAlias: string;
  balance: number;
  tokenIdentifier: {
    chainId: string;
    identifierType: string;
    identifierValue: string;
  };
}
