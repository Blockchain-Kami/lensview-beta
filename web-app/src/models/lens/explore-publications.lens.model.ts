export interface ExplorePublicationsLensModel {
  __typename: "PaginatedExplorePublicationResult";
  items: {
    __typename: "Post";
    id: string;
    by: {
      id: string;
    };
    createdAt: string;
    stats: {
      comments: number;
      upvotes: number;
      downvotes: number;
    };
    metadata: {
      __typename: "LinkMetadataV3";
      sharingLink: string;
    };
  }[];
}
