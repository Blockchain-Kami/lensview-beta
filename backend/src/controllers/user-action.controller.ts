import { Request, Response, NextFunction } from "express";
import { ReactionRequestBodyModel } from "../models/request-bodies/reaction.request-body.model";
import {
  addReactionToAPostUtil,
  removeReactionFromAPostUtil
} from "../utils/lens-protocol/update-reaction-for-post.util";

/**
 * Adds a reaction to a post.
 *
 * @param req - The request object containing the publication ID and reaction.
 * @param res - The response object.
 * @param _next - The next function.
 */
export const addReaction = async (
  req: Request<unknown, unknown, ReactionRequestBodyModel>,
  res: Response,
  _next: NextFunction
) => {
  try {
    // Call the function to add the reaction to the post
    await addReactionToAPostUtil(req.body.publicationId, req.body.reaction);

    res.status(200).json({
      message: "Reaction added successfully"
    });
  } catch (error) {
    res.status(503).json({
      message:
        "Could not add reaction to publication id: " + req.body.publicationId
    });
  }
};

/**
 * remove a reaction from a post.
 *
 * @param req - The request object containing the publication ID and reaction.
 * @param res - The response object.
 * @param _next - The next function.
 */
export const removeReaction = async (
  req: Request<unknown, unknown, ReactionRequestBodyModel>,
  res: Response,
  _next: NextFunction
) => {
  try {
    // Call the function to remove the reaction from a post
    await removeReactionFromAPostUtil(
      req.body.publicationId,
      req.body.reaction
    );

    res.status(200).json({
      message: "Reaction removed successfully"
    });
  } catch (error) {
    res.status(503).json({
      message:
        "Could not remove reaction from publication id: " +
        req.body.publicationId
    });
  }
};
