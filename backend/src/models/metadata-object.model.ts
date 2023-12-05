export interface MetadataObjectModel {
  url: string;
  hashedURL: string;
  hostname: string;
  hashedHostname: string;
  domain: string;
  path: string;
  hashedPath: string;
  query: URLSearchParams;
  lensHandle: string | null;
  postContent: string | null;
  tags: string[];
  image: string;
}
