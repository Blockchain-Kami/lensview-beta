export interface ReactionRequestBodyModel {
  publicationId: string;
  reaction: ReactionTypes;
}

enum ReactionTypes {
  UPVOTE = "UPVOTE",
  DOWNVOTE = "DOWNVOTE"
}
