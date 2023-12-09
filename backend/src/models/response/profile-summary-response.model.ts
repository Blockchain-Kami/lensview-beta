export default interface ProfileSummaryResponseModel {
  displayName: string | null;
  bio: string | null;
  displayImage: string | null;
  coverImage: string | null;
  reactions: number;
  publications: number;
  poapCount: number;
  lensHandle: string | null;
  farcasterHandle: string | null;
  lensJoinDate: string | null;
  farcasterJoinDate: string | null;
  lensFollowers: number;
  farcasterFollowers: number;
  CIS: number;
}
