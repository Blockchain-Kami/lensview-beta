export interface GetTextOnlyCommentsLensModel {
  __typename: "PaginatedAnyPostsResult";
  items: {
    __typename: "Post";
    slug: string;
    metadata: {
      __typename: "Encryptable";
      content: string;
    };
    stats: {
      __typename: "PostStats";
      reactions: number;
    };
  }[];
}
