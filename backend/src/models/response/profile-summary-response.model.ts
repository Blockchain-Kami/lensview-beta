export default interface ProfileSummaryResponseModel {
  displayName: string | null;
  bio: string | null;
  displayImage: string | null;
  coverImage: string | null;
  reactions: number | null;
  publications: number | null;
  poapCount: number | null;
  lensHandle: string | null;
  farcasterHandle: string | null;
  lensJoinDate: string | null;
  farcasterJoinDate: string | null;
  lensFollowers: number | null;
  farcasterFollowers: number | null;
  CIS: number | null;
}
