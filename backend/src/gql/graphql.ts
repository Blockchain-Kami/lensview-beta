/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BlockchainData: { input: any; output: any; }
  BroadcastId: { input: any; output: any; }
  ChainId: { input: any; output: any; }
  CollectModuleData: { input: any; output: any; }
  ContentEncryptionKey: { input: any; output: any; }
  ContractAddress: { input: any; output: any; }
  CreateHandle: { input: any; output: any; }
  Cursor: { input: any; output: any; }
  DataAvailabilityId: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  EncryptedValueScalar: { input: any; output: any; }
  Ens: { input: any; output: any; }
  EthereumAddress: { input: any; output: any; }
  FollowModuleData: { input: any; output: any; }
  Handle: { input: any; output: any; }
  HandleClaimIdScalar: { input: any; output: any; }
  ImageSizeTransform: { input: any; output: any; }
  InternalPublicationId: { input: any; output: any; }
  IpfsCid: { input: any; output: any; }
  Jwt: { input: any; output: any; }
  LimitScalar: { input: any; output: any; }
  Locale: { input: any; output: any; }
  Markdown: { input: any; output: any; }
  MimeType: { input: any; output: any; }
  NftGalleryId: { input: any; output: any; }
  NftGalleryName: { input: any; output: any; }
  NftOwnershipId: { input: any; output: any; }
  Nonce: { input: any; output: any; }
  NotificationId: { input: any; output: any; }
  ProfileId: { input: any; output: any; }
  ProfileInterest: { input: any; output: any; }
  ProxyActionId: { input: any; output: any; }
  PublicationId: { input: any; output: any; }
  PublicationTag: { input: any; output: any; }
  PublicationUrl: { input: any; output: any; }
  ReactionId: { input: any; output: any; }
  ReferenceModuleData: { input: any; output: any; }
  Search: { input: any; output: any; }
  Signature: { input: any; output: any; }
  Sources: { input: any; output: any; }
  TimestampScalar: { input: any; output: any; }
  TokenId: { input: any; output: any; }
  TxHash: { input: any; output: any; }
  TxId: { input: any; output: any; }
  UnixTimestamp: { input: any; output: any; }
  Url: { input: any; output: any; }
  Void: { input: any; output: any; }
};

export type AaveFeeCollectModuleParams = {
  amount: ModuleFeeAmountParams;
  collectLimit?: InputMaybe<Scalars['String']['input']>;
  endTimestamp?: InputMaybe<Scalars['DateTime']['input']>;
  followerOnly: Scalars['Boolean']['input'];
  recipient: Scalars['EthereumAddress']['input'];
  referralFee: Scalars['Float']['input'];
};

export type AaveFeeCollectModuleSettings = {
  __typename?: 'AaveFeeCollectModuleSettings';
  amount: ModuleFeeAmount;
  collectLimit?: Maybe<Scalars['String']['output']>;
  contractAddress: Scalars['ContractAddress']['output'];
  endTimestamp?: Maybe<Scalars['DateTime']['output']>;
  followerOnly: Scalars['Boolean']['output'];
  recipient: Scalars['EthereumAddress']['output'];
  referralFee: Scalars['Float']['output'];
  type: CollectModules;
};

export type AccessConditionInput = {
  and?: InputMaybe<AndConditionInput>;
  collect?: InputMaybe<CollectConditionInput>;
  eoa?: InputMaybe<EoaOwnershipInput>;
  follow?: InputMaybe<FollowConditionInput>;
  nft?: InputMaybe<NftOwnershipInput>;
  or?: InputMaybe<OrConditionInput>;
  profile?: InputMaybe<ProfileOwnershipInput>;
  token?: InputMaybe<Erc20OwnershipInput>;
};

export type AccessConditionOutput = {
  __typename?: 'AccessConditionOutput';
  and?: Maybe<AndConditionOutput>;
  collect?: Maybe<CollectConditionOutput>;
  eoa?: Maybe<EoaOwnershipOutput>;
  follow?: Maybe<FollowConditionOutput>;
  nft?: Maybe<NftOwnershipOutput>;
  or?: Maybe<OrConditionOutput>;
  profile?: Maybe<ProfileOwnershipOutput>;
  token?: Maybe<Erc20OwnershipOutput>;
};

export type AchRequest = {
  ethereumAddress: Scalars['EthereumAddress']['input'];
  freeTextHandle?: InputMaybe<Scalars['Boolean']['input']>;
  handle?: InputMaybe<Scalars['CreateHandle']['input']>;
  overrideAlreadyClaimed: Scalars['Boolean']['input'];
  overrideTradeMark: Scalars['Boolean']['input'];
  secret: Scalars['String']['input'];
};

export type AddProfileInterestsRequest = {
  interests: Array<Scalars['ProfileInterest']['input']>;
  profileId: Scalars['ProfileId']['input'];
};

export type AllPublicationsTagsRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<Scalars['LimitScalar']['input']>;
  sort: TagSortCriteria;
  source?: InputMaybe<Scalars['Sources']['input']>;
};

export type AlreadyInvitedCheckRequest = {
  address: Scalars['EthereumAddress']['input'];
};

export type AndConditionInput = {
  criteria: Array<AccessConditionInput>;
};

export type AndConditionOutput = {
  __typename?: 'AndConditionOutput';
  criteria: Array<AccessConditionOutput>;
};

export type ApprovedAllowanceAmount = {
  __typename?: 'ApprovedAllowanceAmount';
  allowance: Scalars['String']['output'];
  contractAddress: Scalars['ContractAddress']['output'];
  currency: Scalars['ContractAddress']['output'];
  module: Scalars['String']['output'];
};

export type ApprovedModuleAllowanceAmountRequest = {
  collectModules?: InputMaybe<Array<CollectModules>>;
  currencies: Array<Scalars['ContractAddress']['input']>;
  followModules?: InputMaybe<Array<FollowModules>>;
  referenceModules?: InputMaybe<Array<ReferenceModules>>;
  unknownCollectModules?: InputMaybe<Array<Scalars['ContractAddress']['input']>>;
  unknownFollowModules?: InputMaybe<Array<Scalars['ContractAddress']['input']>>;
  unknownReferenceModules?: InputMaybe<Array<Scalars['ContractAddress']['input']>>;
};

export type Attribute = {
  __typename?: 'Attribute';
  displayType?: Maybe<Scalars['String']['output']>;
  key: Scalars['String']['output'];
  traitType?: Maybe<Scalars['String']['output']>;
  value: Scalars['String']['output'];
};

export type AuthChallengeResult = {
  __typename?: 'AuthChallengeResult';
  text: Scalars['String']['output'];
};

export type AuthenticationResult = {
  __typename?: 'AuthenticationResult';
  accessToken: Scalars['Jwt']['output'];
  refreshToken: Scalars['Jwt']['output'];
};

export type BroadcastDataAvailabilityUnion = CreateDataAvailabilityPublicationResult | RelayError;

export type BroadcastRequest = {
  id: Scalars['BroadcastId']['input'];
  signature: Scalars['Signature']['input'];
};

export type BurnProfileRequest = {
  profileId: Scalars['ProfileId']['input'];
};

export type CanCommentResponse = {
  __typename?: 'CanCommentResponse';
  result: Scalars['Boolean']['output'];
};

export type CanDecryptResponse = {
  __typename?: 'CanDecryptResponse';
  extraDetails?: Maybe<Scalars['String']['output']>;
  reasons?: Maybe<Array<DecryptFailReason>>;
  result: Scalars['Boolean']['output'];
};

export type CanMirrorResponse = {
  __typename?: 'CanMirrorResponse';
  result: Scalars['Boolean']['output'];
};

export type ChallengeRequest = {
  address: Scalars['EthereumAddress']['input'];
};

export type ClaimHandleRequest = {
  followModule?: InputMaybe<FollowModuleParams>;
  freeTextHandle?: InputMaybe<Scalars['CreateHandle']['input']>;
  id?: InputMaybe<Scalars['HandleClaimIdScalar']['input']>;
};

export enum ClaimStatus {
  AlreadyClaimed = 'ALREADY_CLAIMED',
  ClaimFailed = 'CLAIM_FAILED',
  NotClaimed = 'NOT_CLAIMED'
}

export type ClaimableHandles = {
  __typename?: 'ClaimableHandles';
  canClaimFreeTextHandle: Scalars['Boolean']['output'];
  reservedHandles: Array<ReservedClaimableHandle>;
};

