export default interface PublicationsRequestBodyModel {
  url: string;
  lensHandle: string | null;
  userTags: string[] | null;
  content: string | null;
}
