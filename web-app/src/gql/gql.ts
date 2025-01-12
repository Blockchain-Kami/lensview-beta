/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

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
    "\n  mutation Authenticate($request: SignedAuthChallenge!) {\n    authenticate(request: $request) {\n      ... on AuthenticationTokens {\n        accessToken\n        idToken\n        refreshToken\n      }\n      ... on WrongSignerError {\n        reason\n      }\n      ... on ExpiredChallengeError {\n        reason\n      }\n      ... on ForbiddenError {\n        reason\n      }\n    }\n  }\n": types.AuthenticateDocument,
    "\n  mutation Challenge($request: ChallengeRequest!) {\n    challenge(request: $request) {\n      id\n      text\n    }\n  }\n": types.ChallengeDocument,
    "\n  query AccountsAvailable($request: AccountsAvailableRequest!) {\n    accountsAvailable(request: $request) {\n      items {\n        ... on AccountOwned {\n          account {\n            address\n            owner\n            username {\n              value\n              id\n            }\n            metadata {\n              name\n              picture\n              id\n            }\n          }\n          addedAt\n        }\n        ... on AccountManaged {\n          permissions {\n            canTransferTokens\n            canTransferNative\n            canSetMetadataUri\n            canExecuteTransactions\n          }\n          addedAt\n          account {\n            owner\n            address\n            username {\n              value\n              id\n            }\n            metadata {\n              name\n              picture\n              id\n            }\n          }\n        }\n      }\n    }\n  }\n": types.AccountsAvailableDocument,
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
export function graphql(source: "\n  mutation Authenticate($request: SignedAuthChallenge!) {\n    authenticate(request: $request) {\n      ... on AuthenticationTokens {\n        accessToken\n        idToken\n        refreshToken\n      }\n      ... on WrongSignerError {\n        reason\n      }\n      ... on ExpiredChallengeError {\n        reason\n      }\n      ... on ForbiddenError {\n        reason\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Authenticate($request: SignedAuthChallenge!) {\n    authenticate(request: $request) {\n      ... on AuthenticationTokens {\n        accessToken\n        idToken\n        refreshToken\n      }\n      ... on WrongSignerError {\n        reason\n      }\n      ... on ExpiredChallengeError {\n        reason\n      }\n      ... on ForbiddenError {\n        reason\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Challenge($request: ChallengeRequest!) {\n    challenge(request: $request) {\n      id\n      text\n    }\n  }\n"): (typeof documents)["\n  mutation Challenge($request: ChallengeRequest!) {\n    challenge(request: $request) {\n      id\n      text\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query AccountsAvailable($request: AccountsAvailableRequest!) {\n    accountsAvailable(request: $request) {\n      items {\n        ... on AccountOwned {\n          account {\n            address\n            owner\n            username {\n              value\n              id\n            }\n            metadata {\n              name\n              picture\n              id\n            }\n          }\n          addedAt\n        }\n        ... on AccountManaged {\n          permissions {\n            canTransferTokens\n            canTransferNative\n            canSetMetadataUri\n            canExecuteTransactions\n          }\n          addedAt\n          account {\n            owner\n            address\n            username {\n              value\n              id\n            }\n            metadata {\n              name\n              picture\n              id\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query AccountsAvailable($request: AccountsAvailableRequest!) {\n    accountsAvailable(request: $request) {\n      items {\n        ... on AccountOwned {\n          account {\n            address\n            owner\n            username {\n              value\n              id\n            }\n            metadata {\n              name\n              picture\n              id\n            }\n          }\n          addedAt\n        }\n        ... on AccountManaged {\n          permissions {\n            canTransferTokens\n            canTransferNative\n            canSetMetadataUri\n            canExecuteTransactions\n          }\n          addedAt\n          account {\n            owner\n            address\n            username {\n              value\n              id\n            }\n            metadata {\n              name\n              picture\n              id\n            }\n          }\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
