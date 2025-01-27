/* eslint-disable */
import * as types from "./graphql.js";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

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
  "\n  mutation Authenticate($request: SignedAuthChallenge!) {\n    authenticate(request: $request) {\n      ... on AuthenticationTokens {\n        accessToken\n      }\n      ... on WrongSignerError {\n        reason\n      }\n      ... on ExpiredChallengeError {\n        reason\n      }\n      ... on ForbiddenError {\n        reason\n      }\n    }\n  }\n":
    types.AuthenticateDocument,
  "\n  mutation Challenge($request: ChallengeRequest!) {\n    challenge(request: $request) {\n      id\n      text\n    }\n  }\n":
    types.ChallengeDocument,
  "\n  mutation Mutation($request: CreatePostRequest!) {\n    post(request: $request) {\n      ... on PostResponse {\n        hash\n      }\n      ... on SelfFundedTransactionRequest {\n        raw {\n          chainId\n          data\n          from\n          gasLimit\n          maxFeePerGas\n          maxPriorityFeePerGas\n          nonce\n          to\n          type\n          value\n        }\n      }\n      ... on SponsoredTransactionRequest {\n        raw {\n          type\n          to\n          from\n          nonce\n          gasLimit\n          maxPriorityFeePerGas\n          maxFeePerGas\n          data\n          value\n          chainId\n          customData {\n            gasPerPubdata\n            factoryDeps\n            customSignature\n            paymasterParams {\n              paymaster\n              paymasterInput\n            }\n          }\n        }\n      }\n    }\n  }\n":
    types.MutationDocument,
  "\n  query PostReferences($request: PostReferencesRequest!) {\n    postReferences(request: $request) {\n      items {\n        ... on Post {\n          slug\n          metadata {\n            ... on TextOnlyMetadata {\n              content\n            }\n          }\n          stats {\n            reactions\n          }\n        }\n      }\n    }\n  }\n":
    types.PostReferencesDocument,
  "\n  query ImageComments($request: PostsRequest!) {\n    posts(request: $request) {\n      items {\n        ... on Post {\n          metadata {\n            ... on ImageMetadata {\n              image {\n                item\n              }\n              tags\n            }\n          }\n          root {\n            slug\n          }\n        }\n      }\n    }\n  }\n":
    types.ImageCommentsDocument,
  "\n  query RelatedPosts($request: PostsRequest!) {\n    posts(request: $request) {\n      items {\n        ... on Post {\n          slug\n          metadata {\n            ... on ImageMetadata {\n              tags\n              title\n              content\n            }\n          }\n        }\n      }\n    }\n  }\n":
    types.RelatedPostsDocument,
  "\n  query TransactionStatus($request: TransactionStatusRequest!) {\n    transactionStatus(request: $request) {\n      ... on FinishedTransactionStatus {\n        blockTimestamp\n      }\n      ... on PendingTransactionStatus {\n        blockTimestamp\n      }\n      ... on NotIndexedYetStatus {\n        reason\n      }\n      ... on FailedTransactionStatus {\n        reason\n      }\n    }\n  }\n":
    types.TransactionStatusDocument
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
export function graphql(
  source: "\n  mutation Authenticate($request: SignedAuthChallenge!) {\n    authenticate(request: $request) {\n      ... on AuthenticationTokens {\n        accessToken\n      }\n      ... on WrongSignerError {\n        reason\n      }\n      ... on ExpiredChallengeError {\n        reason\n      }\n      ... on ForbiddenError {\n        reason\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation Authenticate($request: SignedAuthChallenge!) {\n    authenticate(request: $request) {\n      ... on AuthenticationTokens {\n        accessToken\n      }\n      ... on WrongSignerError {\n        reason\n      }\n      ... on ExpiredChallengeError {\n        reason\n      }\n      ... on ForbiddenError {\n        reason\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation Challenge($request: ChallengeRequest!) {\n    challenge(request: $request) {\n      id\n      text\n    }\n  }\n"
): (typeof documents)["\n  mutation Challenge($request: ChallengeRequest!) {\n    challenge(request: $request) {\n      id\n      text\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation Mutation($request: CreatePostRequest!) {\n    post(request: $request) {\n      ... on PostResponse {\n        hash\n      }\n      ... on SelfFundedTransactionRequest {\n        raw {\n          chainId\n          data\n          from\n          gasLimit\n          maxFeePerGas\n          maxPriorityFeePerGas\n          nonce\n          to\n          type\n          value\n        }\n      }\n      ... on SponsoredTransactionRequest {\n        raw {\n          type\n          to\n          from\n          nonce\n          gasLimit\n          maxPriorityFeePerGas\n          maxFeePerGas\n          data\n          value\n          chainId\n          customData {\n            gasPerPubdata\n            factoryDeps\n            customSignature\n            paymasterParams {\n              paymaster\n              paymasterInput\n            }\n          }\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation Mutation($request: CreatePostRequest!) {\n    post(request: $request) {\n      ... on PostResponse {\n        hash\n      }\n      ... on SelfFundedTransactionRequest {\n        raw {\n          chainId\n          data\n          from\n          gasLimit\n          maxFeePerGas\n          maxPriorityFeePerGas\n          nonce\n          to\n          type\n          value\n        }\n      }\n      ... on SponsoredTransactionRequest {\n        raw {\n          type\n          to\n          from\n          nonce\n          gasLimit\n          maxPriorityFeePerGas\n          maxFeePerGas\n          data\n          value\n          chainId\n          customData {\n            gasPerPubdata\n            factoryDeps\n            customSignature\n            paymasterParams {\n              paymaster\n              paymasterInput\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query PostReferences($request: PostReferencesRequest!) {\n    postReferences(request: $request) {\n      items {\n        ... on Post {\n          slug\n          metadata {\n            ... on TextOnlyMetadata {\n              content\n            }\n          }\n          stats {\n            reactions\n          }\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  query PostReferences($request: PostReferencesRequest!) {\n    postReferences(request: $request) {\n      items {\n        ... on Post {\n          slug\n          metadata {\n            ... on TextOnlyMetadata {\n              content\n            }\n          }\n          stats {\n            reactions\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query ImageComments($request: PostsRequest!) {\n    posts(request: $request) {\n      items {\n        ... on Post {\n          metadata {\n            ... on ImageMetadata {\n              image {\n                item\n              }\n              tags\n            }\n          }\n          root {\n            slug\n          }\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  query ImageComments($request: PostsRequest!) {\n    posts(request: $request) {\n      items {\n        ... on Post {\n          metadata {\n            ... on ImageMetadata {\n              image {\n                item\n              }\n              tags\n            }\n          }\n          root {\n            slug\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query RelatedPosts($request: PostsRequest!) {\n    posts(request: $request) {\n      items {\n        ... on Post {\n          slug\n          metadata {\n            ... on ImageMetadata {\n              tags\n              title\n              content\n            }\n          }\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  query RelatedPosts($request: PostsRequest!) {\n    posts(request: $request) {\n      items {\n        ... on Post {\n          slug\n          metadata {\n            ... on ImageMetadata {\n              tags\n              title\n              content\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query TransactionStatus($request: TransactionStatusRequest!) {\n    transactionStatus(request: $request) {\n      ... on FinishedTransactionStatus {\n        blockTimestamp\n      }\n      ... on PendingTransactionStatus {\n        blockTimestamp\n      }\n      ... on NotIndexedYetStatus {\n        reason\n      }\n      ... on FailedTransactionStatus {\n        reason\n      }\n    }\n  }\n"
): (typeof documents)["\n  query TransactionStatus($request: TransactionStatusRequest!) {\n    transactionStatus(request: $request) {\n      ... on FinishedTransactionStatus {\n        blockTimestamp\n      }\n      ... on PendingTransactionStatus {\n        blockTimestamp\n      }\n      ... on NotIndexedYetStatus {\n        reason\n      }\n      ... on FailedTransactionStatus {\n        reason\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
