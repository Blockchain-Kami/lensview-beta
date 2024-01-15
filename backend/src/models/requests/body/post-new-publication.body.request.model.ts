export default interface PostNewPublicationBodyRequestModel {
  url: string;
  lensHandle: string;
  userTags: string[] | null;
}
