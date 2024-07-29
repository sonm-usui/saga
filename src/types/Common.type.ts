export interface ITag {
  key: string;
  value: string;
}
export interface IMedia {
  small: string;
  original: string;
  medium: string;
  large: string;
}
export interface ISocials {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  location?: string;
}

export interface IDocumentItem {
  fieldname: string;
  key: string;
  location: string;
  name: string;
}

export interface IDocumentType {
  title: string;
  description: string;
  yesText: string;
  noText: string;
  key: string;
  uploadDisabled?: boolean;
}
