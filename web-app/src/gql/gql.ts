/* eslint-disable */
import * as types from './graphql';
import type {TypedDocumentNode as DocumentNode} from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation AddReaction($request: ReactionRequest!) {\n    addReaction(request: $request)\n  }\n": types.AddReactionDocument,
    "\n  mutation Authenticate($request: SignedAuthChallenge!) {\n    authenticate(request: $request) {\n      accessToken\n      refreshToken\n    }\n  }\n": types.AuthenticateDocument,
    "\n  mutation BroadcastOnchain($request: BroadcastRequest!) {\n    broadcastOnchain(request: $request) {\n      ... on RelaySuccess {\n        __typename\n        txHash\n        txId\n      }\n      ... on RelayError {\n        __typename\n        reason\n      }\n    }\n  }\n": types.BroadcastOnchainDocument,
    "\n  mutation CreateOnchainCommentTypedData($request: OnchainCommentRequest!) {\n    createOnchainCommentTypedData(request: $request) {\n      id\n      expiresAt\n      typedData {\n        types {\n          Comment {\n            name\n            type\n          }\n        }\n        domain {\n          name\n          chainId\n          version\n          verifyingContract\n        }\n        value {\n          nonce\n          deadline\n          profileId\n          contentURI\n          pointedProfileId\n          pointedPubId\n          referrerProfileIds\n          referrerPubIds\n          referenceModuleData\n          actionModules\n          actionModulesInitDatas\n          referenceModule\n          referenceModuleInitData\n        }\n      }\n    }\n  }\n": types.CreateOnchainCommentTypedDataDocument,
    "\n  mutation CreateOnchainPostTypedData($request: OnchainPostRequest!) {\n    createOnchainPostTypedData(request: $request) {\n      id\n      expiresAt\n      typedData {\n        types {\n          Post {\n            name\n            type\n          }\n        }\n        domain {\n          name\n          chainId\n          version\n          verifyingContract\n        }\n        value {\n          nonce\n          deadline\n          profileId\n          contentURI\n          actionModules\n          actionModulesInitDatas\n          referenceModule\n          referenceModuleInitData\n        }\n      }\n    }\n  }\n": types.CreateOnchainPostTypedDataDocument,
    "\n  mutation CreateProfileWithHandle($request: CreateProfileWithHandleRequest!) {\n    createProfileWithHandle(request: $request) {\n      ... on RelaySuccess {\n        txHash\n        txId\n      }\n      ... on CreateProfileWithHandleErrorResult {\n        reason\n      }\n    }\n  }\n": types.CreateProfileWithHandleDocument,
    "\n  mutation Refresh($request: RefreshRequest!) {\n    refresh(request: $request) {\n      accessToken\n      refreshToken\n    }\n  }\n": types.RefreshDocument,
    "\n  mutation RemoveReaction($request: ReactionRequest!) {\n    removeReaction(request: $request)\n  }\n": types.RemoveReactionDocument,
    "\n  query Challenge($request: ChallengeRequest!) {\n    challenge(request: $request) {\n      text\n      id\n    }\n  }\n": types.ChallengeDocument,
    "\n  query CommentsPublication($request: PublicationsRequest!) {\n    publications(request: $request) {\n      items {\n        ... on Comment {\n          id\n          createdAt\n          by {\n            id\n            handle {\n              fullHandle\n            }\n            metadata {\n              picture {\n                ... on ImageSet {\n                  optimized {\n                    uri\n                  }\n                }\n              }\n              displayName\n            }\n            ownedBy {\n              address\n            }\n          }\n          stats {\n            comments\n            upvotes: reactions(request: { type: UPVOTE })\n            downvotes: reactions(request: { type: DOWNVOTE })\n          }\n          metadata {\n            ... on TextOnlyMetadataV3 {\n              content\n            }\n            ... on ImageMetadataV3 {\n              content\n            }\n          }\n          operations {\n            hasUpVoted: hasReacted(request: { type: UPVOTE })\n            hasDownVoted: hasReacted(request: { type: DOWNVOTE })\n          }\n        }\n      }\n    }\n  }\n": types.CommentsPublicationDocument,
    "\n  query ExplorePublications($request: ExplorePublicationRequest!) {\n    explorePublications(request: $request) {\n      items {\n        ... on Post {\n          id\n          createdAt\n          stats {\n            comments\n            upvotes: reactions(request: { type: UPVOTE })\n            downvotes: reactions(request: { type: DOWNVOTE })\n          }\n          metadata {\n            ... on LinkMetadataV3 {\n              sharingLink\n            }\n          }\n        }\n      }\n    }\n  }\n": types.ExplorePublicationsDocument,
    "\n  query ImageCommentPublications($request: PublicationsRequest!) {\n    publications(request: $request) {\n      items {\n        ... on Comment {\n          metadata {\n            ... on ImageMetadataV3 {\n              asset {\n                image {\n                  optimized {\n                    uri\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.ImageCommentPublicationsDocument,
    "\n  query lastLoggedInProfile($request: LastLoggedInProfileRequest!) {\n    lastLoggedInProfile(request: $request) {\n      id\n    }\n  }\n": types.LastLoggedInProfileDocument,
    "\n  query lensTransactionStatus($request: LensTransactionStatusRequest!) {\n    lensTransactionStatus(request: $request) {\n      status\n      txHash\n      reason\n      extraInfo\n    }\n  }\n": types.LensTransactionStatusDocument,
    "\n  query LinkPublication($request: PublicationRequest!) {\n    publication(request: $request) {\n      ... on Post {\n        id\n        createdAt\n        by {\n          handle {\n            fullHandle\n          }\n        }\n        stats {\n          comments\n          upvotes: reactions(request: { type: UPVOTE })\n          downvotes: reactions(request: { type: DOWNVOTE })\n        }\n        metadata {\n          ... on LinkMetadataV3 {\n            sharingLink\n            attributes {\n              key\n              value\n            }\n          }\n        }\n        operations {\n          hasUpVoted: hasReacted(request: { type: UPVOTE })\n          hasDownVoted: hasReacted(request: { type: DOWNVOTE })\n        }\n      }\n    }\n  }\n": types.LinkPublicationDocument,
    "\n  query profilesManaged($request: ProfilesManagedRequest!) {\n    profilesManaged(request: $request) {\n      items {\n        id\n        handle {\n          fullHandle\n        }\n      }\n    }\n  }\n": types.ProfilesManagedDocument,
    "\n  query Profile($request: ProfileRequest!) {\n    profile(request: $request) {\n      handle {\n        fullHandle\n        localName\n      }\n      id\n      metadata {\n        displayName\n        picture {\n          ... on NftImage {\n            image {\n              optimized {\n                uri\n              }\n            }\n          }\n        }\n      }\n      ownedBy {\n        address\n      }\n    }\n  }\n": types.ProfileDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddReaction($request: ReactionRequest!) {\n    addReaction(request: $request)\n  }\n"): (typeof documents)["\n  mutation AddReaction($request: ReactionRequest!) {\n    addReaction(request: $request)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Authenticate($request: SignedAuthChallenge!) {\n    authenticate(request: $request) {\n      accessToken\n      refreshToken\n    }\n  }\n"): (typeof documents)["\n  mutation Authenticate($request: SignedAuthChallenge!) {\n    authenticate(request: $request) {\n      accessToken\n      refreshToken\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation BroadcastOnchain($request: BroadcastRequest!) {\n    broadcastOnchain(request: $request) {\n      ... on RelaySuccess {\n        __typename\n        txHash\n        txId\n      }\n      ... on RelayError {\n        __typename\n        reason\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation BroadcastOnchain($request: BroadcastRequest!) {\n    broadcastOnchain(request: $request) {\n      ... on RelaySuccess {\n        __typename\n        txHash\n        txId\n      }\n      ... on RelayError {\n        __typename\n        reason\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateOnchainCommentTypedData($request: OnchainCommentRequest!) {\n    createOnchainCommentTypedData(request: $request) {\n      id\n      expiresAt\n      typedData {\n        types {\n          Comment {\n            name\n            type\n          }\n        }\n        domain {\n          name\n          chainId\n          version\n          verifyingContract\n        }\n        value {\n          nonce\n          deadline\n          profileId\n          contentURI\n          pointedProfileId\n          pointedPubId\n          referrerProfileIds\n          referrerPubIds\n          referenceModuleData\n          actionModules\n          actionModulesInitDatas\n          referenceModule\n          referenceModuleInitData\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateOnchainCommentTypedData($request: OnchainCommentRequest!) {\n    createOnchainCommentTypedData(request: $request) {\n      id\n      expiresAt\n      typedData {\n        types {\n          Comment {\n            name\n            type\n          }\n        }\n        domain {\n          name\n          chainId\n          version\n          verifyingContract\n        }\n        value {\n          nonce\n          deadline\n          profileId\n          contentURI\n          pointedProfileId\n          pointedPubId\n          referrerProfileIds\n          referrerPubIds\n          referenceModuleData\n          actionModules\n          actionModulesInitDatas\n          referenceModule\n          referenceModuleInitData\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateOnchainPostTypedData($request: OnchainPostRequest!) {\n    createOnchainPostTypedData(request: $request) {\n      id\n      expiresAt\n      typedData {\n        types {\n          Post {\n            name\n            type\n          }\n        }\n        domain {\n          name\n          chainId\n          version\n          verifyingContract\n        }\n        value {\n          nonce\n          deadline\n          profileId\n          contentURI\n          actionModules\n          actionModulesInitDatas\n          referenceModule\n          referenceModuleInitData\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateOnchainPostTypedData($request: OnchainPostRequest!) {\n    createOnchainPostTypedData(request: $request) {\n      id\n      expiresAt\n      typedData {\n        types {\n          Post {\n            name\n            type\n          }\n        }\n        domain {\n          name\n          chainId\n          version\n          verifyingContract\n        }\n        value {\n          nonce\n          deadline\n          profileId\n          contentURI\n          actionModules\n          actionModulesInitDatas\n          referenceModule\n          referenceModuleInitData\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateProfileWithHandle($request: CreateProfileWithHandleRequest!) {\n    createProfileWithHandle(request: $request) {\n      ... on RelaySuccess {\n        txHash\n        txId\n      }\n      ... on CreateProfileWithHandleErrorResult {\n        reason\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateProfileWithHandle($request: CreateProfileWithHandleRequest!) {\n    createProfileWithHandle(request: $request) {\n      ... on RelaySuccess {\n        txHash\n        txId\n      }\n      ... on CreateProfileWithHandleErrorResult {\n        reason\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Refresh($request: RefreshRequest!) {\n    refresh(request: $request) {\n      accessToken\n      refreshToken\n    }\n  }\n"): (typeof documents)["\n  mutation Refresh($request: RefreshRequest!) {\n    refresh(request: $request) {\n      accessToken\n      refreshToken\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveReaction($request: ReactionRequest!) {\n    removeReaction(request: $request)\n  }\n"): (typeof documents)["\n  mutation RemoveReaction($request: ReactionRequest!) {\n    removeReaction(request: $request)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Challenge($request: ChallengeRequest!) {\n    challenge(request: $request) {\n      text\n      id\n    }\n  }\n"): (typeof documents)["\n  query Challenge($request: ChallengeRequest!) {\n    challenge(request: $request) {\n      text\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CommentsPublication($request: PublicationsRequest!) {\n    publications(request: $request) {\n      items {\n        ... on Comment {\n          id\n          createdAt\n          by {\n            id\n            handle {\n              fullHandle\n            }\n            metadata {\n              picture {\n                ... on ImageSet {\n                  optimized {\n                    uri\n                  }\n                }\n              }\n              displayName\n            }\n            ownedBy {\n              address\n            }\n          }\n          stats {\n            comments\n            upvotes: reactions(request: { type: UPVOTE })\n            downvotes: reactions(request: { type: DOWNVOTE })\n          }\n          metadata {\n            ... on TextOnlyMetadataV3 {\n              content\n            }\n            ... on ImageMetadataV3 {\n              content\n            }\n          }\n          operations {\n            hasUpVoted: hasReacted(request: { type: UPVOTE })\n            hasDownVoted: hasReacted(request: { type: DOWNVOTE })\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query CommentsPublication($request: PublicationsRequest!) {\n    publications(request: $request) {\n      items {\n        ... on Comment {\n          id\n          createdAt\n          by {\n            id\n            handle {\n              fullHandle\n            }\n            metadata {\n              picture {\n                ... on ImageSet {\n                  optimized {\n                    uri\n                  }\n                }\n              }\n              displayName\n            }\n            ownedBy {\n              address\n            }\n          }\n          stats {\n            comments\n            upvotes: reactions(request: { type: UPVOTE })\n            downvotes: reactions(request: { type: DOWNVOTE })\n          }\n          metadata {\n            ... on TextOnlyMetadataV3 {\n              content\n            }\n            ... on ImageMetadataV3 {\n              content\n            }\n          }\n          operations {\n            hasUpVoted: hasReacted(request: { type: UPVOTE })\n            hasDownVoted: hasReacted(request: { type: DOWNVOTE })\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ExplorePublications($request: ExplorePublicationRequest!) {\n    explorePublications(request: $request) {\n      items {\n        ... on Post {\n          id\n          createdAt\n          stats {\n            comments\n            upvotes: reactions(request: { type: UPVOTE })\n            downvotes: reactions(request: { type: DOWNVOTE })\n          }\n          metadata {\n            ... on LinkMetadataV3 {\n              sharingLink\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query ExplorePublications($request: ExplorePublicationRequest!) {\n    explorePublications(request: $request) {\n      items {\n        ... on Post {\n          id\n          createdAt\n          stats {\n            comments\n            upvotes: reactions(request: { type: UPVOTE })\n            downvotes: reactions(request: { type: DOWNVOTE })\n          }\n          metadata {\n            ... on LinkMetadataV3 {\n              sharingLink\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ImageCommentPublications($request: PublicationsRequest!) {\n    publications(request: $request) {\n      items {\n        ... on Comment {\n          metadata {\n            ... on ImageMetadataV3 {\n              asset {\n                image {\n                  optimized {\n                    uri\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query ImageCommentPublications($request: PublicationsRequest!) {\n    publications(request: $request) {\n      items {\n        ... on Comment {\n          metadata {\n            ... on ImageMetadataV3 {\n              asset {\n                image {\n                  optimized {\n                    uri\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query lastLoggedInProfile($request: LastLoggedInProfileRequest!) {\n    lastLoggedInProfile(request: $request) {\n      id\n    }\n  }\n"): (typeof documents)["\n  query lastLoggedInProfile($request: LastLoggedInProfileRequest!) {\n    lastLoggedInProfile(request: $request) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query lensTransactionStatus($request: LensTransactionStatusRequest!) {\n    lensTransactionStatus(request: $request) {\n      status\n      txHash\n      reason\n      extraInfo\n    }\n  }\n"): (typeof documents)["\n  query lensTransactionStatus($request: LensTransactionStatusRequest!) {\n    lensTransactionStatus(request: $request) {\n      status\n      txHash\n      reason\n      extraInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query LinkPublication($request: PublicationRequest!) {\n    publication(request: $request) {\n      ... on Post {\n        id\n        createdAt\n        by {\n          handle {\n            fullHandle\n          }\n        }\n        stats {\n          comments\n          upvotes: reactions(request: { type: UPVOTE })\n          downvotes: reactions(request: { type: DOWNVOTE })\n        }\n        metadata {\n          ... on LinkMetadataV3 {\n            sharingLink\n            attributes {\n              key\n              value\n            }\n          }\n        }\n        operations {\n          hasUpVoted: hasReacted(request: { type: UPVOTE })\n          hasDownVoted: hasReacted(request: { type: DOWNVOTE })\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query LinkPublication($request: PublicationRequest!) {\n    publication(request: $request) {\n      ... on Post {\n        id\n        createdAt\n        by {\n          handle {\n            fullHandle\n          }\n        }\n        stats {\n          comments\n          upvotes: reactions(request: { type: UPVOTE })\n          downvotes: reactions(request: { type: DOWNVOTE })\n        }\n        metadata {\n          ... on LinkMetadataV3 {\n            sharingLink\n            attributes {\n              key\n              value\n            }\n          }\n        }\n        operations {\n          hasUpVoted: hasReacted(request: { type: UPVOTE })\n          hasDownVoted: hasReacted(request: { type: DOWNVOTE })\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query profilesManaged($request: ProfilesManagedRequest!) {\n    profilesManaged(request: $request) {\n      items {\n        id\n        handle {\n          fullHandle\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query profilesManaged($request: ProfilesManagedRequest!) {\n    profilesManaged(request: $request) {\n      items {\n        id\n        handle {\n          fullHandle\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Profile($request: ProfileRequest!) {\n    profile(request: $request) {\n      handle {\n        fullHandle\n        localName\n      }\n      id\n      metadata {\n        displayName\n        picture {\n          ... on NftImage {\n            image {\n              optimized {\n                uri\n              }\n            }\n          }\n        }\n      }\n      ownedBy {\n        address\n      }\n    }\n  }\n"): (typeof documents)["\n  query Profile($request: ProfileRequest!) {\n    profile(request: $request) {\n      handle {\n        fullHandle\n        localName\n      }\n      id\n      metadata {\n        displayName\n        picture {\n          ... on NftImage {\n            image {\n              optimized {\n                uri\n              }\n            }\n          }\n        }\n      }\n      ownedBy {\n        address\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
