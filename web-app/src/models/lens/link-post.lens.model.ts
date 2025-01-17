import type { AttributeKeyType } from "../../config/app-constants.config";

export interface LinkPostLensModel {
  id: string;
  metadata: {
    __typename: "LinkMetadata";
    sharingLink: string;
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
  timestamp: string;
  author: {
    username: {
      value: string;
    };
  };
  slug: string;
}
