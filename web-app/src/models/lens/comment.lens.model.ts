import type { AttributeKeyType } from "../../config/app-constants.config";

export interface CommentLensModel {
  __typename?: "Post";
  id: string;
  slug: string;
  timestamp: string;
  author: {
    metadata: {
      picture: string;
      name: string;
    };
    owner: string;
    username: {
      value: string;
    };
    address: string;
  };
  metadata: {
    __typename: "TextOnlyMetadata";
    content: string;
    tags: string;
    attributes: {
      key: AttributeKeyType;
      value: string;
    }[];
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
  root: {
    __typename: "Post";
    id: string;
    slug: string;
  };
}
