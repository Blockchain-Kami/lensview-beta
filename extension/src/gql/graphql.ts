/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
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
  /** The ABI json string */
  ABIJson: { input: any; output: any; }
  /** The app id */
  AppId: { input: any; output: any; }
  /** Blockchain data */
  BlockchainData: { input: any; output: any; }
  /** The broadcast id */
  BroadcastId: { input: any; output: any; }
  /** The chain id */
  ChainId: { input: any; output: any; }
  /** The challenge id */
  ChallengeId: { input: any; output: any; }
  /** The content encryption key value */
  ContentEncryptionKey: { input: any; output: any; }
  /** Create handle value */
  CreateHandle: { input: any; output: any; }
  /** Cursor custom scalar type */
  Cursor: { input: any; output: any; }
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: { input: any; output: any; }
  /** An ISO-8610 DateTime that could also be encrypted in some circumstances. Check parent nodes to determine if the value is encrypted or ready to use. */
  EncryptableDateTime: { input: any; output: any; }
  /** A Markdown text that could also be encrypted in some circumstances. Check parent nodes to determine if the value is encrypted or ready to use. */
  EncryptableMarkdown: { input: any; output: any; }
  /** A string that could also be encrypted in some circumstances. Check parent nodes to determine if the value is encrypted or ready to use. */
  EncryptableString: { input: any; output: any; }
  /** The tx hash that could also be encrypted in some circumstances. Check parent nodes to determine if the value is encrypted or ready to use. */
  EncryptableTxHash: { input: any; output: any; }
  /** A URI value that could also be encrypted in some circumstances. Check parent nodes to determine if the value is encrypted or ready to use. */
  EncryptableURI: { input: any; output: any; }
  /** Define a path of a possibly encrypted property in the Publication Metadata */
  EncryptedPath: { input: any; output: any; }
  /** The ens name */
  Ens: { input: any; output: any; }
  /** evm address type */
  EvmAddress: { input: any; output: any; }
  /** The handle attached to a profile - note its it own NFT and always identified by its full name */
  Handle: { input: any; output: any; }
  /** The image size transform */
  ImageSizeTransform: { input: any; output: any; }
  /** The jwt token */
  Jwt: { input: any; output: any; }
  /** The locale */
  Locale: { input: any; output: any; }
  /** The markdown value */
  Markdown: { input: any; output: any; }
  /** Mimetype type */
  MimeType: { input: any; output: any; }
  /** The momoka id */
  MomokaId: { input: any; output: any; }
  /** The momoka proof */
  MomokaProof: { input: any; output: any; }
  /** Nft gallery id type */
  NftGalleryId: { input: any; output: any; }
  /** Nft gallery name type */
  NftGalleryName: { input: any; output: any; }
  /** The nonce value */
  Nonce: { input: any; output: any; }
  /** The onchain publication id */
  OnchainPublicationId: { input: any; output: any; }
  /** The Poap Event id */
  PoapEventId: { input: any; output: any; }
  /** ProfileId custom scalar type */
  ProfileId: { input: any; output: any; }
  /** Publication id */
  PublicationId: { input: any; output: any; }
  /** The signature value */
  Signature: { input: any; output: any; }
  /** The NFT token id */
  TokenId: { input: any; output: any; }
  /** The tx hash */
  TxHash: { input: any; output: any; }
  /** The tx id */
  TxId: { input: any; output: any; }
  /** The URI value not this can be used in it can be a https OR different aka ar:// and ipfs://  */
  URI: { input: any; output: any; }
  /** The url value */
  URL: { input: any; output: any; }
  /** The guid uuid value */
  UUID: { input: any; output: any; }
  /** The unix timestamp */
  UnixTimestamp: { input: any; output: any; }
  /** Represents NULL values */
  Void: { input: any; output: any; }
};

export type ActOnOpenActionInput = {
  multirecipientCollectOpenAction?: InputMaybe<Scalars['Boolean']['input']>;
  simpleCollectOpenAction?: InputMaybe<Scalars['Boolean']['input']>;
  unknownOpenAction?: InputMaybe<UnknownOpenActionActRedeemInput>;
};

/** The lens manager will only support FREE open action modules, if you want your unknown module allowed to be signless please contact us */
export type ActOnOpenActionLensManagerInput = {
  simpleCollectOpenAction?: InputMaybe<Scalars['Boolean']['input']>;
  unknownOpenAction?: InputMaybe<UnknownOpenActionActRedeemInput>;
};

export type ActOnOpenActionLensManagerRequest = {
  actOn: ActOnOpenActionLensManagerInput;
  for: Scalars['PublicationId']['input'];
  referrers?: InputMaybe<Array<OnchainReferrer>>;
};

export type ActOnOpenActionRequest = {
  actOn: ActOnOpenActionInput;
  for: Scalars['PublicationId']['input'];
  referrers?: InputMaybe<Array<OnchainReferrer>>;
};

export type ActedNotification = {
  __typename?: 'ActedNotification';
  actions: Array<OpenActionProfileActed>;
  id: Scalars['UUID']['output'];
  publication: AnyPublication;
};

/** Condition that checks if the given on-chain contract function returns true. It only supports view functions */
export type AdvancedContractCondition = {
  __typename?: 'AdvancedContractCondition';
  /** The contract ABI. Has to be in human readable single string format containing the signature of the function you want to call. See https://docs.ethers.org/v5/api/utils/abi/fragments/#human-readable-abi for more info */
  abi: Scalars['String']['output'];
  /** The check to perform on the result of the function. In case of boolean outputs, "EQUALS" and "NOT_EQUALS" are supported. For BigNumber outputs, you can use every comparison option */
  comparison: ComparisonOperatorConditionType;
  /** The address and chain ID of the contract to call */
  contract: NetworkAddress;
  /** The name of the function to call. Must be included in the provided abi */
  functionName: Scalars['String']['output'];
  /** ABI encoded function parameters. In order to represent the address of the person trying to decrypt, you *have* to use the string ":userAddress" as this param represents the decrypting user address. If a param is an array or tuple, it will be in stringified format. */
  params: Array<Scalars['String']['output']>;
  /** The value to compare the result of the function against. Can be "true", "false" or a number in string format */
  value: Scalars['String']['output'];
};

export type AlreadyInvitedCheckRequest = {
  for: Scalars['EvmAddress']['input'];
};

export type Amount = {
  __typename?: 'Amount';
  /** This is the total value of the amount in the fiat currency */
  asFiat?: Maybe<FiatAmount>;
  /** The asset */
  asset: Asset;
  /** This is the most recent snapshotted 1:1 conversion rate between the asset and the requested fiat currency */
  rate?: Maybe<FiatAmount>;
  /** Floating point number as string (e.g. 42.009837). It could have the entire precision of the Asset or be truncated to the last significant decimal. */
  value: Scalars['String']['output'];
};


export type AmountAsFiatArgs = {
  request: RateRequest;
};


export type AmountRateArgs = {
  request: RateRequest;
};

export type AmountInput = {
  /** The currency */
  currency: Scalars['EvmAddress']['input'];
  /** Floating point number as string (e.g. 42.009837). It could have the entire precision of the Asset or be truncated to the last significant decimal. */
  value: Scalars['String']['input'];
};

export type AndCondition = {
  __typename?: 'AndCondition';
  criteria: Array<ThirdTierCondition>;
};

export type AnyPublication = Comment | Mirror | Post | Quote;

export type App = {
  __typename?: 'App';
  id: Scalars['AppId']['output'];
};

export type ApprovedAllowanceAmountResult = {
  __typename?: 'ApprovedAllowanceAmountResult';
  allowance: Amount;
  moduleContract: NetworkAddress;
  moduleName: Scalars['String']['output'];
};

export type ApprovedAuthentication = {
  __typename?: 'ApprovedAuthentication';
  authorizationId: Scalars['UUID']['output'];
  browser?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  device?: Maybe<Scalars['String']['output']>;
  expiresAt: Scalars['DateTime']['output'];
  origin?: Maybe<Scalars['URI']['output']>;
  os?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type ApprovedAuthenticationRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<LimitType>;
};

export type ApprovedModuleAllowanceAmountRequest = {
  currencies: Array<Scalars['EvmAddress']['input']>;
  followModules?: InputMaybe<Array<FollowModuleType>>;
  openActionModules?: InputMaybe<Array<OpenActionModuleType>>;
  referenceModules?: InputMaybe<Array<ReferenceModuleType>>;
  unknownFollowModules?: InputMaybe<Array<Scalars['EvmAddress']['input']>>;
  unknownOpenActionModules?: InputMaybe<Array<Scalars['EvmAddress']['input']>>;
  unknownReferenceModules?: InputMaybe<Array<Scalars['EvmAddress']['input']>>;
};

export type ArticleMetadataV3 = {
  __typename?: 'ArticleMetadataV3';
  appId?: Maybe<Scalars['AppId']['output']>;
  attachments?: Maybe<Array<PublicationMetadataMedia>>;
  attributes?: Maybe<Array<MetadataAttribute>>;
  content: Scalars['EncryptableMarkdown']['output'];
  contentWarning?: Maybe<PublicationContentWarningType>;
  encryptedWith?: Maybe<PublicationMetadataEncryptionStrategy>;
  hideFromFeed: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  locale: Scalars['Locale']['output'];
  marketplace?: Maybe<MarketplaceMetadata>;
  rawURI: Scalars['URI']['output'];
  tags?: Maybe<Array<Scalars['String']['output']>>;
  /** The title of the article. Empty if not set. */
  title: Scalars['String']['output'];
};

export type Asset = Erc20;

export type Audio = {
  __typename?: 'Audio';
  mimeType?: Maybe<Scalars['MimeType']['output']>;
  uri: Scalars['URI']['output'];
};

export type AudioMetadataV3 = {
  __typename?: 'AudioMetadataV3';
  appId?: Maybe<Scalars['AppId']['output']>;
  asset: PublicationMetadataMediaAudio;
  attachments?: Maybe<Array<PublicationMetadataMedia>>;
  attributes?: Maybe<Array<MetadataAttribute>>;
  /** Optional content. Empty if not set. */
  content: Scalars['EncryptableMarkdown']['output'];
  contentWarning?: Maybe<PublicationContentWarningType>;
  encryptedWith?: Maybe<PublicationMetadataEncryptionStrategy>;
  hideFromFeed: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  locale: Scalars['Locale']['output'];
  marketplace?: Maybe<MarketplaceMetadata>;
  rawURI: Scalars['URI']['output'];
  tags?: Maybe<Array<Scalars['String']['output']>>;
  /** The title of the audio. Empty if not set. */
  title: Scalars['String']['output'];
};

export type AuthChallengeResult = {
  __typename?: 'AuthChallengeResult';
  id: Scalars['ChallengeId']['output'];
  /** The text that needs to be signed */
  text: Scalars['String']['output'];
};

/** The authentication result */
export type AuthenticationResult = {
  __typename?: 'AuthenticationResult';
  /** The access token */
  accessToken: Scalars['Jwt']['output'];
  /** The identity token */
  identityToken: Scalars['Jwt']['output'];
  /** The refresh token */
  refreshToken: Scalars['Jwt']['output'];
};

export type BlockRequest = {
  profiles: Array<Scalars['ProfileId']['input']>;
};

export type BroadcastMomokaResult = CreateMomokaPublicationResult | RelayError;

export type BroadcastRequest = {
  id: Scalars['BroadcastId']['input'];
  signature: Scalars['Signature']['input'];
};

export type CanClaimRequest = {
  addresses: Array<Scalars['EvmAddress']['input']>;
};

export type CanClaimResult = {
  __typename?: 'CanClaimResult';
  address: Scalars['EvmAddress']['output'];
  canClaim: Scalars['Boolean']['output'];
};

export type CanDecryptResponse = {
  __typename?: 'CanDecryptResponse';
  extraDetails?: Maybe<Scalars['String']['output']>;
  reasons?: Maybe<Array<DecryptFailReasonType>>;
  result: Scalars['Boolean']['output'];
};

export type ChallengeRequest = {
  /** The profile ID to initiate a challenge - note if you do not pass this in you be logging in as a wallet and wont be able to use all the features */
  for?: InputMaybe<Scalars['ProfileId']['input']>;
  /** The Ethereum address that will sign the challenge */
  signedBy: Scalars['EvmAddress']['input'];
};

export type ChangeProfileManager = {
  action: ChangeProfileManagerActionType;
  address: Scalars['EvmAddress']['input'];
};

export enum ChangeProfileManagerActionType {
  Add = 'ADD',
  Remove = 'REMOVE'
}

export type ChangeProfileManagersRequest = {
  /** if you define this true will enable it and false will disable it within the same tx as any other managers you are changing state for. Leave it blank if you do not want to change its current state */
  approveSignless?: InputMaybe<Scalars['Boolean']['input']>;
  changeManagers?: InputMaybe<Array<ChangeProfileManager>>;
};

export type CheckingInMetadataV3 = {
  __typename?: 'CheckingInMetadataV3';
  address?: Maybe<PhysicalAddress>;
  appId?: Maybe<Scalars['AppId']['output']>;
  attachments?: Maybe<Array<PublicationMetadataMedia>>;
  attributes?: Maybe<Array<MetadataAttribute>>;
  /** Optional content. Empty if not set. */
  content: Scalars['EncryptableMarkdown']['output'];
  contentWarning?: Maybe<PublicationContentWarningType>;
  encryptedWith?: Maybe<PublicationMetadataEncryptionStrategy>;
  geographic?: Maybe<GeoLocation>;
  hideFromFeed: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  locale: Scalars['Locale']['output'];
  location: Scalars['EncryptableString']['output'];
  marketplace?: Maybe<MarketplaceMetadata>;
  rawURI: Scalars['URI']['output'];
  tags?: Maybe<Array<Scalars['String']['output']>>;
};

export enum ClaimProfileStatusType {
  AlreadyClaimed = 'ALREADY_CLAIMED',
  ClaimFailed = 'CLAIM_FAILED',
  NotClaimed = 'NOT_CLAIMED'
}

/** Claim profile with handle error reason type */
export enum ClaimProfileWithHandleErrorReasonType {
  CanNotFreeText = 'CAN_NOT_FREE_TEXT',
  ClaimNotFound = 'CLAIM_NOT_FOUND',
  ClaimNotLinkedToWallet = 'CLAIM_NOT_LINKED_TO_WALLET',
  ClaimTimeExpired = 'CLAIM_TIME_EXPIRED',
  ContractExecuted = 'CONTRACT_EXECUTED',
  HandleAlreadyClaimed = 'HANDLE_ALREADY_CLAIMED',
  HandleAlreadyExists = 'HANDLE_ALREADY_EXISTS',
  HandleReserved = 'HANDLE_RESERVED'
}

export type ClaimProfileWithHandleErrorResult = {
  __typename?: 'ClaimProfileWithHandleErrorResult';
  reason: ClaimProfileWithHandleErrorReasonType;
};

export type ClaimProfileWithHandleRequest = {
  followModule?: InputMaybe<FollowModuleInput>;
  freeTextHandle?: InputMaybe<Scalars['CreateHandle']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
};

export type ClaimProfileWithHandleResult = ClaimProfileWithHandleErrorResult | RelaySuccess;

export type ClaimTokensRequest = {
  for: ClaimableTokenType;
};

export type ClaimableProfilesResult = {
  __typename?: 'ClaimableProfilesResult';
  canMintProfileWithFreeTextHandle: Scalars['Boolean']['output'];
  reserved: Array<ReservedClaimable>;
};

export enum ClaimableTokenType {
  Bonsai = 'BONSAI'
}

export type ClaimableTokensResult = {
  __typename?: 'ClaimableTokensResult';
  bonsai: Amount;
};

export type CollectActionModuleInput = {
  multirecipientCollectOpenAction?: InputMaybe<MultirecipientFeeCollectModuleInput>;
  simpleCollectOpenAction?: InputMaybe<SimpleCollectOpenActionModuleInput>;
};

export type CollectCondition = {
  __typename?: 'CollectCondition';
  publicationId: Scalars['PublicationId']['output'];
  thisPublication: Scalars['Boolean']['output'];
};

export enum CollectOpenActionModuleType {
  LegacyAaveFeeCollectModule = 'LegacyAaveFeeCollectModule',
  LegacyErc4626FeeCollectModule = 'LegacyERC4626FeeCollectModule',
  LegacyFeeCollectModule = 'LegacyFeeCollectModule',
  LegacyFreeCollectModule = 'LegacyFreeCollectModule',
  LegacyLimitedFeeCollectModule = 'LegacyLimitedFeeCollectModule',
  LegacyLimitedTimedFeeCollectModule = 'LegacyLimitedTimedFeeCollectModule',
  LegacyMultirecipientFeeCollectModule = 'LegacyMultirecipientFeeCollectModule',
  LegacyRevertCollectModule = 'LegacyRevertCollectModule',
  LegacySimpleCollectModule = 'LegacySimpleCollectModule',
  LegacyTimedFeeCollectModule = 'LegacyTimedFeeCollectModule',
  MultirecipientFeeCollectOpenActionModule = 'MultirecipientFeeCollectOpenActionModule',
  SimpleCollectOpenActionModule = 'SimpleCollectOpenActionModule',
  UnknownOpenActionModule = 'UnknownOpenActionModule'
}

export type Comment = {
  __typename?: 'Comment';
  by: Profile;
  commentOn: PrimaryPublication;
  createdAt: Scalars['DateTime']['output'];
  firstComment?: Maybe<Comment>;
  hashtagsMentioned: Array<Scalars['String']['output']>;
  /** Signifies whether this comment has been hidden by the author of its parent publication */
  hiddenByAuthor: Scalars['Boolean']['output'];
  id: Scalars['PublicationId']['output'];
  isEncrypted: Scalars['Boolean']['output'];
  isHidden: Scalars['Boolean']['output'];
  metadata: PublicationMetadata;
  momoka?: Maybe<MomokaInfo>;
  openActionModules: Array<OpenActionModule>;
  operations: PublicationOperations;
  profilesMentioned: Array<ProfileMentioned>;
  publishedOn?: Maybe<App>;
  referenceModule?: Maybe<ReferenceModule>;
  root: CommentablePublication;
  stats: PublicationStats;
  txHash?: Maybe<Scalars['TxHash']['output']>;
};


export type CommentStatsArgs = {
  request?: InputMaybe<PublicationStatsInput>;
};

export type CommentNotification = {
  __typename?: 'CommentNotification';
  comment: Comment;
  id: Scalars['UUID']['output'];
};

export enum CommentRankingFilterType {
  All = 'ALL',
  NoneRelevant = 'NONE_RELEVANT',
  Relevant = 'RELEVANT'
}

export type CommentablePublication = Post | Quote;

export enum ComparisonOperatorConditionType {
  Equal = 'EQUAL',
  GreaterThan = 'GREATER_THAN',
  GreaterThanOrEqual = 'GREATER_THAN_OR_EQUAL',
  LessThan = 'LESS_THAN',
  LessThanOrEqual = 'LESS_THAN_OR_EQUAL',
  NotEqual = 'NOT_EQUAL'
}

export type CreateActOnOpenActionBroadcastItemResult = {
  __typename?: 'CreateActOnOpenActionBroadcastItemResult';
  /** The date the broadcast item expiries */
  expiresAt: Scalars['DateTime']['output'];
  /** This broadcast item ID */
  id: Scalars['BroadcastId']['output'];
  /** The typed data */
  typedData: CreateActOnOpenActionEip712TypedData;
};

export type CreateActOnOpenActionEip712TypedData = {
  __typename?: 'CreateActOnOpenActionEIP712TypedData';
  /** The typed data domain */
  domain: Eip712TypedDataDomain;
  /** The types */
  types: CreateActOnOpenActionEip712TypedDataTypes;
  /** The values */
  value: CreateActOnOpenActionEip712TypedDataValue;
};

export type CreateActOnOpenActionEip712TypedDataTypes = {
  __typename?: 'CreateActOnOpenActionEIP712TypedDataTypes';
  Act: Array<Eip712TypedDataField>;
};

export type CreateActOnOpenActionEip712TypedDataValue = {
  __typename?: 'CreateActOnOpenActionEIP712TypedDataValue';
  actionModuleAddress: Scalars['EvmAddress']['output'];
  actionModuleData: Scalars['BlockchainData']['output'];
  actorProfileId: Scalars['ProfileId']['output'];
  deadline: Scalars['UnixTimestamp']['output'];
  nonce: Scalars['Nonce']['output'];
  publicationActedId: Scalars['OnchainPublicationId']['output'];
  publicationActedProfileId: Scalars['ProfileId']['output'];
  referrerProfileIds: Array<Scalars['ProfileId']['output']>;
  referrerPubIds: Array<Scalars['OnchainPublicationId']['output']>;
};

export type CreateBlockProfilesBroadcastItemResult = {
  __typename?: 'CreateBlockProfilesBroadcastItemResult';
  /** The date the broadcast item expiries */
  expiresAt: Scalars['DateTime']['output'];
  /** This broadcast item ID */
  id: Scalars['BroadcastId']['output'];
  /** The typed data */
  typedData: CreateBlockProfilesEip712TypedData;
};

export type CreateBlockProfilesEip712TypedData = {
  __typename?: 'CreateBlockProfilesEIP712TypedData';
  /** The typed data domain */
  domain: Eip712TypedDataDomain;
  /** The types */
  types: CreateBlockProfilesEip712TypedDataTypes;
  /** The values */
  value: CreateBlockProfilesEip712TypedDataValue;
};

export type CreateBlockProfilesEip712TypedDataTypes = {
  __typename?: 'CreateBlockProfilesEIP712TypedDataTypes';
  SetBlockStatus: Array<Eip712TypedDataField>;
};

export type CreateBlockProfilesEip712TypedDataValue = {
  __typename?: 'CreateBlockProfilesEIP712TypedDataValue';
  blockStatus: Array<Scalars['Boolean']['output']>;
  byProfileId: Scalars['ProfileId']['output'];
  deadline: Scalars['UnixTimestamp']['output'];
  idsOfProfilesToSetBlockStatus: Array<Scalars['ProfileId']['output']>;
  nonce: Scalars['Nonce']['output'];
};

export type CreateChangeProfileManagersBroadcastItemResult = {
  __typename?: 'CreateChangeProfileManagersBroadcastItemResult';
  /** The date the broadcast item expiries */
  expiresAt: Scalars['DateTime']['output'];
  /** This broadcast item ID */
  id: Scalars['BroadcastId']['output'];
  /** The typed data */
  typedData: CreateChangeProfileManagersEip712TypedData;
};

export type CreateChangeProfileManagersEip712TypedData = {
  __typename?: 'CreateChangeProfileManagersEIP712TypedData';
  /** The typed data domain */
  domain: Eip712TypedDataDomain;
  /** The types */
  types: CreateChangeProfileManagersEip712TypedDataTypes;
  /** The values */
  value: CreateChangeProfileManagersEip712TypedDataValue;
};

export type CreateChangeProfileManagersEip712TypedDataTypes = {
  __typename?: 'CreateChangeProfileManagersEIP712TypedDataTypes';
  ChangeDelegatedExecutorsConfig: Array<Eip712TypedDataField>;
};

export type CreateChangeProfileManagersEip712TypedDataValue = {
  __typename?: 'CreateChangeProfileManagersEIP712TypedDataValue';
  approvals: Array<Scalars['Boolean']['output']>;
  configNumber: Scalars['Int']['output'];
  deadline: Scalars['UnixTimestamp']['output'];
  delegatedExecutors: Array<Scalars['EvmAddress']['output']>;
  delegatorProfileId: Scalars['ProfileId']['output'];
  nonce: Scalars['Nonce']['output'];
  switchToGivenConfig: Scalars['Boolean']['output'];
};

export type CreateFollowBroadcastItemResult = {
  __typename?: 'CreateFollowBroadcastItemResult';
  /** The date the broadcast item expiries */
  expiresAt: Scalars['DateTime']['output'];
  /** This broadcast item ID */
  id: Scalars['BroadcastId']['output'];
  /** The typed data */
  typedData: CreateFollowEip712TypedData;
};

/** The create follow eip 712 typed data */
export type CreateFollowEip712TypedData = {
  __typename?: 'CreateFollowEIP712TypedData';
  /** The typed data domain */
  domain: Eip712TypedDataDomain;
  /** The types */
  types: CreateFollowEip712TypedDataTypes;
  /** The values */
  value: CreateFollowEip712TypedDataValue;
};

/** The create follow eip 712 typed data types */
export type CreateFollowEip712TypedDataTypes = {
  __typename?: 'CreateFollowEIP712TypedDataTypes';
  Follow: Array<Eip712TypedDataField>;
};

/** The create follow eip 712 typed data value */
export type CreateFollowEip712TypedDataValue = {
  __typename?: 'CreateFollowEIP712TypedDataValue';
  datas: Array<Scalars['BlockchainData']['output']>;
  deadline: Scalars['UnixTimestamp']['output'];
  followTokenIds: Array<Scalars['TokenId']['output']>;
  followerProfileId: Scalars['ProfileId']['output'];
  idsOfProfilesToFollow: Array<Scalars['ProfileId']['output']>;
  nonce: Scalars['Nonce']['output'];
};

export type CreateFrameEip712TypedData = {
  __typename?: 'CreateFrameEIP712TypedData';
  /** The typed data domain */
  domain: Eip712TypedDataDomain;
  /** The types */
  types: CreateFrameEip712TypedDataTypes;
  /** The values */
  value: CreateFrameEip712TypedDataValue;
};

export type CreateFrameEip712TypedDataInput = {
  /** The typed data domain */
  domain: Eip712TypedDataDomainInput;
  /** The types */
  types: CreateFrameEip712TypedDataTypesInput;
  /** The values */
  value: CreateFrameEip712TypedDataValueInput;
};

export type CreateFrameEip712TypedDataTypes = {
  __typename?: 'CreateFrameEIP712TypedDataTypes';
  FrameData: Array<Eip712TypedDataField>;
};

export type CreateFrameEip712TypedDataTypesInput = {
  FrameData: Array<Eip712TypedDataFieldInput>;
};

export type CreateFrameEip712TypedDataValue = {
  __typename?: 'CreateFrameEIP712TypedDataValue';
  actionResponse: Scalars['String']['output'];
  buttonIndex: Scalars['Int']['output'];
  deadline: Scalars['UnixTimestamp']['output'];
  inputText: Scalars['String']['output'];
  profileId: Scalars['ProfileId']['output'];
  pubId: Scalars['PublicationId']['output'];
  /** The EIP-721 spec version, must be 1.0.0 */
  specVersion: Scalars['String']['output'];
  state: Scalars['String']['output'];
  url: Scalars['URI']['output'];
};

export type CreateFrameEip712TypedDataValueInput = {
  actionResponse: Scalars['String']['input'];
  buttonIndex: Scalars['Int']['input'];
  deadline: Scalars['UnixTimestamp']['input'];
  inputText: Scalars['String']['input'];
  profileId: Scalars['ProfileId']['input'];
  pubId: Scalars['PublicationId']['input'];
  /** The EIP-721 spec version, must be 1.0.0 */
  specVersion: Scalars['String']['input'];
  state: Scalars['String']['input'];
  url: Scalars['URI']['input'];
};

export type CreateLegacyCollectBroadcastItemResult = {
  __typename?: 'CreateLegacyCollectBroadcastItemResult';
  /** The date the broadcast item expiries */
  expiresAt: Scalars['DateTime']['output'];
  /** This broadcast item ID */
  id: Scalars['BroadcastId']['output'];
  /** The typed data */
  typedData: CreateLegacyCollectEip712TypedData;
};

export type CreateLegacyCollectEip712TypedData = {
  __typename?: 'CreateLegacyCollectEIP712TypedData';
  /** The typed data domain */
  domain: Eip712TypedDataDomain;
  /** The types */
  types: CreateLegacyCollectEip712TypedDataTypes;
  /** The values */
  value: CreateLegacyCollectEip712TypedDataValue;
};

