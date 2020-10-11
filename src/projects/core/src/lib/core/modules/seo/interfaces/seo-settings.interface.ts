export interface ISeoSettings {
  baseUrl: string;
  logoPathInAssets?: string;
  fbId?: string;
}

export interface IMetaInitSettings {
  pageTitleSeparator?: string;
  applicationName?: string;
  applicationUrl?: string;
  defaults?: {
      title?: string;
      description?: string;
      keywords?: string;
      [key: string]: string | undefined;
  };
}