export type CollectConditionInput = {
  publicationId?: InputMaybe<Scalars['InternalPublicationId']['input']>;
  thisPublication?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CollectConditionOutput = {
  __typename?: 'CollectConditionOutput';
  publicationId?: Maybe<Scalars['InternalPublicationId']['output']>;
  thisPublication?: Maybe<Scalars['Boolean']['output']>;
};

export type CollectModule = AaveFeeCollectModuleSettings | Erc4626FeeCollectModuleSettings | FeeCollectModuleSettings | FreeCollectModuleSettings | LimitedFeeCollectModuleSettings | LimitedTimedFeeCollectModuleSettings | MultirecipientFeeCollectModuleSettings | RevertCollectModuleSettings | SimpleCollectModuleSettings | TimedFeeCollectModuleSettings | UnknownCollectModuleSettings;

export type CollectModuleParams = {
  aaveFeeCollectModule?: InputMaybe<AaveFeeCollectModuleParams>;
  erc4626FeeCollectModule?: InputMaybe<Erc4626FeeCollectModuleParams>;
  feeCollectModule?: InputMaybe<FeeCollectModuleParams>;
  freeCollectModule?: InputMaybe<FreeCollectModuleParams>;
  limitedFeeCollectModule?: InputMaybe<LimitedFeeCollectModuleParams>;
  limitedTimedFeeCollectModule?: InputMaybe<LimitedTimedFeeCollectModuleParams>;
  multirecipientFeeCollectModule?: InputMaybe<MultirecipientFeeCollectModuleParams>;
  revertCollectModule?: InputMaybe<Scalars['Boolean']['input']>;
  simpleCollectModule?: InputMaybe<SimpleCollectModuleParams>;
  timedFeeCollectModule?: InputMaybe<TimedFeeCollectModuleParams>;
  unknownCollectModule?: InputMaybe<UnknownCollectModuleParams>;
};

export enum CollectModules {
  AaveFeeCollectModule = 'AaveFeeCollectModule',
  Erc4626FeeCollectModule = 'ERC4626FeeCollectModule',
  FeeCollectModule = 'FeeCollectModule',
  FreeCollectModule = 'FreeCollectModule',
  LimitedFeeCollectModule = 'LimitedFeeCollectModule',
  LimitedTimedFeeCollectModule = 'LimitedTimedFeeCollectModule',
  MultirecipientFeeCollectModule = 'MultirecipientFeeCollectModule',
  RevertCollectModule = 'RevertCollectModule',
  SimpleCollectModule = 'SimpleCollectModule',
  TimedFeeCollectModule = 'TimedFeeCollectModule',
  UnknownCollectModule = 'UnknownCollectModule'
}

export type CollectProxyAction = {
  freeCollect?: InputMaybe<FreeCollectProxyAction>;
};

export type CollectedEvent = {
  __typename?: 'CollectedEvent';
  profile: Profile;
  timestamp: Scalars['DateTime']['output'];
};

export type Comment = {
  __typename?: 'Comment';
  appId?: Maybe<Scalars['Sources']['output']>;
  bookmarked: Scalars['Boolean']['output'];
  canComment: CanCommentResponse;
  canDecrypt: CanDecryptResponse;
  canMirror: CanMirrorResponse;
  collectModule: CollectModule;
  collectNftAddress?: Maybe<Scalars['ContractAddress']['output']>;
  collectedBy?: Maybe<Wallet>;
  commentOn?: Maybe<Publication>;
  createdAt: Scalars['DateTime']['output'];
  dataAvailabilityProofs?: Maybe<Scalars['String']['output']>;
  firstComment?: Maybe<Comment>;
  hasCollectedByMe: Scalars['Boolean']['output'];
  hidden: Scalars['Boolean']['output'];
  id: Scalars['InternalPublicationId']['output'];
  isDataAvailability: Scalars['Boolean']['output'];
  isGated: Scalars['Boolean']['output'];
  mainPost: MainPostReference;
  metadata: MetadataOutput;
  mirrors: Array<Scalars['InternalPublicationId']['output']>;
  notInterested: Scalars['Boolean']['output'];
  onChainContentURI: Scalars['String']['output'];
  profile: Profile;
  rankingScore?: Maybe<Scalars['Float']['output']>;
  reaction?: Maybe<ReactionTypes>;
  referenceModule?: Maybe<ReferenceModule>;
  stats: PublicationStats;
};


export type CommentBookmarkedArgs = {
  by?: InputMaybe<Scalars['ProfileId']['input']>;
};


export type CommentCanCommentArgs = {
  profileId?: InputMaybe<Scalars['ProfileId']['input']>;
};


export type CommentCanDecryptArgs = {
  address?: InputMaybe<Scalars['EthereumAddress']['input']>;
  profileId?: InputMaybe<Scalars['ProfileId']['input']>;
};


export type CommentCanMirrorArgs = {
  profileId?: InputMaybe<Scalars['ProfileId']['input']>;
};


export type CommentHasCollectedByMeArgs = {
  isFinalisedOnChain?: InputMaybe<Scalars['Boolean']['input']>;
};


export type CommentMirrorsArgs = {
  by?: InputMaybe<Scalars['ProfileId']['input']>;
};


export type CommentNotInterestedArgs = {
  by?: InputMaybe<Scalars['ProfileId']['input']>;
};


export type CommentReactionArgs = {
  request?: InputMaybe<ReactionFieldResolverRequest>;
};

export enum CommentOrderingTypes {
  Desc = 'DESC',
  Ranking = 'RANKING'
}

export enum CommentRankingFilter {
  NoneRelevant = 'NONE_RELEVANT',
  Relevant = 'RELEVANT'
}

export enum ContractType {
  Erc20 = 'ERC20',
  Erc721 = 'ERC721',
  Erc1155 = 'ERC1155'
}

export type CreateBurnEip712TypedData = {
  __typename?: 'CreateBurnEIP712TypedData';
  domain: Eip712TypedDataDomain;
  types: CreateBurnEip712TypedDataTypes;
  value: CreateBurnEip712TypedDataValue;
};

export type CreateBurnEip712TypedDataTypes = {
  __typename?: 'CreateBurnEIP712TypedDataTypes';
  BurnWithSig: Array<Eip712TypedDataField>;
};

export type CreateBurnEip712TypedDataValue = {
  __typename?: 'CreateBurnEIP712TypedDataValue';
  deadline: Scalars['UnixTimestamp']['output'];
  nonce: Scalars['Nonce']['output'];
  tokenId: Scalars['String']['output'];
};

export type CreateBurnProfileBroadcastItemResult = {
  __typename?: 'CreateBurnProfileBroadcastItemResult';
  expiresAt: Scalars['DateTime']['output'];
  id: Scalars['BroadcastId']['output'];
  typedData: CreateBurnEip712TypedData;
};

export type CreateCollectBroadcastItemResult = {
  __typename?: 'CreateCollectBroadcastItemResult';
  expiresAt: Scalars['DateTime']['output'];
  id: Scalars['BroadcastId']['output'];
  typedData: CreateCollectEip712TypedData;
};

export type CreateCollectEip712TypedData = {
  __typename?: 'CreateCollectEIP712TypedData';
  domain: Eip712TypedDataDomain;
  types: CreateCollectEip712TypedDataTypes;
  value: CreateCollectEip712TypedDataValue;
};

export type CreateCollectEip712TypedDataTypes = {
  __typename?: 'CreateCollectEIP712TypedDataTypes';
  CollectWithSig: Array<Eip712TypedDataField>;
};

export type CreateCollectEip712TypedDataValue = {
  __typename?: 'CreateCollectEIP712TypedDataValue';
  data: Scalars['BlockchainData']['output'];
  deadline: Scalars['UnixTimestamp']['output'];
  nonce: Scalars['Nonce']['output'];
  profileId: Scalars['ProfileId']['output'];
  pubId: Scalars['PublicationId']['output'];
};

export type CreateCollectRequest = {
  publicationId: Scalars['InternalPublicationId']['input'];
  unknownModuleData?: InputMaybe<Scalars['BlockchainData']['input']>;
};

export type CreateCommentBroadcastItemResult = {
  __typename?: 'CreateCommentBroadcastItemResult';
  expiresAt: Scalars['DateTime']['output'];
  id: Scalars['BroadcastId']['output'];
  typedData: CreateCommentEip712TypedData;
};

export type CreateCommentEip712TypedData = {
  __typename?: 'CreateCommentEIP712TypedData';
  domain: Eip712TypedDataDomain;
  types: CreateCommentEip712TypedDataTypes;
  value: CreateCommentEip712TypedDataValue;
};

export type CreateCommentEip712TypedDataTypes = {
  __typename?: 'CreateCommentEIP712TypedDataTypes';
  CommentWithSig: Array<Eip712TypedDataField>;
};

export type CreateCommentEip712TypedDataValue = {
  __typename?: 'CreateCommentEIP712TypedDataValue';
  collectModule: Scalars['ContractAddress']['output'];
  collectModuleInitData: Scalars['CollectModuleData']['output'];
  contentURI: Scalars['PublicationUrl']['output'];
  deadline: Scalars['UnixTimestamp']['output'];
  nonce: Scalars['Nonce']['output'];
  profileId: Scalars['ProfileId']['output'];
  profileIdPointed: Scalars['ProfileId']['output'];
  pubIdPointed: Scalars['PublicationId']['output'];
  referenceModule: Scalars['ContractAddress']['output'];
  referenceModuleData: Scalars['ReferenceModuleData']['output'];
  referenceModuleInitData: Scalars['ReferenceModuleData']['output'];
};

export type CreateDataAvailabilityCommentRequest = {
  commentOn: Scalars['InternalPublicationId']['input'];
  contentURI: Scalars['Url']['input'];
  from: Scalars['ProfileId']['input'];
};

export type CreateDataAvailabilityMirrorRequest = {
  from: Scalars['ProfileId']['input'];
  mirror: Scalars['InternalPublicationId']['input'];
};

export type CreateDataAvailabilityPostRequest = {
  contentURI: Scalars['Url']['input'];
  from: Scalars['ProfileId']['input'];
};

export type CreateDataAvailabilityPublicationResult = {
  __typename?: 'CreateDataAvailabilityPublicationResult';
  dataAvailabilityId: Scalars['DataAvailabilityId']['output'];
  id: Scalars['InternalPublicationId']['output'];
  proofs: Scalars['String']['output'];
};

export type CreateFollowBroadcastItemResult = {
  __typename?: 'CreateFollowBroadcastItemResult';
  expiresAt: Scalars['DateTime']['output'];
  id: Scalars['BroadcastId']['output'];
  typedData: CreateFollowEip712TypedData;
};

export type CreateFollowEip712TypedData = {
  __typename?: 'CreateFollowEIP712TypedData';
  domain: Eip712TypedDataDomain;
  types: CreateFollowEip712TypedDataTypes;
  value: CreateFollowEip712TypedDataValue;
};

export type CreateFollowEip712TypedDataTypes = {
  __typename?: 'CreateFollowEIP712TypedDataTypes';
  FollowWithSig: Array<Eip712TypedDataField>;
};

export type CreateFollowEip712TypedDataValue = {
  __typename?: 'CreateFollowEIP712TypedDataValue';
  datas: Array<Scalars['BlockchainData']['output']>;
  deadline: Scalars['UnixTimestamp']['output'];
  nonce: Scalars['Nonce']['output'];
  profileIds: Array<Scalars['ProfileId']['output']>;
};

export type CreateMirrorBroadcastItemResult = {
  __typename?: 'CreateMirrorBroadcastItemResult';
  expiresAt: Scalars['DateTime']['output'];
  id: Scalars['BroadcastId']['output'];
  typedData: CreateMirrorEip712TypedData;
};

export type CreateMirrorEip712TypedData = {
  __typename?: 'CreateMirrorEIP712TypedData';
  domain: Eip712TypedDataDomain;
  types: CreateMirrorEip712TypedDataTypes;
  value: CreateMirrorEip712TypedDataValue;
};

export type CreateMirrorEip712TypedDataTypes = {
  __typename?: 'CreateMirrorEIP712TypedDataTypes';
  MirrorWithSig: Array<Eip712TypedDataField>;
};

export type CreateMirrorEip712TypedDataValue = {
  __typename?: 'CreateMirrorEIP712TypedDataValue';
  deadline: Scalars['UnixTimestamp']['output'];
  nonce: Scalars['Nonce']['output'];
  profileId: Scalars['ProfileId']['output'];
  profileIdPointed: Scalars['ProfileId']['output'];
  pubIdPointed: Scalars['PublicationId']['output'];
  referenceModule: Scalars['ContractAddress']['output'];
  referenceModuleData: Scalars['ReferenceModuleData']['output'];
  referenceModuleInitData: Scalars['ReferenceModuleData']['output'];
};

export type CreateMirrorRequest = {
  profileId: Scalars['ProfileId']['input'];
  publicationId: Scalars['InternalPublicationId']['input'];
  referenceModule?: InputMaybe<ReferenceModuleParams>;
};

export type CreatePostBroadcastItemResult = {
  __typename?: 'CreatePostBroadcastItemResult';
  expiresAt: Scalars['DateTime']['output'];
  id: Scalars['BroadcastId']['output'];
  typedData: CreatePostEip712TypedData;
};

export type CreatePostEip712TypedData = {
  __typename?: 'CreatePostEIP712TypedData';
  domain: Eip712TypedDataDomain;
  types: CreatePostEip712TypedDataTypes;
  value: CreatePostEip712TypedDataValue;
};

export type CreatePostEip712TypedDataTypes = {
  __typename?: 'CreatePostEIP712TypedDataTypes';
  PostWithSig: Array<Eip712TypedDataField>;
};

export type CreatePostEip712TypedDataValue = {
  __typename?: 'CreatePostEIP712TypedDataValue';
  collectModule: Scalars['ContractAddress']['output'];
  collectModuleInitData: Scalars['CollectModuleData']['output'];
  contentURI: Scalars['PublicationUrl']['output'];
  deadline: Scalars['UnixTimestamp']['output'];
  nonce: Scalars['Nonce']['output'];
  profileId: Scalars['ProfileId']['output'];
  referenceModule: Scalars['ContractAddress']['output'];
  referenceModuleInitData: Scalars['ReferenceModuleData']['output'];
};

export type CreateProfileRequest = {
  followModule?: InputMaybe<FollowModuleParams>;
  followNFTURI?: InputMaybe<Scalars['Url']['input']>;
  handle: Scalars['CreateHandle']['input'];
  profilePictureUri?: InputMaybe<Scalars['Url']['input']>;
};

export type CreatePublicCommentRequest = {
  collectModule: CollectModuleParams;
  contentURI: Scalars['Url']['input'];
  gated?: InputMaybe<GatedPublicationParamsInput>;
  profileId: Scalars['ProfileId']['input'];
  publicationId: Scalars['InternalPublicationId']['input'];
  referenceModule?: InputMaybe<ReferenceModuleParams>;
};

export type CreatePublicPostRequest = {
  collectModule: CollectModuleParams;
  contentURI: Scalars['Url']['input'];
  gated?: InputMaybe<GatedPublicationParamsInput>;
  profileId: Scalars['ProfileId']['input'];
  referenceModule?: InputMaybe<ReferenceModuleParams>;
};

export type CreatePublicSetProfileMetadataUriRequest = {
  metadata: Scalars['Url']['input'];
  profileId: Scalars['ProfileId']['input'];
};

export type CreateSetDefaultProfileRequest = {
  profileId: Scalars['ProfileId']['input'];
};

export type CreateSetDispatcherBroadcastItemResult = {
  __typename?: 'CreateSetDispatcherBroadcastItemResult';
  expiresAt: Scalars['DateTime']['output'];
  id: Scalars['BroadcastId']['output'];
  typedData: CreateSetDispatcherEip712TypedData;
};

export type CreateSetDispatcherEip712TypedData = {
  __typename?: 'CreateSetDispatcherEIP712TypedData';
  domain: Eip712TypedDataDomain;
  types: CreateSetDispatcherEip712TypedDataTypes;
  value: CreateSetDispatcherEip712TypedDataValue;
};

export type CreateSetDispatcherEip712TypedDataTypes = {
  __typename?: 'CreateSetDispatcherEIP712TypedDataTypes';
  SetDispatcherWithSig: Array<Eip712TypedDataField>;
};

export type CreateSetDispatcherEip712TypedDataValue = {
  __typename?: 'CreateSetDispatcherEIP712TypedDataValue';
  deadline: Scalars['UnixTimestamp']['output'];
  dispatcher: Scalars['EthereumAddress']['output'];
  nonce: Scalars['Nonce']['output'];
  profileId: Scalars['ProfileId']['output'];
};

export type CreateSetFollowModuleBroadcastItemResult = {
  __typename?: 'CreateSetFollowModuleBroadcastItemResult';
  expiresAt: Scalars['DateTime']['output'];
  id: Scalars['BroadcastId']['output'];
  typedData: CreateSetFollowModuleEip712TypedData;
};

export type CreateSetFollowModuleEip712TypedData = {
  __typename?: 'CreateSetFollowModuleEIP712TypedData';
  domain: Eip712TypedDataDomain;
  types: CreateSetFollowModuleEip712TypedDataTypes;
  value: CreateSetFollowModuleEip712TypedDataValue;
};

export type CreateSetFollowModuleEip712TypedDataTypes = {
  __typename?: 'CreateSetFollowModuleEIP712TypedDataTypes';
  SetFollowModuleWithSig: Array<Eip712TypedDataField>;
};

export type CreateSetFollowModuleEip712TypedDataValue = {
  __typename?: 'CreateSetFollowModuleEIP712TypedDataValue';
  deadline: Scalars['UnixTimestamp']['output'];
  followModule: Scalars['ContractAddress']['output'];
  followModuleInitData: Scalars['FollowModuleData']['output'];
  nonce: Scalars['Nonce']['output'];
  profileId: Scalars['ProfileId']['output'];
};

export type CreateSetFollowModuleRequest = {
  followModule: FollowModuleParams;
  profileId: Scalars['ProfileId']['input'];
};

export type CreateSetFollowNftUriBroadcastItemResult = {
  __typename?: 'CreateSetFollowNFTUriBroadcastItemResult';
  expiresAt: Scalars['DateTime']['output'];
  id: Scalars['BroadcastId']['output'];
  typedData: CreateSetFollowNftUriEip712TypedData;
};

export type CreateSetFollowNftUriEip712TypedData = {
  __typename?: 'CreateSetFollowNFTUriEIP712TypedData';
  domain: Eip712TypedDataDomain;
  types: CreateSetFollowNftUriEip712TypedDataTypes;
  value: CreateSetFollowNftUriEip712TypedDataValue;
};

export type CreateSetFollowNftUriEip712TypedDataTypes = {
  __typename?: 'CreateSetFollowNFTUriEIP712TypedDataTypes';
  SetFollowNFTURIWithSig: Array<Eip712TypedDataField>;
};

export type CreateSetFollowNftUriEip712TypedDataValue = {
  __typename?: 'CreateSetFollowNFTUriEIP712TypedDataValue';
  deadline: Scalars['UnixTimestamp']['output'];
  followNFTURI: Scalars['Url']['output'];
  nonce: Scalars['Nonce']['output'];
  profileId: Scalars['ProfileId']['output'];
};

export type CreateSetFollowNftUriRequest = {
  followNFTURI?: InputMaybe<Scalars['Url']['input']>;
  profileId: Scalars['ProfileId']['input'];
};

export type CreateSetProfileImageUriBroadcastItemResult = {
  __typename?: 'CreateSetProfileImageUriBroadcastItemResult';
  expiresAt: Scalars['DateTime']['output'];
  id: Scalars['BroadcastId']['output'];
  typedData: CreateSetProfileImageUriEip712TypedData;
};

export type CreateSetProfileImageUriEip712TypedData = {
  __typename?: 'CreateSetProfileImageUriEIP712TypedData';
  domain: Eip712TypedDataDomain;
  types: CreateSetProfileImageUriEip712TypedDataTypes;
  value: CreateSetProfileImageUriEip712TypedDataValue;
};

export type CreateSetProfileImageUriEip712TypedDataTypes = {
  __typename?: 'CreateSetProfileImageUriEIP712TypedDataTypes';
  SetProfileImageURIWithSig: Array<Eip712TypedDataField>;
};

export type CreateSetProfileImageUriEip712TypedDataValue = {
  __typename?: 'CreateSetProfileImageUriEIP712TypedDataValue';
  deadline: Scalars['UnixTimestamp']['output'];
  imageURI: Scalars['Url']['output'];
  nonce: Scalars['Nonce']['output'];
  profileId: Scalars['ProfileId']['output'];
};

export type CreateSetProfileMetadataUriBroadcastItemResult = {
  __typename?: 'CreateSetProfileMetadataURIBroadcastItemResult';
  expiresAt: Scalars['DateTime']['output'];
  id: Scalars['BroadcastId']['output'];
  typedData: CreateSetProfileMetadataUrieip712TypedData;
};

export type CreateSetProfileMetadataUrieip712TypedData = {
  __typename?: 'CreateSetProfileMetadataURIEIP712TypedData';
  domain: Eip712TypedDataDomain;
  types: CreateSetProfileMetadataUrieip712TypedDataTypes;
  value: CreateSetProfileMetadataUrieip712TypedDataValue;
};

export type CreateSetProfileMetadataUrieip712TypedDataTypes = {
  __typename?: 'CreateSetProfileMetadataURIEIP712TypedDataTypes';
  SetProfileMetadataURIWithSig: Array<Eip712TypedDataField>;
};

export type CreateSetProfileMetadataUrieip712TypedDataValue = {
  __typename?: 'CreateSetProfileMetadataURIEIP712TypedDataValue';
  deadline: Scalars['UnixTimestamp']['output'];
  metadata: Scalars['Url']['output'];
  nonce: Scalars['Nonce']['output'];
  profileId: Scalars['ProfileId']['output'];
};

export type CreateToggleFollowBroadcastItemResult = {
  __typename?: 'CreateToggleFollowBroadcastItemResult';
  expiresAt: Scalars['DateTime']['output'];
  id: Scalars['BroadcastId']['output'];
  typedData: CreateToggleFollowEip712TypedData;
};

export type CreateToggleFollowEip712TypedData = {
  __typename?: 'CreateToggleFollowEIP712TypedData';
  domain: Eip712TypedDataDomain;
  types: CreateToggleFollowEip712TypedDataTypes;
  value: CreateToggleFollowEip712TypedDataValue;
};

export type CreateToggleFollowEip712TypedDataTypes = {
  __typename?: 'CreateToggleFollowEIP712TypedDataTypes';
  ToggleFollowWithSig: Array<Eip712TypedDataField>;
};

export type CreateToggleFollowEip712TypedDataValue = {
  __typename?: 'CreateToggleFollowEIP712TypedDataValue';
  deadline: Scalars['UnixTimestamp']['output'];
  enables: Array<Scalars['Boolean']['output']>;
  nonce: Scalars['Nonce']['output'];
  profileIds: Array<Scalars['ProfileId']['output']>;
};

export type CreateToggleFollowRequest = {
  enables: Array<Scalars['Boolean']['input']>;
  profileIds: Array<Scalars['ProfileId']['input']>;
};

export type CreateUnfollowBroadcastItemResult = {
  __typename?: 'CreateUnfollowBroadcastItemResult';
  expiresAt: Scalars['DateTime']['output'];
  id: Scalars['BroadcastId']['output'];
  typedData: CreateBurnEip712TypedData;
};

export type CurRequest = {
  secret: Scalars['String']['input'];
};

export enum CustomFiltersTypes {
  Gardeners = 'GARDENERS'
}

export type DataAvailabilityComment = {
  __typename?: 'DataAvailabilityComment';
  appId?: Maybe<Scalars['Sources']['output']>;
  commentedOnProfile: Profile;
  commentedOnPublicationId: Scalars['InternalPublicationId']['output'];
  createdAt: Scalars['DateTime']['output'];
  profile: Profile;
  publicationId: Scalars['InternalPublicationId']['output'];
  submitter: Scalars['EthereumAddress']['output'];
  transactionId: Scalars['String']['output'];
  verificationStatus: DataAvailabilityVerificationStatusUnion;
};

export type DataAvailabilityMirror = {
  __typename?: 'DataAvailabilityMirror';
  appId?: Maybe<Scalars['Sources']['output']>;
  createdAt: Scalars['DateTime']['output'];
  mirrorOfProfile: Profile;
  mirrorOfPublicationId: Scalars['InternalPublicationId']['output'];
  profile: Profile;
  publicationId: Scalars['InternalPublicationId']['output'];
  submitter: Scalars['EthereumAddress']['output'];
  transactionId: Scalars['String']['output'];
  verificationStatus: DataAvailabilityVerificationStatusUnion;
};

export type DataAvailabilityPost = {
  __typename?: 'DataAvailabilityPost';
  appId?: Maybe<Scalars['Sources']['output']>;
  createdAt: Scalars['DateTime']['output'];
  profile: Profile;
  publicationId: Scalars['InternalPublicationId']['output'];
  submitter: Scalars['EthereumAddress']['output'];
  transactionId: Scalars['String']['output'];
  verificationStatus: DataAvailabilityVerificationStatusUnion;
};

export type DataAvailabilitySubmitterResult = {
  __typename?: 'DataAvailabilitySubmitterResult';
  address: Scalars['EthereumAddress']['output'];
  name: Scalars['String']['output'];
  totalTransactions: Scalars['Int']['output'];
};

export type DataAvailabilitySubmittersResult = {
  __typename?: 'DataAvailabilitySubmittersResult';
  items: Array<DataAvailabilitySubmitterResult>;
  pageInfo: PaginatedResultInfo;
};

export type DataAvailabilitySummaryResult = {
  __typename?: 'DataAvailabilitySummaryResult';
  totalTransactions: Scalars['Int']['output'];
};

export type DataAvailabilityTransactionRequest = {
  id: Scalars['String']['input'];
};

export type DataAvailabilityTransactionUnion = DataAvailabilityComment | DataAvailabilityMirror | DataAvailabilityPost;

export type DataAvailabilityTransactionsRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<Scalars['LimitScalar']['input']>;
  profileId?: InputMaybe<Scalars['ProfileId']['input']>;
};