export type CreateLegacyCollectEip712TypedDataTypes = {
  __typename?: 'CreateLegacyCollectEIP712TypedDataTypes';
  CollectLegacy: Array<Eip712TypedDataField>;
};

export type CreateLegacyCollectEip712TypedDataValue = {
  __typename?: 'CreateLegacyCollectEIP712TypedDataValue';
  collectModuleData: Scalars['BlockchainData']['output'];
  collectorProfileId: Scalars['ProfileId']['output'];
  deadline: Scalars['UnixTimestamp']['output'];
  nonce: Scalars['Nonce']['output'];
  publicationCollectedId: Scalars['OnchainPublicationId']['output'];
  publicationCollectedProfileId: Scalars['ProfileId']['output'];
  referrerProfileId: Scalars['ProfileId']['output'];
  referrerPubId: Scalars['OnchainPublicationId']['output'];
};

export type CreateLinkHandleToProfileBroadcastItemResult = {
  __typename?: 'CreateLinkHandleToProfileBroadcastItemResult';
  /** The date the broadcast item expiries */
  expiresAt: Scalars['DateTime']['output'];
  /** This broadcast item ID */
  id: Scalars['BroadcastId']['output'];
  /** The typed data */
  typedData: CreateLinkHandleToProfileEip712TypedData;
};

export type CreateLinkHandleToProfileEip712TypedData = {
  __typename?: 'CreateLinkHandleToProfileEIP712TypedData';
  /** The typed data domain */
  domain: Eip712TypedDataDomain;
  /** The types */
  types: CreateLinkHandleToProfileEip712TypedDataTypes;
  /** The values */
  value: CreateLinkHandleToProfileEip712TypedDataValue;
};

export type CreateLinkHandleToProfileEip712TypedDataTypes = {
  __typename?: 'CreateLinkHandleToProfileEIP712TypedDataTypes';
  Link: Array<Eip712TypedDataField>;
};

export type CreateLinkHandleToProfileEip712TypedDataValue = {
  __typename?: 'CreateLinkHandleToProfileEIP712TypedDataValue';
  deadline: Scalars['UnixTimestamp']['output'];
  handleId: Scalars['TokenId']['output'];
  nonce: Scalars['Nonce']['output'];
  profileId: Scalars['ProfileId']['output'];
};

export type CreateMomokaCommentBroadcastItemResult = {
  __typename?: 'CreateMomokaCommentBroadcastItemResult';
  /** The date the broadcast item expiries */
  expiresAt: Scalars['DateTime']['output'];
  /** This broadcast item ID */
  id: Scalars['BroadcastId']['output'];
  /** The typed data */
  typedData: CreateMomokaCommentEip712TypedData;
};

export type CreateMomokaCommentEip712TypedData = {
  __typename?: 'CreateMomokaCommentEIP712TypedData';
  /** The typed data domain */
  domain: Eip712TypedDataDomain;
  /** The types */
  types: CreateMomokaCommentEip712TypedDataTypes;
  /** The values */
  value: CreateMomokaCommentEip712TypedDataValue;
};

export type CreateMomokaCommentEip712TypedDataTypes = {
  __typename?: 'CreateMomokaCommentEIP712TypedDataTypes';
  Comment: Array<Eip712TypedDataField>;
};

export type CreateMomokaCommentEip712TypedDataValue = {
  __typename?: 'CreateMomokaCommentEIP712TypedDataValue';
  actionModules: Array<Scalars['EvmAddress']['output']>;
  actionModulesInitDatas: Array<Scalars['BlockchainData']['output']>;
  contentURI: Scalars['URI']['output'];
  deadline: Scalars['UnixTimestamp']['output'];
  nonce: Scalars['Nonce']['output'];
  pointedProfileId: Scalars['ProfileId']['output'];
  pointedPubId: Scalars['OnchainPublicationId']['output'];
  profileId: Scalars['ProfileId']['output'];
  referenceModule: Scalars['EvmAddress']['output'];
  referenceModuleData: Scalars['BlockchainData']['output'];
  referenceModuleInitData: Scalars['BlockchainData']['output'];
  referrerProfileIds: Array<Scalars['ProfileId']['output']>;
  referrerPubIds: Array<Scalars['OnchainPublicationId']['output']>;
};

export type CreateMomokaMirrorBroadcastItemResult = {
  __typename?: 'CreateMomokaMirrorBroadcastItemResult';
  /** The date the broadcast item expiries */
  expiresAt: Scalars['DateTime']['output'];
  /** This broadcast item ID */
  id: Scalars['BroadcastId']['output'];
  /** The typed data */
  typedData: CreateMomokaMirrorEip712TypedData;
};

export type CreateMomokaMirrorEip712TypedData = {
  __typename?: 'CreateMomokaMirrorEIP712TypedData';
  /** The typed data domain */
  domain: Eip712TypedDataDomain;
  /** The types */
  types: CreateMomokaMirrorEip712TypedDataTypes;
  /** The values */
  value: CreateMomokaMirrorEip712TypedDataValue;
};

export type CreateMomokaMirrorEip712TypedDataTypes = {
  __typename?: 'CreateMomokaMirrorEIP712TypedDataTypes';
  Mirror: Array<Eip712TypedDataField>;
};

export type CreateMomokaMirrorEip712TypedDataValue = {
  __typename?: 'CreateMomokaMirrorEIP712TypedDataValue';
  deadline: Scalars['UnixTimestamp']['output'];
  metadataURI: Scalars['String']['output'];
  nonce: Scalars['Nonce']['output'];
  pointedProfileId: Scalars['ProfileId']['output'];
  pointedPubId: Scalars['OnchainPublicationId']['output'];
  profileId: Scalars['ProfileId']['output'];
  referenceModuleData: Scalars['BlockchainData']['output'];
  referrerProfileIds: Array<Scalars['ProfileId']['output']>;
  referrerPubIds: Array<Scalars['OnchainPublicationId']['output']>;
};

export type CreateMomokaPostBroadcastItemResult = {
  __typename?: 'CreateMomokaPostBroadcastItemResult';
  /** The date the broadcast item expiries */
  expiresAt: Scalars['DateTime']['output'];
  /** This broadcast item ID */
  id: Scalars['BroadcastId']['output'];
  /** The typed data */
  typedData: CreateMomokaPostEip712TypedData;
};

export type CreateMomokaPostEip712TypedData = {
  __typename?: 'CreateMomokaPostEIP712TypedData';
  /** The typed data domain */
  domain: Eip712TypedDataDomain;
  /** The types */
  types: CreateMomokaPostEip712TypedDataTypes;
  /** The values */
  value: CreateMomokaPostEip712TypedDataValue;
};

export type CreateMomokaPostEip712TypedDataTypes = {
  __typename?: 'CreateMomokaPostEIP712TypedDataTypes';
  Post: Array<Eip712TypedDataField>;
};

export type CreateMomokaPostEip712TypedDataValue = {
  __typename?: 'CreateMomokaPostEIP712TypedDataValue';
  actionModules: Array<Scalars['EvmAddress']['output']>;
  actionModulesInitDatas: Array<Scalars['BlockchainData']['output']>;
  contentURI: Scalars['URI']['output'];
  deadline: Scalars['UnixTimestamp']['output'];
  nonce: Scalars['Nonce']['output'];
  profileId: Scalars['ProfileId']['output'];
  referenceModule: Scalars['EvmAddress']['output'];
  referenceModuleInitData: Scalars['BlockchainData']['output'];
};

export type CreateMomokaPublicationResult = {
  __typename?: 'CreateMomokaPublicationResult';
  id: Scalars['PublicationId']['output'];
  momokaId: Scalars['MomokaId']['output'];
  proof: Scalars['MomokaProof']['output'];
};

export type CreateMomokaQuoteBroadcastItemResult = {
  __typename?: 'CreateMomokaQuoteBroadcastItemResult';
  /** The date the broadcast item expiries */
  expiresAt: Scalars['DateTime']['output'];
  /** This broadcast item ID */
  id: Scalars['BroadcastId']['output'];
  /** The typed data */
  typedData: CreateMomokaQuoteEip712TypedData;
};

export type CreateMomokaQuoteEip712TypedData = {
  __typename?: 'CreateMomokaQuoteEIP712TypedData';
  /** The typed data domain */
  domain: Eip712TypedDataDomain;
  /** The types */
  types: CreateMomokaQuoteEip712TypedDataTypes;
  /** The values */
  value: CreateMomokaQuoteEip712TypedDataValue;
};

export type CreateMomokaQuoteEip712TypedDataTypes = {
  __typename?: 'CreateMomokaQuoteEIP712TypedDataTypes';
  Quote: Array<Eip712TypedDataField>;
};

export type CreateMomokaQuoteEip712TypedDataValue = {
  __typename?: 'CreateMomokaQuoteEIP712TypedDataValue';
  actionModules: Array<Scalars['EvmAddress']['output']>;
  actionModulesInitDatas: Array<Scalars['BlockchainData']['output']>;
  contentURI: Scalars['URI']['output'];
  deadline: Scalars['UnixTimestamp']['output'];
  nonce: Scalars['Nonce']['output'];
  pointedProfileId: Scalars['ProfileId']['output'];
  pointedPubId: Scalars['OnchainPublicationId']['output'];
  profileId: Scalars['ProfileId']['output'];
  referenceModule: Scalars['EvmAddress']['output'];
  referenceModuleData: Scalars['BlockchainData']['output'];
  referenceModuleInitData: Scalars['BlockchainData']['output'];
  referrerProfileIds: Array<Scalars['ProfileId']['output']>;
  referrerPubIds: Array<Scalars['OnchainPublicationId']['output']>;
};

export type CreateOnchainCommentBroadcastItemResult = {
  __typename?: 'CreateOnchainCommentBroadcastItemResult';
  /** The date the broadcast item expiries */
  expiresAt: Scalars['DateTime']['output'];
  /** This broadcast item ID */
  id: Scalars['BroadcastId']['output'];
  /** The typed data */
  typedData: CreateOnchainCommentEip712TypedData;
};

export type CreateOnchainCommentEip712TypedData = {
  __typename?: 'CreateOnchainCommentEIP712TypedData';
  /** The typed data domain */
  domain: Eip712TypedDataDomain;
  /** The types */
  types: CreateOnchainCommentEip712TypedDataTypes;
  /** The values */
  value: CreateOnchainCommentEip712TypedDataValue;
};

export type CreateOnchainCommentEip712TypedDataTypes = {
  __typename?: 'CreateOnchainCommentEIP712TypedDataTypes';
  Comment: Array<Eip712TypedDataField>;
};

export type CreateOnchainCommentEip712TypedDataValue = {
  __typename?: 'CreateOnchainCommentEIP712TypedDataValue';
  actionModules: Array<Scalars['EvmAddress']['output']>;
  actionModulesInitDatas: Array<Scalars['BlockchainData']['output']>;
  contentURI: Scalars['URI']['output'];
  deadline: Scalars['UnixTimestamp']['output'];
  nonce: Scalars['Nonce']['output'];
  pointedProfileId: Scalars['ProfileId']['output'];
  pointedPubId: Scalars['OnchainPublicationId']['output'];
  profileId: Scalars['ProfileId']['output'];
  referenceModule: Scalars['EvmAddress']['output'];
  referenceModuleData: Scalars['BlockchainData']['output'];
  referenceModuleInitData: Scalars['BlockchainData']['output'];
  referrerProfileIds: Array<Scalars['ProfileId']['output']>;
  referrerPubIds: Array<Scalars['OnchainPublicationId']['output']>;
};

export type CreateOnchainMirrorBroadcastItemResult = {
  __typename?: 'CreateOnchainMirrorBroadcastItemResult';
  /** The date the broadcast item expiries */
  expiresAt: Scalars['DateTime']['output'];
  /** This broadcast item ID */
  id: Scalars['BroadcastId']['output'];
  /** The typed data */
  typedData: CreateOnchainMirrorEip712TypedData;
};

export type CreateOnchainMirrorEip712TypedData = {
  __typename?: 'CreateOnchainMirrorEIP712TypedData';
  /** The typed data domain */
  domain: Eip712TypedDataDomain;
  /** The types */
  types: CreateOnchainMirrorEip712TypedDataTypes;
  /** The values */
  value: CreateOnchainMirrorEip712TypedDataValue;
};

export type CreateOnchainMirrorEip712TypedDataTypes = {
  __typename?: 'CreateOnchainMirrorEIP712TypedDataTypes';
  Mirror: Array<Eip712TypedDataField>;
};

export type CreateOnchainMirrorEip712TypedDataValue = {
  __typename?: 'CreateOnchainMirrorEIP712TypedDataValue';
  deadline: Scalars['UnixTimestamp']['output'];
  metadataURI: Scalars['String']['output'];
  nonce: Scalars['Nonce']['output'];
  pointedProfileId: Scalars['ProfileId']['output'];
  pointedPubId: Scalars['OnchainPublicationId']['output'];
  profileId: Scalars['ProfileId']['output'];
  referenceModuleData: Scalars['BlockchainData']['output'];
  referrerProfileIds: Array<Scalars['ProfileId']['output']>;
  referrerPubIds: Array<Scalars['OnchainPublicationId']['output']>;
};

export type CreateOnchainPostBroadcastItemResult = {
  __typename?: 'CreateOnchainPostBroadcastItemResult';
  /** The date the broadcast item expiries */
  expiresAt: Scalars['DateTime']['output'];
  /** This broadcast item ID */
  id: Scalars['BroadcastId']['output'];
  /** The typed data */
  typedData: CreateOnchainPostEip712TypedData;
};

export type CreateOnchainPostEip712TypedData = {
  __typename?: 'CreateOnchainPostEIP712TypedData';
  /** The typed data domain */
  domain: Eip712TypedDataDomain;
  /** The types */
  types: CreateOnchainPostEip712TypedDataTypes;
  /** The values */
  value: CreateOnchainPostEip712TypedDataValue;
};

export type CreateOnchainPostEip712TypedDataTypes = {
  __typename?: 'CreateOnchainPostEIP712TypedDataTypes';
  Post: Array<Eip712TypedDataField>;
};

export type CreateOnchainPostEip712TypedDataValue = {
  __typename?: 'CreateOnchainPostEIP712TypedDataValue';
  actionModules: Array<Scalars['EvmAddress']['output']>;
  actionModulesInitDatas: Array<Scalars['BlockchainData']['output']>;
  contentURI: Scalars['URI']['output'];
  deadline: Scalars['UnixTimestamp']['output'];
  nonce: Scalars['Nonce']['output'];
  profileId: Scalars['ProfileId']['output'];
  referenceModule: Scalars['EvmAddress']['output'];
  referenceModuleInitData: Scalars['BlockchainData']['output'];
};

export type CreateOnchainQuoteBroadcastItemResult = {
  __typename?: 'CreateOnchainQuoteBroadcastItemResult';
  /** The date the broadcast item expiries */
  expiresAt: Scalars['DateTime']['output'];
  /** This broadcast item ID */
  id: Scalars['BroadcastId']['output'];
  /** The typed data */
  typedData: CreateOnchainQuoteEip712TypedData;
};

export type CreateOnchainQuoteEip712TypedData = {
  __typename?: 'CreateOnchainQuoteEIP712TypedData';
  /** The typed data domain */
  domain: Eip712TypedDataDomain;
  /** The types */
  types: CreateOnchainQuoteEip712TypedDataTypes;
  /** The values */
  value: CreateOnchainQuoteEip712TypedDataValue;
};

export type CreateOnchainQuoteEip712TypedDataTypes = {
  __typename?: 'CreateOnchainQuoteEIP712TypedDataTypes';
  Quote: Array<Eip712TypedDataField>;
};

export type CreateOnchainQuoteEip712TypedDataValue = {
  __typename?: 'CreateOnchainQuoteEIP712TypedDataValue';
  actionModules: Array<Scalars['EvmAddress']['output']>;
  actionModulesInitDatas: Array<Scalars['BlockchainData']['output']>;
  contentURI: Scalars['URI']['output'];
  deadline: Scalars['UnixTimestamp']['output'];
  nonce: Scalars['Nonce']['output'];
  pointedProfileId: Scalars['ProfileId']['output'];
  pointedPubId: Scalars['OnchainPublicationId']['output'];
  profileId: Scalars['ProfileId']['output'];
  referenceModule: Scalars['EvmAddress']['output'];
  referenceModuleData: Scalars['BlockchainData']['output'];
  referenceModuleInitData: Scalars['BlockchainData']['output'];
  referrerProfileIds: Array<Scalars['ProfileId']['output']>;
  referrerPubIds: Array<Scalars['OnchainPublicationId']['output']>;
};

export type CreateOnchainSetProfileMetadataBroadcastItemResult = {
  __typename?: 'CreateOnchainSetProfileMetadataBroadcastItemResult';
  /** The date the broadcast item expiries */
  expiresAt: Scalars['DateTime']['output'];
  /** This broadcast item ID */
  id: Scalars['BroadcastId']['output'];
  /** The typed data */
  typedData: CreateOnchainSetProfileMetadataEip712TypedData;
};

export type CreateOnchainSetProfileMetadataEip712TypedData = {
  __typename?: 'CreateOnchainSetProfileMetadataEIP712TypedData';
  /** The typed data domain */
  domain: Eip712TypedDataDomain;
  /** The types */
  types: CreateOnchainSetProfileMetadataEip712TypedDataTypes;
  /** The values */
  value: CreateOnchainSetProfileMetadataEip712TypedDataValue;
};

export type CreateOnchainSetProfileMetadataEip712TypedDataTypes = {
  __typename?: 'CreateOnchainSetProfileMetadataEIP712TypedDataTypes';
  SetProfileMetadataURI: Array<Eip712TypedDataField>;
};

export type CreateOnchainSetProfileMetadataEip712TypedDataValue = {
  __typename?: 'CreateOnchainSetProfileMetadataEIP712TypedDataValue';
  deadline: Scalars['UnixTimestamp']['output'];
  metadataURI: Scalars['URI']['output'];
  nonce: Scalars['Nonce']['output'];
  profileId: Scalars['ProfileId']['output'];
};

export type CreateSetFollowModuleBroadcastItemResult = {
  __typename?: 'CreateSetFollowModuleBroadcastItemResult';
  /** The date the broadcast item expiries */
  expiresAt: Scalars['DateTime']['output'];
  /** This broadcast item ID */
  id: Scalars['BroadcastId']['output'];
  /** The typed data */
  typedData: CreateSetFollowModuleEip712TypedData;
};

export type CreateSetFollowModuleEip712TypedData = {
  __typename?: 'CreateSetFollowModuleEIP712TypedData';
  /** The typed data domain */
  domain: Eip712TypedDataDomain;
  /** The types */
  types: CreateSetFollowModuleEip712TypedDataTypes;
  /** The values */
  value: CreateSetFollowModuleEip712TypedDataValue;
};

export type CreateSetFollowModuleEip712TypedDataTypes = {
  __typename?: 'CreateSetFollowModuleEIP712TypedDataTypes';
  SetFollowModule: Array<Eip712TypedDataField>;
};

export type CreateSetFollowModuleEip712TypedDataValue = {
  __typename?: 'CreateSetFollowModuleEIP712TypedDataValue';
  deadline: Scalars['UnixTimestamp']['output'];
  followModule: Scalars['EvmAddress']['output'];
  followModuleInitData: Scalars['BlockchainData']['output'];
  nonce: Scalars['Nonce']['output'];
  profileId: Scalars['ProfileId']['output'];
};

export type CreateUnblockProfilesBroadcastItemResult = {
  __typename?: 'CreateUnblockProfilesBroadcastItemResult';
  /** The date the broadcast item expiries */
  expiresAt: Scalars['DateTime']['output'];
  /** This broadcast item ID */
  id: Scalars['BroadcastId']['output'];
  /** The typed data */
  typedData: CreateUnblockProfilesEip712TypedData;
};

export type CreateUnblockProfilesEip712TypedData = {
  __typename?: 'CreateUnblockProfilesEIP712TypedData';
  /** The typed data domain */
  domain: Eip712TypedDataDomain;
  /** The types */
  types: CreateUnblockProfilesEip712TypedDataTypes;
  /** The values */
  value: CreateUnblockProfilesEip712TypedDataValue;
};

export type CreateUnblockProfilesEip712TypedDataTypes = {
  __typename?: 'CreateUnblockProfilesEIP712TypedDataTypes';
  SetBlockStatus: Array<Eip712TypedDataField>;
};

export type CreateUnblockProfilesEip712TypedDataValue = {
  __typename?: 'CreateUnblockProfilesEIP712TypedDataValue';
  blockStatus: Array<Scalars['Boolean']['output']>;
  byProfileId: Scalars['ProfileId']['output'];
  deadline: Scalars['UnixTimestamp']['output'];
  idsOfProfilesToSetBlockStatus: Array<Scalars['ProfileId']['output']>;
  nonce: Scalars['Nonce']['output'];
};

export type CreateUnfollowBroadcastItemResult = {
  __typename?: 'CreateUnfollowBroadcastItemResult';
  /** The date the broadcast item expiries */
  expiresAt: Scalars['DateTime']['output'];
  /** This broadcast item ID */
  id: Scalars['BroadcastId']['output'];
  /** The typed data */
  typedData: CreateUnfollowEip712TypedData;
};

export type CreateUnfollowEip712TypedData = {
  __typename?: 'CreateUnfollowEIP712TypedData';
  /** The typed data domain */
  domain: Eip712TypedDataDomain;
  /** The types */
  types: CreateUnfollowEip712TypedDataTypes;
  /** The values */
  value: CreateUnfollowEip712TypedDataValue;
};

export type CreateUnfollowEip712TypedDataTypes = {
  __typename?: 'CreateUnfollowEIP712TypedDataTypes';
  Unfollow: Array<Eip712TypedDataField>;
};

export type CreateUnfollowEip712TypedDataValue = {
  __typename?: 'CreateUnfollowEIP712TypedDataValue';
  deadline: Scalars['UnixTimestamp']['output'];
  idsOfProfilesToUnfollow: Array<Scalars['ProfileId']['output']>;
  nonce: Scalars['Nonce']['output'];
  unfollowerProfileId: Scalars['ProfileId']['output'];
};

export type CreateUnlinkHandleFromProfileBroadcastItemResult = {
  __typename?: 'CreateUnlinkHandleFromProfileBroadcastItemResult';
  /** The date the broadcast item expiries */
  expiresAt: Scalars['DateTime']['output'];
  /** This broadcast item ID */
  id: Scalars['BroadcastId']['output'];
  /** The typed data */
  typedData: CreateUnlinkHandleFromProfileEip712TypedData;
};

export type CreateUnlinkHandleFromProfileEip712TypedData = {
  __typename?: 'CreateUnlinkHandleFromProfileEIP712TypedData';
  /** The typed data domain */
  domain: Eip712TypedDataDomain;
  /** The types */
  types: CreateUnlinkHandleFromProfileEip712TypedDataTypes;
  /** The values */
  value: CreateUnlinkHandleFromProfileEip712TypedDataValue;
};

export type CreateUnlinkHandleFromProfileEip712TypedDataTypes = {
  __typename?: 'CreateUnlinkHandleFromProfileEIP712TypedDataTypes';
  Unlink: Array<Eip712TypedDataField>;
};

export type CreateUnlinkHandleFromProfileEip712TypedDataValue = {
  __typename?: 'CreateUnlinkHandleFromProfileEIP712TypedDataValue';
  deadline: Scalars['UnixTimestamp']['output'];
  handleId: Scalars['TokenId']['output'];
  nonce: Scalars['Nonce']['output'];
  profileId: Scalars['ProfileId']['output'];
};

export enum CustomFiltersType {
  Gardeners = 'GARDENERS'
}

export enum DecryptFailReasonType {
  CanNotDecrypt = 'CAN_NOT_DECRYPT',
  CollectNotFinalisedOnChain = 'COLLECT_NOT_FINALISED_ON_CHAIN',
  DoesNotFollowProfile = 'DOES_NOT_FOLLOW_PROFILE',
  DoesNotOwnNft = 'DOES_NOT_OWN_NFT',
  DoesNotOwnProfile = 'DOES_NOT_OWN_PROFILE',
  FollowNotFinalisedOnChain = 'FOLLOW_NOT_FINALISED_ON_CHAIN',
  HasNotCollectedPublication = 'HAS_NOT_COLLECTED_PUBLICATION',
  MissingEncryptionParams = 'MISSING_ENCRYPTION_PARAMS',
  NotLoggedIn = 'NOT_LOGGED_IN',
  ProfileDoesNotExist = 'PROFILE_DOES_NOT_EXIST',
  PublicationIsNotGated = 'PUBLICATION_IS_NOT_GATED',
  UnauthorizedAddress = 'UNAUTHORIZED_ADDRESS',
  UnauthorizedBalance = 'UNAUTHORIZED_BALANCE',
  Unsupported = 'UNSUPPORTED'
}

export type DefaultProfileRequest = {
  for: Scalars['EvmAddress']['input'];
};

export type DegreesOfSeparationReferenceModuleInput = {
  commentsRestricted: Scalars['Boolean']['input'];
  degreesOfSeparation: Scalars['Int']['input'];
  mirrorsRestricted: Scalars['Boolean']['input'];
  quotesRestricted: Scalars['Boolean']['input'];
  /** You can set the degree to follow someone elses graph, if you leave blank it use your profile */
  sourceProfileId?: InputMaybe<Scalars['ProfileId']['input']>;
};

export type DegreesOfSeparationReferenceModuleSettings = {
  __typename?: 'DegreesOfSeparationReferenceModuleSettings';
  /** Applied to comments */
  commentsRestricted: Scalars['Boolean']['output'];
  contract: NetworkAddress;
  /** Degrees of separation */
  degreesOfSeparation: Scalars['Int']['output'];
  /** Applied to mirrors */
  mirrorsRestricted: Scalars['Boolean']['output'];
  /** Applied to quotes */
  quotesRestricted: Scalars['Boolean']['output'];
  /** Who the degree of separation is applied to */
  sourceProfileId: Scalars['ProfileId']['output'];
  type: ReferenceModuleType;
};

export type DidReactOnPublicationPublicationIdAndProfileId = {
  profileId: Scalars['ProfileId']['input'];
  publicationId: Scalars['PublicationId']['input'];
};

export type DidReactOnPublicationRequest = {
  for: Array<DidReactOnPublicationPublicationIdAndProfileId>;
  where?: InputMaybe<WhoReactedPublicationWhere>;
};

export type DidReactOnPublicationResult = {
  __typename?: 'DidReactOnPublicationResult';
  profileId: Scalars['ProfileId']['output'];
  publicationId: Scalars['PublicationId']['output'];
  result: Scalars['Boolean']['output'];
};

export type DismissRecommendedProfilesRequest = {
  dismiss: Array<Scalars['ProfileId']['input']>;
};

export type DisputedReport = {
  __typename?: 'DisputedReport';
  createdAt: Scalars['DateTime']['output'];
  disputeReason: Scalars['String']['output'];
  disputer: Profile;
  reportAdditionalInfo: Scalars['String']['output'];
  reportReason: Scalars['String']['output'];
  reportSubreason: Scalars['String']['output'];
  reportedProfile: Profile;
  reportedPublication?: Maybe<PrimaryPublication>;
  reporter: Profile;
};

/** The eip 712 typed data domain */
export type Eip712TypedDataDomain = {
  __typename?: 'EIP712TypedDataDomain';
  /** The chainId */
  chainId: Scalars['ChainId']['output'];
  /** The name of the typed data domain */
  name: Scalars['String']['output'];
  /** The verifying contract */
  verifyingContract: Scalars['EvmAddress']['output'];
  /** The version */
  version: Scalars['String']['output'];
};

