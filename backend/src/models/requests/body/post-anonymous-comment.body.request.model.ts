export default interface PostAnonymousCommentRequestBodyModel {
  url: string;
  userTags: string[] | null;
  content: string;
}
