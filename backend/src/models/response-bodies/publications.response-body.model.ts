import {LinkPublicationLensModel} from "../lens-models/link-publication.lens.model";

export interface PublicationsResponseModel {
  isURL: boolean;
  publications: LinkPublicationLensModel[] | [] | string[];
  message: string;
}