export type Eip712TypedDataDomainInput = {
  /** The chainId */
  chainId: Scalars['ChainId']['input'];
  /** The name of the typed data domain */
  name: Scalars['String']['input'];
  /** The verifying contract */
  verifyingContract: Scalars['EvmAddress']['input'];
  /** The version */
  version: Scalars['String']['input'];
};

/** The eip 712 typed data field */
export type Eip712TypedDataField = {
  __typename?: 'EIP712TypedDataField';
  /** The name of the typed data field */
  name: Scalars['String']['output'];
  /** The type of the typed data field */
  type: Scalars['String']['output'];
};

export type Eip712TypedDataFieldInput = {
  /** The name of the typed data field */
  name: Scalars['String']['input'];
  /** The type of the typed data field */
  type: Scalars['String']['input'];
};

export type EmbedMetadataV3 = {
  __typename?: 'EmbedMetadataV3';
  appId?: Maybe<Scalars['AppId']['output']>;
  attachments?: Maybe<Array<PublicationMetadataMedia>>;
  attributes?: Maybe<Array<MetadataAttribute>>;
  /** Optional content. Empty if not set. */
  content: Scalars['EncryptableMarkdown']['output'];
  contentWarning?: Maybe<PublicationContentWarningType>;
  embed: Scalars['EncryptableURI']['output'];
  encryptedWith?: Maybe<PublicationMetadataEncryptionStrategy>;
  hideFromFeed: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  locale: Scalars['Locale']['output'];
  marketplace?: Maybe<MarketplaceMetadata>;
  rawURI: Scalars['URI']['output'];
  tags?: Maybe<Array<Scalars['String']['output']>>;
};

export type EncryptableAudio = {
  __typename?: 'EncryptableAudio';
  mimeType?: Maybe<Scalars['MimeType']['output']>;
  uri: Scalars['EncryptableURI']['output'];
};

export type EncryptableAudioSet = {
  __typename?: 'EncryptableAudioSet';
  optimized?: Maybe<Audio>;
  raw: EncryptableAudio;
};

export type EncryptableImage = {
  __typename?: 'EncryptableImage';
  /** Height of the image */
  height?: Maybe<Scalars['Int']['output']>;
  /** MIME type of the image */
  mimeType?: Maybe<Scalars['MimeType']['output']>;
  uri: Scalars['EncryptableURI']['output'];
  /** Width of the image */
  width?: Maybe<Scalars['Int']['output']>;
};

export type EncryptableImageSet = {
  __typename?: 'EncryptableImageSet';
  optimized?: Maybe<Image>;
  raw: EncryptableImage;
  transformed?: Maybe<Image>;
};


export type EncryptableImageSetTransformedArgs = {
  request: ImageTransform;
};

export type EncryptableVideo = {
  __typename?: 'EncryptableVideo';
  mimeType?: Maybe<Scalars['MimeType']['output']>;
  uri: Scalars['EncryptableURI']['output'];
};

export type EncryptableVideoSet = {
  __typename?: 'EncryptableVideoSet';
  optimized?: Maybe<Video>;
  raw: EncryptableVideo;
};

export type EnsOnchainIdentity = {
  __typename?: 'EnsOnchainIdentity';
  /** The default ens mapped to this address */
  name?: Maybe<Scalars['Ens']['output']>;
};

export type EoaOwnershipCondition = {
  __typename?: 'EoaOwnershipCondition';
  address: Scalars['EvmAddress']['output'];
};

/** The erc20 type */
export type Erc20 = {
  __typename?: 'Erc20';
  /** The erc20 address */
  contract: NetworkAddress;
  /** Decimal places for the token */
  decimals: Scalars['Int']['output'];
  /** Name of the symbol */
  name: Scalars['String']['output'];
  /** Symbol for the token */
  symbol: Scalars['String']['output'];
};

export type Erc20OwnershipCondition = {
  __typename?: 'Erc20OwnershipCondition';
  amount: Amount;
  condition: ComparisonOperatorConditionType;
};

export type EventMetadataV3 = {
  __typename?: 'EventMetadataV3';
  address?: Maybe<PhysicalAddress>;
  appId?: Maybe<Scalars['AppId']['output']>;
  attachments?: Maybe<Array<PublicationMetadataMedia>>;
  attributes?: Maybe<Array<MetadataAttribute>>;
  /** Optional content. Empty if not set. */
  content: Scalars['EncryptableMarkdown']['output'];
  contentWarning?: Maybe<PublicationContentWarningType>;
  encryptedWith?: Maybe<PublicationMetadataEncryptionStrategy>;
  endsAt: Scalars['EncryptableDateTime']['output'];
  geographic?: Maybe<GeoLocation>;
  hideFromFeed: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  links?: Maybe<Array<Scalars['EncryptableURI']['output']>>;
  locale: Scalars['Locale']['output'];
  location: Scalars['EncryptableString']['output'];
  marketplace?: Maybe<MarketplaceMetadata>;
  rawURI: Scalars['URI']['output'];
  startsAt: Scalars['EncryptableDateTime']['output'];
  tags?: Maybe<Array<Scalars['String']['output']>>;
  /** The optional title of the event. Empty if not set. */
  title: Scalars['String']['output'];
};

/** Possible sort criteria for exploring profiles */
export enum ExploreProfilesOrderByType {
  CreatedOn = 'CREATED_ON',
  LatestCreated = 'LATEST_CREATED',
  MostCollects = 'MOST_COLLECTS',
  MostComments = 'MOST_COMMENTS',
  MostFollowers = 'MOST_FOLLOWERS',
  MostMirrors = 'MOST_MIRRORS',
  MostPosts = 'MOST_POSTS',
  MostPublication = 'MOST_PUBLICATION'
}

export type ExploreProfilesRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<LimitType>;
  /** Order criteria for exploring profiles */
  orderBy: ExploreProfilesOrderByType;
  /** Filtering criteria for exploring profiles */
  where?: InputMaybe<ExploreProfilesWhere>;
};

export type ExploreProfilesWhere = {
  /** Array of custom filters for exploring profiles */
  customFilters?: InputMaybe<Array<CustomFiltersType>>;
  /** Filter profiles created since the specified timestamp */
  since?: InputMaybe<Scalars['UnixTimestamp']['input']>;
};

export type ExplorePublication = Post | Quote;

export type ExplorePublicationRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<LimitType>;
  orderBy: ExplorePublicationsOrderByType;
  where?: InputMaybe<ExplorePublicationsWhere>;
};

export enum ExplorePublicationType {
  Post = 'POST',
  Quote = 'QUOTE'
}

export enum ExplorePublicationsOrderByType {
  Latest = 'LATEST',
  LensCurated = 'LENS_CURATED',
  TopCollectedOpenAction = 'TOP_COLLECTED_OPEN_ACTION',
  TopCommented = 'TOP_COMMENTED',
  TopMirrored = 'TOP_MIRRORED',
  TopQuoted = 'TOP_QUOTED',
  TopReacted = 'TOP_REACTED'
}

export type ExplorePublicationsWhere = {
  customFilters?: InputMaybe<Array<CustomFiltersType>>;
  metadata?: InputMaybe<PublicationMetadataFilters>;
  publicationTypes?: InputMaybe<Array<ExplorePublicationType>>;
  since?: InputMaybe<Scalars['UnixTimestamp']['input']>;
};

export type FeeFollowModuleInput = {
  amount: AmountInput;
  recipient: Scalars['EvmAddress']['input'];
};

export type FeeFollowModuleRedeemInput = {
  amount: AmountInput;
};

export type FeeFollowModuleSettings = {
  __typename?: 'FeeFollowModuleSettings';
  /** The amount info */
  amount: Amount;
  contract: NetworkAddress;
  /** The module recipient address */
  recipient: Scalars['EvmAddress']['output'];
  type: FollowModuleType;
};

export enum FeedEventItemType {
  Acted = 'ACTED',
  Collect = 'COLLECT',
  Comment = 'COMMENT',
  Mirror = 'MIRROR',
  Post = 'POST',
  Quote = 'QUOTE',
  Reaction = 'REACTION'
}

export type FeedHighlight = Post | Quote;

export type FeedHighlightsRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<LimitType>;
  where?: InputMaybe<FeedHighlightsWhere>;
};

export type FeedHighlightsWhere = {
  for?: InputMaybe<Scalars['ProfileId']['input']>;
  metadata?: InputMaybe<PublicationMetadataFilters>;
};

export type FeedItem = {
  __typename?: 'FeedItem';
  acted: Array<OpenActionProfileActed>;
  comments: Array<Comment>;
  id: Scalars['String']['output'];
  mirrors: Array<Mirror>;
  reactions: Array<ReactionEvent>;
  root: PrimaryPublication;
};

export type FeedRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  where?: InputMaybe<FeedWhere>;
};

export type FeedWhere = {
  customFilters?: InputMaybe<Array<CustomFiltersType>>;
  feedEventItemTypes?: InputMaybe<Array<FeedEventItemType>>;
  for?: InputMaybe<Scalars['ProfileId']['input']>;
  metadata?: InputMaybe<PublicationMetadataFilters>;
};

export type Fiat = {
  __typename?: 'Fiat';
  decimals: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  symbol: Scalars['String']['output'];
};

export type FiatAmount = {
  __typename?: 'FiatAmount';
  asset: Fiat;
  value: Scalars['String']['output'];
};

export type Follow = {
  followModule?: InputMaybe<FollowModuleRedeemInput>;
  profileId: Scalars['ProfileId']['input'];
};

export type FollowCondition = {
  __typename?: 'FollowCondition';
  follow: Scalars['ProfileId']['output'];
};

export type FollowLensManager = {
  followModule?: InputMaybe<FollowLensManagerModuleRedeemInput>;
  profileId: Scalars['ProfileId']['input'];
};

/** The lens manager will only support follow modules which are verified here - https://github.com/lens-protocol/verified-modules/blob/master/follow-modules.json */
export type FollowLensManagerModuleRedeemInput = {
  unknownFollowModule?: InputMaybe<UnknownFollowModuleRedeemInput>;
};

export type FollowLensManagerRequest = {
  follow: Array<FollowLensManager>;
};

export type FollowModule = FeeFollowModuleSettings | RevertFollowModuleSettings | UnknownFollowModuleSettings;

export type FollowModuleInput = {
  feeFollowModule?: InputMaybe<FeeFollowModuleInput>;
  freeFollowModule?: InputMaybe<Scalars['Boolean']['input']>;
  revertFollowModule?: InputMaybe<Scalars['Boolean']['input']>;
  unknownFollowModule?: InputMaybe<UnknownFollowModuleInput>;
};

export type FollowModuleRedeemInput = {
  feeFollowModule?: InputMaybe<FeeFollowModuleRedeemInput>;
  unknownFollowModule?: InputMaybe<UnknownFollowModuleRedeemInput>;
};

export enum FollowModuleType {
  FeeFollowModule = 'FeeFollowModule',
  RevertFollowModule = 'RevertFollowModule',
  UnknownFollowModule = 'UnknownFollowModule'
}

export type FollowNotification = {
  __typename?: 'FollowNotification';
  followers: Array<Profile>;
  id: Scalars['UUID']['output'];
};

export type FollowOnlyReferenceModuleSettings = {
  __typename?: 'FollowOnlyReferenceModuleSettings';
  contract: NetworkAddress;
  type: ReferenceModuleType;
};

export type FollowPaidAction = {
  __typename?: 'FollowPaidAction';
  followed: Profile;
  latestActed: Array<LatestActed>;
};

export type FollowRequest = {
  follow: Array<Follow>;
};

export type FollowRevenueRequest = {
  for: Scalars['ProfileId']['input'];
};

export type FollowRevenueResult = {
  __typename?: 'FollowRevenueResult';
  revenues: Array<RevenueAggregate>;
};

export type FollowStatusBulk = {
  follower: Scalars['ProfileId']['input'];
  profileId: Scalars['ProfileId']['input'];
};

export type FollowStatusBulkRequest = {
  followInfos: Array<FollowStatusBulk>;
};

export type FollowStatusBulkResult = {
  __typename?: 'FollowStatusBulkResult';
  follower: Scalars['ProfileId']['output'];
  profileId: Scalars['ProfileId']['output'];
  status: OptimisticStatusResult;
};

export type FollowersRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<LimitType>;
  of: Scalars['ProfileId']['input'];
  /** The order by which to sort the profiles - note if your looking at your own followers it always be DESC */
  orderBy?: InputMaybe<ProfilesOrderBy>;
};

export type FollowingRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  for: Scalars['ProfileId']['input'];
  limit?: InputMaybe<LimitType>;
  /** The order by which to sort the profiles - note if your looking at your own following it always be DESC */
  orderBy?: InputMaybe<ProfilesOrderBy>;
};

export type FrameEip712Request = {
  actionResponse: Scalars['String']['input'];
  buttonIndex: Scalars['Int']['input'];
  deadline: Scalars['UnixTimestamp']['input'];
  inputText: Scalars['String']['input'];
  profileId: Scalars['ProfileId']['input'];
  pubId: Scalars['PublicationId']['input'];
  /** The EIP-721 spec version, must be 1.0.0 */
  specVersion: Scalars['String']['input'];
  state: Scalars['String']['input'];
  url: Scalars['URI']['input'];
};

export type FrameLensManagerEip712Request = {
  actionResponse: Scalars['String']['input'];
  buttonIndex: Scalars['Int']['input'];
  inputText: Scalars['String']['input'];
  profileId: Scalars['ProfileId']['input'];
  pubId: Scalars['PublicationId']['input'];
  /** The EIP-721 spec version, must be 1.0.0 */
  specVersion: Scalars['String']['input'];
  state: Scalars['String']['input'];
  url: Scalars['URI']['input'];
};

export type FrameLensManagerSignatureResult = {
  __typename?: 'FrameLensManagerSignatureResult';
  /** The signature */
  signature: Scalars['Signature']['output'];
  /** The typed data signed */
  signedTypedData: CreateFrameEip712TypedData;
};

export type FrameVerifySignature = {
  /** The identity token */
  identityToken: Scalars['Jwt']['input'];
  /** The signature */
  signature: Scalars['Signature']['input'];
  /** The typed data signed */
  signedTypedData: CreateFrameEip712TypedDataInput;
};

export enum FrameVerifySignatureResult {
  DeadlineExpired = 'DEADLINE_EXPIRED',
  IdentityCannotUseProfile = 'IDENTITY_CANNOT_USE_PROFILE',
  IdentityUnauthorized = 'IDENTITY_UNAUTHORIZED',
  SignerAddressCannotUseProfile = 'SIGNER_ADDRESS_CANNOT_USE_PROFILE',
  Verified = 'VERIFIED'
}

export type FraudReasonInput = {
  reason: PublicationReportingReason;
  subreason: PublicationReportingFraudSubreason;
};

export type GenerateModuleCurrencyApprovalDataRequest = {
  allowance: AmountInput;
  module: ModuleCurrencyApproval;
};

export type GenerateModuleCurrencyApprovalResult = {
  __typename?: 'GenerateModuleCurrencyApprovalResult';
  data: Scalars['BlockchainData']['output'];
  from: Scalars['EvmAddress']['output'];
  to: Scalars['EvmAddress']['output'];
};

export type GeoLocation = {
  __typename?: 'GeoLocation';
  /** `null` when `rawURI` is encrypted */
  latitude?: Maybe<Scalars['Float']['output']>;
  /** `null` when `rawURI` is encrypted */
  longitude?: Maybe<Scalars['Float']['output']>;
  /** The raw Geo URI of the location. If encrypted `latitude` and `longitude` will be `null` */
  rawURI: Scalars['EncryptableURI']['output'];
};

export type GetModuleMetadataResult = {
  __typename?: 'GetModuleMetadataResult';
  metadata: ModuleMetadata;
  moduleType: ModuleType;
  /** True if the module can be signedless and use lens manager without a signature */
  signlessApproved: Scalars['Boolean']['output'];
  /** True if the module can be sponsored through gasless so the user does not need to pay for gas */
  sponsoredApproved: Scalars['Boolean']['output'];
  /** True if the module is deemed as safe */
  verified: Scalars['Boolean']['output'];
};

export type GetProfileMetadataArgs = {
  /** The app id to query the profile's metadata */
  appId?: InputMaybe<Scalars['AppId']['input']>;
  /** If true, will fallback to global profile metadata, if there is no metadata set for that specific app id */
  useFallback?: InputMaybe<Scalars['Boolean']['input']>;
};

export type HandleGuardianResult = {
  __typename?: 'HandleGuardianResult';
  cooldownEndsOn?: Maybe<Scalars['DateTime']['output']>;
  protected: Scalars['Boolean']['output'];
};

export type HandleInfo = {
  __typename?: 'HandleInfo';
  /** The full handle - namespace/localname */
  fullHandle: Scalars['Handle']['output'];
  guardian: HandleGuardianResult;
  /** The handle nft token id */
  id: Scalars['TokenId']['output'];
  /** If null its not linked to anything */
  linkedTo?: Maybe<HandleLinkedTo>;
  /** The localname */
  localName: Scalars['String']['output'];
  /** The namespace */
  namespace: Scalars['String']['output'];
  ownedBy: Scalars['EvmAddress']['output'];
  /** The suggested format to use on UI for ease but you can innovate and slice and dice as you want */
  suggestedFormatted: SuggestedFormattedHandle;
};

export type HandleLinkedTo = {
  __typename?: 'HandleLinkedTo';
  /** The contract address it is linked to */
  contract: NetworkAddress;
  /** The nft token id it is linked to (this can be the profile Id) */
  nftTokenId: Scalars['TokenId']['output'];
};

export type HandleToAddressRequest = {
  /** The full handle - namespace/localname */
  handle: Scalars['Handle']['input'];
};

export enum HiddenCommentsType {
  HiddenOnly = 'HIDDEN_ONLY',
  Hide = 'HIDE',
  Show = 'SHOW'
}

export type HideCommentRequest = {
  /** The comment to hide. It has to be under a publication made by the user making the request. If already hidden, nothing will happen. */
  for: Scalars['PublicationId']['input'];
};

export type HideManagedProfileRequest = {
  /** The profile to hide */
  profileId: Scalars['ProfileId']['input'];
};

export type HidePublicationRequest = {
  for: Scalars['PublicationId']['input'];
};

export type IphResult = {
  __typename?: 'IPHResult';
  h?: Maybe<Scalars['Handle']['output']>;
  hda: Scalars['Boolean']['output'];
  hs: Scalars['Boolean']['output'];
};

export type IdKitPhoneVerifyWebhookRequest = {
  sharedSecret: Scalars['String']['input'];
  worldcoin?: InputMaybe<WorldcoinPhoneVerifyWebhookRequest>;
};

export enum IdKitPhoneVerifyWebhookResultStatusType {
  AlreadyVerified = 'ALREADY_VERIFIED',
  Success = 'SUCCESS'
}

export type IllegalReasonInput = {
  reason: PublicationReportingReason;
  subreason: PublicationReportingIllegalSubreason;
};

export type Image = {
  __typename?: 'Image';
  /** Height of the image */
  height?: Maybe<Scalars['Int']['output']>;
  /** MIME type of the image */
  mimeType?: Maybe<Scalars['MimeType']['output']>;
  uri: Scalars['URI']['output'];
  /** Width of the image */
  width?: Maybe<Scalars['Int']['output']>;
};

export type ImageMetadataV3 = {
  __typename?: 'ImageMetadataV3';
  appId?: Maybe<Scalars['AppId']['output']>;
  asset: PublicationMetadataMediaImage;
  attachments?: Maybe<Array<PublicationMetadataMedia>>;
  attributes?: Maybe<Array<MetadataAttribute>>;
  /** Optional content. Empty if not set. */
  content: Scalars['EncryptableMarkdown']['output'];
  contentWarning?: Maybe<PublicationContentWarningType>;
  encryptedWith?: Maybe<PublicationMetadataEncryptionStrategy>;
  hideFromFeed: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  locale: Scalars['Locale']['output'];
  marketplace?: Maybe<MarketplaceMetadata>;
  rawURI: Scalars['URI']['output'];
  tags?: Maybe<Array<Scalars['String']['output']>>;
  /** The title of the image. Empty if not set. */
  title: Scalars['String']['output'];
};

export type ImageSet = {
  __typename?: 'ImageSet';
  optimized?: Maybe<Image>;
  raw: Image;
  transformed?: Maybe<Image>;
};


export type ImageSetTransformedArgs = {
  request: ImageTransform;
};

export type ImageTransform = {
  /** Set the transformed image's height */
  height?: InputMaybe<Scalars['ImageSizeTransform']['input']>;
  /** Set if you want to keep the image's original aspect ratio. True by default. If explicitly set to false, the image will stretch based on the width and height values. */
  keepAspectRatio?: InputMaybe<Scalars['Boolean']['input']>;
  /** Set the transformed image's width */
  width?: InputMaybe<Scalars['ImageSizeTransform']['input']>;
};

export type InternalAddCuratedTagRequest = {
  hhh: Scalars['String']['input'];
  secret: Scalars['String']['input'];
  ttt: Scalars['String']['input'];
};

export type InternalAddInvitesRequest = {
  n: Scalars['Int']['input'];
  p: Scalars['ProfileId']['input'];
  secret: Scalars['String']['input'];
};

export type InternalAllowDomainRequest = {
  domain: Scalars['URI']['input'];
  secret: Scalars['String']['input'];
};

export type InternalAllowedDomainsRequest = {
  secret: Scalars['String']['input'];
};

export type InternalBoostProfileRequest = {
  h?: InputMaybe<Scalars['Handle']['input']>;
  p?: InputMaybe<Scalars['ProfileId']['input']>;
  s: Scalars['Int']['input'];
  secret: Scalars['String']['input'];
};

export type InternalBoostScoreRequest = {
  h?: InputMaybe<Scalars['Handle']['input']>;
  p?: InputMaybe<Scalars['ProfileId']['input']>;
  secret: Scalars['String']['input'];
};

export type InternalClaimRequest = {
  address: Scalars['EvmAddress']['input'];
  freeTextHandle?: InputMaybe<Scalars['Boolean']['input']>;
  handle?: InputMaybe<Scalars['CreateHandle']['input']>;
  overrideAlreadyClaimed: Scalars['Boolean']['input'];
  overrideTradeMark: Scalars['Boolean']['input'];
  secret: Scalars['String']['input'];
};

export type InternalClaimStatusRequest = {
  address: Scalars['EvmAddress']['input'];
  secret: Scalars['String']['input'];
};

export type InternalCuratedHandlesRequest = {
  secret: Scalars['String']['input'];
};

export type InternalCuratedTagsRequest = {
  hhh: Scalars['String']['input'];
  secret: Scalars['String']['input'];
};

export type InternalCuratedUpdateRequest = {
  /** The full handle - namespace/localname */
  handle: Scalars['Handle']['input'];
  remove: Scalars['Boolean']['input'];
  secret: Scalars['String']['input'];
};

export type InternalInvitesRequest = {
  p: Scalars['ProfileId']['input'];
  secret: Scalars['String']['input'];
};

export type InternalMintHandleAndProfileRequest = {
  a: Scalars['EvmAddress']['input'];
  h: Scalars['String']['input'];
  secret: Scalars['String']['input'];
};

export type InternalNftIndexRequest = {
  n: Array<Nfi>;
  secret: Scalars['String']['input'];
};

export type InternalNftVerifyRequest = {
  n: Array<Nfi>;
  secret: Scalars['String']['input'];
};

export type InternalPaymentHandleInfoRequest = {
  p: Scalars['String']['input'];
  secret: Scalars['String']['input'];
};

export type InternalProfileStatusRequest = {
  hhh: Scalars['String']['input'];
  secret: Scalars['String']['input'];
};

export type InternalRemoveCuratedTagRequest = {
  hhh: Scalars['String']['input'];
  secret: Scalars['String']['input'];
  ttt: Scalars['String']['input'];
};

export type InternalUpdateModuleOptionsRequest = {
  i: Scalars['EvmAddress']['input'];
  lma?: InputMaybe<Scalars['Boolean']['input']>;
  secret: Scalars['String']['input'];
  t: ModuleType;
  v?: InputMaybe<Scalars['Boolean']['input']>;
};

export type InternalUpdateProfileStatusRequest = {
  dd: Scalars['Boolean']['input'];
  hhh: Scalars['String']['input'];
  secret: Scalars['String']['input'];
  ss: Scalars['Boolean']['input'];
};

export type InviteRequest = {
  invites: Array<Scalars['EvmAddress']['input']>;
};

export type InvitedResult = {
  __typename?: 'InvitedResult';
  addressInvited: Scalars['EvmAddress']['output'];
  /** @deprecated Profiles hand out invites on Lens V2 so this is unnecessary information. Will always be the dead address. */
  by: Scalars['EvmAddress']['output'];
  profileMinted?: Maybe<Profile>;
  when: Scalars['DateTime']['output'];
};

export type KnownCollectOpenActionResult = {
  __typename?: 'KnownCollectOpenActionResult';
  type: CollectOpenActionModuleType;
};

export type KnownSupportedModule = {
  __typename?: 'KnownSupportedModule';
  contract: NetworkAddress;
  moduleInput: Array<ModuleInfo>;
  moduleName: Scalars['String']['output'];
  redeemInput: Array<ModuleInfo>;
  returnDataInput: Array<ModuleInfo>;
};

export type LastLoggedInProfileRequest = {
  for: Scalars['EvmAddress']['input'];
};

export type LatestActed = {
  __typename?: 'LatestActed';
  actedAt: Scalars['DateTime']['output'];
  profile: Profile;
  txHash: Scalars['TxHash']['output'];
};

export type LatestPaidActionsFilter = {
  openActionFilters?: InputMaybe<Array<OpenActionFilter>>;
  openActionPublicationMetadataFilters?: InputMaybe<PublicationMetadataFilters>;
};

export type LatestPaidActionsResult = {
  __typename?: 'LatestPaidActionsResult';
  items: Array<PaidAction>;
  pageInfo: PaginatedResultInfo;
};

export type LatestPaidActionsWhere = {
  customFilters?: InputMaybe<Array<CustomFiltersType>>;
};

export type LegacyAaveFeeCollectModuleSettings = {
  __typename?: 'LegacyAaveFeeCollectModuleSettings';
  /** The collect module amount info */
  amount: Amount;
  /** The maximum number of collects for this publication. */
  collectLimit?: Maybe<Scalars['String']['output']>;
  contract: NetworkAddress;
  /** The end timestamp after which collecting is impossible. */
  endsAt?: Maybe<Scalars['DateTime']['output']>;
  /** True if only followers of publisher may collect the post. */
  followerOnly: Scalars['Boolean']['output'];
  /** Recipient of collect fees. */
  recipient: Scalars['EvmAddress']['output'];
  /** The referral fee associated with this publication. */
  referralFee: Scalars['Float']['output'];
  type: OpenActionModuleType;
};

export type LegacyCollectRequest = {
  on: Scalars['PublicationId']['input'];
  referrer?: InputMaybe<Scalars['PublicationId']['input']>;
};

export type LegacyDegreesOfSeparationReferenceModuleSettings = {
  __typename?: 'LegacyDegreesOfSeparationReferenceModuleSettings';
  /** Applied to comments */
  commentsRestricted: Scalars['Boolean']['output'];
  contract: NetworkAddress;
  /** Degrees of separation */
  degreesOfSeparation: Scalars['Int']['output'];
  /** Applied to mirrors */
  mirrorsRestricted: Scalars['Boolean']['output'];
  type: ReferenceModuleType;
};

