// const ethers = require("ethers")
require('dotenv').config()

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
const WEB3STORAGE_TOKEN = process.env.WEB3STORAGE_TOKEN

const lens_hub_abi =  require('../contracts/abi/lenshub.json')

const {LENSHUB} = require('../contracts/abi/lenshub.json');

const LENS_HUB_CONTRACT_ADDRESS = "0x60Ae865ee4C725cd04353b5AAb364553f56ceF82"

const {ethers} = require('ethers');
const { createClient } = require('@urql/core');
const {getGas} = require('./gas_testing')
const API_URL = 'https://api-mumbai.lens.dev'
const challenge = `
    query Challenge($address: EthereumAddress!) {
        challenge(request: { address: $address }) {
            text
        }
    }
`;
const authenticate = `
    mutation Authenticate(
        $address: EthereumAddress!
        $signature: Signature!
    ) {
        authenticate(request: {
            address: $address,
            signature: $signature
        }) {
            accessToken
            refreshToken
        }
    }
`

let address = "0xb4Ac88D8312fffaF6334FF20Db91594f75ebA899";
let accessTokenFromLens;
let isSignedIn = false;
let signer;

let client = createClient({
    url: API_URL
});



/**
 * 2. i. Sign In with Lens
 *    ii. Get Access Token
 *    iii. Update Client with new Access Token
 */
async function signInWithLens() {

    try {
        /* first request the challenge from the API server */
        const challengeInfo = await client.query(challenge, {address}).toPromise();
        const provider = new ethers.providers.AlchemyProvider("maticmum", API_KEY);
        console.log(process.env.PRIVATE_KEY)
        signer = new ethers.Wallet(PRIVATE_KEY, provider);
        /* ask the user to sign a message with the challenge info returned from the server */
        const signature = await signer.signMessage(challengeInfo.data.challenge.text);
        /* authenticate the user */
        const authData = await client.mutation(authenticate, {address, signature}).toPromise();
        /* if user authentication is successful, you will receive an accessToken and refreshToken */
        const {data: {authenticate: {accessToken}}} = authData
        console.log({accessToken})
        accessTokenFromLens = accessToken;

        /** you can now use the accessToken to make authenticated requests to the API server **/
        /** Update client with new accessToken **/
        client = createClient({
            url: API_URL,
            fetchOptions: {
                headers: {
                    'x-access-token': `Bearer ${accessTokenFromLens}`
                },
            },
        });
        isSignedIn = true;

        /** Getting profile of the connected user and saving it to "profile" variable **/
        profile = await getUserProfile();
        console.log("Profile: " + profile);
    } catch (err) {
        console.log('Error signing in: ', err)
    }
}

/********************************************************/

/**
 * 3. Get Profile
 */

const getDefaultProfile = `
query DefaultProfile($address: EthereumAddress!) {
  defaultProfile(request: { ethereumAddress: $address}) {
    id
    name
    bio
    isDefault
    attributes {
      displayType
      traitType
      key
      value
    }
    followNftAddress
    metadata
    handle
    picture {
      ... on NftImage {
        contractAddress
        tokenId
        uri
        chainId
        verified
      }
      ... on MediaSet {
        original {
          url
          mimeType
        }
      }
    }
    coverPicture {
      ... on NftImage {
        contractAddress
        tokenId
        uri
        chainId
        verified
      }
      ... on MediaSet {
        original {
          url
          mimeType
        }
      }
    }
    ownedBy
    dispatcher {
      address
      canUseRelay
    }
    stats {
      totalFollowers
      totalFollowing
      totalPosts
      totalComments
      totalMirrors
      totalPublications
      totalCollects
    }
    followModule {
      ... on FeeFollowModuleSettings {
        type
        contractAddress
        amount {
          asset {
            name
            symbol
            decimals
            address
          }
          value
        }
        recipient
      }
      ... on ProfileFollowModuleSettings {
       type
      }
      ... on RevertFollowModuleSettings {
       type
      }
    }
  }
}

`
let profile;

const getUserProfile = async () => {
    try {
        console.log("Get User Profile Called")
        const response = await client.query(getDefaultProfile, {
            address
        }).toPromise()
        return response.data.defaultProfile;
    } catch (err) {
        console.log('error fetching user profile...: ', err)
    }
}

/*********************************************************/

const { v4: uuidv4 } = require('uuid');

/** Hard coded post value for testing **/
let userEnteredContent = "Gas estimates added testing";

/**
 * Web3 Storage Code
 */
const {Web3Storage} = require('web3.storage');
const { File } = require('web3.storage')

function getAccessToken() {
    // If you're just testing, you can paste in a token
    // and uncomment the following line:
    // return 'paste-your-token-here'

    // In a real app, it's better to read an access token from an
    // environement variable or other configuration that's kept outside of
    // your code base. For this to work, you need to set the
    // WEB3STORAGE_TOKEN environment variable before you run your code.
    // Get the web3.storage access token from the API token section

    return WEB3STORAGE_TOKEN;
}

function makeStorageClient() {
    return new Web3Storage({token: getAccessToken()})
}

function makeFileObjects(url) {
    // You can create File objects from a Blob of binary data
    // see: https://developer.mozilla.org/en-US/docs/Web/API/Blob
    // Here we're just storing a JSON object, but you can store images,
    // audio, or whatever you want!

    // //Getting profile of the connected user and saving it to "profile" variable
    // getUserProfile(address);

    const metaData = {
        version: '2.0.0',
        content: userEnteredContent,
        description: userEnteredContent,
        name: `Posting on test-net through lensView`,
        external_url: 'https://lensView.xyz',
        metadata_id: uuidv4(),
        mainContentFocus: 'TEXT_ONLY',
        attributes: [],
        locale: 'en-US',
        appId: 'LensView',
        tags: [url]
    }
    const blob = new Blob([JSON.stringify(metaData)], {type: 'application/json'})
    // const buffer = Buffer.from(JSON.stringify(metaData))


    const files = [
        new File(['contents-of-file-1'], 'plain-utf8.txt'),
        new File([blob], 'metaData.json')
    ]
    return files
}

