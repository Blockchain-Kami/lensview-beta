// const ethers = require("ethers")
require('dotenv').config()

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
const WEB3STORAGE_TOKEN = process.env.WEB3STORAGE_TOKEN

const {ethers} = require('ethers');
const { createClient } = require('@urql/core');
const API_URL = 'https://api.lens.dev'
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

let address = "0xBFfCe813B6c14D8659057dD3111D3F83CEE271b8";
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
        const provider = new ethers.providers.AlchemyProvider("matic", API_KEY);
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
let userEnteredContent = "Testing post from server";

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

function makeFileObjects() {
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
        name: `Post by xyz`,
        external_url: 'https://lensView.xyz',
        metadata_id: uuidv4(),
        mainContentFocus: 'TEXT_ONLY',
        attributes: [],
        locale: 'en-US',
        appId: 'http://a.b.c.d.e.f.g.h.i.j.k.l.m.n.oo.pp.qqq.rrrr.ssssss.tttttttt.uuuuuuuuuuu.vvvvvvvvvvvvvvv.wwwwwwwwwwwwwwwwwwwwww.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy.zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz.me/'
    }
    // const blob = new Blob([JSON.stringify(metaData)], {type: 'application/json'})
    const buffer = Buffer.from(JSON.stringify(metaData))


    const files = [
        new File(['contents-of-file-1'], 'plain-utf8.txt'),
        new File([buffer], 'metaData.json')
    ]
    return files
}

/*********************************/

/**
 * 4. Upload to IPFS
 */