export type LegacyErc4626FeeCollectModuleSettings = {
  __typename?: 'LegacyERC4626FeeCollectModuleSettings';
  /** The collect module amount info */
  amount: Amount;
  /** The maximum number of collects for this publication. */
  collectLimit?: Maybe<Scalars['String']['output']>;
  contract: NetworkAddress;
  /** The end timestamp after which collecting is impossible. */
  endsAt?: Maybe<Scalars['DateTime']['output']>;
  /** True if only followers of publisher may collect the post. */
  followerOnly: Scalars['Boolean']['output'];
  /** The recipient of the ERC4626 vault shares */
  recipient: Scalars['EvmAddress']['output'];
  /** The referral fee associated with this publication. */
  referralFee: Scalars['Float']['output'];
  type: OpenActionModuleType;
  /** The ERC4626 vault address */
  vault: NetworkAddress;
};

export type LegacyFeeCollectModuleSettings = {
  __typename?: 'LegacyFeeCollectModuleSettings';
  /** The collect module amount info */
  amount: Amount;
  /** The collect nft address - only deployed on first collect */
  collectNft?: Maybe<Scalars['EvmAddress']['output']>;
  contract: NetworkAddress;
  /** Follower only */
  followerOnly: Scalars['Boolean']['output'];
  /** The collect module recipient address */
  recipient: Scalars['EvmAddress']['output'];
  /** The collect module referral fee */
  referralFee: Scalars['Float']['output'];
  type: OpenActionModuleType;
};

export type LegacyFollowOnlyReferenceModuleSettings = {
  __typename?: 'LegacyFollowOnlyReferenceModuleSettings';
  contract: NetworkAddress;
  type: ReferenceModuleType;
};

export type LegacyFreeCollectModuleSettings = {
  __typename?: 'LegacyFreeCollectModuleSettings';
  /** The collect nft address - only deployed on first collect */
  collectNft?: Maybe<Scalars['EvmAddress']['output']>;
  contract: NetworkAddress;
  /** Follower only */
  followerOnly: Scalars['Boolean']['output'];
  type: OpenActionModuleType;
};

export type LegacyLimitedFeeCollectModuleSettings = {
  __typename?: 'LegacyLimitedFeeCollectModuleSettings';
  /** The collect module amount info */
  amount: Amount;
  /** The collect module limit. */
  collectLimit?: Maybe<Scalars['String']['output']>;
  /** The collect nft address - only deployed on first collect */
  collectNft?: Maybe<Scalars['EvmAddress']['output']>;
  contract: NetworkAddress;
  /** Follower only */
  followerOnly: Scalars['Boolean']['output'];
  /** The collect module recipient address */
  recipient: Scalars['EvmAddress']['output'];
  /** The collect module referral fee */
  referralFee: Scalars['Float']['output'];
  type: OpenActionModuleType;
};

export type LegacyLimitedTimedFeeCollectModuleSettings = {
  __typename?: 'LegacyLimitedTimedFeeCollectModuleSettings';
  /** The collect module amount info */
  amount: Amount;
  /** The collect module limit */
  collectLimit?: Maybe<Scalars['String']['output']>;
  /** The collect nft address - only deployed on first collect */
  collectNft?: Maybe<Scalars['EvmAddress']['output']>;
  contract: NetworkAddress;
  /** The collect module end timestamp */
  endTimestamp: Scalars['DateTime']['output'];
  /** Follower only */
  followerOnly: Scalars['Boolean']['output'];
  /** The collect module recipient address */
  recipient: Scalars['EvmAddress']['output'];
  /** The collect module referral fee */
  referralFee: Scalars['Float']['output'];
  type: OpenActionModuleType;
};

export type LegacyMultirecipientFeeCollectModuleSettings = {
  __typename?: 'LegacyMultirecipientFeeCollectModuleSettings';
  /** The collect module amount info */
  amount: Amount;
  /** The maximum number of collects for this publication. */
  collectLimit?: Maybe<Scalars['String']['output']>;
  /** The collect nft address - only deployed on first collect */
  collectNft?: Maybe<Scalars['EvmAddress']['output']>;
  contract: NetworkAddress;
  /** The end timestamp after which collecting is impossible. */
  endsAt?: Maybe<Scalars['DateTime']['output']>;
  /** True if only followers of publisher may collect the post. */
  followerOnly: Scalars['Boolean']['output'];
  /** Recipient of collect fees. */
  recipients: Array<RecipientDataOutput>;
  /** The referral fee associated with this publication. */
  referralFee: Scalars['Float']['output'];
  type: OpenActionModuleType;
};

export type LegacyRevertCollectModuleSettings = {
  __typename?: 'LegacyRevertCollectModuleSettings';
  contract: NetworkAddress;
  type: OpenActionModuleType;
};

export type LegacySimpleCollectModuleSettings = {
  __typename?: 'LegacySimpleCollectModuleSettings';
  /** The collect module amount info. `Amount.value = 0` in case of free collects. */
  amount: Amount;
  /** The maximum number of collects for this publication. */
  collectLimit?: Maybe<Scalars['String']['output']>;
  /** The collect nft address - only deployed on first collect */
  collectNft?: Maybe<Scalars['EvmAddress']['output']>;
  contract: NetworkAddress;
  /** The end timestamp after which collecting is impossible. */
  endsAt?: Maybe<Scalars['DateTime']['output']>;
  /** True if only followers of publisher may collect the post. */
  followerOnly: Scalars['Boolean']['output'];
  /** The collect module recipient address */
  recipient: Scalars['EvmAddress']['output'];
  /** The collect module referral fee */
  referralFee: Scalars['Float']['output'];
  type: OpenActionModuleType;
};

export type LegacyTimedFeeCollectModuleSettings = {
  __typename?: 'LegacyTimedFeeCollectModuleSettings';
  /** The collect module amount info */
  amount: Amount;
  /** The collect nft address - only deployed on first collect */
  collectNft?: Maybe<Scalars['EvmAddress']['output']>;
  contract: NetworkAddress;
  /** The collect module end timestamp */
  endTimestamp: Scalars['DateTime']['output'];
  /** Follower only */
  followerOnly: Scalars['Boolean']['output'];
  /** The collect module recipient address */
  recipient: Scalars['EvmAddress']['output'];
  /** The collect module referral fee */
  referralFee: Scalars['Float']['output'];
  type: OpenActionModuleType;
};

export type LensProfileManagerRelayError = {
  __typename?: 'LensProfileManagerRelayError';
  reason: LensProfileManagerRelayErrorReasonType;
};

export enum LensProfileManagerRelayErrorReasonType {
  AppNotAllowed = 'APP_NOT_ALLOWED',
  Failed = 'FAILED',
  NotSponsored = 'NOT_SPONSORED',
  NoLensManagerEnabled = 'NO_LENS_MANAGER_ENABLED',
  RateLimited = 'RATE_LIMITED',
  RequiresSignature = 'REQUIRES_SIGNATURE'
}

export type LensProfileManagerRelayResult = LensProfileManagerRelayError | RelaySuccess;

export enum LensTransactionFailureType {
  MetadataError = 'METADATA_ERROR',
  Reverted = 'REVERTED'
}

export type LensTransactionResult = {
  __typename?: 'LensTransactionResult';
  extraInfo?: Maybe<Scalars['String']['output']>;
  reason?: Maybe<LensTransactionFailureType>;
  status: LensTransactionStatusType;
  txHash: Scalars['TxHash']['output'];
};

export type LensTransactionStatusRequest = {
  /** Transaction hash for retrieving transaction status */
  forTxHash?: InputMaybe<Scalars['TxHash']['input']>;
  /** Transaction ID for retrieving transaction status when using the broadcaster */
  forTxId?: InputMaybe<Scalars['TxId']['input']>;
};

export enum LensTransactionStatusType {
  Complete = 'COMPLETE',
  Failed = 'FAILED',
  OptimisticallyUpdated = 'OPTIMISTICALLY_UPDATED',
  Processing = 'PROCESSING'
}

export enum LimitType {
  Fifty = 'Fifty',
  Ten = 'Ten',
  TwentyFive = 'TwentyFive'
}

export type LinkHandleToProfileRequest = {
  /** The full handle - namespace/localname */
  handle: Scalars['Handle']['input'];
};

export type LinkMetadataV3 = {
  __typename?: 'LinkMetadataV3';
  appId?: Maybe<Scalars['AppId']['output']>;
  attachments?: Maybe<Array<PublicationMetadataMedia>>;
  attributes?: Maybe<Array<MetadataAttribute>>;
  /** Optional content. Empty if not set. */
  content: Scalars['EncryptableMarkdown']['output'];
  contentWarning?: Maybe<PublicationContentWarningType>;
  encryptedWith?: Maybe<PublicationMetadataEncryptionStrategy>;
  hideFromFeed: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  locale: Scalars['Locale']['output'];
  marketplace?: Maybe<MarketplaceMetadata>;
  rawURI: Scalars['URI']['output'];
  sharingLink: Scalars['EncryptableURI']['output'];
  tags?: Maybe<Array<Scalars['String']['output']>>;
};

export type LiveStreamMetadataV3 = {
  __typename?: 'LiveStreamMetadataV3';
  appId?: Maybe<Scalars['AppId']['output']>;
  attachments?: Maybe<Array<PublicationMetadataMedia>>;
  attributes?: Maybe<Array<MetadataAttribute>>;
  checkLiveAPI?: Maybe<Scalars['EncryptableURI']['output']>;
  /** Optional content. Empty if not set. */
  content: Scalars['EncryptableMarkdown']['output'];
  contentWarning?: Maybe<PublicationContentWarningType>;
  encryptedWith?: Maybe<PublicationMetadataEncryptionStrategy>;
  /** Optional end time. Empty if not set. */
  endsAt: Scalars['EncryptableDateTime']['output'];
  hideFromFeed: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  liveURL: Scalars['EncryptableURI']['output'];
  locale: Scalars['Locale']['output'];
  marketplace?: Maybe<MarketplaceMetadata>;
  playbackURL: Scalars['EncryptableURI']['output'];
  rawURI: Scalars['URI']['output'];
  startsAt: Scalars['EncryptableDateTime']['output'];
  tags?: Maybe<Array<Scalars['String']['output']>>;
  /** The title of the live-stream. Empty if not set. */
  title: Scalars['String']['output'];
};

/** Managed profile visibility type */
export enum ManagedProfileVisibility {
  All = 'ALL',
  HiddenOnly = 'HIDDEN_ONLY',
  NoneHidden = 'NONE_HIDDEN'
}

export type MarketplaceMetadata = {
  __typename?: 'MarketplaceMetadata';
  animationUrl?: Maybe<Scalars['URI']['output']>;
  attributes?: Maybe<Array<PublicationMarketplaceMetadataAttribute>>;
  description?: Maybe<Scalars['Markdown']['output']>;
  externalURL?: Maybe<Scalars['URL']['output']>;
  image?: Maybe<ImageSet>;
  name?: Maybe<Scalars['String']['output']>;
};

export enum MarketplaceMetadataAttributeDisplayType {
  Date = 'DATE',
  Number = 'NUMBER',
  String = 'STRING'
}

export type MentionNotification = {
  __typename?: 'MentionNotification';
  id: Scalars['UUID']['output'];
  publication: PrimaryPublication;
};

export type MetadataAttribute = {
  __typename?: 'MetadataAttribute';
  key: Scalars['String']['output'];
  /**
   * The type of the attribute. When:
   * - BOOLEAN: the `value` is `true`|`false`
   * - DATE: the `value` is a valid ISO 8601 date string
   * - NUMBER: the `value` is a valid JS number as string
   * - STRING: the `value` is a string.
   * - JSON: the `value` is a valid JSON serialized as string
   *
   */
  type: MetadataAttributeType;
  /** The value serialized as string. It's consumer responsibility to parse it according to `type`. */
  value: Scalars['String']['output'];
};

export enum MetadataAttributeType {
  Boolean = 'BOOLEAN',
  Date = 'DATE',
  Json = 'JSON',
  Number = 'NUMBER',
  String = 'STRING'
}

export type MintMetadataV3 = {
  __typename?: 'MintMetadataV3';
  appId?: Maybe<Scalars['AppId']['output']>;
  attachments?: Maybe<Array<PublicationMetadataMedia>>;
  attributes?: Maybe<Array<MetadataAttribute>>;
  /** Optional content. Empty if not set. */
  content: Scalars['EncryptableMarkdown']['output'];
  contentWarning?: Maybe<PublicationContentWarningType>;
  encryptedWith?: Maybe<PublicationMetadataEncryptionStrategy>;
  hideFromFeed: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  locale: Scalars['Locale']['output'];
  marketplace?: Maybe<MarketplaceMetadata>;
  mintLink: Scalars['EncryptableURI']['output'];
  rawURI: Scalars['URI']['output'];
  tags?: Maybe<Array<Scalars['String']['output']>>;
};

export type Mirror = {
  __typename?: 'Mirror';
  by: Profile;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['PublicationId']['output'];
  isHidden: Scalars['Boolean']['output'];
  mirrorOn: MirrorablePublication;
  momoka?: Maybe<MomokaInfo>;
  publishedOn?: Maybe<App>;
  txHash?: Maybe<Scalars['TxHash']['output']>;
};

export type MirrorNotification = {
  __typename?: 'MirrorNotification';
  id: Scalars['UUID']['output'];
  mirrors: Array<ProfileMirrorResult>;
  publication: PrimaryPublication;
};

export type MirrorablePublication = Comment | Post | Quote;

export type ModDisputeReportRequest = {
  reason: Scalars['String']['input'];
  reportedProfileId?: InputMaybe<Scalars['ProfileId']['input']>;
  reportedPublicationId?: InputMaybe<Scalars['PublicationId']['input']>;
  reporter: Scalars['ProfileId']['input'];
};

export type ModExplorePublicationRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<LimitType>;
  orderBy: ExplorePublicationsOrderByType;
  where?: InputMaybe<ModExplorePublicationsWhere>;
};

export enum ModExplorePublicationType {
  Comment = 'COMMENT',
  Post = 'POST',
  Quote = 'QUOTE'
}

export type ModExplorePublicationsWhere = {
  customFilters?: InputMaybe<Array<CustomFiltersType>>;
  metadata?: InputMaybe<PublicationMetadataFilters>;
  publicationTypes?: InputMaybe<Array<ModExplorePublicationType>>;
  since?: InputMaybe<Scalars['UnixTimestamp']['input']>;
};

export type ModFollowerResult = {
  __typename?: 'ModFollowerResult';
  createdAt: Scalars['DateTime']['output'];
  follower: Profile;
  following: Profile;
};

export type ModReport = {
  __typename?: 'ModReport';
  additionalInfo?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  reason: Scalars['String']['output'];
  reportedProfile: Profile;
  reportedPublication?: Maybe<PrimaryPublication>;
  reporter: Profile;
  subreason: Scalars['String']['output'];
};

export type ModReportsRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  forProfile?: InputMaybe<Scalars['ProfileId']['input']>;
  forPublication?: InputMaybe<Scalars['PublicationId']['input']>;
  limit?: InputMaybe<LimitType>;
};

export type ModuleCurrencyApproval = {
  followModule?: InputMaybe<FollowModuleType>;
  openActionModule?: InputMaybe<OpenActionModuleType>;
  referenceModule?: InputMaybe<ReferenceModuleType>;
  unknownFollowModule?: InputMaybe<Scalars['EvmAddress']['input']>;
  unknownOpenActionModule?: InputMaybe<Scalars['EvmAddress']['input']>;
  unknownReferenceModule?: InputMaybe<Scalars['EvmAddress']['input']>;
};

export type ModuleInfo = {
  __typename?: 'ModuleInfo';
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type ModuleMetadata = {
  __typename?: 'ModuleMetadata';
  attributes: Array<MetadataAttribute>;
  authors: Array<Scalars['String']['output']>;
  description: Scalars['String']['output'];
  initializeCalldataABI: Scalars['ABIJson']['output'];
  initializeResultDataABI?: Maybe<Scalars['ABIJson']['output']>;
  name: Scalars['String']['output'];
  processCalldataABI: Scalars['ABIJson']['output'];
  title: Scalars['String']['output'];
};

export type ModuleMetadataRequest = {
  implementation: Scalars['EvmAddress']['input'];
};

export enum ModuleType {
  Follow = 'FOLLOW',
  OpenAction = 'OPEN_ACTION',
  Reference = 'REFERENCE'
}

export type MomokaCommentRequest = {
  commentOn: Scalars['PublicationId']['input'];
  contentURI: Scalars['URI']['input'];
};

export type MomokaCommentTransaction = {
  __typename?: 'MomokaCommentTransaction';
  app?: Maybe<App>;
  commentOn: PrimaryPublication;
  createdAt: Scalars['DateTime']['output'];
  publication: Comment;
  submitter: Scalars['EvmAddress']['output'];
  transactionId: Scalars['String']['output'];
  verificationStatus: MomokaVerificationStatus;
};

export type MomokaInfo = {
  __typename?: 'MomokaInfo';
  proof: Scalars['MomokaProof']['output'];
};

export type MomokaMirrorRequest = {
  /** You can add information like app on a mirror or tracking stuff */
  metadataURI?: InputMaybe<Scalars['URI']['input']>;
  mirrorOn: Scalars['PublicationId']['input'];
};

export type MomokaMirrorTransaction = {
  __typename?: 'MomokaMirrorTransaction';
  app?: Maybe<App>;
  createdAt: Scalars['DateTime']['output'];
  mirrorOn: PrimaryPublication;
  publication: Mirror;
  submitter: Scalars['EvmAddress']['output'];
  transactionId: Scalars['String']['output'];
  verificationStatus: MomokaVerificationStatus;
};

export type MomokaPostRequest = {
  contentURI: Scalars['URI']['input'];
};

export type MomokaPostTransaction = {
  __typename?: 'MomokaPostTransaction';
  app?: Maybe<App>;
  createdAt: Scalars['DateTime']['output'];
  publication: Post;
  submitter: Scalars['EvmAddress']['output'];
  transactionId: Scalars['String']['output'];
  verificationStatus: MomokaVerificationStatus;
};

export type MomokaQuoteRequest = {
  contentURI: Scalars['URI']['input'];
  quoteOn: Scalars['PublicationId']['input'];
};

export type MomokaQuoteTransaction = {
  __typename?: 'MomokaQuoteTransaction';
  app?: Maybe<App>;
  createdAt: Scalars['DateTime']['output'];
  publication: Quote;
  quoteOn: PrimaryPublication;
  submitter: Scalars['EvmAddress']['output'];
  transactionId: Scalars['String']['output'];
  verificationStatus: MomokaVerificationStatus;
};

export type MomokaSubmitterResult = {
  __typename?: 'MomokaSubmitterResult';
  address: Scalars['EvmAddress']['output'];
  name: Scalars['String']['output'];
  totalTransactions: Scalars['Int']['output'];
};

export type MomokaSubmittersResult = {
  __typename?: 'MomokaSubmittersResult';
  items: Array<MomokaSubmitterResult>;
  pageInfo: PaginatedResultInfo;
};

export type MomokaSummaryResult = {
  __typename?: 'MomokaSummaryResult';
  totalTransactions: Scalars['Int']['output'];
};

export type MomokaTransaction = MomokaCommentTransaction | MomokaMirrorTransaction | MomokaPostTransaction | MomokaQuoteTransaction;

export type MomokaTransactionRequest = {
  /** The momoka transaction id or internal publication id */
  for: Scalars['String']['input'];
};

export type MomokaTransactionsRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  for?: InputMaybe<Scalars['ProfileId']['input']>;
  limit?: InputMaybe<LimitType>;
};

export type MomokaTransactionsResult = {
  __typename?: 'MomokaTransactionsResult';
  items: Array<MomokaTransaction>;
  pageInfo: PaginatedResultInfo;
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
  PublicationNotRecognized = 'PUBLICATION_NOT_RECOGNIZED',
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

export type MomokaVerificationStatus = MomokaVerificationStatusFailure | MomokaVerificationStatusSuccess;

export type MomokaVerificationStatusFailure = {
  __typename?: 'MomokaVerificationStatusFailure';
  status: MomokaValidatorError;
};

export type MomokaVerificationStatusSuccess = {
  __typename?: 'MomokaVerificationStatusSuccess';
  verified: Scalars['Boolean']['output'];
};

export type MultirecipientFeeCollectModuleInput = {
  amount: AmountInput;
  collectLimit?: InputMaybe<Scalars['String']['input']>;
  endsAt?: InputMaybe<Scalars['DateTime']['input']>;
  followerOnly: Scalars['Boolean']['input'];
  recipients: Array<RecipientDataInput>;
  referralFee?: InputMaybe<Scalars['Float']['input']>;
};

export type MultirecipientFeeCollectOpenActionSettings = {
  __typename?: 'MultirecipientFeeCollectOpenActionSettings';
  /** The collect module amount info */
  amount: Amount;
  /** The maximum number of collects for this publication. */
  collectLimit?: Maybe<Scalars['String']['output']>;
  /** The collect nft address - only deployed on first collect */
  collectNft?: Maybe<Scalars['EvmAddress']['output']>;
  contract: NetworkAddress;
  /** The end timestamp after which collecting is impossible. */
  endsAt?: Maybe<Scalars['DateTime']['output']>;
  /** True if only followers of publisher may collect the post. */
  followerOnly: Scalars['Boolean']['output'];
  /** Recipient of collect fees. */
  recipients: Array<RecipientDataOutput>;
  /** The referral fee associated with this publication. */
  referralFee: Scalars['Float']['output'];
  type: OpenActionModuleType;
};

export type Mutation = {
  __typename?: 'Mutation';
  actOnOpenAction: LensProfileManagerRelayResult;
  addProfileInterests?: Maybe<Scalars['Void']['output']>;
  addPublicationBookmark?: Maybe<Scalars['Void']['output']>;
  addPublicationNotInterested?: Maybe<Scalars['Void']['output']>;
  addReaction?: Maybe<Scalars['Void']['output']>;
  authenticate: AuthenticationResult;
  block: LensProfileManagerRelayResult;
  broadcastOnMomoka: BroadcastMomokaResult;
  broadcastOnchain: RelayResult;
  claimProfileWithHandle: ClaimProfileWithHandleResult;
  commentOnMomoka: RelayMomokaResult;
  commentOnchain: LensProfileManagerRelayResult;
  createActOnOpenActionTypedData: CreateActOnOpenActionBroadcastItemResult;
  createBlockProfilesTypedData: CreateBlockProfilesBroadcastItemResult;
  createChangeProfileManagersTypedData: CreateChangeProfileManagersBroadcastItemResult;
  createFollowTypedData: CreateFollowBroadcastItemResult;
  createLegacyCollectTypedData: CreateLegacyCollectBroadcastItemResult;
  createLinkHandleToProfileTypedData: CreateLinkHandleToProfileBroadcastItemResult;
  createMomokaCommentTypedData: CreateMomokaCommentBroadcastItemResult;
  createMomokaMirrorTypedData: CreateMomokaMirrorBroadcastItemResult;
  createMomokaPostTypedData: CreateMomokaPostBroadcastItemResult;
  createMomokaQuoteTypedData: CreateMomokaQuoteBroadcastItemResult;
  createNftGallery: Scalars['NftGalleryId']['output'];
  createOnchainCommentTypedData: CreateOnchainCommentBroadcastItemResult;
  createOnchainMirrorTypedData: CreateOnchainMirrorBroadcastItemResult;
  createOnchainPostTypedData: CreateOnchainPostBroadcastItemResult;
  createOnchainQuoteTypedData: CreateOnchainQuoteBroadcastItemResult;
  createOnchainSetProfileMetadataTypedData: CreateOnchainSetProfileMetadataBroadcastItemResult;
  createSetFollowModuleTypedData: CreateSetFollowModuleBroadcastItemResult;
  createUnblockProfilesTypedData: CreateUnblockProfilesBroadcastItemResult;
  createUnfollowTypedData: CreateUnfollowBroadcastItemResult;
  createUnlinkHandleFromProfileTypedData: CreateUnlinkHandleFromProfileBroadcastItemResult;
  deleteNftGallery?: Maybe<Scalars['Void']['output']>;
  dismissRecommendedProfiles?: Maybe<Scalars['Void']['output']>;
  follow: LensProfileManagerRelayResult;
  /** Hides a comment that exists under a publication made by the author. If already hidden, does nothing. */
  hideComment?: Maybe<Scalars['Void']['output']>;
  /** Hide a managed profile from your managed profiles list. */
  hideManagedProfile?: Maybe<Scalars['Void']['output']>;
  hidePublication?: Maybe<Scalars['Void']['output']>;
  idKitPhoneVerifyWebhook: IdKitPhoneVerifyWebhookResultStatusType;
  internalAddCuratedTag?: Maybe<Scalars['Void']['output']>;
  internalAddInvites?: Maybe<Scalars['Void']['output']>;
  internalAllowDomain?: Maybe<Scalars['Void']['output']>;
  internalBoostProfile: Scalars['Int']['output'];
  internalClaim?: Maybe<Scalars['Void']['output']>;
  internalCuratedUpdate?: Maybe<Scalars['Void']['output']>;
  internalMintHandleAndProfile: Scalars['TxHash']['output'];
  internalNftIndex?: Maybe<Scalars['Void']['output']>;
  internalNftVerify?: Maybe<Scalars['Void']['output']>;
  internalRemoveCuratedTag?: Maybe<Scalars['Void']['output']>;
  internalUpdateModuleOptions?: Maybe<Scalars['Void']['output']>;
  internalUpdateProfileStatus?: Maybe<Scalars['Void']['output']>;
  invite?: Maybe<Scalars['Void']['output']>;
  legacyCollect: LensProfileManagerRelayResult;
  linkHandleToProfile: LensProfileManagerRelayResult;
  mirrorOnMomoka: RelayMomokaResult;
  mirrorOnchain: LensProfileManagerRelayResult;
  modDisputeReport?: Maybe<Scalars['Void']['output']>;
  nftOwnershipChallenge: NftOwnershipChallengeResult;
  peerToPeerRecommend?: Maybe<Scalars['Void']['output']>;
  peerToPeerUnrecommend?: Maybe<Scalars['Void']['output']>;
  postOnMomoka: RelayMomokaResult;
  postOnchain: LensProfileManagerRelayResult;
  quoteOnMomoka: RelayMomokaResult;
  quoteOnchain: LensProfileManagerRelayResult;
  refresh: AuthenticationResult;
  refreshPublicationMetadata: RefreshPublicationMetadataResult;
  removeProfileInterests?: Maybe<Scalars['Void']['output']>;
  removePublicationBookmark?: Maybe<Scalars['Void']['output']>;
  removeReaction?: Maybe<Scalars['Void']['output']>;
  reportProfile?: Maybe<Scalars['Void']['output']>;
  reportPublication?: Maybe<Scalars['Void']['output']>;
  revokeAuthentication?: Maybe<Scalars['Void']['output']>;
  setDefaultProfile?: Maybe<Scalars['Void']['output']>;
  setFollowModule: LensProfileManagerRelayResult;
  setProfileMetadata: LensProfileManagerRelayResult;
  signFrameAction: FrameLensManagerSignatureResult;
  unblock: LensProfileManagerRelayResult;
  undoPublicationNotInterested?: Maybe<Scalars['Void']['output']>;
  unfollow: LensProfileManagerRelayResult;
  /** Unhides a hidden comment under a publication made by the author. If not hidden, does nothing. */
  unhideComment?: Maybe<Scalars['Void']['output']>;
  /** Unhide an already hidden managed profile from your managed profiles list. */
  unhideManagedProfile?: Maybe<Scalars['Void']['output']>;
  unlinkHandleFromProfile: LensProfileManagerRelayResult;
  updateNftGalleryInfo?: Maybe<Scalars['Void']['output']>;
  updateNftGalleryItems?: Maybe<Scalars['Void']['output']>;
  updateNftGalleryOrder?: Maybe<Scalars['Void']['output']>;
  walletAuthenticationToProfileAuthentication: AuthenticationResult;
};


export type MutationActOnOpenActionArgs = {
  request: ActOnOpenActionLensManagerRequest;
};


export type MutationAddProfileInterestsArgs = {
  request: ProfileInterestsRequest;
};


export type MutationAddPublicationBookmarkArgs = {
  request: PublicationBookmarkRequest;
};


export type MutationAddPublicationNotInterestedArgs = {
  request: PublicationNotInterestedRequest;
};


export type MutationAddReactionArgs = {
  request: ReactionRequest;
};


export type MutationAuthenticateArgs = {
  request: SignedAuthChallenge;
};


export type MutationBlockArgs = {
  request: BlockRequest;
};


export type MutationBroadcastOnMomokaArgs = {
  request: BroadcastRequest;
};


export type MutationBroadcastOnchainArgs = {
  request: BroadcastRequest;
};


export type MutationClaimProfileWithHandleArgs = {
  request: ClaimProfileWithHandleRequest;
};


export type MutationCommentOnMomokaArgs = {
  request: MomokaCommentRequest;
};


export type MutationCommentOnchainArgs = {
  request: OnchainCommentRequest;
};


export type MutationCreateActOnOpenActionTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: ActOnOpenActionRequest;
};


export type MutationCreateBlockProfilesTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: BlockRequest;
};


export type MutationCreateChangeProfileManagersTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: ChangeProfileManagersRequest;
};


export type MutationCreateFollowTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: FollowRequest;
};


export type MutationCreateLegacyCollectTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: LegacyCollectRequest;
};


export type MutationCreateLinkHandleToProfileTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: LinkHandleToProfileRequest;
};


export type MutationCreateMomokaCommentTypedDataArgs = {
  request: MomokaCommentRequest;
};


export type MutationCreateMomokaMirrorTypedDataArgs = {
  request: MomokaMirrorRequest;
};


export type MutationCreateMomokaPostTypedDataArgs = {
  request: MomokaPostRequest;
};


export type MutationCreateMomokaQuoteTypedDataArgs = {
  request: MomokaQuoteRequest;
};


export type MutationCreateNftGalleryArgs = {
  request: NftGalleryCreateRequest;
};


export type MutationCreateOnchainCommentTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: OnchainCommentRequest;
};


export type MutationCreateOnchainMirrorTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: OnchainMirrorRequest;
};


export type MutationCreateOnchainPostTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: OnchainPostRequest;
};


export type MutationCreateOnchainQuoteTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: OnchainQuoteRequest;
};


export type MutationCreateOnchainSetProfileMetadataTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: OnchainSetProfileMetadataRequest;
};


export type MutationCreateSetFollowModuleTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: SetFollowModuleRequest;
};


export type MutationCreateUnblockProfilesTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: UnblockRequest;
};


export type MutationCreateUnfollowTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: UnfollowRequest;
};


export type MutationCreateUnlinkHandleFromProfileTypedDataArgs = {
  options?: InputMaybe<TypedDataOptions>;
  request: UnlinkHandleFromProfileRequest;
};


export type MutationDeleteNftGalleryArgs = {
  request: NftGalleryDeleteRequest;
};


export type MutationDismissRecommendedProfilesArgs = {
  request: DismissRecommendedProfilesRequest;
};


export type MutationFollowArgs = {
  request: FollowLensManagerRequest;
};


export type MutationHideCommentArgs = {
  request: HideCommentRequest;
};


export type MutationHideManagedProfileArgs = {
  request: HideManagedProfileRequest;
};


export type MutationHidePublicationArgs = {
  request: HidePublicationRequest;
};


export type MutationIdKitPhoneVerifyWebhookArgs = {
  request: IdKitPhoneVerifyWebhookRequest;
};


export type MutationInternalAddCuratedTagArgs = {
  request: InternalAddCuratedTagRequest;
};


export type MutationInternalAddInvitesArgs = {
  request: InternalAddInvitesRequest;
};


export type MutationInternalAllowDomainArgs = {
  request: InternalAllowDomainRequest;
};


export type MutationInternalBoostProfileArgs = {
  request: InternalBoostProfileRequest;
};


export type MutationInternalClaimArgs = {
  request: InternalClaimRequest;
};


export type MutationInternalCuratedUpdateArgs = {
  request: InternalCuratedUpdateRequest;
};


export type MutationInternalMintHandleAndProfileArgs = {
  request: InternalMintHandleAndProfileRequest;
};


export type MutationInternalNftIndexArgs = {
  request: InternalNftIndexRequest;
};


export type MutationInternalNftVerifyArgs = {
  request: InternalNftVerifyRequest;
};


export type MutationInternalRemoveCuratedTagArgs = {
  request: InternalRemoveCuratedTagRequest;
};


export type MutationInternalUpdateModuleOptionsArgs = {
  request: InternalUpdateModuleOptionsRequest;
};


export type MutationInternalUpdateProfileStatusArgs = {
  request: InternalUpdateProfileStatusRequest;
};


export type MutationInviteArgs = {
  request: InviteRequest;
};


export type MutationLegacyCollectArgs = {
  request: LegacyCollectRequest;
};


export type MutationLinkHandleToProfileArgs = {
  request: LinkHandleToProfileRequest;
};


export type MutationMirrorOnMomokaArgs = {
  request: MomokaMirrorRequest;
};


export type MutationMirrorOnchainArgs = {
  request: OnchainMirrorRequest;
};


export type MutationModDisputeReportArgs = {
  request: ModDisputeReportRequest;
};


export type MutationNftOwnershipChallengeArgs = {
  request: NftOwnershipChallengeRequest;
};


export type MutationPeerToPeerRecommendArgs = {
  request: PeerToPeerRecommendRequest;
};


export type MutationPeerToPeerUnrecommendArgs = {
  request: PeerToPeerRecommendRequest;
};


export type MutationPostOnMomokaArgs = {
  request: MomokaPostRequest;
};


export type MutationPostOnchainArgs = {
  request: OnchainPostRequest;
};


export type MutationQuoteOnMomokaArgs = {
  request: MomokaQuoteRequest;
};


export type MutationQuoteOnchainArgs = {
  request: OnchainQuoteRequest;
};


export type MutationRefreshArgs = {
  request: RefreshRequest;
};


export type MutationRefreshPublicationMetadataArgs = {
  request: RefreshPublicationMetadataRequest;
};


export type MutationRemoveProfileInterestsArgs = {
  request: ProfileInterestsRequest;
};


export type MutationRemovePublicationBookmarkArgs = {
  request: PublicationBookmarkRequest;
};


export type MutationRemoveReactionArgs = {
  request: ReactionRequest;
};


export type MutationReportProfileArgs = {
  request: ReportProfileRequest;
};


export type MutationReportPublicationArgs = {
  request: ReportPublicationRequest;
};


export type MutationRevokeAuthenticationArgs = {
  request: RevokeAuthenticationRequest;
};


export type MutationSetDefaultProfileArgs = {
  request: SetDefaultProfileRequest;
};


export type MutationSetFollowModuleArgs = {
  request: SetFollowModuleRequest;
};


export type MutationSetProfileMetadataArgs = {
  request: OnchainSetProfileMetadataRequest;
};


export type MutationSignFrameActionArgs = {
  request: FrameLensManagerEip712Request;
};


export type MutationUnblockArgs = {
  request: UnblockRequest;
};


export type MutationUndoPublicationNotInterestedArgs = {
  request: PublicationNotInterestedRequest;
};


export type MutationUnfollowArgs = {
  request: UnfollowRequest;
};


export type MutationUnhideCommentArgs = {
  request: UnhideCommentRequest;
};


export type MutationUnhideManagedProfileArgs = {
  request: UnhideManagedProfileRequest;
};


export type MutationUnlinkHandleFromProfileArgs = {
  request: UnlinkHandleFromProfileRequest;
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


export type MutationWalletAuthenticationToProfileAuthenticationArgs = {
  request: WalletAuthenticationToProfileAuthenticationRequest;
};

export type MutualFollowersRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<LimitType>;
  observer: Scalars['ProfileId']['input'];
  /** The order by which to sort the profiles */
  orderBy?: InputMaybe<ProfilesOrderBy>;
  viewing: Scalars['ProfileId']['input'];
};

/** Mutual NFT collections request */
export type MutualNftCollectionsRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<LimitType>;
  /** Profile id of the first user */
  observer: Scalars['ProfileId']['input'];
  /** Profile id of the second user */
  viewing: Scalars['ProfileId']['input'];
};

export type MutualPoapsQueryRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<LimitType>;
  observer: Scalars['ProfileId']['input'];
  viewing: Scalars['ProfileId']['input'];
};

export type NetworkAddress = {
  __typename?: 'NetworkAddress';
  address: Scalars['EvmAddress']['output'];
  chainId: Scalars['ChainId']['output'];
};

export type NetworkAddressInput = {
  address: Scalars['EvmAddress']['input'];
  chainId: Scalars['ChainId']['input'];
};

export type Nfi = {
  c: Scalars['EvmAddress']['input'];
  i: Scalars['ChainId']['input'];
};

export type Nft = {
  __typename?: 'Nft';
  collection: NftCollection;
  contentURI?: Maybe<Scalars['URI']['output']>;
  contract: NetworkAddress;
  contractType: NftContractType;
  metadata?: Maybe<NftMetadata>;
  owner: Owner;
  tokenId: Scalars['TokenId']['output'];
  totalSupply: Scalars['String']['output'];
};

/** Nft Collection type */
export type NftCollection = {
  __typename?: 'NftCollection';
  /** Collection base URI for token metadata */
  baseUri?: Maybe<Scalars['URI']['output']>;
  /** The contract info, address and chain id */
  contract: NetworkAddress;
  /** Collection ERC type */
  contractType: NftContractType;
  /** Collection name */
  name: Scalars['String']['output'];
  /** Collection symbol */
  symbol: Scalars['String']['output'];
  /** Collection verified status */
  verified: Scalars['Boolean']['output'];
};

export enum NftCollectionOwnersOrder {
  FollowersFirst = 'FollowersFirst',
  None = 'None'
}

/** NFT collection owners request */
export type NftCollectionOwnersRequest = {
  /** The profile id to use when ordering by followers */
  by?: InputMaybe<Scalars['ProfileId']['input']>;
  /** The chain id */
  chainId: Scalars['ChainId']['input'];
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  /** The contract address */
  for: Scalars['EvmAddress']['input'];
  limit?: InputMaybe<LimitType>;
  /** The ordering of Nft collection owners */
  order?: InputMaybe<NftCollectionOwnersOrder>;
};

/** A wrapper object containing an Nft collection, the total number of Lens profiles that own it, and optional field resolvers */
export type NftCollectionWithOwners = {
  __typename?: 'NftCollectionWithOwners';
  /** The Nft collection */
  collection: NftCollection;
  /** The total number of Lens profile owners that have at least 1 NFT from this collection */
  totalOwners: Scalars['Float']['output'];
};

/** NFT collections request */
export type NftCollectionsRequest = {
  /** The chain ids to look for NFTs on. Ethereum and Polygon are supported. If omitted, it will look on both chains by default. */
  chainIds?: InputMaybe<Array<Scalars['ChainId']['input']>>;
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  /** Exclude Lens Follower NFTs */
  excludeFollowers?: InputMaybe<Scalars['Boolean']['input']>;
  for?: InputMaybe<Scalars['ProfileId']['input']>;
  /** Filter by owner address */
  forAddress?: InputMaybe<Scalars['EvmAddress']['input']>;
  limit?: InputMaybe<LimitType>;
};

export enum NftContractType {
  Erc721 = 'ERC721',
  Erc1155 = 'ERC1155'
}

export type NftGalleriesRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  for: Scalars['ProfileId']['input'];
  limit?: InputMaybe<LimitType>;
};

export type NftGallery = {
  __typename?: 'NftGallery';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['NftGalleryId']['output'];
  items: Array<Nft>;
  name: Scalars['NftGalleryName']['output'];
  owner: Scalars['ProfileId']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type NftGalleryCreateRequest = {
  items: Array<NftInput>;
  name: Scalars['NftGalleryName']['input'];
};

export type NftGalleryDeleteRequest = {
  galleryId: Scalars['NftGalleryId']['input'];
};

export type NftGalleryUpdateInfoRequest = {
  galleryId: Scalars['NftGalleryId']['input'];
  name: Scalars['NftGalleryName']['input'];
};

export type NftGalleryUpdateItemOrderRequest = {
  galleryId: Scalars['NftGalleryId']['input'];
  updates?: InputMaybe<Array<NftUpdateItemOrder>>;
};

export type NftGalleryUpdateItemsRequest = {
  galleryId: Scalars['NftGalleryId']['input'];
  toAdd?: InputMaybe<Array<NftInput>>;
  toRemove?: InputMaybe<Array<NftInput>>;
};

export type NftImage = {
  __typename?: 'NftImage';
  /** The contract address of the NFT collection */
  collection: NetworkAddress;
  /** The image set for the NFT */
  image: ImageSet;
  /** The token ID of the NFT */
  tokenId: Scalars['TokenId']['output'];
  /** Indicates whether the NFT is from a verified collection or not */
  verified: Scalars['Boolean']['output'];
};

export type NftInput = {
  contract: NetworkAddressInput;
  tokenId: Scalars['TokenId']['input'];
};

export type NftMetadata = {
  __typename?: 'NftMetadata';
  animationUrl?: Maybe<Scalars['URI']['output']>;
  attributes?: Maybe<Array<PublicationMarketplaceMetadataAttribute>>;
  description?: Maybe<Scalars['Markdown']['output']>;
  externalURL?: Maybe<Scalars['URL']['output']>;
  image?: Maybe<ImageSet>;
  name?: Maybe<Scalars['String']['output']>;
};

export type NftOwnershipChallengeRequest = {
  for: Scalars['EvmAddress']['input'];
  nfts: Array<NftInput>;
};

export type NftOwnershipChallengeResult = {
  __typename?: 'NftOwnershipChallengeResult';
  info?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type NftOwnershipCondition = {
  __typename?: 'NftOwnershipCondition';
  contract: NetworkAddress;
  contractType: NftContractType;
  tokenIds?: Maybe<Array<Scalars['TokenId']['output']>>;
};

export type NftUpdateItemOrder = {
  contract: NetworkAddressInput;
  newOrder: Scalars['Int']['input'];
  tokenId: Scalars['TokenId']['input'];
};

export type NftsRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<LimitType>;
  where?: InputMaybe<NftsRequestWhere>;
};

export type NftsRequestWhere = {
  /** Chain IDs to search. Supports Ethereum and Polygon. If omitted, it will search in both chains */
  chainIds?: InputMaybe<Array<Scalars['ChainId']['input']>>;
  excludeCollections?: InputMaybe<Array<NetworkAddressInput>>;
  /** Exclude follower NFTs from the search */
  excludeFollowers?: InputMaybe<Scalars['Boolean']['input']>;
  /** Ethereum address of the owner. If unknown you can also search by profile ID */
  forAddress?: InputMaybe<Scalars['EvmAddress']['input']>;
  /** Profile ID of the owner */
  forProfileId?: InputMaybe<Scalars['ProfileId']['input']>;
  includeCollections?: InputMaybe<Array<NetworkAddressInput>>;
  /** Search query. Has to be part of a collection name */
  query?: InputMaybe<Scalars['String']['input']>;
};

export type Notification = ActedNotification | CommentNotification | FollowNotification | MentionNotification | MirrorNotification | QuoteNotification | ReactionNotification;

export type NotificationRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  /** The order by which to sort the profiles on follows, reactions, actions and mirrors */
  orderBy?: InputMaybe<ProfilesOrderBy>;
  where?: InputMaybe<NotificationWhere>;
};

export enum NotificationType {
  Acted = 'ACTED',
  Commented = 'COMMENTED',
  Followed = 'FOLLOWED',
  Mentioned = 'MENTIONED',
  Mirrored = 'MIRRORED',
  Quoted = 'QUOTED',
  Reacted = 'REACTED'
}

export type NotificationWhere = {
  customFilters?: InputMaybe<Array<CustomFiltersType>>;
  highSignalFilter?: InputMaybe<Scalars['Boolean']['input']>;
  notificationTypes?: InputMaybe<Array<NotificationType>>;
  publishedOn?: InputMaybe<Array<Scalars['AppId']['input']>>;
  timeBasedAggregation?: InputMaybe<Scalars['Boolean']['input']>;
};

export type OnchainCommentRequest = {
  commentOn: Scalars['PublicationId']['input'];
  /** If your using an unknown reference modules you need to pass this in. `followerOnlyReferenceModule` and `degreesOfSeparationReferenceModule` is handled automatically for you and if you supply this on publications with those settings it will be ignored */
  commentOnReferenceModuleData?: InputMaybe<Scalars['BlockchainData']['input']>;
  contentURI: Scalars['URI']['input'];
  openActionModules?: InputMaybe<Array<OpenActionModuleInput>>;
  referenceModule?: InputMaybe<ReferenceModuleInput>;
  referrers?: InputMaybe<Array<OnchainReferrer>>;
};

export type OnchainMirrorRequest = {
  /** You can add information like app on a mirror or tracking stuff */
  metadataURI?: InputMaybe<Scalars['URI']['input']>;
  mirrorOn: Scalars['PublicationId']['input'];
  /** If your using an unknown reference modules you need to pass this in. `followerOnlyReferenceModule` and `degreesOfSeparationReferenceModule` is handled automatically for you and if you supply this on publications with those settings it will be ignored */
  mirrorReferenceModuleData?: InputMaybe<Scalars['BlockchainData']['input']>;
  referrers?: InputMaybe<Array<OnchainReferrer>>;
};

export type OnchainPostRequest = {
  contentURI: Scalars['URI']['input'];
  openActionModules?: InputMaybe<Array<OpenActionModuleInput>>;
  referenceModule?: InputMaybe<ReferenceModuleInput>;
};

export type OnchainQuoteRequest = {
  contentURI: Scalars['URI']['input'];
  openActionModules?: InputMaybe<Array<OpenActionModuleInput>>;
  quoteOn: Scalars['PublicationId']['input'];
  /** If your using an unknown reference modules you need to pass this in. `followerOnlyReferenceModule` and `degreesOfSeparationReferenceModule` is handled automatically for you and if you supply this on publications with those settings it will be ignored */
  quoteOnReferenceModuleData?: InputMaybe<Scalars['BlockchainData']['input']>;
  referenceModule?: InputMaybe<ReferenceModuleInput>;
  referrers?: InputMaybe<Array<OnchainReferrer>>;
};

export type OnchainReferrer = {
  profileId?: InputMaybe<Scalars['ProfileId']['input']>;
  publicationId?: InputMaybe<Scalars['PublicationId']['input']>;
};

export type OnchainSetProfileMetadataRequest = {
  metadataURI: Scalars['URI']['input'];
};

export enum OpenActionCategoryType {
  Collect = 'COLLECT'
}

export type OpenActionFilter = {
  address?: InputMaybe<Scalars['EvmAddress']['input']>;
  category?: InputMaybe<OpenActionCategoryType>;
  type?: InputMaybe<OpenActionModuleType>;
};

export type OpenActionModule = LegacyAaveFeeCollectModuleSettings | LegacyErc4626FeeCollectModuleSettings | LegacyFeeCollectModuleSettings | LegacyFreeCollectModuleSettings | LegacyLimitedFeeCollectModuleSettings | LegacyLimitedTimedFeeCollectModuleSettings | LegacyMultirecipientFeeCollectModuleSettings | LegacyRevertCollectModuleSettings | LegacySimpleCollectModuleSettings | LegacyTimedFeeCollectModuleSettings | MultirecipientFeeCollectOpenActionSettings | SimpleCollectOpenActionSettings | UnknownOpenActionModuleSettings;

export type OpenActionModuleInput = {
  collectOpenAction?: InputMaybe<CollectActionModuleInput>;
  unknownOpenAction?: InputMaybe<UnknownOpenActionModuleInput>;
};

export enum OpenActionModuleType {
  LegacyAaveFeeCollectModule = 'LegacyAaveFeeCollectModule',
  LegacyErc4626FeeCollectModule = 'LegacyERC4626FeeCollectModule',
  LegacyFeeCollectModule = 'LegacyFeeCollectModule',
  LegacyFreeCollectModule = 'LegacyFreeCollectModule',
  LegacyLimitedFeeCollectModule = 'LegacyLimitedFeeCollectModule',
  LegacyLimitedTimedFeeCollectModule = 'LegacyLimitedTimedFeeCollectModule',
  LegacyMultirecipientFeeCollectModule = 'LegacyMultirecipientFeeCollectModule',
  LegacyRevertCollectModule = 'LegacyRevertCollectModule',
  LegacySimpleCollectModule = 'LegacySimpleCollectModule',
  LegacyTimedFeeCollectModule = 'LegacyTimedFeeCollectModule',
  MultirecipientFeeCollectOpenActionModule = 'MultirecipientFeeCollectOpenActionModule',
  SimpleCollectOpenActionModule = 'SimpleCollectOpenActionModule',
  UnknownOpenActionModule = 'UnknownOpenActionModule'
}

export type OpenActionPaidAction = {
  __typename?: 'OpenActionPaidAction';
  actedOn: PrimaryPublication;
  latestActed: Array<LatestActed>;
};

export type OpenActionProfileActed = {
  __typename?: 'OpenActionProfileActed';
  actedAt: Scalars['DateTime']['output'];
  action: OpenActionResult;
  by: Profile;
};

export type OpenActionResult = KnownCollectOpenActionResult | UnknownOpenActionResult;

export type OptimisticStatusResult = {
  __typename?: 'OptimisticStatusResult';
  isFinalisedOnchain: Scalars['Boolean']['output'];
  value: Scalars['Boolean']['output'];
};

export type OrCondition = {
  __typename?: 'OrCondition';
  criteria: Array<ThirdTierCondition>;
};

export type OwnedHandlesRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  /** The Ethereum address for which to retrieve owned handles */
  for: Scalars['EvmAddress']['input'];
  limit?: InputMaybe<LimitType>;
};

export type Owner = {
  __typename?: 'Owner';
  address: Scalars['EvmAddress']['output'];
  amount: Scalars['String']['output'];
};

export type PaginatedApprovedAuthenticationResult = {
  __typename?: 'PaginatedApprovedAuthenticationResult';
  items: Array<ApprovedAuthentication>;
  pageInfo: PaginatedResultInfo;
};

export type PaginatedCurrenciesResult = {
  __typename?: 'PaginatedCurrenciesResult';
  items: Array<Erc20>;
  pageInfo: PaginatedResultInfo;
};

export type PaginatedDisputedReports = {
  __typename?: 'PaginatedDisputedReports';
  items: Array<DisputedReport>;
  pageInfo: PaginatedResultInfo;
};

export type PaginatedExplorePublicationResult = {
  __typename?: 'PaginatedExplorePublicationResult';
  items: Array<ExplorePublication>;
  pageInfo: PaginatedResultInfo;
};

export type PaginatedFeedHighlightsResult = {
  __typename?: 'PaginatedFeedHighlightsResult';
  items: Array<FeedHighlight>;
  pageInfo: PaginatedResultInfo;
};

export type PaginatedFeedResult = {
  __typename?: 'PaginatedFeedResult';
  items: Array<FeedItem>;
  pageInfo: PaginatedResultInfo;
};

export type PaginatedHandlesResult = {
  __typename?: 'PaginatedHandlesResult';
  items: Array<HandleInfo>;
  pageInfo: PaginatedResultInfo;
};

export type PaginatedModExplorePublicationResult = {
  __typename?: 'PaginatedModExplorePublicationResult';
  items: Array<PrimaryPublication>;
  pageInfo: PaginatedResultInfo;
};

export type PaginatedModFollowersResult = {
  __typename?: 'PaginatedModFollowersResult';
  items: Array<ModFollowerResult>;
  pageInfo: PaginatedResultInfo;
};

export type PaginatedModReports = {
  __typename?: 'PaginatedModReports';
  items: Array<ModReport>;
  pageInfo: PaginatedResultInfo;
};

/** Nft collections paginated result */
export type PaginatedNftCollectionsResult = {
  __typename?: 'PaginatedNftCollectionsResult';
  items: Array<NftCollection>;
  pageInfo: PaginatedResultInfo;
};

export type PaginatedNftGalleriesResult = {
  __typename?: 'PaginatedNftGalleriesResult';
  items: Array<NftGallery>;
  pageInfo: PaginatedResultInfo;
};

export type PaginatedNftsResult = {
  __typename?: 'PaginatedNftsResult';
  items: Array<Nft>;
  pageInfo: PaginatedResultInfo;
};

export type PaginatedNotificationResult = {
  __typename?: 'PaginatedNotificationResult';
  items: Array<Notification>;
  pageInfo: PaginatedResultInfo;
};

/** Pagination with Offset fields  */
export type PaginatedOffsetRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<LimitType>;
};

/** The paginated Poap Events result */
export type PaginatedPoapEventResult = {
  __typename?: 'PaginatedPoapEventResult';
  items: Array<PoapEvent>;
  pageInfo: PaginatedResultInfo;
};

/** The paginated Poap Token Results */
export type PaginatedPoapTokenResult = {
  __typename?: 'PaginatedPoapTokenResult';
  items: Array<PoapToken>;
  pageInfo: PaginatedResultInfo;
};

/** Popular Nft collections paginated result */
export type PaginatedPopularNftCollectionsResult = {
  __typename?: 'PaginatedPopularNftCollectionsResult';
  items: Array<NftCollectionWithOwners>;
  pageInfo: PaginatedResultInfo;
};

export type PaginatedProfileActionHistoryResult = {
  __typename?: 'PaginatedProfileActionHistoryResult';
  items: Array<ProfileActionHistory>;
  pageInfo: PaginatedResultInfo;
};

/** The paginated profile managers result */
export type PaginatedProfileManagersResult = {
  __typename?: 'PaginatedProfileManagersResult';
  items: Array<ProfilesManagedResult>;
  pageInfo: PaginatedResultInfo;
};

/** The paginated profile result */
export type PaginatedProfileResult = {
  __typename?: 'PaginatedProfileResult';
  items: Array<Profile>;
  pageInfo: PaginatedResultInfo;
};

export type PaginatedPublicationPrimaryResult = {
  __typename?: 'PaginatedPublicationPrimaryResult';
  items: Array<PrimaryPublication>;
  pageInfo: PaginatedResultInfo;
};

export type PaginatedPublicationsResult = {
  __typename?: 'PaginatedPublicationsResult';
  items: Array<AnyPublication>;
  pageInfo: PaginatedResultInfo;
};

export type PaginatedPublicationsTagsResult = {
  __typename?: 'PaginatedPublicationsTagsResult';
  items: Array<TagResult>;
  pageInfo: PaginatedResultInfo;
};

export type PaginatedRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<LimitType>;
};

/** The paginated result info */
export type PaginatedResultInfo = {
  __typename?: 'PaginatedResultInfo';
  /** Cursor to query next results */
  next?: Maybe<Scalars['Cursor']['output']>;
  /** Cursor to query the actual results */
  prev?: Maybe<Scalars['Cursor']['output']>;
};

export type PaginatedRevenueFromPublicationsResult = {
  __typename?: 'PaginatedRevenueFromPublicationsResult';
  items: Array<PublicationRevenue>;
  pageInfo: PaginatedResultInfo;
};

export type PaginatedSupportedModules = {
  __typename?: 'PaginatedSupportedModules';
  items: Array<SupportedModule>;
  pageInfo: PaginatedResultInfo;
};

export type PaginatedWhoReactedResult = {
  __typename?: 'PaginatedWhoReactedResult';
  items: Array<ProfileWhoReactedResult>;
  pageInfo: PaginatedResultInfo;
};

export type PaidAction = FollowPaidAction | OpenActionPaidAction;

export type PeerToPeerRecommendRequest = {
  /** The profile to recommend */
  profileId: Scalars['ProfileId']['input'];
};

