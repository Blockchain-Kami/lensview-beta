<script>

    import {ethers} from 'ethers';
    import {createClient} from "@urql/svelte";

    const API_URL = 'https://api.lens.dev'
    const challenge = `
    query Challenge($address: EthereumAddress!) {
        challenge(request: { address: $address }) {
            text
        }
    }
`
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

    let address;
    let accessTokenFromLens;
    let isConnected = false;
    let signer;

    let client = createClient({
        url: API_URL
    });

    /**
     * 1. Connect Wallet
     */
    async function connect() {
        console.log("connect called")
        /* this allows the user to connect their wallet */
        try {
            const account = await window.ethereum.send('eth_requestAccounts')
            if (account.result.length) {
                address = account.result[0];
                isConnected = true;
            } else {
                isConnected = false;
            }
        } catch (error) {
            console.log(error)
        }

    }

    /********************************************************/


    /**
     * 2. Get Access Token
     */
    async function getAccessTokenFromLens() {
        try {
            /* first request the challenge from the API server */
            const challengeInfo = await client.query(challenge, {address}).toPromise();
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            signer = provider.getSigner()
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
            profile = response.data.defaultProfile;
        } catch (err) {
            console.log('error fetching user profile...: ', err)
        }
    }

    /*********************************************************/

    import {v4 as uuid} from 'uuid';

    /** Hard coded post value for testing **/
    let userEnteredContent = "Trial Post";

    /**
     * Web3 Storage Code
     */
    import {Web3Storage} from 'web3.storage'

    function getAccessToken() {
        // If you're just testing, you can paste in a token
        // and uncomment the following line:
        // return 'paste-your-token-here'

        // In a real app, it's better to read an access token from an
        // environement variable or other configuration that's kept outside of
        // your code base. For this to work, you need to set the
        // WEB3STORAGE_TOKEN environment variable before you run your code.
        // Get the web3.storage access token from the API token section

        return import.meta.env.VITE_WEB3STORAGE_TOKEN;
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
            name: `Post by @${profile.handle}`,
            external_url: `https://lenster.xyz/u/${profile.handle}`,
            metadata_id: uuid(),
            mainContentFocus: 'TEXT_ONLY',
            attributes: [],
            locale: 'en-US'
        }
        const blob = new Blob([JSON.stringify(metaData)], {type: 'application/json'})

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
    import omitDeep from 'omit-deep'

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

    export function signedTypeData(domain, types, value) {
        return signer._signTypedData(
            omitDeep(domain, '__typename'),
            omitDeep(types, '__typename'),
            omitDeep(value, '__typename')
        )
    }

    const signCreatePostTypedData = async (request) => {
        let result = await client.mutation(createPostTypedData, {
            request
        }).toPromise();
        result = result.data.createPostTypedData;
        console.log('create post: createPostTypedData', result);

        const typedData = result.typedData;
        console.log('create post: typedData', typedData);

        const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value);
        console.log('create post: signature', signature);

        return {result, signature};
    }

    /**********************************************************/

    /**
     * 6. Split Signature
     */
    import {utils} from 'ethers'

    function splitSignature(signature) {
        return utils.splitSignature(signature)
    }

    /*********************************/

    import LENSHUB from '../abi/lenshub.json';

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
            },
        }

        try {
            const signedResult = await signCreatePostTypedData(createPostRequest, accessTokenFromLens)
            const typedData = signedResult.result.typedData;
            const {v, r, s} = splitSignature(signedResult.signature)

            const contract = new ethers.Contract(
                LENS_HUB_CONTRACT_ADDRESS,
                LENSHUB,
                signer
            )

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


</script>


<!---------------------------------- HTML --------------------------->
<div class="main">

    <div class="btn-div">
        {#if !isConnected}
            <button on:click="{connect}" class="btn">Connect  Wallet</button>
        {:else}
            <div>
                <b>Connected Address :</b> {address}
            </div>
            <div>
                {#if !accessTokenFromLens}
                    <button on:click={getAccessTokenFromLens} class="btn">Get Access Token</button>
                {:else}
                    <b>Access Token From Lens:</b>  {accessTokenFromLens}
                    <div class="btn-div">
                        <button on:click={getUserProfile} class="btn">First Get User Profile</button>
                        <div style="text-align: center">{JSON.stringify(profile)}</div>
                        <input type="text" bind:value={userEnteredContent}>
                        <button on:click={savePost} class="btn">Post Trial Text</button>
                    </div>
                {/if}
            </div>
        {/if}
    </div>
</div>
<!-------------------------------------------------------------------------->


<!-------------------------Style ----------------->
<style>
    .main{
        height: 100vh;
    }

    .btn-div{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        flex-direction: column;
        gap: 48px;
    }

    .btn {
        display: inline-block;
        outline: 0;
        border: 0;
        cursor: pointer;
        background: #000000;
        color: #FFFFFF;
        border-radius: 8px;
        padding: 14px 24px 16px;
        font-size: 18px;
        font-weight: 700;
        line-height: 1;
        transition: transform 200ms, background 200ms;
    }

</style>
<!------------------------------------------------>
