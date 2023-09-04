import uploadCommentToIPFS from './comment-anon-metadata-upload'
import {ethers, utils} from "ethers";
import {PUBLIC_LENS_HUB_CONTRACT_ADDRESS} from "$env/static/public";
import LENS_HUB_ABI from "../../abis/lens-hub-contract-abi.json";
import {getGas} from "./fetch-gas.server";
import createCommentTypedData from "../../graphql/createCommentTypedData";
import omitDeep from "omit-deep";
import {logger} from "../../log/logManager";

let isPosting = false;


function splitSignature(signature) {
    return utils.splitSignature(signature)
}

function signedTypeData(domain, types, value, signer) {
    return signer._signTypedData(
        omitDeep(domain, "__typename"),
        omitDeep(types, "__typename"),
        omitDeep(value, "__typename")
    );
}

const signCreateCommentTypedData = async (request, client, signer) => {
    let result = await client.mutation(createCommentTypedData, {
        request
    }).toPromise();
    result = result.data.createCommentTypedData;
    const typedData = result.typedData;
    const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value, signer);
    return { result, signature };
};



const commentAnonymously = async (pubId, content, client, signer, profile) => {
    logger.info("utils/backend: comment-anonymously.server.ts :: " + "EXECUTION START: commentAnonymously : pubID " + pubId);
    isPosting = true;

    const contentURI = await uploadCommentToIPFS(content);
    if (contentURI === null) {
        logger.error("utils/backend: comment-anonymously.server.ts :: " + "EXECUTION END: commentAnonymously: Failed");
    }
    const createCommentRequest = {
        profileId: profile.id,
        publicationId: pubId,
        contentURI,
        collectModule: {
            freeCollectModule: { followerOnly: true }
        },
        referenceModule: {
            followerOnlyReferenceModule: false
        }
    };

    try {
        const signedResult = await signCreateCommentTypedData(createCommentRequest, client, signer);
        const typedData = signedResult.result.typedData;
        const { v, r, s } = splitSignature(signedResult.signature);

        const contract = new ethers.Contract(
            PUBLIC_LENS_HUB_CONTRACT_ADDRESS,
            LENS_HUB_ABI,
            signer
        )

        // get gas estimates
        const gas = await getGas();
        const maxFeePerGas = gas[0];
        const maxPriorityFeePerGas = gas[1];

        const tx = await contract.commentWithSig({
            profileId: typedData.value.profileId,
            contentURI: typedData.value.contentURI,
            profileIdPointed: typedData.value.profileIdPointed,
            pubIdPointed: typedData.value.pubIdPointed,
            collectModule: typedData.value.collectModule,
            collectModuleInitData: typedData.value.collectModuleInitData,
            referenceModule: typedData.value.referenceModule,
            referenceModuleInitData: typedData.value.referenceModuleInitData,
            referenceModuleData: typedData.value.referenceModuleData,
            sig: {
                v,
                r,
                s,
                deadline: typedData.value.deadline
            },
        },{
            maxFeePerGas:maxFeePerGas,
            maxPriorityFeePerGas:maxPriorityFeePerGas,
        })

        await tx.wait();
        logger.info("utils/backend: comment-anonymously.server.ts :: " + "Transaction Sent: commentAnonymously");
        isPosting = false;
        logger.info("utils/backend: comment-anonymously.server.ts :: " + "Transaction Confirmed: commentAnonymously : Transaction Hash: " + tx.hash);
        logger.info("utils/backend: comment-anonymously.server.ts :: " + "EXECUTION END: commentAnonymously : Commented Anonymously on pubID: " + pubId);
        return tx.hash;

    } catch (error) {
        logger.info("utils/backend: comment-anonymously.server.ts :: " + "EXECUTION END: commentAnonymously : Failed to add anonymous comment to pubID: " + pubId);
        isPosting = false;
        return isPosting;
    }
}

export default commentAnonymously;