export type PhysicalAddress = {
  __typename?: 'PhysicalAddress';
  /** The country name component. */
  country: Scalars['EncryptableString']['output'];
  /** The full mailing address formatted for display. */
  formatted?: Maybe<Scalars['EncryptableString']['output']>;
  /** The city or locality. */
  locality: Scalars['EncryptableString']['output'];
  /** The zip or postal code. */
  postalCode?: Maybe<Scalars['EncryptableString']['output']>;
  /** The state or region. */
  region?: Maybe<Scalars['EncryptableString']['output']>;
  /** The street address including house number, street name, P.O. Box, apartment or unit number and extended multi-line address information. */
  streetAddress?: Maybe<Scalars['EncryptableString']['output']>;
};

/** The POAP Event result */
export type PoapEvent = {
  __typename?: 'PoapEvent';
  animationUrl?: Maybe<Scalars['URL']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  endDate?: Maybe<Scalars['DateTime']['output']>;
  eventTemplateId?: Maybe<Scalars['Int']['output']>;
  eventUrl?: Maybe<Scalars['URL']['output']>;
  expiryDate?: Maybe<Scalars['DateTime']['output']>;
  fancyId?: Maybe<Scalars['String']['output']>;
  fromAdmin?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['PoapEventId']['output'];
  imageUrl?: Maybe<Scalars['URL']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  privateEvent?: Maybe<Scalars['Boolean']['output']>;
  startDate?: Maybe<Scalars['DateTime']['output']>;
  virtualEvent?: Maybe<Scalars['Boolean']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

export type PoapEventQueryRequest = {
  eventId: Scalars['PoapEventId']['input'];
};

export type PoapHoldersQueryRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  eventId: Scalars['PoapEventId']['input'];
  limit?: InputMaybe<LimitType>;
};

/** The Poap Token Event */
export type PoapToken = {
  __typename?: 'PoapToken';
  created: Scalars['DateTime']['output'];
  event: PoapEvent;
  /** Poap Event Id */
  eventId: Scalars['PoapEventId']['output'];
  /** Which network the token is: L1 (eth) or L2 (Gnosis) */
  layer: PoapTokenLayerType;
  /** migrated to L1 at */
  migrated?: Maybe<Scalars['DateTime']['output']>;
  owner: NetworkAddress;
  tokenId: Scalars['TokenId']['output'];
};

export enum PoapTokenLayerType {
  Layer1 = 'Layer1',
  Layer2 = 'Layer2'
}

export enum PopularNftCollectionsOrder {
  TotalLensProfileOwners = 'TotalLensProfileOwners',
  TotalOwners = 'TotalOwners'
}

/** Popular NFT collections request */
export type PopularNftCollectionsRequest = {
  /** The chain ids to look for NFTs on. Ethereum and Polygon are supported. If omitted, it will look on both chains by default. */
  chainIds?: InputMaybe<Array<Scalars['ChainId']['input']>>;
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  /** Exclude Lens Follower NFTs */
  excludeFollowers?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<LimitType>;
  /** Include only verified collections */
  onlyVerified?: InputMaybe<Scalars['Boolean']['input']>;
  /** The ordering of Nft collection owners. Defaults to Total Lens Profile owners */
  orderBy?: PopularNftCollectionsOrder;
};

export type Post = {
  __typename?: 'Post';
  by: Profile;
  createdAt: Scalars['DateTime']['output'];
  hashtagsMentioned: Array<Scalars['String']['output']>;
  id: Scalars['PublicationId']['output'];
  isEncrypted: Scalars['Boolean']['output'];
  isHidden: Scalars['Boolean']['output'];
  metadata: PublicationMetadata;
  momoka?: Maybe<MomokaInfo>;
  openActionModules: Array<OpenActionModule>;
  operations: PublicationOperations;
  profilesMentioned: Array<ProfileMentioned>;
  publishedOn?: Maybe<App>;
  referenceModule?: Maybe<ReferenceModule>;
  stats: PublicationStats;
  txHash?: Maybe<Scalars['TxHash']['output']>;
};


export type PostStatsArgs = {
  request?: InputMaybe<PublicationStatsInput>;
};

export type PrfResult = {
  __typename?: 'PrfResult';
  dd: Scalars['Boolean']['output'];
  ss: Scalars['Boolean']['output'];
};

export type PrimaryPublication = Comment | Post | Quote;

/** The Profile */
export type Profile = {
  __typename?: 'Profile';
  /** When the profile was created */
  createdAt: Scalars['DateTime']['output'];
  /** The follow module */
  followModule?: Maybe<FollowModule>;
  /** The profile follow nft address */
  followNftAddress?: Maybe<NetworkAddress>;
  guardian?: Maybe<ProfileGuardianResult>;
  /** The profile handle - a profile may not have one */
  handle?: Maybe<HandleInfo>;
  /** The profile id */
  id: Scalars['ProfileId']['output'];
  interests: Array<Scalars['String']['output']>;
  invitedBy?: Maybe<Profile>;
  /** The number of invites left */
  invitesLeft: Scalars['Int']['output'];
  /** The profile metadata. You can optionally query profile metadata by app id.  */
  metadata?: Maybe<ProfileMetadata>;
  /** The on chain identity */
  onchainIdentity: ProfileOnchainIdentity;
  operations: ProfileOperations;
  /** Who owns the profile */
  ownedBy: NetworkAddress;
  /** If the profile has been recommended by the authenticated user */
  peerToPeerRecommendedByMe: Scalars['Boolean']['output'];
  /** If the profile has got signless enabled */
  signless: Scalars['Boolean']['output'];
  /** If lens API will sponsor this persons for gasless experience, note they can have signless on but sponsor false which means it be rejected */
  sponsor: Scalars['Boolean']['output'];
  stats: ProfileStats;
  txHash: Scalars['TxHash']['output'];
};


/** The Profile */
export type ProfileMetadataArgs = {
  request?: InputMaybe<GetProfileMetadataArgs>;
};


/** The Profile */
export type ProfileStatsArgs = {
  request?: InputMaybe<ProfileStatsArg>;
};

/** The Profile */
export type ProfileActionHistory = {
  __typename?: 'ProfileActionHistory';
  actionType: ProfileActionHistoryType;
  actionedOn: Scalars['DateTime']['output'];
  id: Scalars['Float']['output'];
  txHash?: Maybe<Scalars['TxHash']['output']>;
  who: Scalars['EvmAddress']['output'];
};

export type ProfileActionHistoryRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<LimitType>;
};

/** Profile action history type */
export enum ProfileActionHistoryType {
  Acted = 'ACTED',
  Blocked = 'BLOCKED',
  Collected = 'COLLECTED',
  Comment = 'COMMENT',
  Follow = 'FOLLOW',
  LinkHandle = 'LINK_HANDLE',
  LoggedIn = 'LOGGED_IN',
  Mirror = 'MIRROR',
  Post = 'POST',
  Quote = 'QUOTE',
  RefreshAuthToken = 'REFRESH_AUTH_TOKEN',
  SetProfileMetadata = 'SET_PROFILE_METADATA',
  SetProfileModule = 'SET_PROFILE_MODULE',
  Unblocked = 'UNBLOCKED',
  Unfollow = 'UNFOLLOW',
  UnlinkHandle = 'UNLINK_HANDLE'
}

export type ProfileFraudReasonInput = {
  reason: ProfileReportingReason;
  subreason: ProfileReportingFraudSubreason;
};

export type ProfileGuardianResult = {
  __typename?: 'ProfileGuardianResult';
  cooldownEndsOn?: Maybe<Scalars['DateTime']['output']>;
  protected: Scalars['Boolean']['output'];
};

/** Profile interests types */
export enum ProfileInterestTypes {
  ArtEntertainment = 'ART_ENTERTAINMENT',
  ArtEntertainmentAnime = 'ART_ENTERTAINMENT__ANIME',
  ArtEntertainmentArt = 'ART_ENTERTAINMENT__ART',
  ArtEntertainmentBooks = 'ART_ENTERTAINMENT__BOOKS',
  ArtEntertainmentDesign = 'ART_ENTERTAINMENT__DESIGN',
  ArtEntertainmentFashion = 'ART_ENTERTAINMENT__FASHION',
  ArtEntertainmentFilmTv = 'ART_ENTERTAINMENT__FILM_TV',
  ArtEntertainmentMemes = 'ART_ENTERTAINMENT__MEMES',
  ArtEntertainmentMusic = 'ART_ENTERTAINMENT__MUSIC',
  ArtEntertainmentPhotography = 'ART_ENTERTAINMENT__PHOTOGRAPHY',
  Business = 'BUSINESS',
  BusinessCreatorEconomy = 'BUSINESS__CREATOR_ECONOMY',
  BusinessFinance = 'BUSINESS__FINANCE',
  BusinessMarketing = 'BUSINESS__MARKETING',
  Career = 'CAREER',
  Crypto = 'CRYPTO',
  CryptoBitcoin = 'CRYPTO__BITCOIN',
  CryptoDaos = 'CRYPTO__DAOS',
  CryptoDefi = 'CRYPTO__DEFI',
  CryptoEthereum = 'CRYPTO__ETHEREUM',
  CryptoGm = 'CRYPTO__GM',
  CryptoGovernance = 'CRYPTO__GOVERNANCE',
  CryptoL1 = 'CRYPTO__L1',
  CryptoL2 = 'CRYPTO__L2',
  CryptoMetaverse = 'CRYPTO__METAVERSE',
  CryptoNft = 'CRYPTO__NFT',
  CryptoRekt = 'CRYPTO__REKT',
  CryptoScaling = 'CRYPTO__SCALING',
  CryptoWeb3 = 'CRYPTO__WEB3',
  CryptoWeb3Social = 'CRYPTO__WEB3_SOCIAL',
  Education = 'EDUCATION',
  FamilyParenting = 'FAMILY_PARENTING',
  FoodDrink = 'FOOD_DRINK',
  FoodDrinkBeer = 'FOOD_DRINK__BEER',
  FoodDrinkCocktails = 'FOOD_DRINK__COCKTAILS',
  FoodDrinkCooking = 'FOOD_DRINK__COOKING',
  FoodDrinkRestaurants = 'FOOD_DRINK__RESTAURANTS',
  FoodDrinkWine = 'FOOD_DRINK__WINE',
  HealthFitness = 'HEALTH_FITNESS',
  HealthFitnessBiohacking = 'HEALTH_FITNESS__BIOHACKING',
  HealthFitnessExercise = 'HEALTH_FITNESS__EXERCISE',
  HobbiesInterests = 'HOBBIES_INTERESTS',
  HobbiesInterestsArtsCrafts = 'HOBBIES_INTERESTS__ARTS_CRAFTS',
  HobbiesInterestsCars = 'HOBBIES_INTERESTS__CARS',
  HobbiesInterestsCollecting = 'HOBBIES_INTERESTS__COLLECTING',
  HobbiesInterestsGaming = 'HOBBIES_INTERESTS__GAMING',
  HobbiesInterestsSports = 'HOBBIES_INTERESTS__SPORTS',
  HobbiesInterestsTravel = 'HOBBIES_INTERESTS__TRAVEL',
  HomeGarden = 'HOME_GARDEN',
  HomeGardenAnimals = 'HOME_GARDEN__ANIMALS',
  HomeGardenGardening = 'HOME_GARDEN__GARDENING',
  HomeGardenHomeImprovement = 'HOME_GARDEN__HOME_IMPROVEMENT',
  HomeGardenNature = 'HOME_GARDEN__NATURE',
  LawGovernmentPolitics = 'LAW_GOVERNMENT_POLITICS',
  LawGovernmentPoliticsRegulation = 'LAW_GOVERNMENT_POLITICS__REGULATION',
  Lens = 'LENS',
  News = 'NEWS',
  Nsfw = 'NSFW',
  Technology = 'TECHNOLOGY',
  TechnologyAiMl = 'TECHNOLOGY__AI_ML',
  TechnologyBiotech = 'TECHNOLOGY__BIOTECH',
  TechnologyProgramming = 'TECHNOLOGY__PROGRAMMING',
  TechnologyScience = 'TECHNOLOGY__SCIENCE',
  TechnologyTools = 'TECHNOLOGY__TOOLS'
}

export type ProfileInterestsRequest = {
  interests: Array<ProfileInterestTypes>;
};

export type ProfileManagersRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  /** The profile ID for which to retrieve managers */
  for: Scalars['ProfileId']['input'];
  limit?: InputMaybe<LimitType>;
};

export type ProfileMentioned = {
  __typename?: 'ProfileMentioned';
  profile: Profile;
  snapshotHandleMentioned: HandleInfo;
  stillOwnsHandle: Scalars['Boolean']['output'];
};

export type ProfileMetadata = {
  __typename?: 'ProfileMetadata';
  /** The app that this metadata is displayed on */
  appId?: Maybe<Scalars['AppId']['output']>;
  /** Profile Custom attributes */
  attributes?: Maybe<Array<MetadataAttribute>>;
  /** The bio for the profile */
  bio?: Maybe<Scalars['Markdown']['output']>;
  /** The cover picture for the profile */
  coverPicture?: Maybe<ImageSet>;
  /** The display name for the profile */
  displayName?: Maybe<Scalars['String']['output']>;
  /** The picture for the profile */
  picture?: Maybe<ProfilePicture>;
  /** The raw uri for the which the profile metadata was set as */
  rawURI: Scalars['URI']['output'];
};

export type ProfileMirrorResult = {
  __typename?: 'ProfileMirrorResult';
  mirrorId: Scalars['PublicationId']['output'];
  mirroredAt: Scalars['DateTime']['output'];
  profile: Profile;
};

export type ProfileOnchainIdentity = {
  __typename?: 'ProfileOnchainIdentity';
  /** The ens information */
  ens?: Maybe<EnsOnchainIdentity>;
  /** The POH status */
  proofOfHumanity: Scalars['Boolean']['output'];
  /** The sybil dot org information */
  sybilDotOrg: SybilDotOrgIdentity;
  /** The worldcoin identity */
  worldcoin: WorldcoinIdentity;
};

export type ProfileOperations = {
  __typename?: 'ProfileOperations';
  canBlock: Scalars['Boolean']['output'];
  canFollow: TriStateValue;
  canUnblock: Scalars['Boolean']['output'];
  canUnfollow: Scalars['Boolean']['output'];
  hasBlockedMe: OptimisticStatusResult;
  id: Scalars['ProfileId']['output'];
  isBlockedByMe: OptimisticStatusResult;
  isFollowedByMe: OptimisticStatusResult;
  isFollowingMe: OptimisticStatusResult;
};

export type ProfileOwnershipCondition = {
  __typename?: 'ProfileOwnershipCondition';
  profileId: Scalars['ProfileId']['output'];
};

export type ProfilePicture = ImageSet | NftImage;

export type ProfileReactedResult = {
  __typename?: 'ProfileReactedResult';
  profile: Profile;
  reactions: Array<ReactedResult>;
};

/** The reaction details for a publication */
export type ProfileReactionResult = {
  __typename?: 'ProfileReactionResult';
  /** The reaction */
  reaction: PublicationReactionType;
  /** The reaction date */
  reactionAt: Scalars['DateTime']['output'];
};

export type ProfileRecommendationsRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  /** Disable machine learning recommendations (default: false) */
  disableML?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter based on a specific profile ID */
  for: Scalars['ProfileId']['input'];
  limit?: InputMaybe<LimitType>;
  /** Shuffle the recommendations (default: false) */
  shuffle?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum ProfileReportingFraudSubreason {
  Impersonation = 'IMPERSONATION',
  SomethingElse = 'SOMETHING_ELSE'
}

export enum ProfileReportingReason {
  Fraud = 'FRAUD',
  Spam = 'SPAM'
}

export type ProfileReportingReasonInput = {
  fraudReason?: InputMaybe<ProfileFraudReasonInput>;
  spamReason?: InputMaybe<ProfileSpamReasonInput>;
};

export enum ProfileReportingSpamSubreason {
  Repetitive = 'REPETITIVE',
  SomethingElse = 'SOMETHING_ELSE'
}

export type ProfileRequest = {
  /** The handle for profile you want to fetch - namespace/localname */
  forHandle?: InputMaybe<Scalars['Handle']['input']>;
  /** The profile you want to fetch */
  forProfileId?: InputMaybe<Scalars['ProfileId']['input']>;
};

export type ProfileSearchRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<LimitType>;
  /** The order by which to sort the profiles */
  orderBy?: InputMaybe<ProfilesOrderBy>;
  /** Query for the profile search */
  query: Scalars['String']['input'];
  /** Filtering criteria for profile search */
  where?: InputMaybe<ProfileSearchWhere>;
};

export type ProfileSearchWhere = {
  /** Array of custom filters for profile search */
  customFilters?: InputMaybe<Array<CustomFiltersType>>;
};

export type ProfileSpamReasonInput = {
  reason: ProfileReportingReason;
  subreason: ProfileReportingSpamSubreason;
};

/** The Profile Stats */
export type ProfileStats = {
  __typename?: 'ProfileStats';
  comments: Scalars['Int']['output'];
  countOpenActions: Scalars['Int']['output'];
  followers: Scalars['Int']['output'];
  following: Scalars['Int']['output'];
  id: Scalars['ProfileId']['output'];
  /** The profile classifier score of this profile relative to others on Lens. It is a % out of 100. */
  lensClassifierScore?: Maybe<Scalars['Float']['output']>;
  mirrors: Scalars['Int']['output'];
  posts: Scalars['Int']['output'];
  publications: Scalars['Int']['output'];
  quotes: Scalars['Int']['output'];
  /** How many times a profile has reacted on something */
  reacted: Scalars['Int']['output'];
  /** How many times other profiles have reacted on something this profile did */
  reactions: Scalars['Int']['output'];
};


/** The Profile Stats */
export type ProfileStatsCountOpenActionsArgs = {
  request?: InputMaybe<ProfileStatsCountOpenActionArgs>;
};


/** The Profile Stats */
export type ProfileStatsReactedArgs = {
  request?: InputMaybe<ProfileStatsReactionArgs>;
};


/** The Profile Stats */
export type ProfileStatsReactionsArgs = {
  request?: InputMaybe<ProfileStatsReactionArgs>;
};

export type ProfileStatsArg = {
  customFilters?: InputMaybe<Array<CustomFiltersType>>;
  forApps?: InputMaybe<Array<Scalars['AppId']['input']>>;
  hiddenComments?: InputMaybe<HiddenCommentsType>;
};

export type ProfileStatsCountOpenActionArgs = {
  anyOf?: InputMaybe<Array<OpenActionFilter>>;
};

export type ProfileStatsReactionArgs = {
  type: PublicationReactionType;
};

export type ProfileWhoReactedResult = {
  __typename?: 'ProfileWhoReactedResult';
  profile: Profile;
  reactions: Array<ProfileReactionResult>;
};

export type ProfilesManagedRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  /** The Ethereum address for which to retrieve managed profiles */
  for: Scalars['EvmAddress']['input'];
  hiddenFilter?: InputMaybe<ManagedProfileVisibility>;
  includeOwned?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<LimitType>;
};

export type ProfilesManagedResult = {
  __typename?: 'ProfilesManagedResult';
  address: Scalars['EvmAddress']['output'];
  isLensManager: Scalars['Boolean']['output'];
};

export enum ProfilesOrderBy {
  Default = 'DEFAULT',
  ProfileClassifier = 'PROFILE_CLASSIFIER'
}

export type ProfilesRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<LimitType>;
  /** The order by which to sort the profiles */
  orderBy?: InputMaybe<ProfilesOrderBy>;
  /** The where clause to use to filter on what you are looking for */
  where: ProfilesRequestWhere;
};

export type ProfilesRequestWhere = {
  /** Pass in an array of handles to get the profile entities */
  handles?: InputMaybe<Array<Scalars['Handle']['input']>>;
  /** Pass in an array of evm address to get the profile entities they own */
  ownedBy?: InputMaybe<Array<Scalars['EvmAddress']['input']>>;
  /** Pass in an array of profile ids to get the profile entities */
  profileIds?: InputMaybe<Array<Scalars['ProfileId']['input']>>;
  /** Pass the publication id and get a list of the profiles who commented on it */
  whoCommentedOn?: InputMaybe<Scalars['PublicationId']['input']>;
  /** Pass the publication id and get a list of the profiles who mirrored it */
  whoMirroredPublication?: InputMaybe<Scalars['PublicationId']['input']>;
  /** Pass the publication id and get a list of the profiles who quoted it */
  whoQuotedPublication?: InputMaybe<Scalars['PublicationId']['input']>;
};

export type PublicationBookmarkRequest = {
  on: Scalars['PublicationId']['input'];
};

export type PublicationBookmarksRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<LimitType>;
  where?: InputMaybe<PublicationBookmarksWhere>;
};

export type PublicationBookmarksWhere = {
  metadata?: InputMaybe<PublicationMetadataFilters>;
};

export type PublicationCommentOn = {
  /** You can use this enum to show, hide or show only hidden comments */
  hiddenComments?: InputMaybe<HiddenCommentsType>;
  id: Scalars['PublicationId']['input'];
  ranking?: InputMaybe<PublicationCommentOnRanking>;
};

export type PublicationCommentOnRanking = {
  filter?: InputMaybe<CommentRankingFilterType>;
};

export enum PublicationContentWarningType {
  Nsfw = 'NSFW',
  Sensitive = 'SENSITIVE',
  Spoiler = 'SPOILER'
}

export type PublicationMarketplaceMetadataAttribute = {
  __typename?: 'PublicationMarketplaceMetadataAttribute';
  displayType?: Maybe<MarketplaceMetadataAttributeDisplayType>;
  traitType?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export type PublicationMetadata = ArticleMetadataV3 | AudioMetadataV3 | CheckingInMetadataV3 | EmbedMetadataV3 | EventMetadataV3 | ImageMetadataV3 | LinkMetadataV3 | LiveStreamMetadataV3 | MintMetadataV3 | SpaceMetadataV3 | StoryMetadataV3 | TextOnlyMetadataV3 | ThreeDMetadataV3 | TransactionMetadataV3 | VideoMetadataV3;

export type PublicationMetadataContentWarningFilter = {
  oneOf: Array<PublicationContentWarningType>;
};

export type PublicationMetadataEncryptionStrategy = PublicationMetadataLitEncryption;

export type PublicationMetadataFilters = {
  contentWarning?: InputMaybe<PublicationMetadataContentWarningFilter>;
  locale?: InputMaybe<Scalars['Locale']['input']>;
  mainContentFocus?: InputMaybe<Array<PublicationMetadataMainFocusType>>;
  publishedOn?: InputMaybe<Array<Scalars['AppId']['input']>>;
  tags?: InputMaybe<PublicationMetadataTagsFilter>;
};

export enum PublicationMetadataLicenseType {
  Cco = 'CCO',
  CcBy = 'CC_BY',
  CcByNc = 'CC_BY_NC',
  CcByNd = 'CC_BY_ND',
  TbnlCDtsaNplLedger = 'TBNL_C_DTSA_NPL_Ledger',
  TbnlCDtsaNplLegal = 'TBNL_C_DTSA_NPL_Legal',
  TbnlCDtsaPlLedger = 'TBNL_C_DTSA_PL_Ledger',
  TbnlCDtsaPlLegal = 'TBNL_C_DTSA_PL_Legal',
  TbnlCDtNplLedger = 'TBNL_C_DT_NPL_Ledger',
  TbnlCDtNplLegal = 'TBNL_C_DT_NPL_Legal',
  TbnlCDtPlLedger = 'TBNL_C_DT_PL_Ledger',
  TbnlCDtPlLegal = 'TBNL_C_DT_PL_Legal',
  TbnlCDNplLedger = 'TBNL_C_D_NPL_Ledger',
  TbnlCDNplLegal = 'TBNL_C_D_NPL_Legal',
  TbnlCDPlLedger = 'TBNL_C_D_PL_Ledger',
  TbnlCDPlLegal = 'TBNL_C_D_PL_Legal',
  TbnlCNdNplLedger = 'TBNL_C_ND_NPL_Ledger',
  TbnlCNdNplLegal = 'TBNL_C_ND_NPL_Legal',
  TbnlCNdPlLedger = 'TBNL_C_ND_PL_Ledger',
  TbnlCNdPlLegal = 'TBNL_C_ND_PL_Legal',
  TbnlNcDtsaNplLedger = 'TBNL_NC_DTSA_NPL_Ledger',
  TbnlNcDtsaNplLegal = 'TBNL_NC_DTSA_NPL_Legal',
  TbnlNcDtsaPlLedger = 'TBNL_NC_DTSA_PL_Ledger',
  TbnlNcDtsaPlLegal = 'TBNL_NC_DTSA_PL_Legal',
  TbnlNcDtNplLedger = 'TBNL_NC_DT_NPL_Ledger',
  TbnlNcDtNplLegal = 'TBNL_NC_DT_NPL_Legal',
  TbnlNcDtPlLedger = 'TBNL_NC_DT_PL_Ledger',
  TbnlNcDtPlLegal = 'TBNL_NC_DT_PL_Legal',
  TbnlNcDNplLedger = 'TBNL_NC_D_NPL_Ledger',
  TbnlNcDNplLegal = 'TBNL_NC_D_NPL_Legal',
  TbnlNcDPlLedger = 'TBNL_NC_D_PL_Ledger',
  TbnlNcDPlLegal = 'TBNL_NC_D_PL_Legal',
  TbnlNcNdNplLedger = 'TBNL_NC_ND_NPL_Ledger',
  TbnlNcNdNplLegal = 'TBNL_NC_ND_NPL_Legal',
  TbnlNcNdPlLedger = 'TBNL_NC_ND_PL_Ledger',
  TbnlNcNdPlLegal = 'TBNL_NC_ND_PL_Legal'
}

export type PublicationMetadataLitEncryption = {
  __typename?: 'PublicationMetadataLitEncryption';
  accessCondition: RootCondition;
  accessControlContract: NetworkAddress;
  encryptedPaths: Array<Scalars['EncryptedPath']['output']>;
  encryptionKey: Scalars['ContentEncryptionKey']['output'];
};

export enum PublicationMetadataMainFocusType {
  Article = 'ARTICLE',
  Audio = 'AUDIO',
  CheckingIn = 'CHECKING_IN',
  Embed = 'EMBED',
  Event = 'EVENT',
  Image = 'IMAGE',
  Link = 'LINK',
  Livestream = 'LIVESTREAM',
  Mint = 'MINT',
  ShortVideo = 'SHORT_VIDEO',
  Space = 'SPACE',
  Story = 'STORY',
  TextOnly = 'TEXT_ONLY',
  ThreeD = 'THREE_D',
  Transaction = 'TRANSACTION',
  Video = 'VIDEO'
}

export type PublicationMetadataMedia = PublicationMetadataMediaAudio | PublicationMetadataMediaImage | PublicationMetadataMediaVideo;

export type PublicationMetadataMediaAudio = {
  __typename?: 'PublicationMetadataMediaAudio';
  artist?: Maybe<Scalars['EncryptableString']['output']>;
  attributes?: Maybe<Array<MetadataAttribute>>;
  audio: EncryptableAudioSet;
  cover?: Maybe<EncryptableImageSet>;
  credits?: Maybe<Scalars['EncryptableString']['output']>;
  duration?: Maybe<Scalars['Int']['output']>;
  genre?: Maybe<Scalars['EncryptableString']['output']>;
  license?: Maybe<PublicationMetadataLicenseType>;
  lyrics?: Maybe<Scalars['EncryptableString']['output']>;
  recordLabel?: Maybe<Scalars['EncryptableString']['output']>;
};

export type PublicationMetadataMediaImage = {
  __typename?: 'PublicationMetadataMediaImage';
  /** Alternative text for the image */
  altTag?: Maybe<Scalars['EncryptableString']['output']>;
  attributes?: Maybe<Array<MetadataAttribute>>;
  image: EncryptableImageSet;
  license?: Maybe<PublicationMetadataLicenseType>;
};

export type PublicationMetadataMediaVideo = {
  __typename?: 'PublicationMetadataMediaVideo';
  /** Alternative text for the video */
  altTag?: Maybe<Scalars['EncryptableString']['output']>;
  attributes?: Maybe<Array<MetadataAttribute>>;
  cover?: Maybe<EncryptableImageSet>;
  duration?: Maybe<Scalars['Int']['output']>;
  license?: Maybe<PublicationMetadataLicenseType>;
  video: EncryptableVideoSet;
};

export type PublicationMetadataTagsFilter = {
  all?: InputMaybe<Array<Scalars['String']['input']>>;
  oneOf?: InputMaybe<Array<Scalars['String']['input']>>;
};

export enum PublicationMetadataTransactionType {
  Erc20 = 'ERC20',
  Erc721 = 'ERC721',
  Other = 'OTHER'
}

export type PublicationNotInterestedRequest = {
  on: Scalars['PublicationId']['input'];
};

export type PublicationOperations = {
  __typename?: 'PublicationOperations';
  actedOn: Array<OpenActionResult>;
  canAct: TriStateValue;
  canComment: TriStateValue;
  canDecrypt: CanDecryptResponse;
  canMirror: TriStateValue;
  canQuote: TriStateValue;
  hasActed: OptimisticStatusResult;
  hasBookmarked: Scalars['Boolean']['output'];
  hasMirrored: Scalars['Boolean']['output'];
  hasQuoted: Scalars['Boolean']['output'];
  hasReacted: Scalars['Boolean']['output'];
  hasReported: Scalars['Boolean']['output'];
  id: Scalars['PublicationId']['output'];
  isNotInterested: Scalars['Boolean']['output'];
};


export type PublicationOperationsActedOnArgs = {
  request?: InputMaybe<PublicationOperationsActedArgs>;
};


export type PublicationOperationsCanActArgs = {
  request?: InputMaybe<PublicationOperationsActedArgs>;
};


export type PublicationOperationsHasActedArgs = {
  request?: InputMaybe<PublicationOperationsActedArgs>;
};


export type PublicationOperationsHasReactedArgs = {
  request?: InputMaybe<PublicationOperationsReactionArgs>;
};

export type PublicationOperationsActedArgs = {
  filter?: InputMaybe<OpenActionFilter>;
};

export type PublicationOperationsReactionArgs = {
  type?: InputMaybe<PublicationReactionType>;
};

export enum PublicationReactionType {
  Downvote = 'DOWNVOTE',
  Upvote = 'UPVOTE'
}

export enum PublicationReportingFraudSubreason {
  Impersonation = 'IMPERSONATION',
  Scam = 'SCAM'
}

export enum PublicationReportingIllegalSubreason {
  AnimalAbuse = 'ANIMAL_ABUSE',
  DirectThreat = 'DIRECT_THREAT',
  HumanAbuse = 'HUMAN_ABUSE',
  IntEllEctualProperty = 'INTEllECTUAL_PROPERTY',
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

export type PublicationRequest = {
  forId?: InputMaybe<Scalars['PublicationId']['input']>;
  forTxHash?: InputMaybe<Scalars['TxHash']['input']>;
};

export type PublicationRevenue = {
  __typename?: 'PublicationRevenue';
  publication: AnyPublication;
  revenue: Array<RevenueAggregate>;
};

export type PublicationSearchRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<LimitType>;
  query: Scalars['String']['input'];
  where?: InputMaybe<PublicationSearchWhere>;
};

export type PublicationSearchWhere = {
  customFilters?: InputMaybe<Array<CustomFiltersType>>;
  metadata?: InputMaybe<PublicationMetadataFilters>;
  publicationTypes?: InputMaybe<Array<SearchPublicationType>>;
  withOpenActions?: InputMaybe<Array<OpenActionFilter>>;
};

export type PublicationStats = {
  __typename?: 'PublicationStats';
  bookmarks: Scalars['Int']['output'];
  comments: Scalars['Int']['output'];
  countOpenActions: Scalars['Int']['output'];
  id: Scalars['PublicationId']['output'];
  mirrors: Scalars['Int']['output'];
  quotes: Scalars['Int']['output'];
  reactions: Scalars['Int']['output'];
};


export type PublicationStatsCountOpenActionsArgs = {
  request?: InputMaybe<PublicationStatsCountOpenActionArgs>;
};


export type PublicationStatsReactionsArgs = {
  request?: InputMaybe<PublicationStatsReactionArgs>;
};

export type PublicationStatsCountOpenActionArgs = {
  anyOf?: InputMaybe<Array<OpenActionFilter>>;
};

export type PublicationStatsInput = {
  customFilters?: InputMaybe<Array<CustomFiltersType>>;
  hiddenComments?: InputMaybe<HiddenCommentsType>;
  /** Filter the returned stats on apps and 1 of the following filters: tags, contentWarning, mainContentFocus, locale */
  metadata?: InputMaybe<PublicationMetadataFilters>;
};

export type PublicationStatsReactionArgs = {
  type: PublicationReactionType;
};

export enum PublicationType {
  Comment = 'COMMENT',
  Mirror = 'MIRROR',
  Post = 'POST',
  Quote = 'QUOTE'
}

export type PublicationValidateMetadataResult = {
  __typename?: 'PublicationValidateMetadataResult';
  reason?: Maybe<Scalars['String']['output']>;
  valid: Scalars['Boolean']['output'];
};

export type PublicationsRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<LimitType>;
  where: PublicationsWhere;
};

