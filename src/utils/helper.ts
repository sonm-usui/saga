import { replace } from 'lodash';
import { APP_ENVIRONMENTS, MEDIA_TYPES } from '../config';
import { IGeneratorEtherscanLink, ITruncateAddress } from './types.helper';

const { S3_URL, IS_PRODUCTION } = APP_ENVIRONMENTS;

export const generatorEtherscanLink = ({ address, transactionHash }: IGeneratorEtherscanLink) => {
  const prod = IS_PRODUCTION;
  const etherscanMainnet = 'https://etherscan.io';
  const etherscanSeploia = 'https://sepolia.etherscan.io';
  const etherscanRootUrl = prod ? etherscanMainnet : etherscanSeploia;

  if (address) {
    return `${etherscanRootUrl}/address/${address}`;
  }

  if (transactionHash) {
    return `${etherscanRootUrl}/tx/${transactionHash}`;
  }

  return etherscanRootUrl;
};

export const truncateAddress = ({ address, countFirst, countEnd }: ITruncateAddress) => {
  if (!address) return 'No address';

  const regex = new RegExp(
    `^(0x[a-zA-Z0-9]{${countFirst}})[a-zA-Z0-9]+([a-zA-Z0-9]{${countEnd}})$`
  );

  const match = address.match(regex);

  if (!match) return address;
  return `${match[1]}…${match[2]}`;
};

export const prefixS3Url = (url: string) => {
  if (url) {
    return `${S3_URL}/${url}`;
  }
  return url;
};

export const checkMediaType = (url: string) => {
  if (!url) return MEDIA_TYPES.UNKNOWN;

  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'svg'];
  const videoExtensions = ['mp4', 'mov', 'avi', 'wmv', 'flv', '3gp', 'webm', 'mkv'];

  const extension = url.split('.').pop();
  if (!extension) return MEDIA_TYPES.UNKNOWN;

  const isImage = imageExtensions.includes(extension);
  const isVideo = videoExtensions.includes(extension);

  if (isImage) {
    return MEDIA_TYPES.IMAGE;
  }
  if (isVideo) {
    return MEDIA_TYPES.VIDEO;
  }
};

export const convertGbpToEth = (value: number | string) => {
  value = Number(value) / 1500;
  const numarray = String(value).split('.');
  if (numarray.length < 2 || numarray[1].length <= 2) {
    return Number(value).toLocaleString('en-US');
  }
  return Number(numarray[0]).toLocaleString('en-US') + '.' + numarray[1].slice(0, 2);
};

export const displayCountryAddress = (country: string, state?: string, township?: string) => {
  if (state && township) {
    return `${country} - ${state}, ${township}`;
  }
  if (state) {
    return `${country} - ${state}`;
  }
  if (township) {
    return `${country} - ${township}`;
  }
  return country;
};

export const monthDiff = (d1: any, d2: any, period: string) => {
  let months;
  if (!d1 && !d2) {
    const days = period.split(' - ');
    d1 = days[0];
    d2 = days[1];
  }
  months = (new Date(d2).getUTCFullYear() - new Date(d1).getUTCFullYear()) * 12;
  months -= new Date(d1).getUTCMonth();
  months += new Date(d2).getUTCMonth();
  months = Number(months) + 1;
  if (months <= 0) return '0 month';
  if (months === 1) return '1 month';
  return `${months} months`;
};

export const replaceProjectType = (types: string) => {
  return replace(
    types,
    'Water sanitation and hygiene (WASH)',
    'Water, sanitation and hygiene (WASH)'
  );
};
