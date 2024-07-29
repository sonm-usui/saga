interface StartIframeOptions {
  env?: string;
  token?: string;
  initPage?: string;
  fund?: string;
  partner?: string;
  showLang?: boolean;
  defaultLang?: string;
  showFunds?: boolean;
  source?: string;
  sourceAmount?: number;
  sourceCurrency?: string;
  sourceFund?: string;
  sourceFundSellPercentage?: string;
  defaultConvertCurrency?: string;
  destination?: string;
  destinationFund?: string;
  destinationUuid?: string;
  payNowCompanyName?: string;
  isPayNow?: boolean;
  referralCode?: string;
  destinationWallet?: string;
  isSmartContract: boolean;
  userWalletAddress: string;
  additionalInfo: string;
}

interface Window {
  startIframe: (options: StartIframeOptions) => void;
  showPopupGbe: () => void;
  hideModalGBE: () => void;
}