export type PublicationsTagsRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<LimitType>;
  orderBy?: InputMaybe<TagSortCriteriaType>;
  where?: InputMaybe<PublicationsTagsWhere>;
};

export type PublicationsTagsWhere = {
  publishedOn?: InputMaybe<Array<Scalars['AppId']['input']>>;
};

export type PublicationsWhere = {
  actedBy?: InputMaybe<Scalars['ProfileId']['input']>;
  commentOn?: InputMaybe<PublicationCommentOn>;
  customFilters?: InputMaybe<Array<CustomFiltersType>>;
  from?: InputMaybe<Array<Scalars['ProfileId']['input']>>;
  metadata?: InputMaybe<PublicationMetadataFilters>;
  mirrorOn?: InputMaybe<Scalars['PublicationId']['input']>;
  publicationIds?: InputMaybe<Array<Scalars['PublicationId']['input']>>;
  publicationTypes?: InputMaybe<Array<PublicationType>>;
  quoteOn?: InputMaybe<Scalars['PublicationId']['input']>;
  withOpenActions?: InputMaybe<Array<OpenActionFilter>>;
};

export type Query = {
  __typename?: 'Query';
  approvedAuthentications: PaginatedApprovedAuthenticationResult;
  /** note here if your using a wallet JWT token it will get the allowance of the public proxy contract if its supported if not throw as profiles act not wallets */
  approvedModuleAllowanceAmount: Array<ApprovedAllowanceAmountResult>;
  canClaim: Array<CanClaimResult>;
  challenge: AuthChallengeResult;
  claimTokens: LensProfileManagerRelayResult;
  claimableProfiles: ClaimableProfilesResult;
  claimableStatus: ClaimProfileStatusType;
  claimableTokens: ClaimableTokensResult;
  createFrameTypedData: CreateFrameEip712TypedData;
  /** Get all enabled currencies */
  currencies: PaginatedCurrenciesResult;
  currentSession: ApprovedAuthentication;
  /** Get the default profile for a given EvmAddress. If no default is explicitly set, you will get the oldest profile owned by the address. */
  defaultProfile?: Maybe<Profile>;
  didReactOnPublication: Array<DidReactOnPublicationResult>;
  exploreProfiles: PaginatedProfileResult;
  explorePublications: PaginatedExplorePublicationResult;
  feed: PaginatedFeedResult;
  feedHighlights: PaginatedFeedHighlightsResult;
  followRevenues: FollowRevenueResult;
  followStatusBulk: Array<FollowStatusBulkResult>;
  followers: PaginatedProfileResult;
  following: PaginatedProfileResult;
  generateLensAPIRelayAddress: Scalars['EvmAddress']['output'];
  /** note here if your using a wallet JWT token it will approve to the public proxy contract if its supported if not throw as profiles act not wallets */
  generateModuleCurrencyApprovalData: GenerateModuleCurrencyApprovalResult;
  handleToAddress?: Maybe<Scalars['EvmAddress']['output']>;
  internalAllowedDomains: Array<Scalars['URI']['output']>;
  internalBoostScore?: Maybe<Scalars['Int']['output']>;
  internalClaimStatus?: Maybe<Scalars['Void']['output']>;
  internalCuratedHandles: Array<Scalars['String']['output']>;
  internalCuratedTags: Array<Scalars['String']['output']>;
  internalInvites: Scalars['Int']['output'];
  internalPaymentHandleInfo?: Maybe<IphResult>;
  internalProfileStatus: PrfResult;
  invitedProfiles: Array<InvitedResult>;
  lastLoggedInProfile?: Maybe<Profile>;
  latestPaidActions: LatestPaidActionsResult;
  lensAPIOwnedEOAs: Array<Scalars['EvmAddress']['output']>;
  lensProtocolVersion: Scalars['String']['output'];
  lensTransactionStatus?: Maybe<LensTransactionResult>;
  modDisputedReports: PaginatedDisputedReports;
  modExplorePublications: PaginatedModExplorePublicationResult;
  modFollowers: PaginatedModFollowersResult;
  modLatestReports: PaginatedModReports;
  moduleMetadata?: Maybe<GetModuleMetadataResult>;
  momokaSubmitters: MomokaSubmittersResult;
  momokaSummary: MomokaSummaryResult;
  momokaTransaction?: Maybe<MomokaTransaction>;
  momokaTransactions: MomokaTransactionsResult;
  /** Returns a paged list of profiles that are followed by both the observer and the viewing profile */
  mutualFollowers: PaginatedProfileResult;
  /** Get the NFT collections that the given two profiles own at least one NFT of. */
  mutualNftCollections: PaginatedNftCollectionsResult;
  mutualPoaps: PaginatedPoapEventResult;
  /** Get the Lens Profiles that own NFTs from a given collection. */
  nftCollectionOwners: PaginatedProfileResult;
  /** Get the NFT collections that the given wallet or profileId owns at least one NFT of. Only supports Ethereum and Polygon NFTs. Note excludeFollowers is set to true by default, so the result will not include Lens Follower NFTsunless explicitly requested. */
  nftCollections: PaginatedNftCollectionsResult;
  nftGalleries: PaginatedNftGalleriesResult;
  nfts: PaginatedNftsResult;
  notifications: PaginatedNotificationResult;
  ownedHandles: PaginatedHandlesResult;
  ping: Scalars['String']['output'];
  poapEvent?: Maybe<PoapEvent>;
  poapHolders: PaginatedProfileResult;
  poaps: PaginatedPoapTokenResult;
  /** Get the most popular NFT collections. Popularity is based on how many Lens Profiles own NFTs from a given collection. */
  popularNftCollections: PaginatedPopularNftCollectionsResult;
  profile?: Maybe<Profile>;
  profileActionHistory: PaginatedProfileActionHistoryResult;
  profileAlreadyInvited: Scalars['Boolean']['output'];
  profileInterestsOptions: Array<Scalars['String']['output']>;
  profileManagers: PaginatedProfileManagersResult;
  profileRecommendations: PaginatedProfileResult;
  profiles: PaginatedProfileResult;
  profilesManaged: PaginatedProfileResult;
  publication?: Maybe<AnyPublication>;
  publicationBookmarks: PaginatedPublicationsResult;
  publications: PaginatedPublicationsResult;
  publicationsTags: PaginatedPublicationsTagsResult;
  relayQueues: Array<RelayQueueResult>;
  revenueFromPublication?: Maybe<PublicationRevenue>;
  revenueFromPublications: PaginatedRevenueFromPublicationsResult;
  searchProfiles: PaginatedProfileResult;
  searchPublications: PaginatedPublicationPrimaryResult;
  supportedFollowModules: PaginatedSupportedModules;
  supportedOpenActionCollectModules: PaginatedSupportedModules;
  supportedOpenActionModules: PaginatedSupportedModules;
  supportedReferenceModules: PaginatedSupportedModules;
  txIdToTxHash?: Maybe<Scalars['TxHash']['output']>;
  userRateLimit: UserCurrentRateLimitResult;
  userSigNonces: UserSigNonces;
  validatePublicationMetadata: PublicationValidateMetadataResult;
  verify: Scalars['Boolean']['output'];
  verifyFrameSignature: FrameVerifySignatureResult;
  whoActedOnPublication: PaginatedProfileResult;
  /** The list of profiles that the logged in profile has blocked */
  whoHaveBlocked: PaginatedProfileResult;
  whoReactedPublication: PaginatedWhoReactedResult;
};


export type QueryApprovedAuthenticationsArgs = {
  request: ApprovedAuthenticationRequest;
};


export type QueryApprovedModuleAllowanceAmountArgs = {
  request: ApprovedModuleAllowanceAmountRequest;
};


export type QueryCanClaimArgs = {
  request: CanClaimRequest;
};


export type QueryChallengeArgs = {
  request: ChallengeRequest;
};


export type QueryClaimTokensArgs = {
  request: ClaimTokensRequest;
};


export type QueryCreateFrameTypedDataArgs = {
  request: FrameEip712Request;
};


export type QueryCurrenciesArgs = {
  request: PaginatedOffsetRequest;
};


export type QueryDefaultProfileArgs = {
  request: DefaultProfileRequest;
};


export type QueryDidReactOnPublicationArgs = {
  request: DidReactOnPublicationRequest;
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


export type QueryFollowRevenuesArgs = {
  request: FollowRevenueRequest;
};


export type QueryFollowStatusBulkArgs = {
  request: FollowStatusBulkRequest;
};


export type QueryFollowersArgs = {
  request: FollowersRequest;
};


export type QueryFollowingArgs = {
  request: FollowingRequest;
};


export type QueryGenerateModuleCurrencyApprovalDataArgs = {
  request: GenerateModuleCurrencyApprovalDataRequest;
};


export type QueryHandleToAddressArgs = {
  request: HandleToAddressRequest;
};


export type QueryInternalAllowedDomainsArgs = {
  request: InternalAllowedDomainsRequest;
};


export type QueryInternalBoostScoreArgs = {
  request: InternalBoostScoreRequest;
};


export type QueryInternalClaimStatusArgs = {
  request: InternalClaimStatusRequest;
};


export type QueryInternalCuratedHandlesArgs = {
  request: InternalCuratedHandlesRequest;
};


export type QueryInternalCuratedTagsArgs = {
  request: InternalCuratedTagsRequest;
};


export type QueryInternalInvitesArgs = {
  request: InternalInvitesRequest;
};


export type QueryInternalPaymentHandleInfoArgs = {
  request: InternalPaymentHandleInfoRequest;
};


export type QueryInternalProfileStatusArgs = {
  request: InternalProfileStatusRequest;
};


export type QueryLastLoggedInProfileArgs = {
  request: LastLoggedInProfileRequest;
};


export type QueryLatestPaidActionsArgs = {
  filter?: InputMaybe<LatestPaidActionsFilter>;
  request?: InputMaybe<PaginatedRequest>;
  where?: InputMaybe<LatestPaidActionsWhere>;
};


export type QueryLensTransactionStatusArgs = {
  request: LensTransactionStatusRequest;
};


export type QueryModDisputedReportsArgs = {
  request: PaginatedRequest;
};


export type QueryModExplorePublicationsArgs = {
  request: ModExplorePublicationRequest;
};


export type QueryModFollowersArgs = {
  request: PaginatedRequest;
};


export type QueryModLatestReportsArgs = {
  request: ModReportsRequest;
};


export type QueryModuleMetadataArgs = {
  request: ModuleMetadataRequest;
};


export type QueryMomokaTransactionArgs = {
  request: MomokaTransactionRequest;
};


export type QueryMomokaTransactionsArgs = {
  request: MomokaTransactionsRequest;
};


export type QueryMutualFollowersArgs = {
  request: MutualFollowersRequest;
};


export type QueryMutualNftCollectionsArgs = {
  request: MutualNftCollectionsRequest;
};


export type QueryMutualPoapsArgs = {
  request: MutualPoapsQueryRequest;
};


export type QueryNftCollectionOwnersArgs = {
  request: NftCollectionOwnersRequest;
};


export type QueryNftCollectionsArgs = {
  request: NftCollectionsRequest;
};


export type QueryNftGalleriesArgs = {
  request: NftGalleriesRequest;
};


export type QueryNftsArgs = {
  request: NftsRequest;
};


export type QueryNotificationsArgs = {
  request?: InputMaybe<NotificationRequest>;
};


export type QueryOwnedHandlesArgs = {
  request: OwnedHandlesRequest;
};


export type QueryPoapEventArgs = {
  request: PoapEventQueryRequest;
};


export type QueryPoapHoldersArgs = {
  request: PoapHoldersQueryRequest;
};


export type QueryPoapsArgs = {
  request: UserPoapsQueryRequest;
};


export type QueryPopularNftCollectionsArgs = {
  request: PopularNftCollectionsRequest;
};


export type QueryProfileArgs = {
  request: ProfileRequest;
};


export type QueryProfileActionHistoryArgs = {
  request: ProfileActionHistoryRequest;
};


export type QueryProfileAlreadyInvitedArgs = {
  request: AlreadyInvitedCheckRequest;
};


export type QueryProfileManagersArgs = {
  request: ProfileManagersRequest;
};


export type QueryProfileRecommendationsArgs = {
  request: ProfileRecommendationsRequest;
};


export type QueryProfilesArgs = {
  request: ProfilesRequest;
};


export type QueryProfilesManagedArgs = {
  request: ProfilesManagedRequest;
};


export type QueryPublicationArgs = {
  request: PublicationRequest;
};


export type QueryPublicationBookmarksArgs = {
  request?: InputMaybe<PublicationBookmarksRequest>;
};


export type QueryPublicationsArgs = {
  request: PublicationsRequest;
};


export type QueryPublicationsTagsArgs = {
  request?: InputMaybe<PublicationsTagsRequest>;
};


export type QueryRevenueFromPublicationArgs = {
  request: RevenueFromPublicationRequest;
};


export type QueryRevenueFromPublicationsArgs = {
  request: RevenueFromPublicationsRequest;
};


export type QuerySearchProfilesArgs = {
  request: ProfileSearchRequest;
};


export type QuerySearchPublicationsArgs = {
  request: PublicationSearchRequest;
};


export type QuerySupportedFollowModulesArgs = {
  request: SupportedModulesRequest;
};


export type QuerySupportedOpenActionCollectModulesArgs = {
  request: SupportedModulesRequest;
};


export type QuerySupportedOpenActionModulesArgs = {
  request: SupportedModulesRequest;
};


export type QuerySupportedReferenceModulesArgs = {
  request: SupportedModulesRequest;
};


export type QueryTxIdToTxHashArgs = {
  for: Scalars['TxId']['input'];
};


export type QueryUserRateLimitArgs = {
  request: UserCurrentRateLimitRequest;
};


export type QueryValidatePublicationMetadataArgs = {
  request: ValidatePublicationMetadataRequest;
};


export type QueryVerifyArgs = {
  request: VerifyRequest;
};


export type QueryVerifyFrameSignatureArgs = {
  request: FrameVerifySignature;
};


export type QueryWhoActedOnPublicationArgs = {
  request: WhoActedOnPublicationRequest;
};


export type QueryWhoHaveBlockedArgs = {
  request: WhoHaveBlockedRequest;
};


export type QueryWhoReactedPublicationArgs = {
  request: WhoReactedPublicationRequest;
};

export type Quote = {
  __typename?: 'Quote';
  by: Profile;
  createdAt: Scalars['DateTime']['output'];
  hashtagsMentioned: Array<Scalars['String']['output']>;
  id: Scalars['PublicationId']['output'];
  isEncrypted: Scalars['Boolean']['output'];
  isHidden: Scalars['Boolean']['output'];
  metadata: PublicationMetadata;
  momoka?: Maybe<MomokaInfo>;
  openActionModules: Array<OpenActionModule>;
  operations: PublicationOperations;
  profilesMentioned: Array<ProfileMentioned>;
  publishedOn?: Maybe<App>;
  quoteOn: PrimaryPublication;
  referenceModule?: Maybe<ReferenceModule>;
  stats: PublicationStats;
  txHash?: Maybe<Scalars['TxHash']['output']>;
};


export type QuoteStatsArgs = {
  request?: InputMaybe<PublicationStatsInput>;
};

export type QuoteNotification = {
  __typename?: 'QuoteNotification';
  id: Scalars['UUID']['output'];
  quote: Quote;
};

export type RateRequest = {
  for: SupportedFiatType;
};

export type ReactedResult = {
  __typename?: 'ReactedResult';
  reactedAt: Scalars['DateTime']['output'];
  reaction: PublicationReactionType;
};

export type ReactionEvent = {
  __typename?: 'ReactionEvent';
  by: Profile;
  createdAt: Scalars['DateTime']['output'];
  reaction: PublicationReactionType;
};

export type ReactionNotification = {
  __typename?: 'ReactionNotification';
  id: Scalars['UUID']['output'];
  publication: PrimaryPublication;
  reactions: Array<ProfileReactedResult>;
};

export type ReactionRequest = {
  /** The ID of the app that the reaction was made from. */
  app?: InputMaybe<Scalars['AppId']['input']>;
  for: Scalars['PublicationId']['input'];
  reaction: PublicationReactionType;
};

export type RecipientDataInput = {
  /** Recipient of collect fees. */
  recipient: Scalars['EvmAddress']['input'];
  /** Split %, should be between 0.01 and 100. Up to 2 decimal points supported. All % should add up to 100 */
  split: Scalars['Float']['input'];
};

export type RecipientDataOutput = {
  __typename?: 'RecipientDataOutput';
  /** Recipient of collect fees. */
  recipient: Scalars['EvmAddress']['output'];
  /** Split %, should be between 0.01 and 100. Up to 2 decimal points supported. All % should add up to 100 */
  split: Scalars['Float']['output'];
};

export type ReferenceModule = DegreesOfSeparationReferenceModuleSettings | FollowOnlyReferenceModuleSettings | LegacyDegreesOfSeparationReferenceModuleSettings | LegacyFollowOnlyReferenceModuleSettings | UnknownReferenceModuleSettings;

export type ReferenceModuleInput = {
  degreesOfSeparationReferenceModule?: InputMaybe<DegreesOfSeparationReferenceModuleInput>;
  followerOnlyReferenceModule?: InputMaybe<Scalars['Boolean']['input']>;
  unknownReferenceModule?: InputMaybe<UnknownReferenceModuleInput>;
};

export enum ReferenceModuleType {
  DegreesOfSeparationReferenceModule = 'DegreesOfSeparationReferenceModule',
  FollowerOnlyReferenceModule = 'FollowerOnlyReferenceModule',
  LegacyDegreesOfSeparationReferenceModule = 'LegacyDegreesOfSeparationReferenceModule',
  LegacyFollowerOnlyReferenceModule = 'LegacyFollowerOnlyReferenceModule',
  UnknownReferenceModule = 'UnknownReferenceModule'
}

export type RefreshPublicationMetadataRequest = {
  for: Scalars['PublicationId']['input'];
};

export type RefreshPublicationMetadataResult = {
  __typename?: 'RefreshPublicationMetadataResult';
  result: RefreshPublicationMetadataResultType;
};

export enum RefreshPublicationMetadataResultType {
  AlreadyPending = 'ALREADY_PENDING',
  Queued = 'QUEUED',
  ValidPublicationNotFound = 'VALID_PUBLICATION_NOT_FOUND'
}

/** The refresh request */
export type RefreshRequest = {
  /** The refresh token */
  refreshToken: Scalars['Jwt']['input'];
};

export type RelayError = {
  __typename?: 'RelayError';
  reason: RelayErrorReasonType;
};

export enum RelayErrorReasonType {
  AppNotAllowed = 'APP_NOT_ALLOWED',
  Expired = 'EXPIRED',
  Failed = 'FAILED',
  NotSponsored = 'NOT_SPONSORED',
  RateLimited = 'RATE_LIMITED',
  WrongWalletSigned = 'WRONG_WALLET_SIGNED'
}

export type RelayMomokaResult = CreateMomokaPublicationResult | LensProfileManagerRelayError;

export type RelayQueueResult = {
  __typename?: 'RelayQueueResult';
  key: RelayRoleKey;
  queue: Scalars['Int']['output'];
  relay: NetworkAddress;
};

export type RelayResult = RelayError | RelaySuccess;

export enum RelayRoleKey {
  CreateProfile = 'CREATE_PROFILE',
  CreateProfileWithHandleUsingCredits_1 = 'CREATE_PROFILE_WITH_HANDLE_USING_CREDITS_1',
  CreateProfileWithHandleUsingCredits_2 = 'CREATE_PROFILE_WITH_HANDLE_USING_CREDITS_2',
  CreateProfileWithHandleUsingCredits_3 = 'CREATE_PROFILE_WITH_HANDLE_USING_CREDITS_3',
  CreateProfileWithHandleUsingCredits_4 = 'CREATE_PROFILE_WITH_HANDLE_USING_CREDITS_4',
  CreateProfileWithHandleUsingCredits_5 = 'CREATE_PROFILE_WITH_HANDLE_USING_CREDITS_5',
  CreateProfileWithHandleUsingCredits_6 = 'CREATE_PROFILE_WITH_HANDLE_USING_CREDITS_6',
  CreateProfileWithHandleUsingCredits_7 = 'CREATE_PROFILE_WITH_HANDLE_USING_CREDITS_7',
  CreateProfileWithHandleUsingCredits_8 = 'CREATE_PROFILE_WITH_HANDLE_USING_CREDITS_8',
  CreateProfileWithHandleUsingCredits_9 = 'CREATE_PROFILE_WITH_HANDLE_USING_CREDITS_9',
  CreateProfileWithHandleUsingCredits_10 = 'CREATE_PROFILE_WITH_HANDLE_USING_CREDITS_10',
  CreateProfileWithHandleUsingCreditsUnderCharLimit = 'CREATE_PROFILE_WITH_HANDLE_USING_CREDITS_UNDER_CHAR_LIMIT',
  LensManager_1 = 'LENS_MANAGER_1',
  LensManager_2 = 'LENS_MANAGER_2',
  LensManager_3 = 'LENS_MANAGER_3',
  LensManager_4 = 'LENS_MANAGER_4',
  LensManager_5 = 'LENS_MANAGER_5',
  LensManager_6 = 'LENS_MANAGER_6',
  LensManager_7 = 'LENS_MANAGER_7',
  LensManager_8 = 'LENS_MANAGER_8',
  LensManager_9 = 'LENS_MANAGER_9',
  LensManager_10 = 'LENS_MANAGER_10',
  LensManager_11 = 'LENS_MANAGER_11',
  LensManager_12 = 'LENS_MANAGER_12',
  LensManager_13 = 'LENS_MANAGER_13',
  LensManager_14 = 'LENS_MANAGER_14',
  LensManager_15 = 'LENS_MANAGER_15',
  LensManager_16 = 'LENS_MANAGER_16',
  LensManager_17 = 'LENS_MANAGER_17',
  LensManager_18 = 'LENS_MANAGER_18',
  LensManager_19 = 'LENS_MANAGER_19',
  LensManager_20 = 'LENS_MANAGER_20',
  LensManager_21 = 'LENS_MANAGER_21',
  LensManager_22 = 'LENS_MANAGER_22',
  LensManager_23 = 'LENS_MANAGER_23',
  LensManager_24 = 'LENS_MANAGER_24',
  LensManager_25 = 'LENS_MANAGER_25',
  LensManager_26 = 'LENS_MANAGER_26',
  LensManager_27 = 'LENS_MANAGER_27',
  LensManager_28 = 'LENS_MANAGER_28',
  LensManager_29 = 'LENS_MANAGER_29',
  LensManager_30 = 'LENS_MANAGER_30',
  WithSig_1 = 'WITH_SIG_1',
  WithSig_2 = 'WITH_SIG_2',
  WithSig_3 = 'WITH_SIG_3',
  WithSig_4 = 'WITH_SIG_4',
  WithSig_5 = 'WITH_SIG_5',
  WithSig_6 = 'WITH_SIG_6',
  WithSig_7 = 'WITH_SIG_7',
  WithSig_8 = 'WITH_SIG_8',
  WithSig_9 = 'WITH_SIG_9',
  WithSig_10 = 'WITH_SIG_10',
  WithSig_11 = 'WITH_SIG_11',
  WithSig_12 = 'WITH_SIG_12',
  WithSig_13 = 'WITH_SIG_13',
  WithSig_14 = 'WITH_SIG_14',
  WithSig_15 = 'WITH_SIG_15',
  WithSig_16 = 'WITH_SIG_16',
  WithSig_17 = 'WITH_SIG_17',
  WithSig_18 = 'WITH_SIG_18',
  WithSig_19 = 'WITH_SIG_19',
  WithSig_20 = 'WITH_SIG_20'
}

export type RelaySuccess = {
  __typename?: 'RelaySuccess';
  txHash?: Maybe<Scalars['TxHash']['output']>;
  txId: Scalars['TxId']['output'];
};

export type ReportProfileRequest = {
  additionalComments?: InputMaybe<Scalars['String']['input']>;
  for: Scalars['ProfileId']['input'];
  reason: ProfileReportingReasonInput;
};

export type ReportPublicationRequest = {
  additionalComments?: InputMaybe<Scalars['String']['input']>;
  for: Scalars['PublicationId']['input'];
  reason: ReportingReasonInput;
};

export type ReportingReasonInput = {
  fraudReason?: InputMaybe<FraudReasonInput>;
  illegalReason?: InputMaybe<IllegalReasonInput>;
  sensitiveReason?: InputMaybe<SensitiveReasonInput>;
  spamReason?: InputMaybe<SpamReasonInput>;
};

export type ReservedClaimable = {
  __typename?: 'ReservedClaimable';
  expiry: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  source: Scalars['AppId']['output'];
  /** The full handle - namespace/localname */
  withHandle: Scalars['Handle']['output'];
};

export type RevenueAggregate = {
  __typename?: 'RevenueAggregate';
  total: Amount;
};

export type RevenueFromPublicationRequest = {
  for: Scalars['PublicationId']['input'];
  /** Will return revenue for publications made on any of the provided app ids. Will include all apps if omitted */
  publishedOn?: InputMaybe<Array<Scalars['AppId']['input']>>;
};

export type RevenueFromPublicationsRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  /** The profile to get revenue for */
  for: Scalars['ProfileId']['input'];
  limit?: InputMaybe<LimitType>;
  /** Will return revenue for publications made on any of the provided app ids. Will include all apps if omitted */
  publishedOn?: InputMaybe<Array<Scalars['AppId']['input']>>;
};

