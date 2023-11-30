import type { AppReactionType } from "../config/app-constants.config";

export interface ReactionDetailsModel {
  [key: string]: details;
}

interface details {
  reaction: AppReactionType;
  upVoteCount: number;
  downVoteCount: number;
}