export type DataAvailabilityTransactionsResult = {
  __typename?: 'DataAvailabilityTransactionsResult';
  items: Array<DataAvailabilityTransactionUnion>;
  pageInfo: PaginatedResultInfo;
};

export type DataAvailabilityVerificationStatusFailure = {
  __typename?: 'DataAvailabilityVerificationStatusFailure';
  status?: Maybe<MomokaValidatorError>;
};

export type DataAvailabilityVerificationStatusSuccess = {
  __typename?: 'DataAvailabilityVerificationStatusSuccess';
  verified: Scalars['Boolean']['output'];
};

export type DataAvailabilityVerificationStatusUnion = DataAvailabilityVerificationStatusFailure | DataAvailabilityVerificationStatusSuccess;

export enum DecryptFailReason {
  CanNotDecrypt = 'CAN_NOT_DECRYPT',
  CollectNotFinalisedOnChain = 'COLLECT_NOT_FINALISED_ON_CHAIN',
  DoesNotFollowProfile = 'DOES_NOT_FOLLOW_PROFILE',
  DoesNotOwnNft = 'DOES_NOT_OWN_NFT',
  DoesNotOwnProfile = 'DOES_NOT_OWN_PROFILE',
  FollowNotFinalisedOnChain = 'FOLLOW_NOT_FINALISED_ON_CHAIN',
  HasNotCollectedPublication = 'HAS_NOT_COLLECTED_PUBLICATION',
  MissingEncryptionParams = 'MISSING_ENCRYPTION_PARAMS',
  ProfileDoesNotExist = 'PROFILE_DOES_NOT_EXIST',
  UnauthorizedAddress = 'UNAUTHORIZED_ADDRESS',
  UnauthorizedBalance = 'UNAUTHORIZED_BALANCE'
}

export type DefaultProfileRequest = {
  ethereumAddress: Scalars['EthereumAddress']['input'];
};

export type DegreesOfSeparationReferenceModuleParams = {
  commentsRestricted: Scalars['Boolean']['input'];
  degreesOfSeparation: Scalars['Int']['input'];
  mirrorsRestricted: Scalars['Boolean']['input'];
};

export type DegreesOfSeparationReferenceModuleSettings = {
  __typename?: 'DegreesOfSeparationReferenceModuleSettings';
  commentsRestricted: Scalars['Boolean']['output'];
  contractAddress: Scalars['ContractAddress']['output'];
  degreesOfSeparation: Scalars['Int']['output'];
  mirrorsRestricted: Scalars['Boolean']['output'];
  type: ReferenceModules;
};

export type DismissRecommendedProfilesRequest = {
  profileIds: Array<Scalars['ProfileId']['input']>;
};

export type Dispatcher = {
  __typename?: 'Dispatcher';
  address: Scalars['EthereumAddress']['output'];
  canUseRelay: Scalars['Boolean']['output'];
  sponsor: Scalars['Boolean']['output'];
};

export type DoesFollow = {
  followerAddress: Scalars['EthereumAddress']['input'];
  profileId: Scalars['ProfileId']['input'];
};

export type DoesFollowRequest = {
  followInfos: Array<DoesFollow>;
};

export type DoesFollowResponse = {
  __typename?: 'DoesFollowResponse';
  followerAddress: Scalars['EthereumAddress']['output'];
  follows: Scalars['Boolean']['output'];
  isFinalisedOnChain: Scalars['Boolean']['output'];
  profileId: Scalars['ProfileId']['output'];
};

export type Eip712TypedDataDomain = {
  __typename?: 'EIP712TypedDataDomain';
  chainId: Scalars['ChainId']['output'];
  name: Scalars['String']['output'];
  verifyingContract: Scalars['ContractAddress']['output'];
  version: Scalars['String']['output'];
};

export type Eip712TypedDataField = {
  __typename?: 'EIP712TypedDataField';
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type Erc4626FeeCollectModuleParams = {
  amount: ModuleFeeAmountParams;
  collectLimit?: InputMaybe<Scalars['String']['input']>;
  endTimestamp?: InputMaybe<Scalars['DateTime']['input']>;
  followerOnly: Scalars['Boolean']['input'];
  recipient: Scalars['EthereumAddress']['input'];
  referralFee?: InputMaybe<Scalars['Float']['input']>;
  vault: Scalars['ContractAddress']['input'];
};

export type Erc4626FeeCollectModuleSettings = {
  __typename?: 'ERC4626FeeCollectModuleSettings';
  amount: ModuleFeeAmount;
  collectLimit?: Maybe<Scalars['String']['output']>;
  contractAddress: Scalars['ContractAddress']['output'];
  endTimestamp?: Maybe<Scalars['DateTime']['output']>;
  followerOnly: Scalars['Boolean']['output'];
  recipient: Scalars['EthereumAddress']['output'];
  referralFee: Scalars['Float']['output'];
  type: CollectModules;
  vault: Scalars['ContractAddress']['output'];
};

export type ElectedMirror = {
  __typename?: 'ElectedMirror';
  mirrorId: Scalars['InternalPublicationId']['output'];
  profile: Profile;
  timestamp: Scalars['DateTime']['output'];
};

export type EnabledModule = {
  __typename?: 'EnabledModule';
  contractAddress: Scalars['ContractAddress']['output'];
  inputParams: Array<ModuleInfo>;
  moduleName: Scalars['String']['output'];
  redeemParams: Array<ModuleInfo>;
  returnDataParms: Array<ModuleInfo>;
};

export type EnabledModules = {
  __typename?: 'EnabledModules';
  collectModules: Array<EnabledModule>;
  followModules: Array<EnabledModule>;
  referenceModules: Array<EnabledModule>;
};

export type EncryptedFieldsOutput = {
  __typename?: 'EncryptedFieldsOutput';
  animation_url?: Maybe<Scalars['EncryptedValueScalar']['output']>;
  content?: Maybe<Scalars['EncryptedValueScalar']['output']>;
  external_url?: Maybe<Scalars['EncryptedValueScalar']['output']>;
  image?: Maybe<Scalars['EncryptedValueScalar']['output']>;
  media?: Maybe<Array<EncryptedMediaSet>>;
};

export type EncryptedMedia = {
  __typename?: 'EncryptedMedia';
  altTag?: Maybe<Scalars['EncryptedValueScalar']['output']>;
  cover?: Maybe<Scalars['EncryptedValueScalar']['output']>;
  height?: Maybe<Scalars['Int']['output']>;
  mimeType?: Maybe<Scalars['MimeType']['output']>;
  size?: Maybe<Scalars['Int']['output']>;
  url: Scalars['Url']['output'];
  width?: Maybe<Scalars['Int']['output']>;
};

export type EncryptedMediaSet = {
  __typename?: 'EncryptedMediaSet';
  /** @deprecated should not be used will always be null */
  medium?: Maybe<EncryptedMedia>;
  original: EncryptedMedia;
  /** @deprecated should not be used will always be null */
  small?: Maybe<EncryptedMedia>;
};

export type EncryptionParamsOutput = {
  __typename?: 'EncryptionParamsOutput';
  accessCondition: AccessConditionOutput;
  encryptedFields: EncryptedFieldsOutput;
  encryptionProvider: EncryptionProvider;
  providerSpecificParams: ProviderSpecificParamsOutput;
};

export enum EncryptionProvider {
  LitProtocol = 'LIT_PROTOCOL'
}

export type EnsOnChainIdentity = {
  __typename?: 'EnsOnChainIdentity';
  name?: Maybe<Scalars['Ens']['output']>;
};

export type EoaOwnershipInput = {
  address: Scalars['EthereumAddress']['input'];
};

export type EoaOwnershipOutput = {
  __typename?: 'EoaOwnershipOutput';
  address: Scalars['EthereumAddress']['output'];
};

export type Erc20 = {
  __typename?: 'Erc20';
  address: Scalars['ContractAddress']['output'];
  decimals: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  symbol: Scalars['String']['output'];
};

export type Erc20Amount = {
  __typename?: 'Erc20Amount';
  asset: Erc20;
  value: Scalars['String']['output'];
};

export type Erc20OwnershipInput = {
  amount: Scalars['String']['input'];
  chainID: Scalars['ChainId']['input'];
  condition: ScalarOperator;
  contractAddress: Scalars['ContractAddress']['input'];
  decimals: Scalars['Float']['input'];
};

export type Erc20OwnershipOutput = {
  __typename?: 'Erc20OwnershipOutput';
  amount: Scalars['String']['output'];
  chainID: Scalars['ChainId']['output'];
  condition: ScalarOperator;
  contractAddress: Scalars['ContractAddress']['output'];
  decimals: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  symbol: Scalars['String']['output'];
};

export type ExploreProfileResult = {
  __typename?: 'ExploreProfileResult';
  items: Array<Profile>;
  pageInfo: PaginatedResultInfo;
};

export type ExploreProfilesRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  customFilters?: InputMaybe<Array<CustomFiltersTypes>>;
  limit?: InputMaybe<Scalars['LimitScalar']['input']>;
  sortCriteria: ProfileSortCriteria;
  timestamp?: InputMaybe<Scalars['TimestampScalar']['input']>;
};

export type ExplorePublicationRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  customFilters?: InputMaybe<Array<CustomFiltersTypes>>;
  excludeProfileIds?: InputMaybe<Array<Scalars['ProfileId']['input']>>;
  limit?: InputMaybe<Scalars['LimitScalar']['input']>;
  metadata?: InputMaybe<PublicationMetadataFilters>;
  noRandomize?: InputMaybe<Scalars['Boolean']['input']>;
  publicationTypes?: InputMaybe<Array<PublicationTypes>>;
  sortCriteria: PublicationSortCriteria;
  sources?: InputMaybe<Array<Scalars['Sources']['input']>>;
  timestamp?: InputMaybe<Scalars['TimestampScalar']['input']>;
};

export type ExplorePublicationResult = {
  __typename?: 'ExplorePublicationResult';
  items: Array<Publication>;
  pageInfo: PaginatedResultInfo;
};

export type FeeCollectModuleParams = {
  amount: ModuleFeeAmountParams;
  followerOnly: Scalars['Boolean']['input'];
  recipient: Scalars['EthereumAddress']['input'];
  referralFee: Scalars['Float']['input'];
};

export type FeeCollectModuleSettings = {
  __typename?: 'FeeCollectModuleSettings';
  amount: ModuleFeeAmount;
  contractAddress: Scalars['ContractAddress']['output'];
  followerOnly: Scalars['Boolean']['output'];
  recipient: Scalars['EthereumAddress']['output'];
  referralFee: Scalars['Float']['output'];
  type: CollectModules;
};

export type FeeFollowModuleParams = {
  amount: ModuleFeeAmountParams;
  recipient: Scalars['EthereumAddress']['input'];
};

export type FeeFollowModuleRedeemParams = {
  amount: ModuleFeeAmountParams;
};

export type FeeFollowModuleSettings = {
  __typename?: 'FeeFollowModuleSettings';
  amount: ModuleFeeAmount;
  contractAddress: Scalars['ContractAddress']['output'];
  recipient: Scalars['EthereumAddress']['output'];
  type: FollowModules;
};

export enum FeedEventItemType {
  CollectComment = 'COLLECT_COMMENT',
  CollectPost = 'COLLECT_POST',
  Comment = 'COMMENT',
  Mirror = 'MIRROR',
  Post = 'POST',
  ReactionComment = 'REACTION_COMMENT',
  ReactionPost = 'REACTION_POST'
}

export type FeedHighlightsRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<Scalars['LimitScalar']['input']>;
  metadata?: InputMaybe<PublicationMetadataFilters>;
  profileId: Scalars['ProfileId']['input'];
  sources?: InputMaybe<Array<Scalars['Sources']['input']>>;
};

export type FeedItem = {
  __typename?: 'FeedItem';
  collects: Array<CollectedEvent>;
  comments?: Maybe<Array<Comment>>;
  electedMirror?: Maybe<ElectedMirror>;
  mirrors: Array<MirrorEvent>;
  reactions: Array<ReactionEvent>;
  root: FeedItemRoot;
};

export type FeedItemRoot = Comment | Post;

export type FeedRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  feedEventItemTypes?: InputMaybe<Array<FeedEventItemType>>;
  limit?: InputMaybe<Scalars['LimitScalar']['input']>;
  metadata?: InputMaybe<PublicationMetadataFilters>;
  profileId: Scalars['ProfileId']['input'];
  sources?: InputMaybe<Array<Scalars['Sources']['input']>>;
};

export type Follow = {
  followModule?: InputMaybe<FollowModuleRedeemParams>;
  profile: Scalars['ProfileId']['input'];
};

export type FollowConditionInput = {
  profileId: Scalars['ProfileId']['input'];
};

export type FollowConditionOutput = {
  __typename?: 'FollowConditionOutput';
  profileId: Scalars['ProfileId']['output'];
};

export type FollowModule = FeeFollowModuleSettings | ProfileFollowModuleSettings | RevertFollowModuleSettings | UnknownFollowModuleSettings;

export type FollowModuleParams = {
  feeFollowModule?: InputMaybe<FeeFollowModuleParams>;
  freeFollowModule?: InputMaybe<Scalars['Boolean']['input']>;
  profileFollowModule?: InputMaybe<Scalars['Boolean']['input']>;
  revertFollowModule?: InputMaybe<Scalars['Boolean']['input']>;
  unknownFollowModule?: InputMaybe<UnknownFollowModuleParams>;
};

export type FollowModuleRedeemParams = {
  feeFollowModule?: InputMaybe<FeeFollowModuleRedeemParams>;
  profileFollowModule?: InputMaybe<ProfileFollowModuleRedeemParams>;
  unknownFollowModule?: InputMaybe<UnknownFollowModuleRedeemParams>;
};

export enum FollowModules {
  FeeFollowModule = 'FeeFollowModule',
  ProfileFollowModule = 'ProfileFollowModule',
  RevertFollowModule = 'RevertFollowModule',
  UnknownFollowModule = 'UnknownFollowModule'
}

export type FollowOnlyReferenceModuleSettings = {
  __typename?: 'FollowOnlyReferenceModuleSettings';
  contractAddress: Scalars['ContractAddress']['output'];
  type: ReferenceModules;
};

export type FollowProxyAction = {
  freeFollow?: InputMaybe<FreeFollowProxyAction>;
};

export type FollowRequest = {
  follow: Array<Follow>;
};

export type FollowRevenueResult = {
  __typename?: 'FollowRevenueResult';
  revenues: Array<RevenueAggregate>;
};

export type Follower = {
  __typename?: 'Follower';
  totalAmountOfTimesFollowed: Scalars['Int']['output'];
  wallet: Wallet;
};

export type FollowerNftOwnedTokenIds = {
  __typename?: 'FollowerNftOwnedTokenIds';
  followerNftAddress: Scalars['ContractAddress']['output'];
  tokensIds: Array<Scalars['String']['output']>;
};

export type FollowerNftOwnedTokenIdsRequest = {
  address: Scalars['EthereumAddress']['input'];
  profileId: Scalars['ProfileId']['input'];
};

export type FollowersRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<Scalars['LimitScalar']['input']>;
  profileId: Scalars['ProfileId']['input'];
};

export type Following = {
  __typename?: 'Following';
  profile: Profile;
  totalAmountOfTimesFollowing: Scalars['Int']['output'];
};

export type FollowingRequest = {
  address: Scalars['EthereumAddress']['input'];
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<Scalars['LimitScalar']['input']>;
};

export type FraudReasonInputParams = {
  reason: PublicationReportingReason;
  subreason: PublicationReportingFraudSubreason;
};

export type FreeCollectModuleParams = {
  followerOnly: Scalars['Boolean']['input'];
};

export type FreeCollectModuleSettings = {
  __typename?: 'FreeCollectModuleSettings';
  contractAddress: Scalars['ContractAddress']['output'];
  followerOnly: Scalars['Boolean']['output'];
  type: CollectModules;
};

export type FreeCollectProxyAction = {
  publicationId: Scalars['InternalPublicationId']['input'];
};

