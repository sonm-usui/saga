export interface IGeneratorEtherscanLink {
  address?: string;
  transactionHash?: string;
}

export interface ITruncateAddress {
  address: string;
  countFirst: number;
  countEnd: number;
}
