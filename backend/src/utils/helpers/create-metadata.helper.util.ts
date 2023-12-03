import {
  image,
  link,
  MediaImageMimeType,
  MetadataAttributeType,
  MetadataLicenseType,
  textOnly
} from "@lens-protocol/metadata";
import {
  PUBLIC_SOURCE_APP_ID,
  PUBLIC_APP_LENS_HANDLE
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
    : PUBLIC_APP_LENS_HANDLE;

  urlObj["lensHandle"]
    ? tags.push("0f89daeb0a63c7b73224315c5514c21ba0453985")
    : tags.push("418f361f5cdc602c856956bf752c06a29c52e54a");

  tags = [...new Set(tags)];

  return link({
    locale: "en-US",
    tags: tags,
    appId: PUBLIC_SOURCE_APP_ID,
    attributes: [
      {
        key: "creator",
        type: MetadataAttributeType.STRING,
        value: lensHandle
      },
      {
        key: "app",
        type: MetadataAttributeType.STRING,
        value: PUBLIC_SOURCE_APP_ID
      },
      {
        key: "created on",
        type: MetadataAttributeType.STRING,
        value: `${new Date().toJSON().slice(0, 10)}`
      }
    ],
    sharingLink: urlObj.url,
    content: "Post by @testlenviewcode"
    //TODO: Check the fields below for potential usage in LensView
    // attachments: [PublicationMetadataMediaVideo],
    // "encryptedWith": PublicationMetadataLitEncryption,
    // "hideFromFeed": true,
  });
};

export const createMetaDataForAnonymousCommentHelperUtil = (
  comment: string | null
) => {
  return textOnly({
    locale: "en-US",
    tags: ["418f361f5cdc602c856956bf752c06a29c52e54a"], //anonymousHash
    appId: PUBLIC_SOURCE_APP_ID,
    attributes: [
      {
        key: "creator",
        type: MetadataAttributeType.STRING,
        value: PUBLIC_APP_LENS_HANDLE
      },
      {
        key: "app",
        type: MetadataAttributeType.STRING,
        value: PUBLIC_SOURCE_APP_ID
      },
      {
        key: "created on",
        type: MetadataAttributeType.STRING,
        value: Date.now().toString()
      }
    ],
    content: comment ? comment : "Comment by @testlenviewcode"
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
    tags: ["dd472d3370b389eb8399ea7c795ca9e76ff0d4d7"], //imagePub
    appId: PUBLIC_SOURCE_APP_ID,
    attributes: [
      {
        key: "creator",
        type: MetadataAttributeType.STRING,
        value: PUBLIC_APP_LENS_HANDLE
      },
      {
        key: "app",
        type: MetadataAttributeType.STRING,
        value: PUBLIC_SOURCE_APP_ID
      },
      {
        key: "created on",
        type: MetadataAttributeType.STRING,
        value: Date.now().toString()
      }
    ],
    image: {
      item: `${urlObj.image}`,
      type: MediaImageMimeType.PNG,
      altTag: "Me touching grass",
      license: MetadataLicenseType.CCO
    },
    attachments: [
      {
        item: `${urlObj.image}`,
        type: MediaImageMimeType.PNG,
        altTag: "LensView Publication Image",
        license: MetadataLicenseType.CCO
      }
    ],
    title: "Post by @testlenviewcode",
    content: `Image link for the url: ${urlObj.image}`
    //TODO: Check for below fields usage
    // content: EncryptableMarkdown
    // attachments: [PublicationMetadataMediaVideo],
    // hideFromFeed: true,
    // encryptedWith: PublicationMetadataLitEncryption,
  });
};