export type RevertFollowModuleSettings = {
  __typename?: 'RevertFollowModuleSettings';
  contract: NetworkAddress;
  type: FollowModuleType;
};

export type RevokeAuthenticationRequest = {
  /** The token authorization id wish to revoke */
  authorizationId: Scalars['UUID']['input'];
};

export type RootCondition = {
  __typename?: 'RootCondition';
  criteria: Array<SecondTierCondition>;
};

export enum SearchPublicationType {
  Comment = 'COMMENT',
  Post = 'POST',
  Quote = 'QUOTE'
}

export type SecondTierCondition = AdvancedContractCondition | AndCondition | CollectCondition | EoaOwnershipCondition | Erc20OwnershipCondition | FollowCondition | NftOwnershipCondition | OrCondition | ProfileOwnershipCondition;

export type SensitiveReasonInput = {
  reason: PublicationReportingReason;
  subreason: PublicationReportingSensitiveSubreason;
};

export type SetDefaultProfileRequest = {
  profileId: Scalars['ProfileId']['input'];
};

export type SetFollowModuleRequest = {
  followModule: FollowModuleInput;
};

/** The signed auth challenge */
export type SignedAuthChallenge = {
  id: Scalars['ChallengeId']['input'];
  /** The signature */
  signature: Scalars['Signature']['input'];
};

export type SimpleCollectOpenActionModuleInput = {
  amount?: InputMaybe<AmountInput>;
  collectLimit?: InputMaybe<Scalars['String']['input']>;
  endsAt?: InputMaybe<Scalars['DateTime']['input']>;
  followerOnly: Scalars['Boolean']['input'];
  recipient?: InputMaybe<Scalars['EvmAddress']['input']>;
  referralFee?: InputMaybe<Scalars['Float']['input']>;
};

export type SimpleCollectOpenActionSettings = {
  __typename?: 'SimpleCollectOpenActionSettings';
  /** The collect module amount info. `Amount.value = 0` in case of free collects. */
  amount: Amount;
  /** The maximum number of collects for this publication. */
  collectLimit?: Maybe<Scalars['String']['output']>;
  /** The collect nft address - only deployed on first collect */
  collectNft?: Maybe<Scalars['EvmAddress']['output']>;
  contract: NetworkAddress;
  /** The end timestamp after which collecting is impossible. */
  endsAt?: Maybe<Scalars['DateTime']['output']>;
  /** True if only followers of publisher may collect the post. */
  followerOnly: Scalars['Boolean']['output'];
  /** The collect module recipient address */
  recipient: Scalars['EvmAddress']['output'];
  /** The collect module referral fee */
  referralFee: Scalars['Float']['output'];
  type: OpenActionModuleType;
};

export type SpaceMetadataV3 = {
  __typename?: 'SpaceMetadataV3';
  appId?: Maybe<Scalars['AppId']['output']>;
  attachments?: Maybe<Array<PublicationMetadataMedia>>;
  attributes?: Maybe<Array<MetadataAttribute>>;
  /** Optional content. Empty if not set. */
  content: Scalars['EncryptableMarkdown']['output'];
  contentWarning?: Maybe<PublicationContentWarningType>;
  encryptedWith?: Maybe<PublicationMetadataEncryptionStrategy>;
  hideFromFeed: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  link: Scalars['EncryptableURI']['output'];
  locale: Scalars['Locale']['output'];
  marketplace?: Maybe<MarketplaceMetadata>;
  rawURI: Scalars['URI']['output'];
  startsAt: Scalars['EncryptableDateTime']['output'];
  tags?: Maybe<Array<Scalars['String']['output']>>;
  title: Scalars['String']['output'];
};

export type SpamReasonInput = {
  reason: PublicationReportingReason;
  subreason: PublicationReportingSpamSubreason;
};

export type StoryMetadataV3 = {
  __typename?: 'StoryMetadataV3';
  appId?: Maybe<Scalars['AppId']['output']>;
  asset: PublicationMetadataMedia;
  attributes?: Maybe<Array<MetadataAttribute>>;
  /** Optional content. Empty if not set. */
  content: Scalars['EncryptableMarkdown']['output'];
  contentWarning?: Maybe<PublicationContentWarningType>;
  encryptedWith?: Maybe<PublicationMetadataEncryptionStrategy>;
  hideFromFeed: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  locale: Scalars['Locale']['output'];
  marketplace?: Maybe<MarketplaceMetadata>;
  rawURI: Scalars['URI']['output'];
  tags?: Maybe<Array<Scalars['String']['output']>>;
};

export type Subscription = {
  __typename?: 'Subscription';
  authorizationRecordRevoked?: Maybe<Scalars['Void']['output']>;
  newMomokaTransaction: MomokaTransaction;
  newNotification?: Maybe<Notification>;
  newPublicationStats: PublicationStats;
  userSigNonces: UserSigNonces;
};


export type SubscriptionAuthorizationRecordRevokedArgs = {
  authorizationId: Scalars['UUID']['input'];
};


export type SubscriptionNewNotificationArgs = {
  for: Scalars['ProfileId']['input'];
};


export type SubscriptionNewPublicationStatsArgs = {
  for: Scalars['PublicationId']['input'];
};


export type SubscriptionUserSigNoncesArgs = {
  address: Scalars['EvmAddress']['input'];
};

export type SuggestedFormattedHandle = {
  __typename?: 'SuggestedFormattedHandle';
  /** The full formatted handle - namespace/@localname */
  full: Scalars['String']['output'];
  /** The formatted handle - @localname */
  localName: Scalars['String']['output'];
};

export enum SupportedFiatType {
  Eur = 'EUR',
  Gbp = 'GBP',
  Usd = 'USD'
}

export type SupportedModule = KnownSupportedModule | UnknownSupportedModule;

export type SupportedModulesRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  includeUnknown?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<LimitType>;
  onlyVerified?: InputMaybe<Scalars['Boolean']['input']>;
};

export type SybilDotOrgIdentity = {
  __typename?: 'SybilDotOrgIdentity';
  source?: Maybe<SybilDotOrgIdentitySource>;
  /** The sybil dot org status */
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
  tag: Scalars['String']['output'];
  total: Scalars['Int']['output'];
};

export enum TagSortCriteriaType {
  Alphabetical = 'ALPHABETICAL',
  MostPopular = 'MOST_POPULAR'
}

export type TextOnlyMetadataV3 = {
  __typename?: 'TextOnlyMetadataV3';
  appId?: Maybe<Scalars['AppId']['output']>;
  attributes?: Maybe<Array<MetadataAttribute>>;
  content: Scalars['EncryptableMarkdown']['output'];
  contentWarning?: Maybe<PublicationContentWarningType>;
  encryptedWith?: Maybe<PublicationMetadataEncryptionStrategy>;
  hideFromFeed: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  locale: Scalars['Locale']['output'];
  marketplace?: Maybe<MarketplaceMetadata>;
  rawURI: Scalars['URI']['output'];
  tags?: Maybe<Array<Scalars['String']['output']>>;
};

export type ThirdTierCondition = AdvancedContractCondition | CollectCondition | EoaOwnershipCondition | Erc20OwnershipCondition | FollowCondition | NftOwnershipCondition | ProfileOwnershipCondition;

export type ThreeDMetadataV3 = {
  __typename?: 'ThreeDMetadataV3';
  appId?: Maybe<Scalars['AppId']['output']>;
  assets: Array<ThreeDMetadataV3Asset>;
  attachments?: Maybe<Array<PublicationMetadataMedia>>;
  attributes?: Maybe<Array<MetadataAttribute>>;
  /** Optional content. Empty if not set. */
  content: Scalars['EncryptableMarkdown']['output'];
  contentWarning?: Maybe<PublicationContentWarningType>;
  encryptedWith?: Maybe<PublicationMetadataEncryptionStrategy>;
  hideFromFeed: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  locale: Scalars['Locale']['output'];
  marketplace?: Maybe<MarketplaceMetadata>;
  rawURI: Scalars['URI']['output'];
  tags?: Maybe<Array<Scalars['String']['output']>>;
};

export type ThreeDMetadataV3Asset = {
  __typename?: 'ThreeDMetadataV3Asset';
  format: Scalars['String']['output'];
  license?: Maybe<PublicationMetadataLicenseType>;
  playerURL: Scalars['EncryptableURI']['output'];
  uri: Scalars['EncryptableURI']['output'];
  zipPath?: Maybe<Scalars['String']['output']>;
};

export type TransactionMetadataV3 = {
  __typename?: 'TransactionMetadataV3';
  appId?: Maybe<Scalars['AppId']['output']>;
  attachments?: Maybe<Array<PublicationMetadataMedia>>;
  attributes?: Maybe<Array<MetadataAttribute>>;
  chainId: Scalars['ChainId']['output'];
  /** Optional content. Empty if not set. */
  content: Scalars['EncryptableMarkdown']['output'];
  contentWarning?: Maybe<PublicationContentWarningType>;
  encryptedWith?: Maybe<PublicationMetadataEncryptionStrategy>;
  hideFromFeed: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  locale: Scalars['Locale']['output'];
  marketplace?: Maybe<MarketplaceMetadata>;
  rawURI: Scalars['URI']['output'];
  tags?: Maybe<Array<Scalars['String']['output']>>;
  txHash: Scalars['EncryptableTxHash']['output'];
  type: PublicationMetadataTransactionType;
};

export enum TriStateValue {
  No = 'NO',
  Unknown = 'UNKNOWN',
  Yes = 'YES'
}

export type TypedDataOptions = {
  /** If you wish to override the nonce for the sig if you want to do some clever stuff in the client */
  overrideSigNonce: Scalars['Nonce']['input'];
};

export type UnblockRequest = {
  profiles: Array<Scalars['ProfileId']['input']>;
};

export type UnfollowRequest = {
  unfollow: Array<Scalars['ProfileId']['input']>;
};

export type UnhideCommentRequest = {
  /** The comment to unhide. It has to be under a publication made by the user making the request. If already visible, nothing will happen. */
  for: Scalars['PublicationId']['input'];
};

export type UnhideManagedProfileRequest = {
  /** The profile to unhide */
  profileId: Scalars['ProfileId']['input'];
};

export type UnknownFollowModuleInput = {
  address: Scalars['EvmAddress']['input'];
  data: Scalars['BlockchainData']['input'];
};

export type UnknownFollowModuleRedeemInput = {
  address: Scalars['EvmAddress']['input'];
  data: Scalars['BlockchainData']['input'];
};

export type UnknownFollowModuleSettings = {
  __typename?: 'UnknownFollowModuleSettings';
  contract: NetworkAddress;
  /**
   * The data used to setup the module which you can decode with your known ABI
   * @deprecated Use initializeResultData instead
   */
  followModuleReturnData?: Maybe<Scalars['BlockchainData']['output']>;
  /** The data used to setup the module */
  initializeCalldata?: Maybe<Scalars['BlockchainData']['output']>;
  /** The data returned from the init module */
  initializeResultData?: Maybe<Scalars['BlockchainData']['output']>;
  /** True if the module can be signedless and use lens manager without a signature */
  signlessApproved: Scalars['Boolean']['output'];
  /** True if the module can be sponsored through gasless so the user does not need to pay for gas */
  sponsoredApproved: Scalars['Boolean']['output'];
  type: FollowModuleType;
  /** True if the module is deemed as safe */
  verified: Scalars['Boolean']['output'];
};

export type UnknownOpenActionActRedeemInput = {
  address: Scalars['EvmAddress']['input'];
  data: Scalars['BlockchainData']['input'];
};

export type UnknownOpenActionModuleInput = {
  address: Scalars['EvmAddress']['input'];
  data: Scalars['BlockchainData']['input'];
};

export type UnknownOpenActionModuleSettings = {
  __typename?: 'UnknownOpenActionModuleSettings';
  /** The collect nft address - only deployed on first collect and if its a collectable open action */
  collectNft?: Maybe<Scalars['EvmAddress']['output']>;
  contract: NetworkAddress;
  /** The data used to setup the module */
  initializeCalldata?: Maybe<Scalars['BlockchainData']['output']>;
  /** The data returned from the init module */
  initializeResultData?: Maybe<Scalars['BlockchainData']['output']>;
  /**
   * The data returned from the init module
   * @deprecated Use initializeResultData instead
   */
  openActionModuleReturnData?: Maybe<Scalars['BlockchainData']['output']>;
  /** True if the module can be signedless and use lens manager without a signature */
  signlessApproved: Scalars['Boolean']['output'];
  /** True if the module can be sponsored through gasless so the user does not need to pay for gas */
  sponsoredApproved: Scalars['Boolean']['output'];
  type: OpenActionModuleType;
  /** True if the module is deemed as safe */
  verified: Scalars['Boolean']['output'];
};

export type UnknownOpenActionResult = {
  __typename?: 'UnknownOpenActionResult';
  address: Scalars['EvmAddress']['output'];
  category?: Maybe<OpenActionCategoryType>;
  initReturnData?: Maybe<Scalars['BlockchainData']['output']>;
};

export type UnknownReferenceModuleInput = {
  address: Scalars['EvmAddress']['input'];
  data: Scalars['BlockchainData']['input'];
};

export type UnknownReferenceModuleSettings = {
  __typename?: 'UnknownReferenceModuleSettings';
  contract: NetworkAddress;
  /** The data used to setup the module */
  initializeCalldata?: Maybe<Scalars['BlockchainData']['output']>;
  /** The data returned from the init module */
  initializeResultData?: Maybe<Scalars['BlockchainData']['output']>;
  /**
   * The data used to setup the module which you can decode with your known ABI
   * @deprecated Use initializeResultData instead
   */
  referenceModuleReturnData?: Maybe<Scalars['BlockchainData']['output']>;
  /** True if the module can be signedless and use lens manager without a signature */
  signlessApproved: Scalars['Boolean']['output'];
  /** True if the module can be sponsored through gasless so the user does not need to pay for gas */
  sponsoredApproved: Scalars['Boolean']['output'];
  type: ReferenceModuleType;
  /** True if the module is deemed as safe */
  verified: Scalars['Boolean']['output'];
};

export type UnknownSupportedModule = {
  __typename?: 'UnknownSupportedModule';
  contract: NetworkAddress;
  moduleName: Scalars['String']['output'];
};

export type UnlinkHandleFromProfileRequest = {
  /** The full handle - namespace/localname */
  handle: Scalars['Handle']['input'];
};

export type UserCurrentRateLimit = {
  __typename?: 'UserCurrentRateLimit';
  dayAllowance: Scalars['Int']['output'];
  dayAllowanceLeft: Scalars['Int']['output'];
  dayAllowanceUsed: Scalars['Int']['output'];
  hourAllowance: Scalars['Int']['output'];
  hourAllowanceLeft: Scalars['Int']['output'];
  hourAllowanceUsed: Scalars['Int']['output'];
};

export type UserCurrentRateLimitRequest = {
  profileId?: InputMaybe<Scalars['ProfileId']['input']>;
  userAddress: Scalars['EvmAddress']['input'];
};

export type UserCurrentRateLimitResult = {
  __typename?: 'UserCurrentRateLimitResult';
  momoka: UserCurrentRateLimit;
  onchain: UserCurrentRateLimit;
};

export type UserPoapsQueryRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  for: Scalars['ProfileId']['input'];
  limit?: InputMaybe<LimitType>;
};

export type UserSigNonces = {
  __typename?: 'UserSigNonces';
  lensHubOnchainSigNonce: Scalars['Nonce']['output'];
  lensPublicActProxyOnchainSigNonce: Scalars['Nonce']['output'];
  lensTokenHandleRegistryOnchainSigNonce: Scalars['Nonce']['output'];
};

export type ValidatePublicationMetadataRequest = {
  json?: InputMaybe<Scalars['String']['input']>;
  rawURI?: InputMaybe<Scalars['URI']['input']>;
};

export type VerifyRequest = {
  /** The access token to verify */
  accessToken?: InputMaybe<Scalars['Jwt']['input']>;
  /** The identity token to verify */
  identityToken?: InputMaybe<Scalars['Jwt']['input']>;
};

export type Video = {
  __typename?: 'Video';
  mimeType?: Maybe<Scalars['MimeType']['output']>;
  uri: Scalars['URI']['output'];
};

export type VideoMetadataV3 = {
  __typename?: 'VideoMetadataV3';
  appId?: Maybe<Scalars['AppId']['output']>;
  asset: PublicationMetadataMediaVideo;
  attachments?: Maybe<Array<PublicationMetadataMedia>>;
  attributes?: Maybe<Array<MetadataAttribute>>;
  /** Optional content. Empty if not set. */
  content: Scalars['EncryptableMarkdown']['output'];
  contentWarning?: Maybe<PublicationContentWarningType>;
  encryptedWith?: Maybe<PublicationMetadataEncryptionStrategy>;
  hideFromFeed: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  isShortVideo: Scalars['Boolean']['output'];
  locale: Scalars['Locale']['output'];
  marketplace?: Maybe<MarketplaceMetadata>;
  rawURI: Scalars['URI']['output'];
  tags?: Maybe<Array<Scalars['String']['output']>>;
  /** The title of the video. Empty if not set. */
  title: Scalars['String']['output'];
};

export type WalletAuthenticationToProfileAuthenticationRequest = {
  /** This can convert a wallet token to a profile token if you now onboarded */
  profileId: Scalars['ProfileId']['input'];
};

export type WhoActedOnPublicationRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<LimitType>;
  on: Scalars['PublicationId']['input'];
  /** The order by which to sort the profiles */
  orderBy?: InputMaybe<ProfilesOrderBy>;
  where?: InputMaybe<WhoActedOnPublicationWhere>;
};

export type WhoActedOnPublicationWhere = {
  anyOf: Array<OpenActionFilter>;
};

export type WhoHaveBlockedRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  limit?: InputMaybe<LimitType>;
};

export type WhoReactedPublicationRequest = {
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  for: Scalars['PublicationId']['input'];
  limit?: InputMaybe<LimitType>;
  /** The order by which to sort the profiles */
  orderBy?: InputMaybe<ProfilesOrderBy>;
  where?: InputMaybe<WhoReactedPublicationWhere>;
};

export type WhoReactedPublicationWhere = {
  anyOf?: InputMaybe<Array<PublicationReactionType>>;
};

export type WorldcoinIdentity = {
  __typename?: 'WorldcoinIdentity';
  /** If the profile has verified as a user */
  isHuman: Scalars['Boolean']['output'];
};

export enum WorldcoinPhoneVerifyType {
  Orb = 'ORB',
  Phone = 'PHONE'
}

export type WorldcoinPhoneVerifyWebhookRequest = {
  nullifierHash: Scalars['String']['input'];
  signal: Scalars['EvmAddress']['input'];
  signalType: WorldcoinPhoneVerifyType;
};

export type ChallengeQueryVariables = Exact<{
  request: ChallengeRequest;
}>;


export type ChallengeQuery = { __typename?: 'Query', challenge: { __typename?: 'AuthChallengeResult', text: string, id: any } };

export type CommentsPublicationQueryVariables = Exact<{
  request: PublicationsRequest;
}>;


export type CommentsPublicationQuery = { __typename?: 'Query', publications: { __typename?: 'PaginatedPublicationsResult', items: Array<{ __typename?: 'Comment', id: any, createdAt: any, by: { __typename?: 'Profile', id: any, handle?: { __typename?: 'HandleInfo', fullHandle: any } | null, metadata?: { __typename?: 'ProfileMetadata', displayName?: string | null, picture?: { __typename?: 'ImageSet', optimized?: { __typename?: 'Image', uri: any } | null } | { __typename?: 'NftImage' } | null } | null, ownedBy: { __typename?: 'NetworkAddress', address: any } }, stats: { __typename?: 'PublicationStats', comments: number, upvotes: number, downvotes: number }, metadata: { __typename?: 'ArticleMetadataV3' } | { __typename?: 'AudioMetadataV3' } | { __typename?: 'CheckingInMetadataV3' } | { __typename?: 'EmbedMetadataV3' } | { __typename?: 'EventMetadataV3' } | { __typename?: 'ImageMetadataV3', content: any, tags?: Array<string> | null } | { __typename?: 'LinkMetadataV3' } | { __typename?: 'LiveStreamMetadataV3' } | { __typename?: 'MintMetadataV3' } | { __typename?: 'SpaceMetadataV3' } | { __typename?: 'StoryMetadataV3' } | { __typename?: 'TextOnlyMetadataV3', content: any, tags?: Array<string> | null, attributes?: Array<{ __typename?: 'MetadataAttribute', value: string, key: string }> | null } | { __typename?: 'ThreeDMetadataV3' } | { __typename?: 'TransactionMetadataV3' } | { __typename?: 'VideoMetadataV3' }, operations: { __typename?: 'PublicationOperations', hasUpVoted: boolean, hasDownVoted: boolean }, root: { __typename?: 'Post', id: any } | { __typename?: 'Quote' } } | { __typename?: 'Mirror' } | { __typename?: 'Post' } | { __typename?: 'Quote' }> } };

export type LinkPublicationQueryVariables = Exact<{
  request: PublicationRequest;
}>;


export type LinkPublicationQuery = { __typename?: 'Query', publication?: { __typename?: 'Comment' } | { __typename?: 'Mirror' } | { __typename?: 'Post', id: any, createdAt: any, by: { __typename?: 'Profile', handle?: { __typename?: 'HandleInfo', fullHandle: any } | null }, stats: { __typename?: 'PublicationStats', comments: number, upvotes: number, downvotes: number }, metadata: { __typename?: 'ArticleMetadataV3' } | { __typename?: 'AudioMetadataV3' } | { __typename?: 'CheckingInMetadataV3' } | { __typename?: 'EmbedMetadataV3' } | { __typename?: 'EventMetadataV3' } | { __typename?: 'ImageMetadataV3' } | { __typename?: 'LinkMetadataV3', sharingLink: any, attributes?: Array<{ __typename?: 'MetadataAttribute', key: string, value: string }> | null } | { __typename?: 'LiveStreamMetadataV3' } | { __typename?: 'MintMetadataV3' } | { __typename?: 'SpaceMetadataV3' } | { __typename?: 'StoryMetadataV3' } | { __typename?: 'TextOnlyMetadataV3' } | { __typename?: 'ThreeDMetadataV3' } | { __typename?: 'TransactionMetadataV3' } | { __typename?: 'VideoMetadataV3' }, operations: { __typename?: 'PublicationOperations', hasUpVoted: boolean, hasDownVoted: boolean } } | { __typename?: 'Quote' } | null };


export const ChallengeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Challenge"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChallengeRequest"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"challenge"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ChallengeQuery, ChallengeQueryVariables>;
export const CommentsPublicationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CommentsPublication"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PublicationsRequest"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"publications"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Comment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"by"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"handle"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fullHandle"}}]}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"picture"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ImageSet"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"optimized"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ownedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"stats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comments"}},{"kind":"Field","alias":{"kind":"Name","value":"upvotes"},"name":{"kind":"Name","value":"reactions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"EnumValue","value":"UPVOTE"}}]}}]},{"kind":"Field","alias":{"kind":"Name","value":"downvotes"},"name":{"kind":"Name","value":"reactions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"EnumValue","value":"DOWNVOTE"}}]}}]}]}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TextOnlyMetadataV3"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"key"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ImageMetadataV3"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"operations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"hasUpVoted"},"name":{"kind":"Name","value":"hasReacted"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"EnumValue","value":"UPVOTE"}}]}}]},{"kind":"Field","alias":{"kind":"Name","value":"hasDownVoted"},"name":{"kind":"Name","value":"hasReacted"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"EnumValue","value":"DOWNVOTE"}}]}}]}]}},{"kind":"Field","name":{"kind":"Name","value":"root"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<CommentsPublicationQuery, CommentsPublicationQueryVariables>;
export const LinkPublicationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LinkPublication"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PublicationRequest"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"publication"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"by"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"handle"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fullHandle"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"stats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comments"}},{"kind":"Field","alias":{"kind":"Name","value":"upvotes"},"name":{"kind":"Name","value":"reactions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"EnumValue","value":"UPVOTE"}}]}}]},{"kind":"Field","alias":{"kind":"Name","value":"downvotes"},"name":{"kind":"Name","value":"reactions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"EnumValue","value":"DOWNVOTE"}}]}}]}]}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LinkMetadataV3"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sharingLink"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"operations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"hasUpVoted"},"name":{"kind":"Name","value":"hasReacted"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"EnumValue","value":"UPVOTE"}}]}}]},{"kind":"Field","alias":{"kind":"Name","value":"hasDownVoted"},"name":{"kind":"Name","value":"hasReacted"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"EnumValue","value":"DOWNVOTE"}}]}}]}]}}]}}]}}]}}]} as unknown as DocumentNode<LinkPublicationQuery, LinkPublicationQueryVariables>;
