import pkg from 'lodash';
import uploadToIPFS from "./ipfs-upload.server";
import {ethers, utils} from "ethers";
import {PUBLIC_LENS_HUB_CONTRACT_ADDRESS} from "$env/static/public";
import LENS_HUB_ABI from "../../abis/lens-hub-contract-abi.json";
import {getGas} from "./fetch-gas.server";
import createPostTypedData from "../../graphql/createPostTypedData";
import {logger} from "../../log/logManager";

const {_} = pkg;

let isPosting = false;


function splitSignature(signature) {
    return utils.splitSignature(signature)
}


function signedTypeData(domain, types, value, signer) {
    return signer._signTypedData(
        _.omit(domain, '__typename'),
        _.omit(types, '__typename'),
        _.omit(value, '__typename')
    )
}

const signCreatePostTypedData = async (request, client, signer) => {
    const result = await client.mutation(createPostTypedData, {
        request
    }).toPromise();
    const postTypedData = result.data.createPostTypedData;
    const typedData = postTypedData.typedData;
    const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value, signer);
    return {result, signature};
}

const savePost = async (urlObj, client, signer, profile) => {
    logger.info("utils/backend: add-url.server.ts :: " + "EXECUTION START: savePost");
    isPosting = true;

    const contentURI = await uploadToIPFS(urlObj);
    if (!contentURI) {
        return null;
    }

    const createPostRequest = {
        profileId: profile.id,
        contentURI,
        collectModule: {
            freeCollectModule: {followerOnly: true}
        },
        referenceModule: {
            followerOnlyReferenceModule: false
        }
    }

    try {
        const signedResult = await signCreatePostTypedData(createPostRequest, client, signer)
        const {v, r, s} = splitSignature(signedResult.signature)

        const contract = new ethers.Contract(
            PUBLIC_LENS_HUB_CONTRACT_ADDRESS,
            LENS_HUB_ABI,
            signer
        )

        // get gas estimates
        const gas = await getGas();
        const maxFeePerGas = gas[0];
        const maxPriorityFeePerGas = gas[1];

        const tx = await contract.postWithSig({
            profileId: signedResult.result.data.createPostTypedData.typedData.value.profileId,
            contentURI: signedResult.result.data.createPostTypedData.typedData.value.contentURI,
            collectModule: signedResult.result.data.createPostTypedData.typedData.value.collectModule,
            collectModuleInitData: signedResult.result.data.createPostTypedData.typedData.value.collectModuleInitData,
            referenceModule: signedResult.result.data.createPostTypedData.typedData.value.referenceModule,
            referenceModuleInitData: signedResult.result.data.createPostTypedData.typedData.value.referenceModuleInitData,
            sig: {
                v,
                r,
                s,
                deadline: signedResult.result.data.createPostTypedData.typedData.value.deadline,
            },
        }, {
            maxFeePerGas:maxFeePerGas,
            maxPriorityFeePerGas:maxPriorityFeePerGas,
        })

        await tx.wait();
        logger.info("utils/backend: add-url.server.ts :: " + "Transaction Sent: savePost");
        isPosting = false;
        logger.info("utils/backend: add-url.server.ts :: " + "Transaction Confirmed: savePost : Transaction Hash: " + tx.hash);
        logger.info("utils/backend: add-url.server.ts :: " + "EXECUTION END: savePost : URL added successfully: " + urlObj.url);
        return tx.hash;

    } catch (error) {
        logger.info("utils/backend: add-url.server.ts :: " + "EXECUTION END: savePost : Failed to add URL: " + urlObj.url);
        isPosting = false;
        return isPosting;
    }
}

export default savePost;