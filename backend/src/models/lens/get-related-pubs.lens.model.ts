export interface GetRelatedPubsLensModel {
  __typename: "PaginatedPublicationsResult";
  items: {
    __typename: "Post";
    id: string;
  }[];
}
