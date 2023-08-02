import uploadCommentToIPFS from './comment-anon-metadata-upload'
import {ethers, utils} from "ethers";
import {PUBLIC_LENS_HUB_CONTRACT_ADDRESS} from "$env/static/public";
import LENS_HUB_ABI from "../../abis/lens-hub-contract-abi.json";
import {getGas} from "./fetch-gas.server";
import createCommentTypedData from "../../graphql/createCommentTypedData";
import omitDeep from "omit-deep";

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
    isPosting = true;

    const contentURI = await uploadCommentToIPFS(content);
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

        console.log("Contract instance created");

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

        isPosting = false;
        console.log('successfully created comment: tx hash', tx.hash);

        return tx.hash;

    } catch (err) {
        console.log('error while trying to post image comment to post with publication ID: ', pubId);
        isPosting = false;
    }

    return isPosting;
}

export default commentAnonymously;