import {
  image,
  link,
  MediaImageMimeType,
  MetadataAttributeType,
  MetadataLicenseType,
  textOnly
} from "@lens-protocol/metadata";
import {
  SOURCE_APP_ID,
  APP_LENS_HANDLE,
  TAG_IMAGE_PUB,
  TAG_ANONYMOUS_PUB,
  TAG_USER_COMMENT,
  TAG_USER_POST,
  TAG_USER_PUB
} from "../../config/env.config";
import { logger } from "../../log/log-manager.log";
import { createTagsHelperUtil } from "./helpers.helpers.util";
import { MetadataObjectModel } from "../../models/metadata-object.model";

// TODO: Check size limit allowed for individual tags in Lens Docs and reject tags larger than the allowed size
/**
 * Generates metadata for a given URL object.
 *
 * @param {MetadataObjectModel} urlObj - The URL object for which metadata needs to be generated.
 * @return {any} - The generated metadata.
 */
export const createMetaDataForUrlHelperUtil = (urlObj: MetadataObjectModel) => {
  logger.info(
    "create-metadata.helper.util.ts: createMetaDataForUrlHelperUtil: Execution Started."
  );
  logger.info(
    "create-metadata.helper.util.ts: createMetaDataForUrlHelperUtil: Input Parameter: urlObj: " +
      JSON.stringify(urlObj)
  );
  let tags: string[];
  const userTags = urlObj.tags;
  const URLtags = [urlObj.hashedURL, urlObj.hostname, urlObj.domain];
  const allTags = userTags ? userTags.concat(URLtags) : URLtags;
  tags = urlObj.query ? createTagsHelperUtil(allTags, urlObj.query) : allTags;
  const lensHandle = urlObj.lensHandle
    ? `${urlObj.lensHandle}`
    : APP_LENS_HANDLE;

  urlObj["lensHandle"] !== APP_LENS_HANDLE
    ? tags.push(TAG_USER_PUB)
    : tags.push(TAG_ANONYMOUS_PUB);

  tags = [...new Set(tags)];

  const linkMetadata = link({
    locale: "en-US",
    tags: tags,
    appId: SOURCE_APP_ID,
    attributes: [
      {
        key: "creator",
        type: MetadataAttributeType.STRING,
        value: lensHandle
      },
      {
        key: "app",
        type: MetadataAttributeType.STRING,
        value: SOURCE_APP_ID
      },
      {
        key: "createdOn",
        type: MetadataAttributeType.STRING,
        value: `${new Date().toJSON().slice(0, 10)}`
      },
      {
        key: "category",
        type: MetadataAttributeType.STRING,
        value: "LensView Beta User"
      }
    ],
    sharingLink: urlObj.url,
    content: `@${lensHandle} just posted something interesting about ${
      urlObj.url.length > 35 ? urlObj.url.slice(0, 35) + "..." : urlObj.url
    } on @lens/lensviewio`
    //TODO: Check the fields below for potential usage in LensView
    // attachments: [PublicationMetadataMediaVideo],
    // "encryptedWith": PublicationMetadataLitEncryption,
    // "hideFromFeed": true,
  });
  logger.info(
    "create-metadata.helper.util.ts: createMetaDataForUrlHelperUtil: Metadata for Link Publication: " +
      JSON.stringify(linkMetadata)
  );
  logger.info(
    "create-metadata.helper.util.ts: createMetaDataForUrlHelperUtil: Execution Ended."
  );
  return linkMetadata;
};