export type FreeFollowProxyAction = {
  profileId: Scalars['ProfileId']['input'];
};

export type GatedPublicationParamsInput = {
  and?: InputMaybe<AndConditionInput>;
  collect?: InputMaybe<CollectConditionInput>;
  encryptedSymmetricKey: Scalars['ContentEncryptionKey']['input'];
  eoa?: InputMaybe<EoaOwnershipInput>;
  follow?: InputMaybe<FollowConditionInput>;
  nft?: InputMaybe<NftOwnershipInput>;
  or?: InputMaybe<OrConditionInput>;
  profile?: InputMaybe<ProfileOwnershipInput>;
  token?: InputMaybe<Erc20OwnershipInput>;
};

export type GciRequest = {
  hhh: Scalars['String']['input'];
  secret: Scalars['String']['input'];
  ttt: Scalars['String']['input'];
};

export type GcrRequest = {
  hhh: Scalars['String']['input'];
  secret: Scalars['String']['input'];
  ttt: Scalars['String']['input'];
};

export type GctRequest = {
  hhh: Scalars['String']['input'];
  secret: Scalars['String']['input'];
};

export type GddRequest = {
  domain: Scalars['Url']['input'];
  secret: Scalars['String']['input'];
};

export type GdmRequest = {
  secret: Scalars['String']['input'];
};

export type GenerateModuleCurrencyApproval = {
  __typename?: 'GenerateModuleCurrencyApproval';
  data: Scalars['BlockchainData']['output'];
  from: Scalars['EthereumAddress']['output'];
  to: Scalars['ContractAddress']['output'];
};

export type GenerateModuleCurrencyApprovalDataRequest = {
  collectModule?: InputMaybe<CollectModules>;
  currency: Scalars['ContractAddress']['input'];
  followModule?: InputMaybe<FollowModules>;
  referenceModule?: InputMaybe<ReferenceModules>;
  unknownCollectModule?: InputMaybe<Scalars['ContractAddress']['input']>;
  unknownFollowModule?: InputMaybe<Scalars['ContractAddress']['input']>;
  unknownReferenceModule?: InputMaybe<Scalars['ContractAddress']['input']>;
  value: Scalars['String']['input'];
};

export type GetPublicationMetadataStatusRequest = {
  publicationId?: InputMaybe<Scalars['InternalPublicationId']['input']>;
  txHash?: InputMaybe<Scalars['TxHash']['input']>;
  txId?: InputMaybe<Scalars['TxId']['input']>;
};

export type GlobalProtocolStats = {
  __typename?: 'GlobalProtocolStats';
  totalBurntProfiles: Scalars['Int']['output'];
  totalCollects: Scalars['Int']['output'];
  totalComments: Scalars['Int']['output'];
  totalFollows: Scalars['Int']['output'];
  totalMirrors: Scalars['Int']['output'];
  totalPosts: Scalars['Int']['output'];
  totalProfiles: Scalars['Int']['output'];
  totalRevenue: Array<Erc20Amount>;
};

export type GlobalProtocolStatsRequest = {
  fromTimestamp?: InputMaybe<Scalars['UnixTimestamp']['input']>;
  sources?: InputMaybe<Array<Scalars['Sources']['input']>>;
  toTimestamp?: InputMaybe<Scalars['UnixTimestamp']['input']>;
};

export type HasTxHashBeenIndexedRequest = {
  txHash?: InputMaybe<Scalars['TxHash']['input']>;
  txId?: InputMaybe<Scalars['TxId']['input']>;
};

export type HelRequest = {
  handle: Scalars['Handle']['input'];
  remove: Scalars['Boolean']['input'];
  secret: Scalars['String']['input'];
};

export type HidePublicationRequest = {
  publicationId: Scalars['InternalPublicationId']['input'];
};

export type IdKitPhoneVerifyWebhookRequest = {
  sharedSecret: Scalars['String']['input'];
  worldcoin?: InputMaybe<WorldcoinPhoneVerifyWebhookRequest>;
};

export enum IdKitPhoneVerifyWebhookResultStatusType {
  AlreadyVerified = 'ALREADY_VERIFIED',
  Success = 'SUCCESS'
}

export type IllegalReasonInputParams = {
  reason: PublicationReportingReason;
  subreason: PublicationReportingIllegalSubreason;
};

export type InRequest = {
  ethereumAddress: Scalars['EthereumAddress']['input'];
  numInvites: Scalars['Int']['input'];
  secret: Scalars['String']['input'];
};

export type InTotalRequest = {
  ethereumAddress: Scalars['EthereumAddress']['input'];
  secret: Scalars['String']['input'];
};

export type InternalPinRequest = {
  items: Array<Scalars['Url']['input']>;
  secret: Scalars['String']['input'];
};

export type InternalPinResult = {
  __typename?: 'InternalPinResult';
  ipfs: Scalars['String']['output'];
  referenceItem: Scalars['Url']['output'];
};

export type InviteRequest = {
  invites: Array<Scalars['EthereumAddress']['input']>;
  secret: Scalars['String']['input'];
};

export type InvitedResult = {
  __typename?: 'InvitedResult';
  address: Scalars['EthereumAddress']['output'];
  when?: Maybe<Scalars['DateTime']['output']>;
};

export type LimitedFeeCollectModuleParams = {
  amount: ModuleFeeAmountParams;
  collectLimit: Scalars['String']['input'];
  followerOnly: Scalars['Boolean']['input'];
  recipient: Scalars['EthereumAddress']['input'];
  referralFee: Scalars['Float']['input'];
};

export type LimitedFeeCollectModuleSettings = {
  __typename?: 'LimitedFeeCollectModuleSettings';
  amount: ModuleFeeAmount;
  collectLimit: Scalars['String']['output'];
  contractAddress: Scalars['ContractAddress']['output'];
  followerOnly: Scalars['Boolean']['output'];
  recipient: Scalars['EthereumAddress']['output'];
  referralFee: Scalars['Float']['output'];
  type: CollectModules;
};

export type LimitedTimedFeeCollectModuleParams = {
  amount: ModuleFeeAmountParams;
  collectLimit: Scalars['String']['input'];
  followerOnly: Scalars['Boolean']['input'];
  recipient: Scalars['EthereumAddress']['input'];
  referralFee: Scalars['Float']['input'];
};

export type LimitedTimedFeeCollectModuleSettings = {
  __typename?: 'LimitedTimedFeeCollectModuleSettings';
  amount: ModuleFeeAmount;
  collectLimit: Scalars['String']['output'];
  contractAddress: Scalars['ContractAddress']['output'];
  endTimestamp: Scalars['DateTime']['output'];
  followerOnly: Scalars['Boolean']['output'];
  recipient: Scalars['EthereumAddress']['output'];
  referralFee: Scalars['Float']['output'];
  type: CollectModules;
};

export type Log = {
  __typename?: 'Log';
  address: Scalars['ContractAddress']['output'];
  blockHash: Scalars['String']['output'];
  blockNumber: Scalars['Int']['output'];
  data: Scalars['String']['output'];
  logIndex: Scalars['Int']['output'];
  removed: Scalars['Boolean']['output'];
  topics: Array<Scalars['String']['output']>;
  transactionHash: Scalars['TxHash']['output'];
  transactionIndex: Scalars['Int']['output'];
};

export type MainPostReference = Mirror | Post;

export type Media = {
  __typename?: 'Media';
  altTag?: Maybe<Scalars['String']['output']>;
  cover?: Maybe<Scalars['Url']['output']>;
  height?: Maybe<Scalars['Int']['output']>;
  mimeType?: Maybe<Scalars['MimeType']['output']>;
  size?: Maybe<Scalars['Int']['output']>;
  url: Scalars['Url']['output'];
  width?: Maybe<Scalars['Int']['output']>;
};

export type MediaOutput = {
  __typename?: 'MediaOutput';
  altTag?: Maybe<Scalars['String']['output']>;
  cover?: Maybe<Scalars['Url']['output']>;
  item: Scalars['Url']['output'];
  source?: Maybe<PublicationMediaSource>;
  type?: Maybe<Scalars['MimeType']['output']>;
};

export type MediaSet = {
  __typename?: 'MediaSet';
  /** @deprecated should not be used will always be null - use transform function to get small media */
  medium?: Maybe<Media>;
  onChain: Media;
  optimized?: Maybe<Media>;
  original: Media;
  /** @deprecated should not be used will always be null - use transform function to get small media */
  small?: Maybe<Media>;
  transformed?: Maybe<Media>;
};


export type MediaSetTransformedArgs = {
  params: MediaTransformParams;
};

export type MediaTransformParams = {
  height?: InputMaybe<Scalars['ImageSizeTransform']['input']>;
  keepAspectRatio?: InputMaybe<Scalars['Boolean']['input']>;
  width?: InputMaybe<Scalars['ImageSizeTransform']['input']>;
};

export type MentionPublication = Comment | Post;

export type MetadataAttributeInput = {
  displayType?: InputMaybe<PublicationMetadataDisplayTypes>;
  traitType: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type MetadataAttributeOutput = {
  __typename?: 'MetadataAttributeOutput';
  displayType?: Maybe<PublicationMetadataDisplayTypes>;
  traitType?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export type MetadataOutput = {
  __typename?: 'MetadataOutput';
  animatedUrl?: Maybe<Scalars['Url']['output']>;
  attributes: Array<MetadataAttributeOutput>;
  content?: Maybe<Scalars['Markdown']['output']>;
  contentWarning?: Maybe<PublicationContentWarning>;
  cover?: Maybe<MediaSet>;
  description?: Maybe<Scalars['Markdown']['output']>;
  encryptionParams?: Maybe<EncryptionParamsOutput>;
  image?: Maybe<Scalars['Url']['output']>;
  locale?: Maybe<Scalars['Locale']['output']>;
  mainContentFocus: PublicationMainFocus;
  media: Array<MediaSet>;
  name?: Maybe<Scalars['String']['output']>;
  tags: Array<Scalars['String']['output']>;
};

export type Mirror = {
  __typename?: 'Mirror';
  appId?: Maybe<Scalars['Sources']['output']>;
  bookmarked: Scalars['Boolean']['output'];
  canComment: CanCommentResponse;
  canDecrypt: CanDecryptResponse;
  canMirror: CanMirrorResponse;
  collectModule: CollectModule;
  collectNftAddress?: Maybe<Scalars['ContractAddress']['output']>;
  createdAt: Scalars['DateTime']['output'];
  dataAvailabilityProofs?: Maybe<Scalars['String']['output']>;
  hasCollectedByMe: Scalars['Boolean']['output'];
  hidden: Scalars['Boolean']['output'];
  id: Scalars['InternalPublicationId']['output'];
  isDataAvailability: Scalars['Boolean']['output'];
  isGated: Scalars['Boolean']['output'];
  metadata: MetadataOutput;
  mirrorOf: MirrorablePublication;
  notInterested: Scalars['Boolean']['output'];
  onChainContentURI: Scalars['String']['output'];
  profile: Profile;
  reaction?: Maybe<ReactionTypes>;
  referenceModule?: Maybe<ReferenceModule>;
  stats: PublicationStats;
};


export type MirrorBookmarkedArgs = {
  by?: InputMaybe<Scalars['ProfileId']['input']>;
};


export type MirrorCanCommentArgs = {
  profileId?: InputMaybe<Scalars['ProfileId']['input']>;
};


export type MirrorCanDecryptArgs = {
  address?: InputMaybe<Scalars['EthereumAddress']['input']>;
  profileId?: InputMaybe<Scalars['ProfileId']['input']>;
};


export type MirrorCanMirrorArgs = {
  profileId?: InputMaybe<Scalars['ProfileId']['input']>;
};


export type MirrorHasCollectedByMeArgs = {
  isFinalisedOnChain?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MirrorNotInterestedArgs = {
  by?: InputMaybe<Scalars['ProfileId']['input']>;
};


export type MirrorReactionArgs = {
  request?: InputMaybe<ReactionFieldResolverRequest>;
};

export type MirrorEvent = {
  __typename?: 'MirrorEvent';
  profile: Profile;
  timestamp: Scalars['DateTime']['output'];
};

export type MirrorablePublication = Comment | Post;

export type ModuleFee = {
  __typename?: 'ModuleFee';
  amount: ModuleFeeAmount;
  recipient: Scalars['EthereumAddress']['output'];
  referralFee: Scalars['Float']['output'];
};

export type ModuleFeeAmount = {
  __typename?: 'ModuleFeeAmount';
  asset: Erc20;
  value: Scalars['String']['output'];
};

export type ModuleFeeAmountParams = {
  currency: Scalars['ContractAddress']['input'];
  value: Scalars['String']['input'];
};

export type ModuleFeeParams = {
  amount: ModuleFeeAmountParams;
  recipient: Scalars['EthereumAddress']['input'];
  referralFee: Scalars['Float']['input'];
};

export type ModuleInfo = {
  __typename?: 'ModuleInfo';
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export enum MomokaValidatorError {
  BlockCantBeReadFromNode = 'BLOCK_CANT_BE_READ_FROM_NODE',
  BlockTooFar = 'BLOCK_TOO_FAR',
  CanNotConnectToBundlr = 'CAN_NOT_CONNECT_TO_BUNDLR',
  ChainSignatureAlreadyUsed = 'CHAIN_SIGNATURE_ALREADY_USED',
  DataCantBeReadFromNode = 'DATA_CANT_BE_READ_FROM_NODE',
  EventMismatch = 'EVENT_MISMATCH',
  GeneratedPublicationIdMismatch = 'GENERATED_PUBLICATION_ID_MISMATCH',
  InvalidEventTimestamp = 'INVALID_EVENT_TIMESTAMP',
  InvalidFormattedTypedData = 'INVALID_FORMATTED_TYPED_DATA',
  InvalidPointerSetNotNeeded = 'INVALID_POINTER_SET_NOT_NEEDED',
  InvalidSignatureSubmitter = 'INVALID_SIGNATURE_SUBMITTER',
  InvalidTxId = 'INVALID_TX_ID',
  InvalidTypedDataDeadlineTimestamp = 'INVALID_TYPED_DATA_DEADLINE_TIMESTAMP',
  NotClosestBlock = 'NOT_CLOSEST_BLOCK',
  NoSignatureSubmitter = 'NO_SIGNATURE_SUBMITTER',
  PointerFailedVerification = 'POINTER_FAILED_VERIFICATION',
  PotentialReorg = 'POTENTIAL_REORG',
  PublicationNonceInvalid = 'PUBLICATION_NONCE_INVALID',
  PublicationNoneDa = 'PUBLICATION_NONE_DA',
  PublicationNoPointer = 'PUBLICATION_NO_POINTER',
  PublicationSignerNotAllowed = 'PUBLICATION_SIGNER_NOT_ALLOWED',
  SimulationFailed = 'SIMULATION_FAILED',
  SimulationNodeCouldNotRun = 'SIMULATION_NODE_COULD_NOT_RUN',
  TimestampProofInvalidDaId = 'TIMESTAMP_PROOF_INVALID_DA_ID',
  TimestampProofInvalidSignature = 'TIMESTAMP_PROOF_INVALID_SIGNATURE',
  TimestampProofInvalidType = 'TIMESTAMP_PROOF_INVALID_TYPE',
  TimestampProofNotSubmitter = 'TIMESTAMP_PROOF_NOT_SUBMITTER',
  Unknown = 'UNKNOWN'
}

export type MultirecipientFeeCollectModuleParams = {
  amount: ModuleFeeAmountParams;
  collectLimit?: InputMaybe<Scalars['String']['input']>;
  endTimestamp?: InputMaybe<Scalars['DateTime']['input']>;
  followerOnly: Scalars['Boolean']['input'];
  recipients: Array<RecipientDataInput>;
  referralFee?: InputMaybe<Scalars['Float']['input']>;
};

export type MultirecipientFeeCollectModuleSettings = {
  __typename?: 'MultirecipientFeeCollectModuleSettings';
  amount: ModuleFeeAmount;
  collectLimit?: Maybe<Scalars['String']['output']>;
  contractAddress: Scalars['ContractAddress']['output'];
  endTimestamp?: Maybe<Scalars['DateTime']['output']>;
  followerOnly: Scalars['Boolean']['output'];
  recipients: Array<RecipientDataOutput>;
  referralFee: Scalars['Float']['output'];
  type: CollectModules;
};

export type Mutation = {
  __typename?: 'Mutation';
  ach?: Maybe<Scalars['Void']['output']>;
  addProfileInterests?: Maybe<Scalars['Void']['output']>;
  addPublicationProfileBookmark?: Maybe<Scalars['Void']['output']>;
  addPublicationProfileNotInterested?: Maybe<Scalars['Void']['output']>;
  addReaction?: Maybe<Scalars['Void']['output']>;
  authenticate: AuthenticationResult;
  broadcast: RelayResult;
  broadcastDataAvailability: BroadcastDataAvailabilityUnion;
  claim: RelayResult;
  createAttachMediaData: PublicMediaResults;
  createBurnProfileTypedData: CreateBurnProfileBroadcastItemResult;
  createCollectTypedData: CreateCollectBroadcastItemResult;
  createCommentTypedData: CreateCommentBroadcastItemResult;
  createCommentViaDispatcher: RelayResult;
  createDataAvailabilityCommentTypedData: CreateCommentBroadcastItemResult;
  createDataAvailabilityCommentViaDispatcher: RelayDataAvailabilityResult;
  createDataAvailabilityMirrorTypedData: CreateMirrorBroadcastItemResult;
  createDataAvailabilityMirrorViaDispatcher: RelayDataAvailabilityResult;
  createDataAvailabilityPostTypedData: CreatePostBroadcastItemResult;
  createDataAvailabilityPostViaDispatcher: RelayDataAvailabilityResult;
  createFollowTypedData: CreateFollowBroadcastItemResult;
  createMirrorTypedData: CreateMirrorBroadcastItemResult;
  createMirrorViaDispatcher: RelayResult;
  createNftGallery: Scalars['NftGalleryId']['output'];
  createPostTypedData: CreatePostBroadcastItemResult;
  createPostViaDispatcher: RelayResult;
  createProfile: RelayResult;
  createSetDefaultProfileTypedData: SetDefaultProfileBroadcastItemResult;
  createSetDispatcherTypedData: CreateSetDispatcherBroadcastItemResult;
  createSetFollowModuleTypedData: CreateSetFollowModuleBroadcastItemResult;
  createSetFollowNFTUriTypedData: CreateSetFollowNftUriBroadcastItemResult;
  createSetFollowNFTUriViaDispatcher: RelayResult;
  createSetProfileImageURITypedData: CreateSetProfileImageUriBroadcastItemResult;
  createSetProfileImageURIViaDispatcher: RelayResult;
  createSetProfileMetadataTypedData: CreateSetProfileMetadataUriBroadcastItemResult;
  createSetProfileMetadataViaDispatcher: RelayResult;
  createToggleFollowTypedData: CreateToggleFollowBroadcastItemResult;
  createUnfollowTypedData: CreateUnfollowBroadcastItemResult;
  deleteNftGallery?: Maybe<Scalars['Void']['output']>;
  dismissRecommendedProfiles?: Maybe<Scalars['Void']['output']>;
  dss?: Maybe<Scalars['Void']['output']>;
  gci?: Maybe<Scalars['Void']['output']>;
  gcr?: Maybe<Scalars['Void']['output']>;
  gdi?: Maybe<Scalars['Void']['output']>;
  hel?: Maybe<Scalars['Void']['output']>;
  hidePublication?: Maybe<Scalars['Void']['output']>;
  idKitPhoneVerifyWebhook: IdKitPhoneVerifyWebhookResultStatusType;
  in?: Maybe<Scalars['Void']['output']>;
  invite?: Maybe<Scalars['Void']['output']>;
  nni?: Maybe<Scalars['Void']['output']>;
  nnv?: Maybe<Scalars['Void']['output']>;
  proxyAction: Scalars['ProxyActionId']['output'];
  refresh: AuthenticationResult;
  removeProfileInterests?: Maybe<Scalars['Void']['output']>;
  removePublicationProfileBookmark?: Maybe<Scalars['Void']['output']>;
  removePublicationProfileNotInterested?: Maybe<Scalars['Void']['output']>;
  removeReaction?: Maybe<Scalars['Void']['output']>;
  reportPublication?: Maybe<Scalars['Void']['output']>;
  updateNftGalleryInfo?: Maybe<Scalars['Void']['output']>;
  updateNftGalleryItems?: Maybe<Scalars['Void']['output']>;
  updateNftGalleryOrder?: Maybe<Scalars['Void']['output']>;
};


export type MutationAchArgs = {
  request: AchRequest;
};


export type MutationAddProfileInterestsArgs = {
  request: AddProfileInterestsRequest;
};


export type MutationAddPublicationProfileBookmarkArgs = {
  request: PublicationProfileBookmarkRequest;
};


export type MutationAddPublicationProfileNotInterestedArgs = {
  request: PublicationProfileNotInterestedRequest;
};


export type MutationAddReactionArgs = {
  request: ReactionRequest;
};


export type MutationAuthenticateArgs = {
  request: SignedAuthChallenge;
};


export type MutationBroadcastArgs = {
  request: BroadcastRequest;
};


export type MutationBroadcastDataAvailabilityArgs = {
  request: BroadcastRequest;
};


export type MutationClaimArgs = {
  request: ClaimHandleRequest;
};


export type MutationCreateAttachMediaDataArgs = {
  request: PublicMediaRequest;
};


export type MutationCreateBurnProfileTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: BurnProfileRequest;
};


export type MutationCreateCollectTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: CreateCollectRequest;
};


export type MutationCreateCommentTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: CreatePublicCommentRequest;
};


export type MutationCreateCommentViaDispatcherArgs = {
  request: CreatePublicCommentRequest;
};


export type MutationCreateDataAvailabilityCommentTypedDataArgs = {
  request: CreateDataAvailabilityCommentRequest;
};


export type MutationCreateDataAvailabilityCommentViaDispatcherArgs = {
  request: CreateDataAvailabilityCommentRequest;
};


export type MutationCreateDataAvailabilityMirrorTypedDataArgs = {
  request: CreateDataAvailabilityMirrorRequest;
};


export type MutationCreateDataAvailabilityMirrorViaDispatcherArgs = {
  request: CreateDataAvailabilityMirrorRequest;
};


export type MutationCreateDataAvailabilityPostTypedDataArgs = {
  request: CreateDataAvailabilityPostRequest;
};


export type MutationCreateDataAvailabilityPostViaDispatcherArgs = {
  request: CreateDataAvailabilityPostRequest;
};


export type MutationCreateFollowTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: FollowRequest;
};


