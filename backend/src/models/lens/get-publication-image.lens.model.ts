export interface GetPublicationImageLensModel {
    __typename: "PaginatedPublicationsResult";
    items: {
        __typename: "Comment";
        metadata: {
            __typename: "ImageMetadataV3";
            attachments: {
                __typename: "PublicationMetadataMediaImage";
                image: {
                    optimized: {
                        uri: string;
                    };
                }
            },
            rawURI: string;
        }
    }[];
}