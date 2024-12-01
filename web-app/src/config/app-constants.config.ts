export enum AppReactionType {
  UpVote = "UPVOTE",
  DownVote = "DOWNVOTE",
  NoReaction = "NOREACTION"
}

export enum CommentFilterType {
  MostLikedComments = "MOST_LIKED_COMMENTS",
  LatestComments = "LATEST_COMMENTS",
  CommentsById = "COMMENTS_BY_ID",
  FirstMostRelevantComments = "FIRST_MOST_RELEVANT_COMMENTS"
}

export enum DateType {
  ExactDate = "EXACT_DATE",
  RoughDate = "ROUGH_DATE"
}

export enum AttributeKeyType {
  creator = "creator",
  app = "app",
  createdOn = "createdOn",
  mainPostImageUrl = "mainPostImageUrl",
  mainPostUrl = "mainPostUrl"
}

export enum SentimentColor {
  positive = "#3EE54E",
  negative = "#FDB84D",
  neutral = "#6C6C6C"
}

export enum summarySentiment {
  positive = "POSITIVE",
  negative = "NEGATIVE",
  neutral = "NEUTRAL"
}

export enum localStorageKeys {
  authData = "AUTH_DATA"
}

export enum tokenAddress {
  bonsai = "0x3d2bD0e15829AA5C362a4144FdF4A1112fa29B5c"
}

export enum tokenSymbol {
  BONSAI = "BONSAI",
  MATIC = "MATIC"
}
