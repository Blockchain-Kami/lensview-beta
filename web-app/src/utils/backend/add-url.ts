import {_} from 'lodash';

import uploadToIPFS from "./ipfs-upload";
import {ethers, utils} from "ethers";
import {PUBLIC_LENS_HUB_CONTRACT_ADDRESS} from "$env/static/public";
import LENS_HUB_ABI from "../../abis/lens-hub-contract-abi.json";
import {getGas} from "./fetch-gas.server";
import createPostTypedData from "../../graphql/createPostTypedData";

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
    // console.log('create post: createPostTypedData', result);

    const typedData = postTypedData.typedData;
    console.log('create post: typedData', typedData.value);

    const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value, signer);
    console.log('create post: signature', signature);

    return {result, signature};
}

const savePost = async (url, hashedURL, client, signer, profile) => {
    isPosting = true;
    console.log("Post called :");
    const contentURI = await uploadToIPFS(url, hashedURL)
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
        console.log("signedResult : " + JSON.stringify(signedResult));

        const {v, r, s} = splitSignature(signedResult.signature)

        console.log("v : " + v);
        console.log("r : " + r);
        console.log("s : " + s);

        const contract = new ethers.Contract(
            PUBLIC_LENS_HUB_CONTRACT_ADDRESS,
            LENS_HUB_ABI,
            signer
        )

        console.log("Contract instance created");

        // get gas estimates
        const gas = await getGas();
        const maxFeePerGas = gas[0]
        const maxPriorityFeePerGas = gas[1]

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

        isPosting = false;
        console.log('successfully created post: tx hash', tx.hash);
        console.log('successfully created post: tx hash', JSON.stringify(tx));

    } catch (err) {
        console.log('error: ', err);
        isPosting = false;
    }

    return isPosting;
}

export default savePost;