export type MutationCreateMirrorTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: CreateMirrorRequest;
};


export type MutationCreateMirrorViaDispatcherArgs = {
  request: CreateMirrorRequest;
};


export type MutationCreateNftGalleryArgs = {
  request: NftGalleryCreateRequest;
};


export type MutationCreatePostTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: CreatePublicPostRequest;
};


export type MutationCreatePostViaDispatcherArgs = {
  request: CreatePublicPostRequest;
};


export type MutationCreateProfileArgs = {
  request: CreateProfileRequest;
};


export type MutationCreateSetDefaultProfileTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: CreateSetDefaultProfileRequest;
};


export type MutationCreateSetDispatcherTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: SetDispatcherRequest;
};


export type MutationCreateSetFollowModuleTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: CreateSetFollowModuleRequest;
};


export type MutationCreateSetFollowNftUriTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: CreateSetFollowNftUriRequest;
};


export type MutationCreateSetFollowNftUriViaDispatcherArgs = {
  request: CreateSetFollowNftUriRequest;
};


export type MutationCreateSetProfileImageUriTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: UpdateProfileImageRequest;
};


export type MutationCreateSetProfileImageUriViaDispatcherArgs = {
  request: UpdateProfileImageRequest;
};


export type MutationCreateSetProfileMetadataTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: CreatePublicSetProfileMetadataUriRequest;
};


export type MutationCreateSetProfileMetadataViaDispatcherArgs = {
  request: CreatePublicSetProfileMetadataUriRequest;
};


export type MutationCreateToggleFollowTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: CreateToggleFollowRequest;
};


export type MutationCreateUnfollowTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: UnfollowRequest;
};


export type MutationDeleteNftGalleryArgs = {
  request: NftGalleryDeleteRequest;
};


export type MutationDismissRecommendedProfilesArgs = {
  request: DismissRecommendedProfilesRequest;
};


export type MutationDssArgs = {
  request: PrfRequest;
};


export type MutationGciArgs = {
  request: GciRequest;
};


export type MutationGcrArgs = {
  request: GcrRequest;
};


export type MutationGdiArgs = {
  request: GddRequest;
};


export type MutationHelArgs = {
  request: HelRequest;
};


export type MutationHidePublicationArgs = {
  request: HidePublicationRequest;
};


export type MutationIdKitPhoneVerifyWebhookArgs = {
  request: IdKitPhoneVerifyWebhookRequest;
};


export type MutationInArgs = {
  request: InRequest;
};


export type MutationInviteArgs = {
  request: InviteRequest;
};


export type MutationNniArgs = {
  request: NniRequest;
};


export type MutationNnvArgs = {
  request: NnvRequest;
};


export type MutationProxyActionArgs = {
  request: ProxyActionRequest;
};


export type MutationRefreshArgs = {
  request: RefreshRequest;
};


export type MutationRemoveProfileInterestsArgs = {
  request: RemoveProfileInterestsRequest;
};


export type MutationRemovePublicationProfileBookmarkArgs = {
  request: PublicationProfileBookmarkRequest;
};


export type MutationRemovePublicationProfileNotInterestedArgs = {
  request: PublicationProfileNotInterestedRequest;
};


export type MutationRemoveReactionArgs = {
  request: ReactionRequest;
};


export type MutationReportPublicationArgs = {
  request: ReportPublicationRequest;
};


export type MutationUpdateNftGalleryInfoArgs = {
  request: NftGalleryUpdateInfoRequest;
};


export type MutationUpdateNftGalleryItemsArgs = {
  request: NftGalleryUpdateItemsRequest;
};


export type MutationUpdateNftGalleryOrderArgs = {
  request: NftGalleryUpdateItemOrderRequest;
};

export type MutualFollowersProfilesQueryRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<Scalars['LimitScalar']['input']>;
  viewingProfileId: Scalars['ProfileId']['input'];
  yourProfileId: Scalars['ProfileId']['input'];
};

export type Nft = {
  __typename?: 'NFT';
  chainId: Scalars['ChainId']['output'];
  collectionName: Scalars['String']['output'];
  contentURI: Scalars['String']['output'];
  contractAddress: Scalars['ContractAddress']['output'];
  contractName: Scalars['String']['output'];
  description: Scalars['String']['output'];
  ercType: Scalars['String']['output'];
  name: Scalars['String']['output'];
  originalContent: NftContent;
  owners: Array<Owner>;
  symbol: Scalars['String']['output'];
  tokenId: Scalars['String']['output'];
};

export type NftContent = {
  __typename?: 'NFTContent';
  animatedUrl?: Maybe<Scalars['String']['output']>;
  metaType: Scalars['String']['output'];
  uri: Scalars['String']['output'];
};

export type NftData = {
  id: Scalars['NftOwnershipId']['input'];
  signature: Scalars['Signature']['input'];
};

export type NftSearchRequest = {
  chainIds?: InputMaybe<Array<Scalars['ChainId']['input']>>;
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  excludeFollowers?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['LimitScalar']['input']>;
  ownerAddress?: InputMaybe<Scalars['EthereumAddress']['input']>;
  profileId?: InputMaybe<Scalars['ProfileId']['input']>;
  query: Scalars['String']['input'];
};

export type NfTsRequest = {
  chainIds?: InputMaybe<Array<Scalars['ChainId']['input']>>;
  contractAddress?: InputMaybe<Scalars['ContractAddress']['input']>;
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  excludeCollections?: InputMaybe<Array<NftCollectionInput>>;
  excludeFollowers?: InputMaybe<Scalars['Boolean']['input']>;
  includeCollections?: InputMaybe<Array<NftCollectionInput>>;
  limit?: InputMaybe<Scalars['LimitScalar']['input']>;
  ownerAddress: Scalars['EthereumAddress']['input'];
};

export type NfTsResult = {
  __typename?: 'NFTsResult';
  items: Array<Nft>;
  pageInfo: PaginatedResultInfo;
};

export type NewCollectNotification = {
  __typename?: 'NewCollectNotification';
  collectedPublication: Publication;
  createdAt: Scalars['DateTime']['output'];
  notificationId: Scalars['NotificationId']['output'];
  wallet: Wallet;
};

export type NewCommentNotification = {
  __typename?: 'NewCommentNotification';
  comment: Comment;
  createdAt: Scalars['DateTime']['output'];
  notificationId: Scalars['NotificationId']['output'];
  profile: Profile;
};

export type NewFollowerNotification = {
  __typename?: 'NewFollowerNotification';
  createdAt: Scalars['DateTime']['output'];
  isFollowedByMe: Scalars['Boolean']['output'];
  notificationId: Scalars['NotificationId']['output'];
  wallet: Wallet;
};

export type NewMentionNotification = {
  __typename?: 'NewMentionNotification';
  createdAt: Scalars['DateTime']['output'];
  mentionPublication: MentionPublication;
  notificationId: Scalars['NotificationId']['output'];
};

export type NewMirrorNotification = {
  __typename?: 'NewMirrorNotification';
  createdAt: Scalars['DateTime']['output'];
  notificationId: Scalars['NotificationId']['output'];
  profile: Profile;
  publication: MirrorablePublication;
};

export type NewReactionNotification = {
  __typename?: 'NewReactionNotification';
  createdAt: Scalars['DateTime']['output'];
  notificationId: Scalars['NotificationId']['output'];
  profile: Profile;
  publication: Publication;
  reaction: ReactionTypes;
};

export type Nfi = {
  c: Scalars['ContractAddress']['input'];
  i: Scalars['ChainId']['input'];
};

export type NftCollectionInput = {
  chainId: Scalars['ChainId']['input'];
  contractAddress: Scalars['ContractAddress']['input'];
};

export type NftGalleriesRequest = {
  profileId: Scalars['ProfileId']['input'];
};

export type NftGallery = {
  __typename?: 'NftGallery';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['NftGalleryId']['output'];
  items: Array<Nft>;
  name: Scalars['String']['output'];
  profileId: Scalars['ProfileId']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type NftGalleryCreateRequest = {
  items: Array<NftInput>;
  name: Scalars['NftGalleryName']['input'];
  profileId: Scalars['ProfileId']['input'];
};

export type NftGalleryDeleteRequest = {
  galleryId: Scalars['NftGalleryId']['input'];
  profileId: Scalars['ProfileId']['input'];
};

export type NftGalleryUpdateInfoRequest = {
  galleryId: Scalars['NftGalleryId']['input'];
  name: Scalars['NftGalleryName']['input'];
  profileId: Scalars['ProfileId']['input'];
};

export type NftGalleryUpdateItemOrderRequest = {
  galleryId: Scalars['NftGalleryId']['input'];
  profileId: Scalars['ProfileId']['input'];
  updates: Array<NftUpdateItemOrder>;
};

export type NftGalleryUpdateItemsRequest = {
  galleryId: Scalars['NftGalleryId']['input'];
  profileId: Scalars['ProfileId']['input'];
  toAdd?: InputMaybe<Array<NftInput>>;
  toRemove?: InputMaybe<Array<NftInput>>;
};

export type NftImage = {
  __typename?: 'NftImage';
  chainId: Scalars['Int']['output'];
  contractAddress: Scalars['ContractAddress']['output'];
  tokenId: Scalars['String']['output'];
  uri: Scalars['Url']['output'];
  verified: Scalars['Boolean']['output'];
};

export type NftInput = {
  chainId: Scalars['ChainId']['input'];
  contractAddress: Scalars['ContractAddress']['input'];
  tokenId: Scalars['String']['input'];
};

export type NftOwnershipChallenge = {
  chainId: Scalars['ChainId']['input'];
  contractAddress: Scalars['ContractAddress']['input'];
  tokenId: Scalars['String']['input'];
};

export type NftOwnershipChallengeRequest = {
  ethereumAddress: Scalars['EthereumAddress']['input'];
  nfts: Array<NftOwnershipChallenge>;
};

export type NftOwnershipChallengeResult = {
  __typename?: 'NftOwnershipChallengeResult';
  id: Scalars['NftOwnershipId']['output'];
  text: Scalars['String']['output'];
  timeout: Scalars['TimestampScalar']['output'];
};

export type NftOwnershipInput = {
  chainID: Scalars['ChainId']['input'];
  contractAddress: Scalars['ContractAddress']['input'];
  contractType: ContractType;
  tokenIds?: InputMaybe<Array<Scalars['TokenId']['input']>>;
};

export type NftOwnershipOutput = {
  __typename?: 'NftOwnershipOutput';
  chainID: Scalars['ChainId']['output'];
  contractAddress: Scalars['ContractAddress']['output'];
  contractType: ContractType;
  tokenIds?: Maybe<Array<Scalars['TokenId']['output']>>;
};

export type NftUpdateItemOrder = {
  chainId: Scalars['ChainId']['input'];
  contractAddress: Scalars['ContractAddress']['input'];
  newOrder: Scalars['Int']['input'];
  tokenId: Scalars['String']['input'];
};

export type NniRequest = {
  n: Array<Nfi>;
  secret: Scalars['String']['input'];
};

export type NnvRequest = {
  n: Array<Nfi>;
  secret: Scalars['String']['input'];
};

export type Notification = NewCollectNotification | NewCommentNotification | NewFollowerNotification | NewMentionNotification | NewMirrorNotification | NewReactionNotification;

export type NotificationRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  customFilters?: InputMaybe<Array<CustomFiltersTypes>>;
  highSignalFilter?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['LimitScalar']['input']>;
  notificationTypes?: InputMaybe<Array<NotificationTypes>>;
  profileId: Scalars['ProfileId']['input'];
  sources?: InputMaybe<Array<Scalars['Sources']['input']>>;
};

