export interface CommentsPublicationLensModel {
  __typename: "PaginatedPublicationsResult";
  items: {
    __typename: "Comment";
    id: string;
    createdAt: string;
    by: {
      id: string;
      handle: {
        fullHandle: string;
      };
      metadata: {
        picture: {
          __typename: "ImageSet";
          optimized: {
            uri: string;
          };
        };
        displayName: string;
      };
      ownedBy: {
        address: string;
      };
    };
    metadata: {
      __typename: "TextOnlyMetadataV3";
      content: string;
    };
    stats: {
      comments: number;
      upvotes: number;
      downvotes: number;
    };
    operations: {
      hasUpVoted: boolean;
      hasDownVoted: boolean;
    };
  }[];
}
