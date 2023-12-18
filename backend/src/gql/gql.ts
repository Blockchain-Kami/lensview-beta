/* eslint-disable */
import * as types from "./graphql";
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
  "\n  mutation Authenticate($request: SignedAuthChallenge!) {\n    authenticate(request: $request) {\n      accessToken\n      refreshToken\n    }\n  }\n":
    types.AuthenticateDocument,
  "\n  mutation BroadcastOnchain($request: BroadcastRequest!) {\n    broadcastOnchain(request: $request) {\n      ... on RelaySuccess {\n        __typename\n        txHash\n        txId\n      }\n      ... on RelayError {\n        __typename\n        reason\n      }\n    }\n  }\n":
    types.BroadcastOnchainDocument,
  "\n  mutation CreateOnchainCommentTypedData($request: OnchainCommentRequest!) {\n    createOnchainCommentTypedData(request: $request) {\n      id\n      expiresAt\n      typedData {\n        types {\n          Comment {\n            name\n            type\n          }\n        }\n        domain {\n          name\n          chainId\n          version\n          verifyingContract\n        }\n        value {\n          nonce\n          deadline\n          profileId\n          contentURI\n          pointedProfileId\n          pointedPubId\n          referrerProfileIds\n          referrerPubIds\n          referenceModuleData\n          actionModules\n          actionModulesInitDatas\n          referenceModule\n          referenceModuleInitData\n        }\n      }\n    }\n  }\n":
    types.CreateOnchainCommentTypedDataDocument,
  "\n  mutation CreateOnchainPostTypedData($request: OnchainPostRequest!) {\n    createOnchainPostTypedData(request: $request) {\n      id\n      expiresAt\n      typedData {\n        types {\n          Post {\n            name\n            type\n          }\n        }\n        domain {\n          name\n          chainId\n          version\n          verifyingContract\n        }\n        value {\n          nonce\n          deadline\n          profileId\n          contentURI\n          actionModules\n          actionModulesInitDatas\n          referenceModule\n          referenceModuleInitData\n        }\n      }\n    }\n  }\n":
    types.CreateOnchainPostTypedDataDocument,
  "\n  query Challenge($request: ChallengeRequest!) {\n    challenge(request: $request) {\n      text\n      id\n    }\n  }\n":
    types.ChallengeDocument,
  "\n  query Publications($request: PublicationsRequest!) {\n    publications(request: $request) {\n      items {\n        ... on Post {\n          id\n        }\n      }\n    }\n  }\n":
    types.PublicationsDocument,
  "\n  query lensTransactionStatus($request: LensTransactionStatusRequest!) {\n    lensTransactionStatus(request: $request) {\n      status\n      txHash\n      reason\n      extraInfo\n    }\n  }\n":
    types.LensTransactionStatusDocument
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
  source: "\n  mutation Authenticate($request: SignedAuthChallenge!) {\n    authenticate(request: $request) {\n      accessToken\n      refreshToken\n    }\n  }\n"
): (typeof documents)["\n  mutation Authenticate($request: SignedAuthChallenge!) {\n    authenticate(request: $request) {\n      accessToken\n      refreshToken\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation BroadcastOnchain($request: BroadcastRequest!) {\n    broadcastOnchain(request: $request) {\n      ... on RelaySuccess {\n        __typename\n        txHash\n        txId\n      }\n      ... on RelayError {\n        __typename\n        reason\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation BroadcastOnchain($request: BroadcastRequest!) {\n    broadcastOnchain(request: $request) {\n      ... on RelaySuccess {\n        __typename\n        txHash\n        txId\n      }\n      ... on RelayError {\n        __typename\n        reason\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation CreateOnchainCommentTypedData($request: OnchainCommentRequest!) {\n    createOnchainCommentTypedData(request: $request) {\n      id\n      expiresAt\n      typedData {\n        types {\n          Comment {\n            name\n            type\n          }\n        }\n        domain {\n          name\n          chainId\n          version\n          verifyingContract\n        }\n        value {\n          nonce\n          deadline\n          profileId\n          contentURI\n          pointedProfileId\n          pointedPubId\n          referrerProfileIds\n          referrerPubIds\n          referenceModuleData\n          actionModules\n          actionModulesInitDatas\n          referenceModule\n          referenceModuleInitData\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation CreateOnchainCommentTypedData($request: OnchainCommentRequest!) {\n    createOnchainCommentTypedData(request: $request) {\n      id\n      expiresAt\n      typedData {\n        types {\n          Comment {\n            name\n            type\n          }\n        }\n        domain {\n          name\n          chainId\n          version\n          verifyingContract\n        }\n        value {\n          nonce\n          deadline\n          profileId\n          contentURI\n          pointedProfileId\n          pointedPubId\n          referrerProfileIds\n          referrerPubIds\n          referenceModuleData\n          actionModules\n          actionModulesInitDatas\n          referenceModule\n          referenceModuleInitData\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation CreateOnchainPostTypedData($request: OnchainPostRequest!) {\n    createOnchainPostTypedData(request: $request) {\n      id\n      expiresAt\n      typedData {\n        types {\n          Post {\n            name\n            type\n          }\n        }\n        domain {\n          name\n          chainId\n          version\n          verifyingContract\n        }\n        value {\n          nonce\n          deadline\n          profileId\n          contentURI\n          actionModules\n          actionModulesInitDatas\n          referenceModule\n          referenceModuleInitData\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation CreateOnchainPostTypedData($request: OnchainPostRequest!) {\n    createOnchainPostTypedData(request: $request) {\n      id\n      expiresAt\n      typedData {\n        types {\n          Post {\n            name\n            type\n          }\n        }\n        domain {\n          name\n          chainId\n          version\n          verifyingContract\n        }\n        value {\n          nonce\n          deadline\n          profileId\n          contentURI\n          actionModules\n          actionModulesInitDatas\n          referenceModule\n          referenceModuleInitData\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query Challenge($request: ChallengeRequest!) {\n    challenge(request: $request) {\n      text\n      id\n    }\n  }\n"
): (typeof documents)["\n  query Challenge($request: ChallengeRequest!) {\n    challenge(request: $request) {\n      text\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query Publications($request: PublicationsRequest!) {\n    publications(request: $request) {\n      items {\n        ... on Post {\n          id\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  query Publications($request: PublicationsRequest!) {\n    publications(request: $request) {\n      items {\n        ... on Post {\n          id\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query lensTransactionStatus($request: LensTransactionStatusRequest!) {\n    lensTransactionStatus(request: $request) {\n      status\n      txHash\n      reason\n      extraInfo\n    }\n  }\n"
): (typeof documents)["\n  query lensTransactionStatus($request: LensTransactionStatusRequest!) {\n    lensTransactionStatus(request: $request) {\n      status\n      txHash\n      reason\n      extraInfo\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
