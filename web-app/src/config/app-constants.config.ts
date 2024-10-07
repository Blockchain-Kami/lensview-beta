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
  BONSAI = "0x3d2bD0e15829AA5C362a4144FdF4A1112fa29B5c",
  USDT = "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
  POINTLESS = "0x9B8cc6320F22325759B7D2CA5CD27347bB4eCD86"
}

export enum tokenSymbol {
  MATIC = "MATIC",
  BONSAI = "BONSAI",
  USDT = "USDT",
  POINTLESS = "POINTLESS"
}

export enum tokenDecimals {
  BONSAI = 18,
  USDT = 6,
  POINTLESS = 18
}

// TODO: Move it to .env
export const LENSVIEW_TIPPING_ADDRESS: `0x${string}` =
  "0xa854815e3200222E51Dd6028D2DFE6B5755F90a0";
