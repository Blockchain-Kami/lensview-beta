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
  let tags: string[];
  const userTags = urlObj.tags;
  const URLtags = [urlObj.hashedURL, urlObj.hostname, urlObj.domain];
  const allTags = userTags ? userTags.concat(URLtags) : URLtags;
  tags = urlObj.query ? createTagsHelperUtil(allTags, urlObj.query) : allTags;
  const lensHandle = urlObj.lensHandle
    ? `${urlObj.lensHandle}`
    : APP_LENS_HANDLE;

  urlObj["lensHandle"] !== APP_LENS_HANDLE
    ? tags.push(TAG_USER_PUB) // userPub
    : tags.push(TAG_ANONYMOUS_PUB); // anonymousPub

  tags = [...new Set(tags)];

  return link({
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
      }
    ],
    sharingLink: urlObj.url,
    content: `LensView Post by ${lensHandle}`
    //TODO: Check the fields below for potential usage in LensView
    // attachments: [PublicationMetadataMediaVideo],
    // "encryptedWith": PublicationMetadataLitEncryption,
    // "hideFromFeed": true,
  });
};

export const createMetaDataForAnonymousCommentHelperUtil = (
  comment: string,
  mainPostImageUrl: string,
  isThisComment: boolean
) => {
  const tags = [TAG_ANONYMOUS_PUB]; // anonymousPub
  if (isThisComment) {
    tags.push(TAG_USER_COMMENT); // userComment
  } else {
    tags.push(TAG_USER_POST); // userPost
  }
  return textOnly({
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
        value: Date.now().toString()
      },
      {
        key: "mainPostImageUrl",
        type: MetadataAttributeType.STRING,
        value: mainPostImageUrl
      }
    ],
    content: comment
    //TODO: Check for below fields usage
    // encryptedWith: PublicationMetadataLitEncryption,
    // hideFromFeed: false,
  });
};

export const createMetaDataForImageCommentHelperUtil = (
  urlObj: MetadataObjectModel
) => {
  return image({
    locale: "en-US",
    tags: [TAG_IMAGE_PUB], // imagePub
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
        value: Date.now().toString()
      }
    ],
    image: {
      item: `${urlObj.image}`,
      type: MediaImageMimeType.PNG,
      altTag: urlObj.hostname,
      license: MetadataLicenseType.CCO
    },
    attachments: [
      {
        item: `${urlObj.image}`,
        type: MediaImageMimeType.PNG,
        altTag: urlObj.hostname,
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
};