export enum NotificationTypes {
  CollectedComment = 'COLLECTED_COMMENT',
  CollectedPost = 'COLLECTED_POST',
  CommentedComment = 'COMMENTED_COMMENT',
  CommentedPost = 'COMMENTED_POST',
  Followed = 'FOLLOWED',
  MentionComment = 'MENTION_COMMENT',
  MentionPost = 'MENTION_POST',
  MirroredComment = 'MIRRORED_COMMENT',
  MirroredPost = 'MIRRORED_POST',
  ReactionComment = 'REACTION_COMMENT',
  ReactionPost = 'REACTION_POST'
}

export type OnChainIdentity = {
  __typename?: 'OnChainIdentity';
  ens?: Maybe<EnsOnChainIdentity>;
  proofOfHumanity: Scalars['Boolean']['output'];
  sybilDotOrg: SybilDotOrgIdentity;
  worldcoin: WorldcoinIdentity;
};

export type OrConditionInput = {
  criteria: Array<AccessConditionInput>;
};

export type OrConditionOutput = {
  __typename?: 'OrConditionOutput';
  criteria: Array<AccessConditionOutput>;
};

export type Owner = {
  __typename?: 'Owner';
  address: Scalars['EthereumAddress']['output'];
  amount: Scalars['Float']['output'];
};

export type PaginatedAllPublicationsTagsResult = {
  __typename?: 'PaginatedAllPublicationsTagsResult';
  items: Array<TagResult>;
  pageInfo: PaginatedResultInfo;
};

export type PaginatedFeedResult = {
  __typename?: 'PaginatedFeedResult';
  items: Array<FeedItem>;
  pageInfo: PaginatedResultInfo;
};

export type PaginatedFollowersResult = {
  __typename?: 'PaginatedFollowersResult';
  items: Array<Follower>;
  pageInfo: PaginatedResultInfo;
};

export type PaginatedFollowingResult = {
  __typename?: 'PaginatedFollowingResult';
  items: Array<Following>;
  pageInfo: PaginatedResultInfo;
};

export type PaginatedForYouResult = {
  __typename?: 'PaginatedForYouResult';
  items: Array<Publication>;
  pageInfo: PaginatedResultInfo;
};

export type PaginatedNotificationResult = {
  __typename?: 'PaginatedNotificationResult';
  items: Array<Notification>;
  pageInfo: PaginatedResultInfo;
};

export type PaginatedProfilePublicationsForSaleResult = {
  __typename?: 'PaginatedProfilePublicationsForSaleResult';
  items: Array<PublicationForSale>;
  pageInfo: PaginatedResultInfo;
};

export type PaginatedProfileResult = {
  __typename?: 'PaginatedProfileResult';
  items: Array<Profile>;
  pageInfo: PaginatedResultInfo;
};

export type PaginatedPublicationResult = {
  __typename?: 'PaginatedPublicationResult';
  items: Array<Publication>;
  pageInfo: PaginatedResultInfo;
};

export type PaginatedResultInfo = {
  __typename?: 'PaginatedResultInfo';
  next?: Maybe<Scalars['Cursor']['output']>;
  prev?: Maybe<Scalars['Cursor']['output']>;
  /** @deprecated Total counts is expensive and in dynamic nature of queries it slows stuff down. Most the time you do not need this you can just use the `next` property to see if there is more data. This will be removed soon. The only use case anyone is using this right now is on notification query, this should be changed to query the notifications and cache the last notification id. You can then keep checking if the id changes you know more notifications. */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type PaginatedTimelineResult = {
  __typename?: 'PaginatedTimelineResult';
  items: Array<Publication>;
  pageInfo: PaginatedResultInfo;
};

export type PaginatedWhoCollectedResult = {
  __typename?: 'PaginatedWhoCollectedResult';
  items: Array<Wallet>;
  pageInfo: PaginatedResultInfo;
};

export type PaginatedWhoReactedResult = {
  __typename?: 'PaginatedWhoReactedResult';
  items: Array<WhoReactedResult>;
  pageInfo: PaginatedResultInfo;
};

export type PendingApprovalFollowsRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<Scalars['LimitScalar']['input']>;
};

export type PendingApproveFollowsResult = {
  __typename?: 'PendingApproveFollowsResult';
  items: Array<Profile>;
  pageInfo: PaginatedResultInfo;
};

export type Post = {
  __typename?: 'Post';
  appId?: Maybe<Scalars['Sources']['output']>;
  bookmarked: Scalars['Boolean']['output'];
  canComment: CanCommentResponse;
  canDecrypt: CanDecryptResponse;
  canMirror: CanMirrorResponse;
  collectModule: CollectModule;
  collectNftAddress?: Maybe<Scalars['ContractAddress']['output']>;
  /** @deprecated use `feed` query, timeline query will be killed on the 15th November. This includes this field. */
  collectedBy?: Maybe<Wallet>;
  createdAt: Scalars['DateTime']['output'];
  dataAvailabilityProofs?: Maybe<Scalars['String']['output']>;
  hasCollectedByMe: Scalars['Boolean']['output'];
  hidden: Scalars['Boolean']['output'];
  id: Scalars['InternalPublicationId']['output'];
  isDataAvailability: Scalars['Boolean']['output'];
  isGated: Scalars['Boolean']['output'];
  metadata: MetadataOutput;
  mirrors: Array<Scalars['InternalPublicationId']['output']>;
  notInterested: Scalars['Boolean']['output'];
  onChainContentURI: Scalars['String']['output'];
  profile: Profile;
  reaction?: Maybe<ReactionTypes>;
  referenceModule?: Maybe<ReferenceModule>;
  stats: PublicationStats;
};


export type PostBookmarkedArgs = {
  by?: InputMaybe<Scalars['ProfileId']['input']>;
};


export type PostCanCommentArgs = {
  profileId?: InputMaybe<Scalars['ProfileId']['input']>;
};


export type PostCanDecryptArgs = {
  address?: InputMaybe<Scalars['EthereumAddress']['input']>;
  profileId?: InputMaybe<Scalars['ProfileId']['input']>;
};


export type PostCanMirrorArgs = {
  profileId?: InputMaybe<Scalars['ProfileId']['input']>;
};


export type PostHasCollectedByMeArgs = {
  isFinalisedOnChain?: InputMaybe<Scalars['Boolean']['input']>;
};


export type PostMirrorsArgs = {
  by?: InputMaybe<Scalars['ProfileId']['input']>;
};


export type PostNotInterestedArgs = {
  by?: InputMaybe<Scalars['ProfileId']['input']>;
};


export type PostReactionArgs = {
  request?: InputMaybe<ReactionFieldResolverRequest>;
};

export type PrfRequest = {
  dd: Scalars['Boolean']['input'];
  hhh: Scalars['String']['input'];
  secret: Scalars['String']['input'];
  ss: Scalars['Boolean']['input'];
};

export type PrfResponse = {
  __typename?: 'PrfResponse';
  dd: Scalars['Boolean']['output'];
  ss: Scalars['Boolean']['output'];
};

export type PriRequest = {
  hhh: Scalars['String']['input'];
  secret: Scalars['String']['input'];
};

export type Profile = {
  __typename?: 'Profile';
  attributes?: Maybe<Array<Attribute>>;
  bio?: Maybe<Scalars['String']['output']>;
  coverPicture?: Maybe<ProfileMedia>;
  dispatcher?: Maybe<Dispatcher>;
  followModule?: Maybe<FollowModule>;
  followNftAddress?: Maybe<Scalars['ContractAddress']['output']>;
  handle: Scalars['Handle']['output'];
  id: Scalars['ProfileId']['output'];
  interests?: Maybe<Array<Scalars['ProfileInterest']['output']>>;
  invitedBy?: Maybe<Profile>;
  isDefault: Scalars['Boolean']['output'];
  isFollowedByMe: Scalars['Boolean']['output'];
  isFollowing: Scalars['Boolean']['output'];
  metadata?: Maybe<Scalars['Url']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  onChainIdentity: OnChainIdentity;
  ownedBy: Scalars['EthereumAddress']['output'];
  picture?: Maybe<ProfileMedia>;
  stats: ProfileStats;
};


export type ProfileIsFollowedByMeArgs = {
  isFinalisedOnChain?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ProfileIsFollowingArgs = {
  who?: InputMaybe<Scalars['ProfileId']['input']>;
};

export type ProfileFollowModuleBeenRedeemedRequest = {
  followProfileId: Scalars['ProfileId']['input'];
  redeemingProfileId: Scalars['ProfileId']['input'];
};

export type ProfileFollowModuleRedeemParams = {
  profileId: Scalars['ProfileId']['input'];
};

export type ProfileFollowModuleSettings = {
  __typename?: 'ProfileFollowModuleSettings';
  contractAddress: Scalars['ContractAddress']['output'];
  type: FollowModules;
};

export type ProfileFollowRevenueQueryRequest = {
  profileId: Scalars['ProfileId']['input'];
};

export type ProfileGuardianRequest = {
  profileId: Scalars['ProfileId']['input'];
};

export type ProfileGuardianResult = {
  __typename?: 'ProfileGuardianResult';
  disablingProtectionTimestamp?: Maybe<Scalars['DateTime']['output']>;
  protected: Scalars['Boolean']['output'];
};

export type ProfileMedia = MediaSet | NftImage;

export type ProfileOnChainIdentityRequest = {
  profileIds: Array<Scalars['ProfileId']['input']>;
};

export type ProfileOwnershipInput = {
  profileId: Scalars['ProfileId']['input'];
};

export type ProfileOwnershipOutput = {
  __typename?: 'ProfileOwnershipOutput';
  profileId: Scalars['ProfileId']['output'];
};

export type ProfilePublicationRevenueQueryRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<Scalars['LimitScalar']['input']>;
  metadata?: InputMaybe<PublicationMetadataFilters>;
  profileId: Scalars['ProfileId']['input'];
  sources?: InputMaybe<Array<Scalars['Sources']['input']>>;
  types?: InputMaybe<Array<PublicationTypes>>;
};

export type ProfilePublicationRevenueResult = {
  __typename?: 'ProfilePublicationRevenueResult';
  items: Array<PublicationRevenue>;
  pageInfo: PaginatedResultInfo;
};

export type ProfilePublicationsForSaleRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<Scalars['LimitScalar']['input']>;
  metadata?: InputMaybe<PublicationMetadataFilters>;
  profileId: Scalars['ProfileId']['input'];
  sources?: InputMaybe<Array<Scalars['Sources']['input']>>;
};

export type ProfileQueryRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  handles?: InputMaybe<Array<Scalars['Handle']['input']>>;
  limit?: InputMaybe<Scalars['LimitScalar']['input']>;
  ownedBy?: InputMaybe<Array<Scalars['EthereumAddress']['input']>>;
  profileIds?: InputMaybe<Array<Scalars['ProfileId']['input']>>;
  whoMirroredPublicationId?: InputMaybe<Scalars['InternalPublicationId']['input']>;
};

export type ProfileSearchResult = {
  __typename?: 'ProfileSearchResult';
  items: Array<Profile>;
  pageInfo: PaginatedResultInfo;
  type: SearchRequestTypes;
};

export enum ProfileSortCriteria {
  CreatedOn = 'CREATED_ON',
  LatestCreated = 'LATEST_CREATED',
  MostCollects = 'MOST_COLLECTS',
  MostComments = 'MOST_COMMENTS',
  MostFollowers = 'MOST_FOLLOWERS',
  MostMirrors = 'MOST_MIRRORS',
  MostPosts = 'MOST_POSTS',
  MostPublication = 'MOST_PUBLICATION'
}

export type ProfileStats = {
  __typename?: 'ProfileStats';
  commentsTotal: Scalars['Int']['output'];
  id: Scalars['ProfileId']['output'];
  mirrorsTotal: Scalars['Int']['output'];
  postsTotal: Scalars['Int']['output'];
  publicationsTotal: Scalars['Int']['output'];
  totalCollects: Scalars['Int']['output'];
  totalComments: Scalars['Int']['output'];
  totalFollowers: Scalars['Int']['output'];
  totalFollowing: Scalars['Int']['output'];
  totalMirrors: Scalars['Int']['output'];
  totalPosts: Scalars['Int']['output'];
  totalPublications: Scalars['Int']['output'];
};


export type ProfileStatsCommentsTotalArgs = {
  forSources: Array<Scalars['Sources']['input']>;
};


export type ProfileStatsMirrorsTotalArgs = {
  forSources: Array<Scalars['Sources']['input']>;
};


export type ProfileStatsPostsTotalArgs = {
  forSources: Array<Scalars['Sources']['input']>;
};


export type ProfileStatsPublicationsTotalArgs = {
  forSources: Array<Scalars['Sources']['input']>;
};

export type ProviderSpecificParamsOutput = {
  __typename?: 'ProviderSpecificParamsOutput';
  encryptionKey: Scalars['ContentEncryptionKey']['output'];
};

export type ProxyActionError = {
  __typename?: 'ProxyActionError';
  lastKnownTxId?: Maybe<Scalars['TxId']['output']>;
  reason: Scalars['String']['output'];
};

export type ProxyActionQueued = {
  __typename?: 'ProxyActionQueued';
  queuedAt: Scalars['DateTime']['output'];
};

export type ProxyActionRequest = {
  collect?: InputMaybe<CollectProxyAction>;
  follow?: InputMaybe<FollowProxyAction>;
};

export type ProxyActionStatusResult = {
  __typename?: 'ProxyActionStatusResult';
  status: ProxyActionStatusTypes;
  txHash: Scalars['TxHash']['output'];
  txId: Scalars['TxId']['output'];
};

export type ProxyActionStatusResultUnion = ProxyActionError | ProxyActionQueued | ProxyActionStatusResult;

export enum ProxyActionStatusTypes {
  Complete = 'COMPLETE',
  Minting = 'MINTING',
  Transferring = 'TRANSFERRING'
}

export type PublicMediaRequest = {
  altTag?: InputMaybe<Scalars['String']['input']>;
  cover?: InputMaybe<Scalars['Url']['input']>;
  itemCid: Scalars['IpfsCid']['input'];
  type?: InputMaybe<Scalars['MimeType']['input']>;
};

export type PublicMediaResults = {
  __typename?: 'PublicMediaResults';
  media: MediaOutput;
  signedUrl: Scalars['String']['output'];
};

export type Publication = Comment | Mirror | Post;

export enum PublicationContentWarning {
  Nsfw = 'NSFW',
  Sensitive = 'SENSITIVE',
  Spoiler = 'SPOILER'
}

export type PublicationForSale = Comment | Post;

export type PublicationForYouRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  for: Scalars['ProfileId']['input'];
  limit?: InputMaybe<Scalars['LimitScalar']['input']>;
};

export enum PublicationMainFocus {
  Article = 'ARTICLE',
  Audio = 'AUDIO',
  Embed = 'EMBED',
  Image = 'IMAGE',
  Link = 'LINK',
  TextOnly = 'TEXT_ONLY',
  Video = 'VIDEO'
}

export enum PublicationMediaSource {
  Lens = 'LENS'
}

export type PublicationMetadataContentWarningFilter = {
  includeOneOf?: InputMaybe<Array<PublicationContentWarning>>;
};

export enum PublicationMetadataDisplayTypes {
  Date = 'date',
  Number = 'number',
  String = 'string'
}

export type PublicationMetadataFilters = {
  contentWarning?: InputMaybe<PublicationMetadataContentWarningFilter>;
  locale?: InputMaybe<Scalars['Locale']['input']>;
  mainContentFocus?: InputMaybe<Array<PublicationMainFocus>>;
  tags?: InputMaybe<PublicationMetadataTagsFilter>;
};

export type PublicationMetadataMediaInput = {
  altTag?: InputMaybe<Scalars['String']['input']>;
  cover?: InputMaybe<Scalars['Url']['input']>;
  item: Scalars['Url']['input'];
  source?: InputMaybe<PublicationMediaSource>;
  type?: InputMaybe<Scalars['MimeType']['input']>;
};

export type PublicationMetadataStatus = {
  __typename?: 'PublicationMetadataStatus';
  reason?: Maybe<Scalars['String']['output']>;
  status: PublicationMetadataStatusType;
};

export enum PublicationMetadataStatusType {
  MetadataValidationFailed = 'METADATA_VALIDATION_FAILED',
  NotFound = 'NOT_FOUND',
  Pending = 'PENDING',
  Success = 'SUCCESS'
}

