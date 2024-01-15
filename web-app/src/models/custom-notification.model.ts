export interface CustomNotificationModel {
  heading?: string;
  type?: string;
  description?: string;
  ctaBtnName?: string;
  ctaFunction?(): void;
  ctaFunctionString?: string;
  position?: string;
  removeAfter?: number;
}
