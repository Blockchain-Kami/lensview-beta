export interface ExploreLinkPostLensModel {
  id: string;
  slug: string;
  timestamp: string;
  author: {
    address: string;
  };
  stats: {
    comments: number;
    upvotes: number;
    downvotes: number;
  };
  metadata: {
    __typename: "LinkMetadata";
    sharingLink: string;
  };
}
