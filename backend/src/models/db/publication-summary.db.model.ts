export interface publicationSummaryDbModel {
  id: string;
  summary: string;
  sentiment: string;
  flags: number;
  commentCount: number;
  isHidden: number;
  timestamp: Date;
}
