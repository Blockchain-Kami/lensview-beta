import Publication from "../../models/db/publication.db.model";

export const getPublicationDbUtil = async (publicationId: string) => {
  try {
    return await Publication.findOne({ id: publicationId });
  } catch (error) {
    console.log(error);
  }
};
