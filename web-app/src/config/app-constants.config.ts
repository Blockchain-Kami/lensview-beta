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

export enum networks {
  POLYGON = "POLYGON",
  BASE = "BASE"
}

export enum networIds {
  POLYGON = 137,
  BASE = 8453
}

export enum polygonTokenSymbol {
  BONSAI = "BONSAI",
  USDT = "USDT",
  POINTLESS = "POINTLESS"
}

export enum polygonTokenDecimals {
  BONSAI = 18,
  USDT = 6,
  POINTLESS = 18
}

export enum polygonTokenAddresses {
  BONSAI = "0x3d2bD0e15829AA5C362a4144FdF4A1112fa29B5c",
  USDT = "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
  POINTLESS = "0x9B8cc6320F22325759B7D2CA5CD27347bB4eCD86"
}

export enum baseTokenSymbol {
  TOBY = "TOBY",
  BONSAI = "BONSAI",
  TOSHI = "TOSHI"
}

export enum baseTokenDecimals {
  TOBY = 18,
  BONSAI = 18,
  TOSHI = 18
}
export enum baseTokenAddresses {
  TOBY = "0xb8D98a102b0079B69FFbc760C8d857A31653e56e",
  BONSAI = "0x474f4cb764df9da079D94052fED39625c147C12C",
  TOSHI = "0xAC1Bd2486aAf3B5C0fc3Fd868558b082a531B2B4"
}

export const tokenSymbol = {
  POLYGON: polygonTokenSymbol,
  BASE: baseTokenSymbol
};

export const tokenAddress = {
  POLYGON: polygonTokenAddresses,
  BASE: baseTokenAddresses
};

// TODO: Move it to .env
export const LENSVIEW_TIPPING_ADDRESS_POLYGON: `0x${string}` =
  "0xa854815e3200222E51Dd6028D2DFE6B5755F90a0";

export const LENSVIEW_TIPPING_ADDRESS_BASE: `0x${string}` =
  "0x06B957Dd7C41Bd87D898dC63a7a11a623F1cDaD6";
