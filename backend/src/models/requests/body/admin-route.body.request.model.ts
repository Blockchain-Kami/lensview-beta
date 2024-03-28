export interface AddImageToPostAdminRouteBodyRequestModel {
  secretKey: string;
  url: string;
  approveSignless?: boolean;
}

export interface ApproveSignlessAdminRouteBodyRequestModel {
  secretKey: string;
  approveSignless?: boolean;
  url?: string;
}
