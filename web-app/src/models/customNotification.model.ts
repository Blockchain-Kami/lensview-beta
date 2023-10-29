export interface CustomNotificationModel {
	heading?: string;
	type?: string;
	description?: string;
	ctaBtnName?: string;
	ctaFunction?(): void;
	position?: string;
	removeAfter?: number;
}