const uploadToIPFS = async () => {

    /*** Web3.storage ***/
    const client = makeStorageClient()
    const cid = await client.put(makeFileObjects())
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

const {LENSHUB} = require('../contracts/abi/lenshub.json');

const LENS_HUB_CONTRACT_ADDRESS = "0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d"

let isPosting = false;
let savePost = async () => {
    isPosting = true;
    console.log("Post called :");
    const contentURI = await uploadToIPFS()
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
            [
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "followNFTImpl",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "collectNFTImpl",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "constructor"
                },
                {
                    "inputs": [],
                    "name": "CallerNotCollectNFT",
                    "type": "error"
                },
                {
                    "inputs": [],
                    "name": "CallerNotFollowNFT",
                    "type": "error"
                },
                {
                    "inputs": [],
                    "name": "CannotInitImplementation",
                    "type": "error"
                },
                {
                    "inputs": [],
                    "name": "EmergencyAdminCannotUnpause",
                    "type": "error"
                },
                {
                    "inputs": [],
                    "name": "InitParamsInvalid",
                    "type": "error"
                },
                {
                    "inputs": [],
                    "name": "Initialized",
                    "type": "error"
                },
                {
                    "inputs": [],
                    "name": "NotGovernance",
                    "type": "error"
                },
                {
                    "inputs": [],
                    "name": "NotGovernanceOrEmergencyAdmin",
                    "type": "error"
                },
                {
                    "inputs": [],
                    "name": "NotOwnerOrApproved",
                    "type": "error"
                },
                {
                    "inputs": [],
                    "name": "NotProfileOwner",
                    "type": "error"
                },
                {
                    "inputs": [],
                    "name": "NotProfileOwnerOrDispatcher",
                    "type": "error"
                },
                {
                    "inputs": [],
                    "name": "Paused",
                    "type": "error"
                },
                {
                    "inputs": [],
                    "name": "ProfileCreatorNotWhitelisted",
                    "type": "error"
                },
                {
                    "inputs": [],
                    "name": "ProfileImageURILengthInvalid",
                    "type": "error"
                },
                {
                    "inputs": [],
                    "name": "PublicationDoesNotExist",
                    "type": "error"
                },
                {
                    "inputs": [],
                    "name": "PublishingPaused",
                    "type": "error"
                },
                {
                    "inputs": [],
                    "name": "SignatureExpired",
                    "type": "error"
                },
                {
                    "inputs": [],
                    "name": "SignatureInvalid",
                    "type": "error"
                },
                {
                    "inputs": [],
                    "name": "ZeroSpender",
                    "type": "error"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "owner",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "approved",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "internalType": "uint256",
                            "name": "tokenId",
                            "type": "uint256"
                        }
                    ],
                    "name": "Approval",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "owner",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "operator",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "internalType": "bool",
                            "name": "approved",
                            "type": "bool"
                        }
                    ],
                    "name": "ApprovalForAll",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "from",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "to",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "internalType": "uint256",
                            "name": "tokenId",
                            "type": "uint256"
                        }
                    ],
                    "name": "Transfer",
                    "type": "event"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "to",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "tokenId",
                            "type": "uint256"
                        }
                    ],
                    "name": "approve",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "owner",
                            "type": "address"
                        }
                    ],
                    "name": "balanceOf",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "tokenId",
                            "type": "uint256"
                        }
                    ],
                    "name": "burn",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "tokenId",
                            "type": "uint256"
                        },
                        {
                            "components": [
                                {
                                    "internalType": "uint8",
                                    "name": "v",
                                    "type": "uint8"
                                },
                                {
                                    "internalType": "bytes32",
                                    "name": "r",
                                    "type": "bytes32"
                                },
                                {
                                    "internalType": "bytes32",
                                    "name": "s",
                                    "type": "bytes32"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "deadline",
                                    "type": "uint256"
                                }
                            ],
                            "internalType": "struct DataTypes.EIP712Signature",
                            "name": "sig",
                            "type": "tuple"
                        }
                    ],
                    "name": "burnWithSig",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "profileId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "pubId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bytes",
                            "name": "data",
                            "type": "bytes"
                        }
                    ],
                    "name": "collect",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "components": [
                                {
                                    "internalType": "address",
                                    "name": "collector",
                                    "type": "address"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "profileId",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "pubId",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "bytes",
                                    "name": "data",
                                    "type": "bytes"
                                },
                                {
                                    "components": [
                                        {
                                            "internalType": "uint8",
                                            "name": "v",
                                            "type": "uint8"
                                        },
                                        {
                                            "internalType": "bytes32",
                                            "name": "r",
                                            "type": "bytes32"
                                        },
                                        {
                                            "internalType": "bytes32",
                                            "name": "s",
                                            "type": "bytes32"
                                        },
                                        {
                                            "internalType": "uint256",
                                            "name": "deadline",
                                            "type": "uint256"
                                        }
                                    ],
                                    "internalType": "struct DataTypes.EIP712Signature",
                                    "name": "sig",
                                    "type": "tuple"
                                }
                            ],
                            "internalType": "struct DataTypes.CollectWithSigData",
                            "name": "vars",
                            "type": "tuple"
                        }
                    ],
                    "name": "collectWithSig",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "components": [
                                {
                                    "internalType": "uint256",
                                    "name": "profileId",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "string",
                                    "name": "contentURI",
                                    "type": "string"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "profileIdPointed",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "pubIdPointed",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "bytes",
                                    "name": "referenceModuleData",
                                    "type": "bytes"
                                },
                                {
                                    "internalType": "address",
                                    "name": "collectModule",
                                    "type": "address"
                                },
                                {
                                    "internalType": "bytes",
                                    "name": "collectModuleInitData",
                                    "type": "bytes"
                                },
                                {
                                    "internalType": "address",
                                    "name": "referenceModule",
                                    "type": "address"
                                },
                                {
                                    "internalType": "bytes",
                                    "name": "referenceModuleInitData",
                                    "type": "bytes"
                                }
                            ],
                            "internalType": "struct DataTypes.CommentData",
                            "name": "vars",
                            "type": "tuple"
                        }
                    ],
                    "name": "comment",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "components": [
                                {
                                    "internalType": "uint256",
                                    "name": "profileId",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "string",
                                    "name": "contentURI",
                                    "type": "string"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "profileIdPointed",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "pubIdPointed",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "bytes",
                                    "name": "referenceModuleData",
                                    "type": "bytes"
                                },
                                {
                                    "internalType": "address",
                                    "name": "collectModule",
                                    "type": "address"
                                },
                                {
                                    "internalType": "bytes",
                                    "name": "collectModuleInitData",
                                    "type": "bytes"
                                },
                                {
                                    "internalType": "address",
                                    "name": "referenceModule",
                                    "type": "address"
                                },
                                {
                                    "internalType": "bytes",
                                    "name": "referenceModuleInitData",
                                    "type": "bytes"
                                },
                                {
                                    "components": [
                                        {
                                            "internalType": "uint8",
                                            "name": "v",
                                            "type": "uint8"
                                        },
                                        {
                                            "internalType": "bytes32",
                                            "name": "r",
                                            "type": "bytes32"
                                        },
                                        {
                                            "internalType": "bytes32",
                                            "name": "s",
                                            "type": "bytes32"
                                        },
                                        {
                                            "internalType": "uint256",
                                            "name": "deadline",
                                            "type": "uint256"
                                        }
                                    ],
                                    "internalType": "struct DataTypes.EIP712Signature",
                                    "name": "sig",
                                    "type": "tuple"
                                }
                            ],
                            "internalType": "struct DataTypes.CommentWithSigData",
                            "name": "vars",
                            "type": "tuple"
                        }
                    ],
                    "name": "commentWithSig",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "components": [
                                {
                                    "internalType": "address",
                                    "name": "to",
                                    "type": "address"
                                },
                                {
                                    "internalType": "string",
                                    "name": "handle",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "imageURI",
                                    "type": "string"
                                },
                                {
                                    "internalType": "address",
                                    "name": "followModule",
                                    "type": "address"
                                },
                                {
                                    "internalType": "bytes",
                                    "name": "followModuleInitData",
                                    "type": "bytes"
                                },
                                {
                                    "internalType": "string",
                                    "name": "followNFTURI",
                                    "type": "string"
                                }
                            ],
                            "internalType": "struct DataTypes.CreateProfileData",
                            "name": "vars",
                            "type": "tuple"
                        }
                    ],
                    "name": "createProfile",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "wallet",
                            "type": "address"
                        }
                    ],
                    "name": "defaultProfile",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "profileId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "pubId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "collectNFTId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "address",
                            "name": "from",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "to",
                            "type": "address"
                        }
                    ],
                    "name": "emitCollectNFTTransferEvent",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "profileId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "followNFTId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "address",
                            "name": "from",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "to",
                            "type": "address"
                        }
                    ],
                    "name": "emitFollowNFTTransferEvent",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "tokenId",
                            "type": "uint256"
                        }
                    ],
                    "name": "exists",
                    "outputs": [
                        {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256[]",
                            "name": "profileIds",
                            "type": "uint256[]"
                        },
                        {
                            "internalType": "bytes[]",
                            "name": "datas",
                            "type": "bytes[]"
                        }
                    ],
                    "name": "follow",
                    "outputs": [
                        {
                            "internalType": "uint256[]",
                            "name": "",
                            "type": "uint256[]"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "components": [
                                {
                                    "internalType": "address",
                                    "name": "follower",
                                    "type": "address"
                                },
                                {
                                    "internalType": "uint256[]",
                                    "name": "profileIds",
                                    "type": "uint256[]"
                                },
                                {
                                    "internalType": "bytes[]",
                                    "name": "datas",
                                    "type": "bytes[]"
                                },
                                {
                                    "components": [
                                        {
                                            "internalType": "uint8",
                                            "name": "v",
                                            "type": "uint8"
                                        },
                                        {
                                            "internalType": "bytes32",
                                            "name": "r",
                                            "type": "bytes32"
                                        },
                                        {
                                            "internalType": "bytes32",
                                            "name": "s",
                                            "type": "bytes32"
                                        },
                                        {
                                            "internalType": "uint256",
                                            "name": "deadline",
                                            "type": "uint256"
                                        }
                                    ],
                                    "internalType": "struct DataTypes.EIP712Signature",
                                    "name": "sig",
                                    "type": "tuple"
                                }
                            ],
                            "internalType": "struct DataTypes.FollowWithSigData",
                            "name": "vars",
                            "type": "tuple"
                        }
                    ],
                    "name": "followWithSig",
                    "outputs": [
                        {
                            "internalType": "uint256[]",
                            "name": "",
                            "type": "uint256[]"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "tokenId",
                            "type": "uint256"
                        }
                    ],
                    "name": "getApproved",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "profileId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "pubId",
                            "type": "uint256"
                        }
                    ],
                    "name": "getCollectModule",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "profileId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "pubId",
                            "type": "uint256"
                        }
                    ],
                    "name": "getCollectNFT",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "getCollectNFTImpl",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "profileId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "pubId",
                            "type": "uint256"
                        }
                    ],
                    "name": "getContentURI",
                    "outputs": [
                        {
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "profileId",
                            "type": "uint256"
                        }
                    ],
                    "name": "getDispatcher",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "getDomainSeparator",
                    "outputs": [
                        {
                            "internalType": "bytes32",
                            "name": "",
                            "type": "bytes32"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "profileId",
                            "type": "uint256"
                        }
                    ],
                    "name": "getFollowModule",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "profileId",
                            "type": "uint256"
                        }
                    ],
                    "name": "getFollowNFT",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "getFollowNFTImpl",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "profileId",
                            "type": "uint256"
                        }
                    ],
                    "name": "getFollowNFTURI",
                    "outputs": [
                        {
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "getGovernance",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "profileId",
                            "type": "uint256"
                        }
                    ],
                    "name": "getHandle",
                    "outputs": [
                        {
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "profileId",
                            "type": "uint256"
                        }
                    ],
                    "name": "getProfile",
                    "outputs": [
                        {
                            "components": [
                                {
                                    "internalType": "uint256",
                                    "name": "pubCount",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "address",
                                    "name": "followModule",
                                    "type": "address"
                                },
                                {
                                    "internalType": "address",
                                    "name": "followNFT",
                                    "type": "address"
                                },
                                {
                                    "internalType": "string",
                                    "name": "handle",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "imageURI",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "followNFTURI",
                                    "type": "string"
                                }
                            ],
                            "internalType": "struct DataTypes.ProfileStruct",
                            "name": "",
                            "type": "tuple"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "string",
                            "name": "handle",
                            "type": "string"
                        }
                    ],
                    "name": "getProfileIdByHandle",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "profileId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "pubId",
                            "type": "uint256"
                        }
                    ],
                    "name": "getPub",
                    "outputs": [
                        {
                            "components": [
                                {
                                    "internalType": "uint256",
                                    "name": "profileIdPointed",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "pubIdPointed",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "string",
                                    "name": "contentURI",
                                    "type": "string"
                                },
                                {
                                    "internalType": "address",
                                    "name": "referenceModule",
                                    "type": "address"
                                },
                                {
                                    "internalType": "address",
                                    "name": "collectModule",
                                    "type": "address"
                                },
                                {
                                    "internalType": "address",
                                    "name": "collectNFT",
                                    "type": "address"
                                }
                            ],
                            "internalType": "struct DataTypes.PublicationStruct",
                            "name": "",
                            "type": "tuple"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "profileId",
                            "type": "uint256"
                        }
                    ],
                    "name": "getPubCount",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "profileId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "pubId",
                            "type": "uint256"
                        }
                    ],
                    "name": "getPubPointer",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "profileId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "pubId",
                            "type": "uint256"
                        }
                    ],
                    "name": "getPubType",
                    "outputs": [
                        {
                            "internalType": "enum DataTypes.PubType",
                            "name": "",
                            "type": "uint8"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "profileId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "pubId",
                            "type": "uint256"
                        }
                    ],
                    "name": "getReferenceModule",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "getState",
                    "outputs": [
                        {
                            "internalType": "enum DataTypes.ProtocolState",
                            "name": "",
                            "type": "uint8"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "string",
                            "name": "name",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "symbol",
                            "type": "string"
                        },
                        {
                            "internalType": "address",
                            "name": "newGovernance",
                            "type": "address"
                        }
                    ],
                    "name": "initialize",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "owner",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "operator",
                            "type": "address"
                        }
                    ],
                    "name": "isApprovedForAll",
                    "outputs": [
                        {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "collectModule",
                            "type": "address"
                        }
                    ],
                    "name": "isCollectModuleWhitelisted",
                    "outputs": [
                        {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "followModule",
                            "type": "address"
                        }
                    ],
                    "name": "isFollowModuleWhitelisted",
                    "outputs": [
                        {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "profileCreator",
                            "type": "address"
                        }
                    ],
                    "name": "isProfileCreatorWhitelisted",
                    "outputs": [
                        {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "referenceModule",
                            "type": "address"
                        }
                    ],
                    "name": "isReferenceModuleWhitelisted",
                    "outputs": [
                        {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "tokenId",
                            "type": "uint256"
                        }
                    ],
                    "name": "mintTimestampOf",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "components": [
                                {
                                    "internalType": "uint256",
                                    "name": "profileId",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "profileIdPointed",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "pubIdPointed",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "bytes",
                                    "name": "referenceModuleData",
                                    "type": "bytes"
                                },
                                {
                                    "internalType": "address",
                                    "name": "referenceModule",
                                    "type": "address"
                                },
                                {
                                    "internalType": "bytes",
                                    "name": "referenceModuleInitData",
                                    "type": "bytes"
                                }
                            ],
                            "internalType": "struct DataTypes.MirrorData",
                            "name": "vars",
                            "type": "tuple"
                        }
                    ],
                    "name": "mirror",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "components": [
                                {
                                    "internalType": "uint256",
                                    "name": "profileId",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "profileIdPointed",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "pubIdPointed",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "bytes",
                                    "name": "referenceModuleData",
                                    "type": "bytes"
                                },
                                {
                                    "internalType": "address",
                                    "name": "referenceModule",
                                    "type": "address"
                                },
                                {
                                    "internalType": "bytes",
                                    "name": "referenceModuleInitData",
                                    "type": "bytes"
                                },
                                {
                                    "components": [
                                        {
                                            "internalType": "uint8",
                                            "name": "v",
                                            "type": "uint8"
                                        },
                                        {
                                            "internalType": "bytes32",
                                            "name": "r",
                                            "type": "bytes32"
                                        },
                                        {
                                            "internalType": "bytes32",
                                            "name": "s",
                                            "type": "bytes32"
                                        },
                                        {
                                            "internalType": "uint256",
                                            "name": "deadline",
                                            "type": "uint256"
                                        }
                                    ],
                                    "internalType": "struct DataTypes.EIP712Signature",
                                    "name": "sig",
                                    "type": "tuple"
                                }
                            ],
                            "internalType": "struct DataTypes.MirrorWithSigData",
                            "name": "vars",
                            "type": "tuple"
                        }
                    ],
                    "name": "mirrorWithSig",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "name",
                    "outputs": [
                        {
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "tokenId",
                            "type": "uint256"
                        }
                    ],
                    "name": "ownerOf",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "spender",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "tokenId",
                            "type": "uint256"
                        },
                        {
                            "components": [
                                {
                                    "internalType": "uint8",
                                    "name": "v",
                                    "type": "uint8"
                                },
                                {
                                    "internalType": "bytes32",
                                    "name": "r",
                                    "type": "bytes32"
                                },
                                {
                                    "internalType": "bytes32",
                                    "name": "s",
                                    "type": "bytes32"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "deadline",
                                    "type": "uint256"
                                }
                            ],
                            "internalType": "struct DataTypes.EIP712Signature",
                            "name": "sig",
                            "type": "tuple"
                        }
                    ],
                    "name": "permit",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "owner",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "operator",
                            "type": "address"
                        },
                        {
                            "internalType": "bool",
                            "name": "approved",
                            "type": "bool"
                        },
                        {
                            "components": [
                                {
                                    "internalType": "uint8",
                                    "name": "v",
                                    "type": "uint8"
                                },
                                {
                                    "internalType": "bytes32",
                                    "name": "r",
                                    "type": "bytes32"
                                },
                                {
                                    "internalType": "bytes32",
                                    "name": "s",
                                    "type": "bytes32"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "deadline",
                                    "type": "uint256"
                                }
                            ],
                            "internalType": "struct DataTypes.EIP712Signature",
                            "name": "sig",
                            "type": "tuple"
                        }
                    ],
                    "name": "permitForAll",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "components": [
                                {
                                    "internalType": "uint256",
                                    "name": "profileId",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "string",
                                    "name": "contentURI",
                                    "type": "string"
                                },
                                {
                                    "internalType": "address",
                                    "name": "collectModule",
                                    "type": "address"
                                },
                                {
                                    "internalType": "bytes",
                                    "name": "collectModuleInitData",
                                    "type": "bytes"
                                },
                                {
                                    "internalType": "address",
                                    "name": "referenceModule",
                                    "type": "address"
                                },
                                {
                                    "internalType": "bytes",
                                    "name": "referenceModuleInitData",
                                    "type": "bytes"
                                }
                            ],
                            "internalType": "struct DataTypes.PostData",
                            "name": "vars",
                            "type": "tuple"
                        }
                    ],
                    "name": "post",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "components": [
                                {
                                    "internalType": "uint256",
                                    "name": "profileId",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "string",
                                    "name": "contentURI",
                                    "type": "string"
                                },
                                {
                                    "internalType": "address",
                                    "name": "collectModule",
                                    "type": "address"
                                },
                                {
                                    "internalType": "bytes",
                                    "name": "collectModuleInitData",
                                    "type": "bytes"
                                },
                                {
                                    "internalType": "address",
                                    "name": "referenceModule",
                                    "type": "address"
                                },
                                {
                                    "internalType": "bytes",
                                    "name": "referenceModuleInitData",
                                    "type": "bytes"
                                },
                                {
                                    "components": [
                                        {
                                            "internalType": "uint8",
                                            "name": "v",
                                            "type": "uint8"
                                        },
                                        {
                                            "internalType": "bytes32",
                                            "name": "r",
                                            "type": "bytes32"
                                        },
                                        {
                                            "internalType": "bytes32",
                                            "name": "s",
                                            "type": "bytes32"
                                        },
                                        {
                                            "internalType": "uint256",
                                            "name": "deadline",
                                            "type": "uint256"
                                        }
                                    ],
                                    "internalType": "struct DataTypes.EIP712Signature",
                                    "name": "sig",
                                    "type": "tuple"
                                }
                            ],
                            "internalType": "struct DataTypes.PostWithSigData",
                            "name": "vars",
                            "type": "tuple"
                        }
                    ],
                    "name": "postWithSig",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "from",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "to",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "tokenId",
                            "type": "uint256"
                        }
                    ],
                    "name": "safeTransferFrom",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "from",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "to",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "tokenId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bytes",
                            "name": "_data",
                            "type": "bytes"
                        }
                    ],
                    "name": "safeTransferFrom",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "operator",
                            "type": "address"
                        },
                        {
                            "internalType": "bool",
                            "name": "approved",
                            "type": "bool"
                        }
                    ],
                    "name": "setApprovalForAll",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "profileId",
                            "type": "uint256"
                        }
                    ],
                    "name": "setDefaultProfile",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "components": [
                                {
                                    "internalType": "address",
                                    "name": "wallet",
                                    "type": "address"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "profileId",
                                    "type": "uint256"
                                },
                                {
                                    "components": [
                                        {
                                            "internalType": "uint8",
                                            "name": "v",
                                            "type": "uint8"
                                        },
                                        {
                                            "internalType": "bytes32",
                                            "name": "r",
                                            "type": "bytes32"
                                        },
                                        {
                                            "internalType": "bytes32",
                                            "name": "s",
                                            "type": "bytes32"
                                        },
                                        {
                                            "internalType": "uint256",
                                            "name": "deadline",
                                            "type": "uint256"
                                        }
                                    ],
                                    "internalType": "struct DataTypes.EIP712Signature",
                                    "name": "sig",
                                    "type": "tuple"
                                }
                            ],
                            "internalType": "struct DataTypes.SetDefaultProfileWithSigData",
                            "name": "vars",
                            "type": "tuple"
                        }
                    ],
                    "name": "setDefaultProfileWithSig",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "profileId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "address",
                            "name": "dispatcher",
                            "type": "address"
                        }
                    ],
                    "name": "setDispatcher",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "components": [
                                {
                                    "internalType": "uint256",
                                    "name": "profileId",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "address",
                                    "name": "dispatcher",
                                    "type": "address"
                                },
                                {
                                    "components": [
                                        {
                                            "internalType": "uint8",
                                            "name": "v",
                                            "type": "uint8"
                                        },
                                        {
                                            "internalType": "bytes32",
                                            "name": "r",
                                            "type": "bytes32"
                                        },
                                        {
                                            "internalType": "bytes32",
                                            "name": "s",
                                            "type": "bytes32"
                                        },
                                        {
                                            "internalType": "uint256",
                                            "name": "deadline",
                                            "type": "uint256"
                                        }
                                    ],
                                    "internalType": "struct DataTypes.EIP712Signature",
                                    "name": "sig",
                                    "type": "tuple"
                                }
                            ],
                            "internalType": "struct DataTypes.SetDispatcherWithSigData",
                            "name": "vars",
                            "type": "tuple"
                        }
                    ],
                    "name": "setDispatcherWithSig",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "newEmergencyAdmin",
                            "type": "address"
                        }
                    ],
                    "name": "setEmergencyAdmin",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "profileId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "address",
                            "name": "followModule",
                            "type": "address"
                        },
                        {
                            "internalType": "bytes",
                            "name": "followModuleInitData",
                            "type": "bytes"
                        }
                    ],
                    "name": "setFollowModule",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "components": [
                                {
                                    "internalType": "uint256",
                                    "name": "profileId",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "address",
                                    "name": "followModule",
                                    "type": "address"
                                },
                                {
                                    "internalType": "bytes",
                                    "name": "followModuleInitData",
                                    "type": "bytes"
                                },
                                {
                                    "components": [
                                        {
                                            "internalType": "uint8",
                                            "name": "v",
                                            "type": "uint8"
                                        },
                                        {
                                            "internalType": "bytes32",
                                            "name": "r",
                                            "type": "bytes32"
                                        },
                                        {
                                            "internalType": "bytes32",
                                            "name": "s",
                                            "type": "bytes32"
                                        },
                                        {
                                            "internalType": "uint256",
                                            "name": "deadline",
                                            "type": "uint256"
                                        }
                                    ],
                                    "internalType": "struct DataTypes.EIP712Signature",
                                    "name": "sig",
                                    "type": "tuple"
                                }
                            ],
                            "internalType": "struct DataTypes.SetFollowModuleWithSigData",
                            "name": "vars",
                            "type": "tuple"
                        }
                    ],
                    "name": "setFollowModuleWithSig",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "profileId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "followNFTURI",
                            "type": "string"
                        }
                    ],
                    "name": "setFollowNFTURI",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "components": [
                                {
                                    "internalType": "uint256",
                                    "name": "profileId",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "string",
                                    "name": "followNFTURI",
                                    "type": "string"
                                },
                                {
                                    "components": [
                                        {
                                            "internalType": "uint8",
                                            "name": "v",
                                            "type": "uint8"
                                        },
                                        {
                                            "internalType": "bytes32",
                                            "name": "r",
                                            "type": "bytes32"
                                        },
                                        {
                                            "internalType": "bytes32",
                                            "name": "s",
                                            "type": "bytes32"
                                        },
                                        {
                                            "internalType": "uint256",
                                            "name": "deadline",
                                            "type": "uint256"
                                        }
                                    ],
                                    "internalType": "struct DataTypes.EIP712Signature",
                                    "name": "sig",
                                    "type": "tuple"
                                }
                            ],
                            "internalType": "struct DataTypes.SetFollowNFTURIWithSigData",
                            "name": "vars",
                            "type": "tuple"
                        }
                    ],
                    "name": "setFollowNFTURIWithSig",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "newGovernance",
                            "type": "address"
                        }
                    ],
                    "name": "setGovernance",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "profileId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "imageURI",
                            "type": "string"
                        }
                    ],
                    "name": "setProfileImageURI",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "components": [
                                {
                                    "internalType": "uint256",
                                    "name": "profileId",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "string",
                                    "name": "imageURI",
                                    "type": "string"
                                },
                                {
                                    "components": [
                                        {
                                            "internalType": "uint8",
                                            "name": "v",
                                            "type": "uint8"
                                        },
                                        {
                                            "internalType": "bytes32",
                                            "name": "r",
                                            "type": "bytes32"
                                        },
                                        {
                                            "internalType": "bytes32",
                                            "name": "s",
                                            "type": "bytes32"
                                        },
                                        {
                                            "internalType": "uint256",
                                            "name": "deadline",
                                            "type": "uint256"
                                        }
                                    ],
                                    "internalType": "struct DataTypes.EIP712Signature",
                                    "name": "sig",
                                    "type": "tuple"
                                }
                            ],
                            "internalType": "struct DataTypes.SetProfileImageURIWithSigData",
                            "name": "vars",
                            "type": "tuple"
                        }
                    ],
                    "name": "setProfileImageURIWithSig",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "enum DataTypes.ProtocolState",
                            "name": "newState",
                            "type": "uint8"
                        }
                    ],
                    "name": "setState",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "name": "sigNonces",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "bytes4",
                            "name": "interfaceId",
                            "type": "bytes4"
                        }
                    ],
                    "name": "supportsInterface",
                    "outputs": [
                        {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "symbol",
                    "outputs": [
                        {
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "index",
                            "type": "uint256"
                        }
                    ],
                    "name": "tokenByIndex",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "tokenId",
                            "type": "uint256"
                        }
                    ],
                    "name": "tokenDataOf",
                    "outputs": [
                        {
                            "components": [
                                {
                                    "internalType": "address",
                                    "name": "owner",
                                    "type": "address"
                                },
                                {
                                    "internalType": "uint96",
                                    "name": "mintTimestamp",
                                    "type": "uint96"
                                }
                            ],
                            "internalType": "struct IERC721Time.TokenData",
                            "name": "",
                            "type": "tuple"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "owner",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "index",
                            "type": "uint256"
                        }
                    ],
                    "name": "tokenOfOwnerByIndex",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "tokenId",
                            "type": "uint256"
                        }
                    ],
                    "name": "tokenURI",
                    "outputs": [
                        {
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "totalSupply",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "from",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "to",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "tokenId",
                            "type": "uint256"
                        }
                    ],
                    "name": "transferFrom",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "collectModule",
                            "type": "address"
                        },
                        {
                            "internalType": "bool",
                            "name": "whitelist",
                            "type": "bool"
                        }
                    ],
                    "name": "whitelistCollectModule",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "followModule",
                            "type": "address"
                        },
                        {
                            "internalType": "bool",
                            "name": "whitelist",
                            "type": "bool"
                        }
                    ],
                    "name": "whitelistFollowModule",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "profileCreator",
                            "type": "address"
                        },
                        {
                            "internalType": "bool",
                            "name": "whitelist",
                            "type": "bool"
                        }
                    ],
                    "name": "whitelistProfileCreator",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "referenceModule",
                            "type": "address"
                        },
                        {
                            "internalType": "bool",
                            "name": "whitelist",
                            "type": "bool"
                        }
                    ],
                    "name": "whitelistReferenceModule",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                }
            ],
            signer
        )

        console.log("Contract created");

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
        })

        await tx.wait()

        isPosting = false;
        console.log('successfully created post: tx hash', tx.hash);
        console.log('successfully created post: tx hash', JSON.stringify(tx));
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
    await savePost();

    console.log("Successfully posted;")
    // if(response == "ok") {
    //     // console.log("Publication: " + publicationID +" added to url: " + url)
    //     console.log("Posted successfully");
    // } else {
    //     console.log("Transaction failed")
    // }
}

// async function getPublications(url) {
//     const trx = await LensStorageContract.getPublications(url)
//     console.log(trx)
//     return trx
// }

const resolvers = {
    // Query: {
    //     getUrlAt: async (_,args) => {
    //         const url = getUrl(args.id)
    //         return url
    //     },
    //     getPublicationsForUrl: async (_, args) => {
    //         const publications = getPublications(args.url)
    //         return publications
    //     }
    // },
    Mutation: {
        addPublicationTo: async (_, args) => {
            await addPublication(args.url, args.publicationId)
            return true
        }
    }
}

module.exports = {resolvers}
