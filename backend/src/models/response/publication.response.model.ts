export interface PublicationResponseModel {
  publicationID: string | null;
  message: string;
}

export interface PublicationResponseModelForPostAnonymousComment
  extends PublicationResponseModel {
  alreadyExists: boolean;
}

export interface PublicationResponseModelForNewPubURL
  extends PublicationResponseModelForPostAnonymousComment {
  mainPostImageUrl: string | null;
}
