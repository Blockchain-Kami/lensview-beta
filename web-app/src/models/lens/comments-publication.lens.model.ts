export interface CommentsPublicationLensModel {
  __typename: "PaginatedPublicationsResult";
  items: {
    __typename: "Comment";
    id: any;
    createdAt: any;
    by: {
      id: any;
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