export const createMetaDataForAnonymousCommentHelperUtil = (
  comment: string,
  mainPostUrl: string,
  mainPostImageUrl: string,
  isThisComment: boolean
) => {
  logger.info(
    "create-metadata.helper.util.ts: createMetaDataForAnonymousCommentHelperUtil: Execution Started."
  );
  logger.info(
    "create-metadata.helper.util.ts: createMetaDataForAnonymousCommentHelperUtil: Input Parameters: " +
      JSON.stringify({
        comment,
        mainPostImageUrl,
        isThisComment
      })
  );
  const tags = [TAG_ANONYMOUS_PUB];
  if (isThisComment) {
    tags.push(TAG_USER_COMMENT);
  } else {
    tags.push(TAG_USER_POST);
  }
  const textOnlyMetadata = textOnly({
    locale: "en-US",
    tags,
    appId: SOURCE_APP_ID,
    attributes: [
      {
        key: "creator",
        type: MetadataAttributeType.STRING,
        value: APP_LENS_HANDLE
      },
      {
        key: "app",
        type: MetadataAttributeType.STRING,
        value: SOURCE_APP_ID
      },
      {
        key: "createdOn",
        type: MetadataAttributeType.STRING,
        value: `${new Date().toJSON().slice(0, 10)}`
      },
      {
        key: "mainPostUrl",
        type: MetadataAttributeType.STRING,
        value: mainPostUrl
      },
      {
        key: "mainPostImageUrl",
        type: MetadataAttributeType.STRING,
        value: mainPostImageUrl
      },
      {
        key: "category",
        type: MetadataAttributeType.STRING,
        value: "LensView Beta User"
      }
    ],
    content: comment
    //TODO: Check for below fields usage
    // encryptedWith: PublicationMetadataLitEncryption,
    // hideFromFeed: false,
  });
  logger.info(
    "create-metadata.helper.util.ts: createMetaDataForAnonymousCommentHelperUtil: Metadata for Comment Publication: " +
      JSON.stringify(textOnlyMetadata)
  );
  logger.info(
    "create-metadata.helper.util.ts: createMetaDataForAnonymousCommentHelperUtil: Execution Ended."
  );
  return textOnlyMetadata;
};

export const createMetaDataForImageCommentHelperUtil = (
  urlObj: MetadataObjectModel
) => {
  logger.info(
    "create-metadata.helper.util.ts: createMetaDataForImageCommentHelperUtil: Execution Started."
  );
  logger.info(
    "create-metadata.helper.util.ts: createMetaDataForImageCommentHelperUtil: Input Parameters: " +
      JSON.stringify(urlObj)
  );
  const imageMetadata = image({
    locale: "en-US",
    tags: [TAG_IMAGE_PUB],
    appId: SOURCE_APP_ID,
    attributes: [
      {
        key: "creator",
        type: MetadataAttributeType.STRING,
        value: APP_LENS_HANDLE
      },
      {
        key: "app",
        type: MetadataAttributeType.STRING,
        value: SOURCE_APP_ID
      },
      {
        key: "createdOn",
        type: MetadataAttributeType.STRING,
        value: `${new Date().toJSON().slice(0, 10)}`
      },
      {
        key: "category",
        type: MetadataAttributeType.STRING,
        value: "LensView Beta User"
      }
    ],
    image: {
      item: `${urlObj.image}`,
      type: MediaImageMimeType.PNG,
      altTag: urlObj.url,
      license: MetadataLicenseType.CCO
    },
    attachments: [
      {
        item: `${urlObj.image}`,
        type: MediaImageMimeType.PNG,
        altTag: urlObj.url,
        license: MetadataLicenseType.CCO
      }
    ],
    title: `LensView Post by ${APP_LENS_HANDLE}`,
    content: `Image link for the LensView Publication: ${urlObj.image}`
    //TODO: Check for below fields usage
    // content: EncryptableMarkdown
    // attachments: [PublicationMetadataMediaVideo],
    // hideFromFeed: true,
    // encryptedWith: PublicationMetadataLitEncryption,
  });
  logger.info(
    "create-metadata.helper.util.ts: createMetaDataForImageCommentHelperUtil: Metadata for Comment Publication: " +
      JSON.stringify(imageMetadata)
  );
  logger.info(
    "create-metadata.helper.util.ts: createMetaDataForImageCommentHelperUtil: Execution Ended."
  );
  return imageMetadata;
};