export type PublicationMetadataTagsFilter = {
  all?: InputMaybe<Array<Scalars['String']['input']>>;
  oneOf?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type PublicationMetadataV1Input = {
  animation_url?: InputMaybe<Scalars['Url']['input']>;
  appId?: InputMaybe<Scalars['Sources']['input']>;
  attributes: Array<MetadataAttributeInput>;
  content?: InputMaybe<Scalars['Markdown']['input']>;
  description?: InputMaybe<Scalars['Markdown']['input']>;
  external_url?: InputMaybe<Scalars['Url']['input']>;
  image?: InputMaybe<Scalars['Url']['input']>;
  imageMimeType?: InputMaybe<Scalars['MimeType']['input']>;
  media?: InputMaybe<Array<PublicationMetadataMediaInput>>;
  metadata_id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  signatureContext?: InputMaybe<PublicationSignatureContextInput>;
  version: Scalars['String']['input'];
};

export type PublicationMetadataV2Input = {
  animation_url?: InputMaybe<Scalars['Url']['input']>;
  appId?: InputMaybe<Scalars['Sources']['input']>;
  attributes: Array<MetadataAttributeInput>;
  content?: InputMaybe<Scalars['Markdown']['input']>;
  contentWarning?: InputMaybe<PublicationContentWarning>;
  description?: InputMaybe<Scalars['Markdown']['input']>;
  external_url?: InputMaybe<Scalars['Url']['input']>;
  image?: InputMaybe<Scalars['Url']['input']>;
  imageMimeType?: InputMaybe<Scalars['MimeType']['input']>;
  locale: Scalars['Locale']['input'];
  mainContentFocus: PublicationMainFocus;
  media?: InputMaybe<Array<PublicationMetadataMediaInput>>;
  metadata_id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  signatureContext?: InputMaybe<PublicationSignatureContextInput>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  version: Scalars['String']['input'];
};

export type PublicationProfileBookmarkRequest = {
  profileId: Scalars['ProfileId']['input'];
  publicationId: Scalars['InternalPublicationId']['input'];
};

export type PublicationProfileNotInterestedRequest = {
  profileId: Scalars['ProfileId']['input'];
  publicationId: Scalars['InternalPublicationId']['input'];
};

export type PublicationQueryRequest = {
  publicationId?: InputMaybe<Scalars['InternalPublicationId']['input']>;
  txHash?: InputMaybe<Scalars['TxHash']['input']>;
};

export enum PublicationReportingFraudSubreason {
  Impersonation = 'IMPERSONATION',
  Scam = 'SCAM'
}

export enum PublicationReportingIllegalSubreason {
  AnimalAbuse = 'ANIMAL_ABUSE',
  DirectThreat = 'DIRECT_THREAT',
  HumanAbuse = 'HUMAN_ABUSE',
  ThreatIndividual = 'THREAT_INDIVIDUAL',
  Violence = 'VIOLENCE'
}

export enum PublicationReportingReason {
  Fraud = 'FRAUD',
  Illegal = 'ILLEGAL',
  Sensitive = 'SENSITIVE',
  Spam = 'SPAM'
}

export enum PublicationReportingSensitiveSubreason {
  Nsfw = 'NSFW',
  Offensive = 'OFFENSIVE'
}

export enum PublicationReportingSpamSubreason {
  FakeEngagement = 'FAKE_ENGAGEMENT',
  LowSignal = 'LOW_SIGNAL',
  ManipulationAlgo = 'MANIPULATION_ALGO',
  Misleading = 'MISLEADING',
  MisuseHashtags = 'MISUSE_HASHTAGS',
  Repetitive = 'REPETITIVE',
  SomethingElse = 'SOMETHING_ELSE',
  Unrelated = 'UNRELATED'
}

export type PublicationRevenue = {
  __typename?: 'PublicationRevenue';
  publication: Publication;
  revenue: RevenueAggregate;
};

export type PublicationRevenueQueryRequest = {
  publicationId: Scalars['InternalPublicationId']['input'];
};

export type PublicationSearchResult = {
  __typename?: 'PublicationSearchResult';
  items: Array<PublicationSearchResultItem>;
  pageInfo: PaginatedResultInfo;
  type: SearchRequestTypes;
};

export type PublicationSearchResultItem = Comment | Post;

export type PublicationSignatureContextInput = {
  signature: Scalars['String']['input'];
};

export enum PublicationSortCriteria {
  CuratedProfiles = 'CURATED_PROFILES',
  Latest = 'LATEST',
  TopCollected = 'TOP_COLLECTED',
  TopCommented = 'TOP_COMMENTED',
  TopMirrored = 'TOP_MIRRORED'
}

export type PublicationStats = {
  __typename?: 'PublicationStats';
  commentsTotal: Scalars['Int']['output'];
  id: Scalars['InternalPublicationId']['output'];
  totalAmountOfCollects: Scalars['Int']['output'];
  totalAmountOfComments: Scalars['Int']['output'];
  totalAmountOfMirrors: Scalars['Int']['output'];
  totalBookmarks: Scalars['Int']['output'];
  totalDownvotes: Scalars['Int']['output'];
  totalUpvotes: Scalars['Int']['output'];
};


export type PublicationStatsCommentsTotalArgs = {
  customFilters?: InputMaybe<Array<CustomFiltersTypes>>;
  forSources?: InputMaybe<Array<Scalars['Sources']['input']>>;
};

export enum PublicationTypes {
  Comment = 'COMMENT',
  Mirror = 'MIRROR',
  Post = 'POST'
}

export type PublicationValidateMetadataResult = {
  __typename?: 'PublicationValidateMetadataResult';
  reason?: Maybe<Scalars['String']['output']>;
  valid: Scalars['Boolean']['output'];
};

export type PublicationsProfileBookmarkedQueryRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<Scalars['LimitScalar']['input']>;
  metadata?: InputMaybe<PublicationMetadataFilters>;
  profileId: Scalars['ProfileId']['input'];
  sources?: InputMaybe<Array<Scalars['Sources']['input']>>;
};

export type PublicationsQueryRequest = {
  collectedBy?: InputMaybe<Scalars['EthereumAddress']['input']>;
  commentsOf?: InputMaybe<Scalars['InternalPublicationId']['input']>;
  commentsOfOrdering?: InputMaybe<CommentOrderingTypes>;
  commentsRankingFilter?: InputMaybe<CommentRankingFilter>;
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  customFilters?: InputMaybe<Array<CustomFiltersTypes>>;
  limit?: InputMaybe<Scalars['LimitScalar']['input']>;
  metadata?: InputMaybe<PublicationMetadataFilters>;
  profileId?: InputMaybe<Scalars['ProfileId']['input']>;
  profileIds?: InputMaybe<Array<Scalars['ProfileId']['input']>>;
  publicationIds?: InputMaybe<Array<Scalars['InternalPublicationId']['input']>>;
  publicationTypes?: InputMaybe<Array<PublicationTypes>>;
  sources?: InputMaybe<Array<Scalars['Sources']['input']>>;
};

export type Query = {
  __typename?: 'Query';
  allPublicationsTags: PaginatedAllPublicationsTagsResult;
  alreadyInvited: Scalars['Boolean']['output'];
  approvedModuleAllowanceAmount: Array<ApprovedAllowanceAmount>;
  challenge: AuthChallengeResult;
  claimableHandles: ClaimableHandles;
  claimableStatus: ClaimStatus;
  cur: Array<Scalars['String']['output']>;
  dataAvailabilitySubmitters: DataAvailabilitySubmittersResult;
  dataAvailabilitySummary: DataAvailabilitySummaryResult;
  dataAvailabilityTransaction?: Maybe<DataAvailabilityTransactionUnion>;
  dataAvailabilityTransactions: DataAvailabilityTransactionsResult;
  defaultProfile?: Maybe<Profile>;
  doesFollow: Array<DoesFollowResponse>;
  enabledModuleCurrencies: Array<Erc20>;
  enabledModules: EnabledModules;
  exploreProfiles: ExploreProfileResult;
  explorePublications: ExplorePublicationResult;
  feed: PaginatedFeedResult;
  feedHighlights: PaginatedTimelineResult;
  followerNftOwnedTokenIds?: Maybe<FollowerNftOwnedTokenIds>;
  followers: PaginatedFollowersResult;
  following: PaginatedFollowingResult;
  forYou: PaginatedForYouResult;
  gct: Array<Scalars['String']['output']>;
  gdm: Array<Scalars['Url']['output']>;
  generateModuleCurrencyApprovalData: GenerateModuleCurrencyApproval;
  globalProtocolStats: GlobalProtocolStats;
  hasTxHashBeenIndexed: TransactionResult;
  internalPin: Array<InternalPinResult>;
  intotal: Scalars['Int']['output'];
  invited: Array<InvitedResult>;
  invitesLeft: Scalars['Int']['output'];
  isIDKitPhoneVerified: Scalars['Boolean']['output'];
  iss: PrfResponse;
  mutualFollowersProfiles: PaginatedProfileResult;
  nftGalleries: Array<NftGallery>;
  nftOwnershipChallenge: NftOwnershipChallengeResult;
  nfts: NfTsResult;
  notifications: PaginatedNotificationResult;
  pendingApprovalFollows: PendingApproveFollowsResult;
  ping: Scalars['String']['output'];
  profile?: Maybe<Profile>;
  profileFollowModuleBeenRedeemed: Scalars['Boolean']['output'];
  profileFollowRevenue: FollowRevenueResult;
  profileGuardianInformation: ProfileGuardianResult;
  profileInterests: Array<Scalars['ProfileInterest']['output']>;
  profileOnChainIdentity: Array<OnChainIdentity>;
  profilePublicationRevenue: ProfilePublicationRevenueResult;
  profilePublicationsForSale: PaginatedProfilePublicationsForSaleResult;
  profiles: PaginatedProfileResult;
  proxyActionStatus: ProxyActionStatusResultUnion;
  publication?: Maybe<Publication>;
  publicationMetadataStatus: PublicationMetadataStatus;
  publicationRevenue?: Maybe<PublicationRevenue>;
  publications: PaginatedPublicationResult;
  publicationsProfileBookmarks: PaginatedPublicationResult;
  recommendedProfiles: Array<Profile>;
  rel?: Maybe<Scalars['Void']['output']>;
  relayQueues: Array<RelayQueueResult>;
  search: SearchResult;
  searchNfts: NfTsResult;
  txIdToTxHash: Scalars['TxHash']['output'];
  unknownEnabledModules: EnabledModules;
  userSigNonces: UserSigNonces;
  validatePublicationMetadata: PublicationValidateMetadataResult;
  verify: Scalars['Boolean']['output'];
  whoCollectedPublication: PaginatedWhoCollectedResult;
  whoReactedPublication: PaginatedWhoReactedResult;
};


export type QueryAllPublicationsTagsArgs = {
  request: AllPublicationsTagsRequest;
};


export type QueryAlreadyInvitedArgs = {
  request: AlreadyInvitedCheckRequest;
};


export type QueryApprovedModuleAllowanceAmountArgs = {
  request: ApprovedModuleAllowanceAmountRequest;
};


export type QueryChallengeArgs = {
  request: ChallengeRequest;
};


export type QueryCurArgs = {
  request: CurRequest;
};


export type QueryDataAvailabilityTransactionArgs = {
  request: DataAvailabilityTransactionRequest;
};


export type QueryDataAvailabilityTransactionsArgs = {
  request?: InputMaybe<DataAvailabilityTransactionsRequest>;
};


export type QueryDefaultProfileArgs = {
  request: DefaultProfileRequest;
};


export type QueryDoesFollowArgs = {
  request: DoesFollowRequest;
};


export type QueryExploreProfilesArgs = {
  request: ExploreProfilesRequest;
};


export type QueryExplorePublicationsArgs = {
  request: ExplorePublicationRequest;
};


export type QueryFeedArgs = {
  request: FeedRequest;
};


export type QueryFeedHighlightsArgs = {
  request: FeedHighlightsRequest;
};


export type QueryFollowerNftOwnedTokenIdsArgs = {
  request: FollowerNftOwnedTokenIdsRequest;
};


export type QueryFollowersArgs = {
  request: FollowersRequest;
};


export type QueryFollowingArgs = {
  request: FollowingRequest;
};


export type QueryForYouArgs = {
  request: PublicationForYouRequest;
};


export type QueryGctArgs = {
  request: GctRequest;
};


export type QueryGdmArgs = {
  request: GdmRequest;
};


export type QueryGenerateModuleCurrencyApprovalDataArgs = {
  request: GenerateModuleCurrencyApprovalDataRequest;
};


export type QueryGlobalProtocolStatsArgs = {
  request?: InputMaybe<GlobalProtocolStatsRequest>;
};


export type QueryHasTxHashBeenIndexedArgs = {
  request: HasTxHashBeenIndexedRequest;
};


export type QueryInternalPinArgs = {
  request: InternalPinRequest;
};


export type QueryIntotalArgs = {
  request: InTotalRequest;
};


export type QueryIssArgs = {
  request: PriRequest;
};


export type QueryMutualFollowersProfilesArgs = {
  request: MutualFollowersProfilesQueryRequest;
};


export type QueryNftGalleriesArgs = {
  request: NftGalleriesRequest;
};


export type QueryNftOwnershipChallengeArgs = {
  request: NftOwnershipChallengeRequest;
};


export type QueryNftsArgs = {
  request: NfTsRequest;
};


export type QueryNotificationsArgs = {
  request: NotificationRequest;
};


export type QueryPendingApprovalFollowsArgs = {
  request: PendingApprovalFollowsRequest;
};


export type QueryProfileArgs = {
  request: SingleProfileQueryRequest;
};


export type QueryProfileFollowModuleBeenRedeemedArgs = {
  request: ProfileFollowModuleBeenRedeemedRequest;
};


export type QueryProfileFollowRevenueArgs = {
  request: ProfileFollowRevenueQueryRequest;
};


export type QueryProfileGuardianInformationArgs = {
  request: ProfileGuardianRequest;
};


export type QueryProfileOnChainIdentityArgs = {
  request: ProfileOnChainIdentityRequest;
};


export type QueryProfilePublicationRevenueArgs = {
  request: ProfilePublicationRevenueQueryRequest;
};


export type QueryProfilePublicationsForSaleArgs = {
  request: ProfilePublicationsForSaleRequest;
};


export type QueryProfilesArgs = {
  request: ProfileQueryRequest;
};


export type QueryProxyActionStatusArgs = {
  proxyActionId: Scalars['ProxyActionId']['input'];
};


export type QueryPublicationArgs = {
  request: PublicationQueryRequest;
};


export type QueryPublicationMetadataStatusArgs = {
  request: GetPublicationMetadataStatusRequest;
};


export type QueryPublicationRevenueArgs = {
  request: PublicationRevenueQueryRequest;
};


export type QueryPublicationsArgs = {
  request: PublicationsQueryRequest;
};


export type QueryPublicationsProfileBookmarksArgs = {
  request: PublicationsProfileBookmarkedQueryRequest;
};


export type QueryRecommendedProfilesArgs = {
  options?: InputMaybe<RecommendedProfileOptions>;
};


export type QueryRelArgs = {
  request: RelRequest;
};


export type QuerySearchArgs = {
  request: SearchQueryRequest;
};


export type QuerySearchNftsArgs = {
  request: NftSearchRequest;
};


export type QueryTxIdToTxHashArgs = {
  txId: Scalars['TxId']['input'];
};


export type QueryValidatePublicationMetadataArgs = {
  request: ValidatePublicationMetadataRequest;
};


export type QueryVerifyArgs = {
  request: VerifyRequest;
};


export type QueryWhoCollectedPublicationArgs = {
  request: WhoCollectedPublicationRequest;
};


export type QueryWhoReactedPublicationArgs = {
  request: WhoReactedPublicationRequest;
};

export type ReactionEvent = {
  __typename?: 'ReactionEvent';
  profile: Profile;
  reaction: ReactionTypes;
  timestamp: Scalars['DateTime']['output'];
};

export type ReactionFieldResolverRequest = {
  profileId?: InputMaybe<Scalars['ProfileId']['input']>;
};

export type ReactionRequest = {
  profileId: Scalars['ProfileId']['input'];
  publicationId: Scalars['InternalPublicationId']['input'];
  reaction: ReactionTypes;
};

export enum ReactionTypes {
  Downvote = 'DOWNVOTE',
  Upvote = 'UPVOTE'
}

export type RecipientDataInput = {
  recipient: Scalars['EthereumAddress']['input'];
  split: Scalars['Float']['input'];
};

export type RecipientDataOutput = {
  __typename?: 'RecipientDataOutput';
  recipient: Scalars['EthereumAddress']['output'];
  split: Scalars['Float']['output'];
};

