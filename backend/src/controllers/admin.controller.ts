import { Request, Response } from "express";
import { preprocessURLAndCreateMetadataObjectHelperUtil } from "../utils/helpers/preprocess-url-and-create-metadata-object.helper.util";
import {
  APP_ADDRESS,
  APP_LENS_HANDLE,
  APP_LENS_ID,
  LENS_HUB_CONTRACT_ADDRESS,
  USE_GASLESS
} from "../config/env.config";
import {
  AddImageToPostAdminRouteBodyRequestModel,
  ApproveSignlessAdminRouteBodyRequestModel
} from "../models/requests/body/admin-route.body.request.model";
import { relatedParentPublicationsLensService } from "../services/lens/related-parent-publications.lens.service";
import { httpStatusCodes } from "../config/app-constants.config";
import { PublicationResponseModel } from "../models/response/publication.response.model";
import { uploadScreenshotAndCommentWithImageJobUtil } from "../utils/jobs/upload-screenshot-and-comment-with-image.job.util";
import { isInputTypeURLHelperUtil } from "../utils/helpers/is-input-url.helper.util";
import createChangeProfileManagersTypedDataLensService from "../services/lens/create-change-profile-managers-typed-data.lens.service";
import { signedTypeData } from "../utils/helpers/sign-type-data.helper.util";
import broadcastOnchainRequestService from "../services/lens/broadcast-onchain-request.lens.service";
import { RelayError, RelaySuccess } from "../gql/graphql";
import { waitUntilBroadcastIsCompleteTransactionUtil } from "../utils/transaction/wait-until-broadcast-is-complete.transaction.util";
import { getPolygonGasPriceHelperUtil } from "../utils/helpers/get-polygon-gas-price.helper.utils";
import { splitSignatureHelperUtil } from "../utils/helpers/split-signature.helper.utils";
import { createContractHelperUtils } from "../utils/helpers/create-contract.helper.utils";
import LENS_HUB_ABI from "../abis/lens-hub-contract.abi.json";
import { InternalServerError } from "../errors/internal-server-error.error";
import { hasTransactionBeenIndexedIndexerUtil } from "../utils/indexer/has-transaction-been-indexed.indexer.util";

/**
 * Adds an image to a post in the admin controller.
 *
 * @param {Request<unknown, unknown, AddImageToPostAdminRouteBodyRequestModel>} req - The HTTP request object.
 * @param {Response<PublicationResponseModel>} res - The HTTP response object.
 * @return {Promise<void>} A promise that resolves to nothing.
 */
export const addImageToPostAdminController = async (
  req: Request<unknown, unknown, AddImageToPostAdminRouteBodyRequestModel>,
  res: Response<PublicationResponseModel>
) => {
  try {
    const { url } = req.body;
    const urlString = isInputTypeURLHelperUtil(url);
    const urlObj = preprocessURLAndCreateMetadataObjectHelperUtil(
      urlString ? urlString : url,
      APP_LENS_HANDLE,
      null,
      []
    );
    console.log(JSON.stringify(urlObj));
    const publicationExists = await relatedParentPublicationsLensService([
      urlObj.hashedURL
    ]);
    console.log(JSON.stringify(publicationExists));
    if (publicationExists && publicationExists.items.length > 0) {
      await uploadScreenshotAndCommentWithImageJobUtil(urlObj);
      return res.status(httpStatusCodes.CREATED).send({
        publicationID: publicationExists.items[0].id,
        message: "Image Added To Post"
      });
    } else {
      return res.status(httpStatusCodes.OK).send({
        publicationID: null,
        message: "Could Not Find Publication"
      });
    }
  } catch (error) {
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send({
      publicationID: null,
      message: "Error:" + error
    });
  }
};

export const approveSignlessAdminController = async (
  req: Request<unknown, unknown, ApproveSignlessAdminRouteBodyRequestModel>,
  res: Response
) => {
  try {
    if (!APP_LENS_ID) {
      throw new Error("Must define PROFILE_ID in the .env to run this");
    }
    const { approveSignless } = req.body;
    const { id, typedData } =
      await createChangeProfileManagersTypedDataLensService({
        approveSignless
        // leave it blank if you want to use the lens API manager!
        // changeManagers: [
        //   {
        //     action: ChangeProfileManagerActionType.Add,
        //     address: '0xEEA0C1f5ab0159dba749Dc0BAee462E5e293daaF',
        //   },
        // ],
      });
    console.log("change profile manager:", { id, typedData });

    console.log("change profile manager: typedData", typedData);

    const signature = await signedTypeData(
      typedData.domain,
      typedData.types,
      typedData.value
    );
    console.log("change profile manager: signature", signature);

    if (USE_GASLESS) {
      const broadcastResult = (await broadcastOnchainRequestService({
        id,
        signature
      })) as RelaySuccess | RelayError;

      await waitUntilBroadcastIsCompleteTransactionUtil(
        broadcastResult,
        "change profile manager"
      );
    } else {
      const polygonGasFee = await getPolygonGasPriceHelperUtil();
      const { v, r, s } = splitSignatureHelperUtil(signature);

      const lensHub = createContractHelperUtils(
        LENS_HUB_CONTRACT_ADDRESS,
        LENS_HUB_ABI
      );

      const tx = await lensHub.changeDelegatedExecutorsConfigWithSig(
        typedData.value.delegatorProfileId,
        typedData.value.delegatedExecutors,
        typedData.value.approvals,
        typedData.value.configNumber,
        typedData.value.switchToGivenConfig,
        {
          signer: APP_ADDRESS,
          v,
          r,
          s,
          deadline: typedData.value.deadline
        },
        {
          maxFeePerGas: polygonGasFee.maxFeePerGas,
          maxPriorityFeePerGas: polygonGasFee.maxPriorityFeePerGas
        }
      );

      await hasTransactionBeenIndexedIndexerUtil(
        {
          forTxHash: tx.hash
        },
        Date.now()
      );
      console.log("change profile manager: tx hash", tx.hash);
    }

    return res.status(httpStatusCodes.OK).send({
      message: "Lens Profile Manager Updated"
    });
  } catch (error) {
    console.log("change profile manager: error", error);
    throw new InternalServerError("Error", 500);
  }
};
