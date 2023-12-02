import { LinkPublicationLensModel } from "../lens-models/link-publication.lens.model";

export interface UrlExistsValidationResponseBody {
  isURL: boolean;
  pubId: LinkPublicationLensModel | null;
  message: string;
}