export type RecommendedProfileOptions = {
  disableML?: InputMaybe<Scalars['Boolean']['input']>;
  profileId?: InputMaybe<Scalars['ProfileId']['input']>;
  shuffle?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ReferenceModule = DegreesOfSeparationReferenceModuleSettings | FollowOnlyReferenceModuleSettings | UnknownReferenceModuleSettings;

export type ReferenceModuleParams = {
  degreesOfSeparationReferenceModule?: InputMaybe<DegreesOfSeparationReferenceModuleParams>;
  followerOnlyReferenceModule?: InputMaybe<Scalars['Boolean']['input']>;
  unknownReferenceModule?: InputMaybe<UnknownReferenceModuleParams>;
};

export enum ReferenceModules {
  DegreesOfSeparationReferenceModule = 'DegreesOfSeparationReferenceModule',
  FollowerOnlyReferenceModule = 'FollowerOnlyReferenceModule',
  UnknownReferenceModule = 'UnknownReferenceModule'
}

export type RefreshRequest = {
  refreshToken: Scalars['Jwt']['input'];
};

export type RelRequest = {
  ethereumAddress: Scalars['EthereumAddress']['input'];
  secret: Scalars['String']['input'];
};

export type RelayDataAvailabilityResult = CreateDataAvailabilityPublicationResult | RelayError;

export type RelayError = {
  __typename?: 'RelayError';
  reason: RelayErrorReasons;
};

export enum RelayErrorReasons {
  Expired = 'EXPIRED',
  HandleTaken = 'HANDLE_TAKEN',
  NotAllowed = 'NOT_ALLOWED',
  Rejected = 'REJECTED',
  WrongWalletSigned = 'WRONG_WALLET_SIGNED'
}

export type RelayQueueResult = {
  __typename?: 'RelayQueueResult';
  address: Scalars['EthereumAddress']['output'];
  queue: Scalars['Float']['output'];
  relayer: RelayRoleKey;
};

export type RelayResult = RelayError | RelayerResult;

export enum RelayRoleKey {
  CreateProfile = 'CREATE_PROFILE',
  Dispatcher_1 = 'DISPATCHER_1',
  Dispatcher_2 = 'DISPATCHER_2',
  Dispatcher_3 = 'DISPATCHER_3',
  Dispatcher_4 = 'DISPATCHER_4',
  Dispatcher_5 = 'DISPATCHER_5',
  Dispatcher_6 = 'DISPATCHER_6',
  Dispatcher_7 = 'DISPATCHER_7',
  Dispatcher_8 = 'DISPATCHER_8',
  Dispatcher_9 = 'DISPATCHER_9',
  Dispatcher_10 = 'DISPATCHER_10',
  ProxyActionCollect_1 = 'PROXY_ACTION_COLLECT_1',
  ProxyActionCollect_2 = 'PROXY_ACTION_COLLECT_2',
  ProxyActionCollect_3 = 'PROXY_ACTION_COLLECT_3',
  ProxyActionCollect_4 = 'PROXY_ACTION_COLLECT_4',
  ProxyActionCollect_5 = 'PROXY_ACTION_COLLECT_5',
  ProxyActionCollect_6 = 'PROXY_ACTION_COLLECT_6',
  ProxyActionFollow_1 = 'PROXY_ACTION_FOLLOW_1',
  ProxyActionFollow_2 = 'PROXY_ACTION_FOLLOW_2',
  ProxyActionFollow_3 = 'PROXY_ACTION_FOLLOW_3',
  ProxyActionFollow_4 = 'PROXY_ACTION_FOLLOW_4',
  ProxyActionFollow_5 = 'PROXY_ACTION_FOLLOW_5',
  ProxyActionFollow_6 = 'PROXY_ACTION_FOLLOW_6',
  ProxyActionFollow_7 = 'PROXY_ACTION_FOLLOW_7',
  ProxyActionFollow_8 = 'PROXY_ACTION_FOLLOW_8',
  ProxyActionFollow_9 = 'PROXY_ACTION_FOLLOW_9',
  ProxyActionFollow_10 = 'PROXY_ACTION_FOLLOW_10',
  WithSig_1 = 'WITH_SIG_1',
  WithSig_2 = 'WITH_SIG_2',
  WithSig_3 = 'WITH_SIG_3',
  ZkRelayer_1 = 'ZK_RELAYER_1'
}

export type RelayerResult = {
  __typename?: 'RelayerResult';
  txHash: Scalars['TxHash']['output'];
  txId: Scalars['TxId']['output'];
};

export type RemoveProfileInterestsRequest = {
  interests: Array<Scalars['ProfileInterest']['input']>;
  profileId: Scalars['ProfileId']['input'];
};

export type ReportPublicationRequest = {
  additionalComments?: InputMaybe<Scalars['String']['input']>;
  publicationId: Scalars['InternalPublicationId']['input'];
  reason: ReportingReasonInputParams;
};

export type ReportingReasonInputParams = {
  fraudReason?: InputMaybe<FraudReasonInputParams>;
  illegalReason?: InputMaybe<IllegalReasonInputParams>;
  sensitiveReason?: InputMaybe<SensitiveReasonInputParams>;
  spamReason?: InputMaybe<SpamReasonInputParams>;
};

export type ReservedClaimableHandle = {
  __typename?: 'ReservedClaimableHandle';
  expiry: Scalars['DateTime']['output'];
  handle: Scalars['Handle']['output'];
  id: Scalars['HandleClaimIdScalar']['output'];
  source: Scalars['String']['output'];
};

export type RevenueAggregate = {
  __typename?: 'RevenueAggregate';
  total: Erc20Amount;
};

export type RevertCollectModuleSettings = {
  __typename?: 'RevertCollectModuleSettings';
  contractAddress: Scalars['ContractAddress']['output'];
  type: CollectModules;
};

export type RevertFollowModuleSettings = {
  __typename?: 'RevertFollowModuleSettings';
  contractAddress: Scalars['ContractAddress']['output'];
  type: FollowModules;
};

export enum ScalarOperator {
  Equal = 'EQUAL',
  GreaterThan = 'GREATER_THAN',
  GreaterThanOrEqual = 'GREATER_THAN_OR_EQUAL',
  LessThan = 'LESS_THAN',
  LessThanOrEqual = 'LESS_THAN_OR_EQUAL',
  NotEqual = 'NOT_EQUAL'
}

export type SearchQueryRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  customFilters?: InputMaybe<Array<CustomFiltersTypes>>;
  limit?: InputMaybe<Scalars['LimitScalar']['input']>;
  query: Scalars['Search']['input'];
  sources?: InputMaybe<Array<Scalars['Sources']['input']>>;
  type: SearchRequestTypes;
};

export enum SearchRequestTypes {
  Profile = 'PROFILE',
  Publication = 'PUBLICATION'
}

export type SearchResult = ProfileSearchResult | PublicationSearchResult;

export type SensitiveReasonInputParams = {
  reason: PublicationReportingReason;
  subreason: PublicationReportingSensitiveSubreason;
};

export type SetDefaultProfileBroadcastItemResult = {
  __typename?: 'SetDefaultProfileBroadcastItemResult';
  expiresAt: Scalars['DateTime']['output'];
  id: Scalars['BroadcastId']['output'];
  typedData: SetDefaultProfileEip712TypedData;
};

export type SetDefaultProfileEip712TypedData = {
  __typename?: 'SetDefaultProfileEIP712TypedData';
  domain: Eip712TypedDataDomain;
  types: SetDefaultProfileEip712TypedDataTypes;
  value: SetDefaultProfileEip712TypedDataValue;
};

export type SetDefaultProfileEip712TypedDataTypes = {
  __typename?: 'SetDefaultProfileEIP712TypedDataTypes';
  SetDefaultProfileWithSig: Array<Eip712TypedDataField>;
};

export type SetDefaultProfileEip712TypedDataValue = {
  __typename?: 'SetDefaultProfileEIP712TypedDataValue';
  deadline: Scalars['UnixTimestamp']['output'];
  nonce: Scalars['Nonce']['output'];
  profileId: Scalars['ProfileId']['output'];
  wallet: Scalars['EthereumAddress']['output'];
};

export type SetDispatcherRequest = {
  dispatcher?: InputMaybe<Scalars['EthereumAddress']['input']>;
  enable?: InputMaybe<Scalars['Boolean']['input']>;
  profileId: Scalars['ProfileId']['input'];
};

export type SignedAuthChallenge = {
  address: Scalars['EthereumAddress']['input'];
  signature: Scalars['Signature']['input'];
};

export type SimpleCollectModuleParams = {
  collectLimit?: InputMaybe<Scalars['String']['input']>;
  endTimestamp?: InputMaybe<Scalars['DateTime']['input']>;
  fee?: InputMaybe<ModuleFeeParams>;
  followerOnly: Scalars['Boolean']['input'];
};

export type SimpleCollectModuleSettings = {
  __typename?: 'SimpleCollectModuleSettings';
  collectLimit?: Maybe<Scalars['String']['output']>;
  contractAddress: Scalars['ContractAddress']['output'];
  endTimestamp?: Maybe<Scalars['DateTime']['output']>;
  fee?: Maybe<ModuleFee>;
  followerOnly: Scalars['Boolean']['output'];
  type: CollectModules;
};

export type SingleProfileQueryRequest = {
  handle?: InputMaybe<Scalars['Handle']['input']>;
  profileId?: InputMaybe<Scalars['ProfileId']['input']>;
};

export type SpamReasonInputParams = {
  reason: PublicationReportingReason;
  subreason: PublicationReportingSpamSubreason;
};

export type Subscription = {
  __typename?: 'Subscription';
  newDataAvailabilityTransaction: DataAvailabilityTransactionUnion;
};

export type SybilDotOrgIdentity = {
  __typename?: 'SybilDotOrgIdentity';
  source: SybilDotOrgIdentitySource;
  verified: Scalars['Boolean']['output'];
};

export type SybilDotOrgIdentitySource = {
  __typename?: 'SybilDotOrgIdentitySource';
  twitter: SybilDotOrgTwitterIdentity;
};

export type SybilDotOrgTwitterIdentity = {
  __typename?: 'SybilDotOrgTwitterIdentity';
  handle?: Maybe<Scalars['String']['output']>;
};

export type TagResult = {
  __typename?: 'TagResult';
  tag: Scalars['PublicationTag']['output'];
  total: Scalars['Int']['output'];
};

export enum TagSortCriteria {
  Alphabetical = 'ALPHABETICAL',
  MostPopular = 'MOST_POPULAR'
}

export type TimedFeeCollectModuleParams = {
  amount: ModuleFeeAmountParams;
  followerOnly: Scalars['Boolean']['input'];
  recipient: Scalars['EthereumAddress']['input'];
  referralFee: Scalars['Float']['input'];
};

export type TimedFeeCollectModuleSettings = {
  __typename?: 'TimedFeeCollectModuleSettings';
  amount: ModuleFeeAmount;
  contractAddress: Scalars['ContractAddress']['output'];
  endTimestamp: Scalars['DateTime']['output'];
  followerOnly: Scalars['Boolean']['output'];
  recipient: Scalars['EthereumAddress']['output'];
  referralFee: Scalars['Float']['output'];
  type: CollectModules;
};

export type TransactionError = {
  __typename?: 'TransactionError';
  reason: TransactionErrorReasons;
  txReceipt?: Maybe<TransactionReceipt>;
};

export enum TransactionErrorReasons {
  Reverted = 'REVERTED'
}

export type TransactionIndexedResult = {
  __typename?: 'TransactionIndexedResult';
  indexed: Scalars['Boolean']['output'];
  metadataStatus?: Maybe<PublicationMetadataStatus>;
  txHash: Scalars['TxHash']['output'];
  txReceipt?: Maybe<TransactionReceipt>;
};

export type TransactionReceipt = {
  __typename?: 'TransactionReceipt';
  blockHash: Scalars['String']['output'];
  blockNumber: Scalars['Int']['output'];
  byzantium: Scalars['Boolean']['output'];
  confirmations: Scalars['Int']['output'];
  contractAddress?: Maybe<Scalars['ContractAddress']['output']>;
  cumulativeGasUsed: Scalars['String']['output'];
  effectiveGasPrice: Scalars['String']['output'];
  from: Scalars['EthereumAddress']['output'];
  gasUsed: Scalars['String']['output'];
  logs: Array<Log>;
  logsBloom: Scalars['String']['output'];
  root?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
  to?: Maybe<Scalars['EthereumAddress']['output']>;
  transactionHash: Scalars['TxHash']['output'];
  transactionIndex: Scalars['Int']['output'];
  type: Scalars['Int']['output'];
};

export type TransactionResult = TransactionError | TransactionIndexedResult;

export type TypedDataOptions = {
  overrideSigNonce: Scalars['Nonce']['input'];
};

export type UnfollowRequest = {
  profile: Scalars['ProfileId']['input'];
};

export type UnknownCollectModuleParams = {
  contractAddress: Scalars['ContractAddress']['input'];
  data: Scalars['BlockchainData']['input'];
};

export type UnknownCollectModuleSettings = {
  __typename?: 'UnknownCollectModuleSettings';
  collectModuleReturnData: Scalars['CollectModuleData']['output'];
  contractAddress: Scalars['ContractAddress']['output'];
  type: CollectModules;
};

export type UnknownFollowModuleParams = {
  contractAddress: Scalars['ContractAddress']['input'];
  data: Scalars['BlockchainData']['input'];
};

export type UnknownFollowModuleRedeemParams = {
  data: Scalars['BlockchainData']['input'];
};

export type UnknownFollowModuleSettings = {
  __typename?: 'UnknownFollowModuleSettings';
  contractAddress: Scalars['ContractAddress']['output'];
  followModuleReturnData: Scalars['FollowModuleData']['output'];
  type: FollowModules;
};

export type UnknownReferenceModuleParams = {
  contractAddress: Scalars['ContractAddress']['input'];
  data: Scalars['BlockchainData']['input'];
};

export type UnknownReferenceModuleSettings = {
  __typename?: 'UnknownReferenceModuleSettings';
  contractAddress: Scalars['ContractAddress']['output'];
  referenceModuleReturnData: Scalars['ReferenceModuleData']['output'];
  type: ReferenceModules;
};

export type UpdateProfileImageRequest = {
  nftData?: InputMaybe<NftData>;
  profileId: Scalars['ProfileId']['input'];
  url?: InputMaybe<Scalars['Url']['input']>;
};

export type UserSigNonces = {
  __typename?: 'UserSigNonces';
  lensHubOnChainSigNonce: Scalars['Nonce']['output'];
  peripheryOnChainSigNonce: Scalars['Nonce']['output'];
};

export type ValidatePublicationMetadataRequest = {
  metadatav1?: InputMaybe<PublicationMetadataV1Input>;
  metadatav2?: InputMaybe<PublicationMetadataV2Input>;
};

export type VerifyRequest = {
  accessToken: Scalars['Jwt']['input'];
};

export type Wallet = {
  __typename?: 'Wallet';
  address: Scalars['EthereumAddress']['output'];
  defaultProfile?: Maybe<Profile>;
};

export type WhoCollectedPublicationRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<Scalars['LimitScalar']['input']>;
  publicationId: Scalars['InternalPublicationId']['input'];
};

export type WhoReactedPublicationRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<Scalars['LimitScalar']['input']>;
  publicationId: Scalars['InternalPublicationId']['input'];
};

export type WhoReactedResult = {
  __typename?: 'WhoReactedResult';
  profile: Profile;
  reaction: ReactionTypes;
  reactionAt: Scalars['DateTime']['output'];
  reactionId: Scalars['ReactionId']['output'];
};

export type WorldcoinIdentity = {
  __typename?: 'WorldcoinIdentity';
  isHuman: Scalars['Boolean']['output'];
};

export enum WorldcoinPhoneVerifyType {
  Orb = 'ORB',
  Phone = 'PHONE'
}

export type WorldcoinPhoneVerifyWebhookRequest = {
  nullifierHash: Scalars['String']['input'];
  signal: Scalars['EthereumAddress']['input'];
  signalType: WorldcoinPhoneVerifyType;
};

export type PublicationsQueryVariables = Exact<{
  hashedURL: Scalars['String']['input'];
  lensId?: InputMaybe<Scalars['ProfileId']['input']>;
}>;


export type PublicationsQuery = { __typename?: 'Query', publications: { __typename?: 'PaginatedPublicationResult', items: Array<{ __typename?: 'Comment' } | { __typename?: 'Mirror' } | { __typename?: 'Post', id: any }> } };


export const PublicationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Publications"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hashedURL"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lensId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ProfileId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"publications"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"profileId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lensId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"publicationTypes"},"value":{"kind":"ListValue","values":[{"kind":"EnumValue","value":"POST"}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"metadata"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"locale"},"value":{"kind":"StringValue","value":"en-us","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"tags"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"oneOf"},"value":{"kind":"ListValue","values":[{"kind":"Variable","name":{"kind":"Name","value":"hashedURL"}}]}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<PublicationsQuery, PublicationsQueryVariables>;