/*********************************/

/**
 * 4. Upload to IPFS
 */
const uploadToIPFS = async (url) => {

    /*** Web3.storage ***/
    const client = makeStorageClient()
    console.log(makeFileObjects())
    const cid = await client.put(makeFileObjects(url))
    console.log('stored files with cid:', cid)
    const uri = `https://${cid}.ipfs.w3s.link/metaData.json`

    console.log("URI : " + uri);
    return uri
}
/*********************************/

/**
 * 5. Create Signed Post Typed Data
 */
// const {omitDeep} = require('omit-deep');
const {_} = require('lodash');

const createPostTypedData = `
mutation createPostTypedData($request: CreatePublicPostRequest!) {
  createPostTypedData(request: $request) {
    id
    expiresAt
    typedData {
      types {
        PostWithSig {
          name
          type
        }
      }
      domain {
        name
        chainId
        version
        verifyingContract
      }
      value {
        nonce
        deadline
        profileId
        contentURI
        collectModule
        collectModuleInitData
        referenceModule
        referenceModuleInitData
      }
    }
  }
}
`

const CreateProfile = `
mutation createProfile($request: CreateProfileRequest!) {
  createProfile(request: $request) {
    ... on RelayerResult {
      txHash
    }
    ... on RelayError {
      reason
    }
    __typename
  }
}
`

function signedTypeData(domain, types, value) {
    return signer._signTypedData(
        _.omit(domain, '__typename'),
        _.omit(types, '__typename'),
        _.omit(value, '__typename')
    )
}

const signCreatePostTypedData = async (request) => {
    let result = await client.mutation(createPostTypedData, {
        request
    }).toPromise();
    result = result.data.createPostTypedData;
    // console.log('create post: createPostTypedData', result);

    const typedData = result.typedData;
    // console.log('create post: typedData', typedData);

    const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value);
    // console.log('create post: signature', signature);

    return {result, signature};
}

/**********************************************************/

/**
 * 6. Split Signature
 */
const {utils} = require('ethers');

function splitSignature(signature) {
    return utils.splitSignature(signature)
}

/*********************************/



let isPosting = false;
let savePost = async (url) => {
    isPosting = true;
    console.log("Post called :");
    const contentURI = await uploadToIPFS(url)
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
        const signedResult = await signCreatePostTypedData(createPostRequest)
        console.log("signedResult : " + JSON.stringify(signedResult));
        const typedData = signedResult.result.typedData;
        const {v, r, s} = splitSignature(signedResult.signature)

        console.log("v : " + v);
        console.log("r : " + r);
        console.log("s : " + s);

        const contract = new ethers.Contract(
            LENS_HUB_CONTRACT_ADDRESS,
            lens_hub_abi,
            signer
        )

        console.log("Contract instance created");

        // get gas estimates
        const gas = await getGas();
        const maxFeePerGas = gas[0]
        const maxPriorityFeePerGas = gas[1]


        const tx = await contract.postWithSig({
            profileId: typedData.value.profileId,
            contentURI: typedData.value.contentURI,
            collectModule: typedData.value.collectModule,
            collectModuleInitData: typedData.value.collectModuleInitData,
            referenceModule: typedData.value.referenceModule,
            referenceModuleInitData: typedData.value.referenceModuleInitData,
            sig: {
                v,
                r,
                s,
                deadline: typedData.value.deadline,
            },
        }, {
            maxFeePerGas,
            maxPriorityFeePerGas,
        })

        await tx.wait()



        isPosting = false;
        console.log('successfully created post: tx hash', tx.hash);
        console.log('successfully created post: tx hash', JSON.stringify(tx));

        console.log("gas estimates",maxFeePerGas, maxPriorityFeePerGas)
    } catch (err) {
        console.log('error: ', err);
        isPosting = false;
    }
}

/*******************************************************/






// const contract = require("../artifacts/contracts/LensStorage.sol/LensStorage.json")


// const LensStorageContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer)

async function getUrl(id) {
    const url = await LensStorageContract.urls(id)
    console.log(url)
    return url
}

async function addPublication(url, publicationID) {
    // console.log("Writing to contract 0x1eFa4D3BC84EF7C06cD8Ff8B0d7747E1a88fbC43..")
    // const trx = await LensStorageContract.addPublication(url, publicationID)
    // const response = await trx.wait()

    console.log("Inside addPublicationTo function");

    await signInWithLens();
    console.log("Hashed URL", url)
    await savePost(url);

    console.log("Successfully posted;")
    // if(response == "ok") {
    //     // console.log("Publication: " + publicationID +" added to url: " + url)
    //     console.log("Posted successfully");
    // } else {
    //     console.log("Transaction failed")
    // }
}

async function createNewProfile(handle) {

    try {
        console.log("Creating new profile for:" + address);

        await signInWithLens();

        const createProfileResult = await createProfileRequest({
            handle: handle,
        });

        console.log('create profile: result', createProfileResult);
        return true
    } catch {
        return false
    }


}

const createProfileRequest = async (request) => {
    let result = await client.mutation(CreateProfile, {
        request
    }).toPromise();

    return result.data.createProfile;
};


module.exports = {addPublication, createNewProfile}
// addPublication("testing", "1234")