<script lang="ts">

    import {ethers} from 'ethers';
    import {createClient} from '@urql/core';

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
    let isSignedIn = false;
    let signer;

    let lensviewAccessTokenFromLens;
    let lensviewSigner;
    let isLinkAddedToLensView: boolean = false;

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
                console.log("address", address);
                console.log("address typeOf", typeof address);
                lensviewAddress = address;
            } else {
                isConnected = false;
            }
        } catch (error) {
            console.log(error)
        }

    }

    /********************************************************/


    /**
     * 2. i. Sign In with Lens
     *    ii. Get Access Token
     *    iii. Update Client with new Access Token
     */
    async function signInWithLens() {
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
            isSignedIn = true;

            /** Getting profile of the connected user and saving it to "profile" variable **/
            profile = await getUserProfile();
        } catch (err) {
            console.log('Error signing in: ', err)
        }
    }

    async function lensviewSignInWithLens() {
        try {
            /* first request the challenge from the API server */
            let lensviewAddress = "0xBFfCe813B6c14D8659057dD3111D3F83CEE271b8";
            const challengeInfo = await client.query(challenge, {"address": lensviewAddress}).toPromise();
            console.log("challengeInfo", challengeInfo);
            // TODO - update the chain when gas fee issue is fixed
            const provider = new ethers.providers.AlchemyProvider("maticmum", import.meta.env.VITE_API_KEY);
            lensviewSigner = new ethers.Wallet(import.meta.env.VITE_PRIVATE_KEY, provider);
            /* ask the user to sign a message with the challenge info returned from the server */
            const signature = await lensviewSigner.signMessage(challengeInfo.data.challenge.text);
            /* authenticate the user */
            const authData = await client.mutation(authenticate, {"address": lensviewAddress, signature}).toPromise();
            /* if user authentication is successful, you will receive an accessToken and refreshToken */
            const {data: {authenticate: {accessToken}}} = authData
            console.log({accessToken})
            lensviewAccessTokenFromLens = accessToken;

            /** you can now use the accessToken to make authenticated requests to the API server **/
            /** Update client with new accessToken **/
            client = createClient({
                url: API_URL,
                fetchOptions: {
                    headers: {
                        'x-access-token': `Bearer ${lensviewAccessTokenFromLens}`
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
            return response.data.defaultProfile;
        } catch (err) {
            console.log('error fetching user profile...: ', err)
        }
    }

    /*********************************************************/

    import {v4 as uuid} from 'uuid';

    /** Hard coded post value for testing **/
    let userEnteredContent: string = "";

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

    function makeFileObjects(profileHandle: string, userEnteredContent: string) {
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
            name: `Post by @${profileHandle}`,
            external_url: 'https://lensView.xyz',
            metadata_id: uuid(),
            mainContentFocus: 'TEXT_ONLY',
            attributes: [],
            locale: 'en-US',
            appId: userEnteredLink
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
    const uploadToIPFS = async (profileHandle, userEnteredContent) => {

        /*** Web3.storage ***/
        const client = makeStorageClient()
        const cid = await client.put(makeFileObjects(profileHandle, userEnteredContent))
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

    function signedTypeData(domain, types, value) {
        return signer._signTypedData(
            omitDeep(domain, '__typename'),
            omitDeep(types, '__typename'),
            omitDeep(value, '__typename')
        )
    }

    function lensviewSignedTypeData(domain, types, value) {
        return lensviewSigner._signTypedData(
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

    const lensviewSignCreatePostTypedData = async (request) => {
        let result = await client.mutation(createPostTypedData, {
            request
        }).toPromise();
        result = result.data.createPostTypedData;
        console.log('create post: createPostTypedData', result);

        const typedData = result.typedData;
        console.log('create post: typedData', typedData);

        const signature = await lensviewSignedTypeData(typedData.domain, typedData.types, typedData.value);
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
        const contentURI = await uploadToIPFS(profile.handle, userEnteredContent)
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

    let lensviewSavePost = async () => {
        console.log("lensviewSavePost called :");
        await lensviewSignInWithLens();
        console.log("Signed in with lensview done");
        const contentURI = await uploadToIPFS('anjaysahoo', userEnteredLink)
        const createPostRequest = {
            profileId: '0x0199aa',
            contentURI,
            collectModule: {
                freeCollectModule: {followerOnly: true}
            },
            referenceModule: {
                followerOnlyReferenceModule: false
            }
        }

        try {
            const signedResult = await lensviewSignCreatePostTypedData(createPostRequest)
            const typedData = signedResult.result.typedData;
            const {v, r, s} = splitSignature(signedResult.signature)

            const contract = new ethers.Contract(
                LENS_HUB_CONTRACT_ADDRESS,
                LENSHUB,
                lensviewSigner
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
            isLinkAddedToLensView = true;
            console.log('successfully created post: tx hash', tx.hash);
            console.log('successfully created post: tx hash', JSON.stringify(tx));
        } catch (err) {
            console.log('error: ', err);
            isPosting = false;
        }
    }


    /*******************************************************/

    let userEnteredLink: string = "";


    /** Fetch post by ID */

    const getPost = `
    query Publications($request: PublicationsQueryRequest!) {
  publications(request: $request) {
    items {
      __typename
      ... on Post {
        ...PostFields
      }
      ... on Comment {
        ...CommentFields
      }
      ... on Mirror {
        ...MirrorFields
      }
    }
    pageInfo {
      prev
      next
      totalCount
    }
  }
}

fragment MediaFields on Media {
  url
  mimeType
}

fragment ProfileFields on Profile {
  id
  name
  bio
  attributes {
     displayType
     traitType
     key
     value
  }
  isFollowedByMe
  isFollowing(who: null)
  followNftAddress
  metadata
  isDefault
  handle
  picture {
    ... on NftImage {
      contractAddress
      tokenId
      uri
      verified
    }
    ... on MediaSet {
      original {
        ...MediaFields
      }
    }
  }
  coverPicture {
    ... on NftImage {
      contractAddress
      tokenId
      uri
      verified
    }
    ... on MediaSet {
      original {
        ...MediaFields
      }
    }
  }
  ownedBy
  dispatcher {
    address
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
    ...FollowModuleFields
  }
}

fragment PublicationStatsFields on PublicationStats {
  totalAmountOfMirrors
  totalAmountOfCollects
  totalAmountOfComments
  totalUpvotes
  totalDownvotes
}

fragment MetadataOutputFields on MetadataOutput {
  name
  description
  content
  media {
    original {
      ...MediaFields
    }
  }
  attributes {
    displayType
    traitType
    value
  }
}

fragment Erc20Fields on Erc20 {
  name
  symbol
  decimals
  address
}

fragment PostFields on Post {
  id
  profile {
    ...ProfileFields
  }
  stats {
    ...PublicationStatsFields
  }
  metadata {
    ...MetadataOutputFields
  }
  createdAt
  collectModule {
    ...CollectModuleFields
  }
  referenceModule {
    ...ReferenceModuleFields
  }
  appId
  hidden
  reaction(request: null)
  mirrors(by: null)
  hasCollectedByMe
}

fragment MirrorBaseFields on Mirror {
  id
  profile {
    ...ProfileFields
  }
  stats {
    ...PublicationStatsFields
  }
  metadata {
    ...MetadataOutputFields
  }
  createdAt
  collectModule {
    ...CollectModuleFields
  }
  referenceModule {
    ...ReferenceModuleFields
  }
  appId
  hidden
  reaction(request: null)
  hasCollectedByMe
}

fragment MirrorFields on Mirror {
  ...MirrorBaseFields
  mirrorOf {
   ... on Post {
      ...PostFields
   }
   ... on Comment {
      ...CommentFields
   }
  }
}

fragment CommentBaseFields on Comment {
  id
  profile {
    ...ProfileFields
  }
  stats {
    ...PublicationStatsFields
  }
  metadata {
    ...MetadataOutputFields
  }
  createdAt
  collectModule {
    ...CollectModuleFields
  }
  referenceModule {
    ...ReferenceModuleFields
  }
  appId
  hidden
  reaction(request: null)
  mirrors(by: null)
  hasCollectedByMe
}

fragment CommentFields on Comment {
  ...CommentBaseFields
  mainPost {
    ... on Post {
      ...PostFields
    }
    ... on Mirror {
      ...MirrorBaseFields
      mirrorOf {
        ... on Post {
           ...PostFields
        }
        ... on Comment {
           ...CommentMirrorOfFields
        }
      }
    }
  }
}

fragment CommentMirrorOfFields on Comment {
  ...CommentBaseFields
  mainPost {
    ... on Post {
      ...PostFields
    }
    ... on Mirror {
       ...MirrorBaseFields
    }
  }
}

fragment FollowModuleFields on FollowModule {
  ... on FeeFollowModuleSettings {
    type
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
    contractAddress
  }
  ... on RevertFollowModuleSettings {
    type
    contractAddress
  }
  ... on UnknownFollowModuleSettings {
    type
    contractAddress
    followModuleReturnData
  }
}

fragment CollectModuleFields on CollectModule {
  __typename
  ... on FreeCollectModuleSettings {
    type
    followerOnly
    contractAddress
  }
  ... on FeeCollectModuleSettings {
    type
    amount {
      asset {
        ...Erc20Fields
      }
      value
    }
    recipient
    referralFee
  }
  ... on LimitedFeeCollectModuleSettings {
    type
    collectLimit
    amount {
      asset {
        ...Erc20Fields
      }
      value
    }
    recipient
    referralFee
  }
  ... on LimitedTimedFeeCollectModuleSettings {
    type
    collectLimit
    amount {
      asset {
        ...Erc20Fields
      }
      value
    }
    recipient
    referralFee
    endTimestamp
  }
  ... on RevertCollectModuleSettings {
    type
  }
  ... on TimedFeeCollectModuleSettings {
    type
    amount {
      asset {
        ...Erc20Fields
      }
      value
    }
    recipient
    referralFee
    endTimestamp
  }
  ... on UnknownCollectModuleSettings {
    type
    contractAddress
    collectModuleReturnData
  }
}

fragment ReferenceModuleFields on ReferenceModule {
  ... on FollowOnlyReferenceModuleSettings {
    type
    contractAddress
  }
  ... on UnknownReferenceModuleSettings {
    type
    contractAddress
    referenceModuleReturnData
  }
  ... on DegreesOfSeparationReferenceModuleSettings {
    type
    contractAddress
    commentsRestricted
    mirrorsRestricted
    degreesOfSeparation
  }
}
`
    let publications;
    const getPostById = async () => {
        try {
            console.log("Get Publication Called");

            const response = await client.query(getPost,
                {
                    "request": {
                        "publicationIds": ["0x0199aa-0x10"]
                    }
                }
                ).toPromise()

            console.log("response : " + JSON.stringify(response));

            publications = response.data.publications;
        } catch (err) {
            console.log('error fetching publication...: ', err)
        }
    }

    /************************************************/


    /** Contract Interaction **/

    const lensViewBetaContractAddress = "0x1eFa4D3BC84EF7C06cD8Ff8B0d7747E1a88fbC43";
    const lensViewBetaContractABI = [{"inputs":[{"internalType":"string","name":"_url","type":"string"},{"internalType":"string","name":"_publicationID","type":"string"}],"name":"addPublication","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_url","type":"string"}],"name":"getPublications","outputs":[{"internalType":"string[]","name":"","type":"string[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"","type":"string"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"publications","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"urls","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}];
    let lensViewBetaContract;
    let signer2;

    const getPubId = async () => {
        try{
            const provider = new ethers.providers.Web3Provider(window.ethereum);

            provider.send("eth_requestAccounts", []).then(() => {
                provider.listAccounts().then(async (accounts) => {
                    signer2 = provider.getSigner(accounts[0]);
                    lensViewBetaContract = new ethers.Contract(
                        lensViewBetaContractAddress,
                        lensViewBetaContractABI,
                        signer2
                    );

                    const getPubIdPromise = lensViewBetaContract.getPublications(userEnteredLink);
                    const pubId = await getPubIdPromise;
                    console.log("Pub ID : " + pubId);
                });
            });


        }
        catch(err){
            console.log("Error while fetching post ID : " + err);
        }

    }

    const putPubId = async () => {
        try{
            const provider = new ethers.providers.Web3Provider(window.ethereum);

            provider.send("eth_requestAccounts", []).then(() => {
                provider.listAccounts().then(async (accounts) => {
                    signer2 = provider.getSigner(accounts[0]);
                    lensViewBetaContract = new ethers.Contract(
                        lensViewBetaContractAddress,
                        lensViewBetaContractABI,
                        signer2
                    );

                    // let totalPublications = profile.stats.totalPublications;
                    // console.log("Total Publications : " + totalPublications);
                    // let publicationID = profile.id + "-0x" + totalPublications.toString(16);
                    // console.log("Publication ID : " + publicationID);

                    console.log("userEnteredLink : " + userEnteredLink);
                    const getPubIdPromise = lensViewBetaContract.addPublication(userEnteredLink, "0x544");
                    const pubId = await getPubIdPromise;
                    console.log("Pub ID : " + pubId);
                });
            });


        }
        catch(err){
            console.log("Error while fetching post ID : " + err);
        }

    }


    /************************************************/

    let isLinkClicked = false;

    let toggleLinkClicked = () => {
        isLinkClicked = !isLinkClicked;
    }

    let disablePost = (userEnteredContent): boolean => {

        if(userEnteredContent === "" || !isLinkAddedToLensView || !isSignedIn){
                console.log("User has not filled the boxes");
                return true;
            }
            console.log("User has filled the boxes");
        return false;
    };

    let isUserEnteredLink = (userEnteredLink): boolean => {
        if(userEnteredLink === ""){
            console.log("User has not filled the boxes");
            return false;
        }
        console.log("User has filled the boxes");
        return true;
    };
</script>


<!---------------------------------- HTML --------------------------->
<main>
    <div class="CenterRowFlex main">
        <div class="CenterColumnFlex main__menu">
            <div class="CenterColumnFlex main__menu__items">
                <div class="main__menu__items__item main__menu__items__item--logo">
                    <img src="https://img.icons8.com/ios/50/000000/medium-monogram--v1.png" alt="logo"/>
                </div>
                <div class="main__menu__items__item">Home</div>
                <div class="main__menu__items__item">Explore</div>
                <div class="main__menu__items__item">How It Works</div>
                <div class="main__menu__items__item">About</div>
            </div>
            <div class="main__menu__user">
                    {#if !isConnected}
                        <button on:click="{connect}" class="btn">Connect  Wallet</button>
                    {:else}
                        {#if !isSignedIn}
                            <button on:click="{signInWithLens}" class="btn">Sign-In With Lens</button>
                        {:else}
                            <div class="main__menu__user__profile">
                                {address.slice(0,5)} ... {address.slice(-5)}
                            </div>
                        {/if}
                    {/if}
            </div>
        </div>
        <div class="CenterColumnFlex main__search-area">
            <div class="CenterRowFlex main__search-area__search-box">
                <input bind:value={userEnteredLink} type="text" class="main__search-area__search-box__input" placeholder="Search for a publication">
                <button on:click={getPubId} disabled='{!isUserEnteredLink(userEnteredLink)}' class="btn">
                    Search
                </button>
            </div>
            <div class="CenterRowFlex main__search-area__filter-area">
                <div class="CenterRowFlex main__search-area__filter-area__quick-filters">
                    <div class="main__search-area__filter-area__quick-filters__filter">Popular</div>
                    <div class="main__search-area__filter-area__quick-filters__filter">Latest</div>
                    <div class="main__search-area__filter-area__quick-filters__filter">Relevant</div>
                </div>
                <div class="main__search-area__filter-area__filter-menu">
                    <!-- Add filter icon in it -->
                    <button class="btn">Filter</button>
                </div>
            </div>
            {#if !isLinkClicked}
                <div class="CenterColumnFlex main__search-area__results">
                <div on:click="{toggleLinkClicked}" class="main__search-area__results__result">
                    Lorem ipsum dolor sit amet, consectetur adipisic incidunt nesciunt placeat quae rem reprehenderit similique temporibus voluptatibus?
                </div>
                <div class="main__search-area__results__result">
                    Lorem ipsum dolor sit amet, consectetur adipisic vel veniam voluptatibus! Cumque, deleniti facilis libero minus non repellendus.
                </div>
                <div class="main__search-area__results__result">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.  error mollitia perspiciatis veniam voluptates! Earum, libero, maxime?
                </div>
                <div class="main__search-area__results__result">
                    Lorem ipsum dolor sit amet, consectetur adipisicing  Beatae eius exercitationem minima perspiciatis vitae.
                </div>
                <div class="main__search-area__results__result">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elitcum deserunt doloremque expedita laborum modi perspiciatis possimus, qui!
                </div>
                <div class="main__search-area__results__result">
                    Lorem ipsum dolor sit amet, consectetur adipisicing eli consequuntur cumque fuga id nihil repudiandae veniam. Ipsa, vero.
                </div>
                <div class="main__search-area__results__result">
                    Lorem ipsum dolor sit amet, consectetur adipisicing e voluptatibus. Blanditiis dicta fugit minus mollitia quae.
                </div>
                <div class="main__search-area__results__result">
                    Lorem ipsum dolor sit amet, consectetur adipisic perferendis quibusdam quo quos sit ut velit vitae?
                </div>
                <div class="main__search-area__results__result">
                    Lorem ipsum dolor sit amet, consectetur adipisici quas quod repellat, voluptatem voluptates! Asperiores odit quos reiciendis!
                </div>
                <div class="main__search-area__results__result">
                    Lorem ipsum dolor sit amet, consectetur adipisicing quibusdam, quos rerum sapiente sit ullam, vero voluptatum.
                </div>
            </div>
            {:else}
                <div class="CenterColumnFlex main__search-area__link-preview">
                    <div on:click="{toggleLinkClicked}" class="main__search-area__link-preview__close">
                        X
                    </div>
                    <div class="main__search-area__link-preview__area">
                        <!--
                    Iframe does not because of security issue, use below technique to get around it
                    1. Use AJAX
                    2. You could use a proxy which fetches the requested page on your behalf and then you can host the proxy on your domain and load the web page from this proxy server with the new proxy URL rather then "twitter.com" in this question.
                    -->
                        <iframe src="https://www.w3schools.com" name="iframe_a" title="Iframe Example"></iframe>
                    </div>
                    <div class="CenterRowFlex main__search-area__link-preview__reaction-bar">
                        <div class="main__search-area__link-preview__reaction-bar__reaction">5 👍</div>
                        <div class="main__search-area__link-preview__reaction-bar__reaction">10 👎</div>
                        <div class="main__search-area__link-preview__reaction-bar__reaction">7 ☀️</div>
                        <div class="main__search-area__link-preview__reaction-bar__reaction">2 😈</div>
                        <div class="main__search-area__link-preview__reaction-bar__reaction">3 😑</div>
                        <div class="main__search-area__link-preview__reaction-bar__reaction">10 Post(s)</div>
                        <div class="main__search-area__link-preview__reaction-bar__reaction">30 Search(s)</div>
                    </div>
                </div>
            {/if}
        </div>
        <div class="CenterColumnFlex main__content-area">
            <div class="CenterColumnFlex main__content-area__user-post">
                {#if !isLinkClicked}
                    <div class="main__content-area__user-post__link">
                        <input bind:value={userEnteredLink} type="text" class="main__content-area__user-post__link__input" placeholder="Please insert link over here">
                        <button on:click={lensviewSavePost} class="btn">Add Link On LensView</button>
                    </div>
                {/if}
                <div class="main__content-area__user-post__text">
                    <input bind:value={userEnteredContent} type="text" class="main__content-area__user-post__text__input" placeholder="What's on your mind?">
                </div>
                <div class="CenterRowFlex main__content-area__user-post__option-bar">
                    <div class="CenterRowFlex main__content-area__user-post__option-bar__options">
                        <div class="main__content-area__user-post__option-bar__options__option">Media</div>
                        <div class="main__content-area__user-post__option-bar__options__option">Hastags</div>
                        <div class="main__content-area__user-post__option-bar__options__option">@Mention</div>
                    </div>
                    <div class="main__content-area__user-post__option-bar__post-btn">
                        <button on:click={savePost} disabled='{disablePost(userEnteredContent)}' class="btn">Post</button>
                    </div>
                </div>
            </div>
            {#if isLinkClicked}
                <div class="CenterColumnFlex main__content-area__posts">
                    <div class="main__content-area__posts__post">
                        <div class="main__content-area__posts__post__content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci asperiores, consequatur consequuntur dolorum inventore, iusto labore libero magnam maxime minima nam nemo nostrum numquam quis quo sit suscipit unde voluptatem.</div>
                        <div class="CenterRowFlex main__content-area__posts__post__reaction-bar">
                            <div class="main__content-area__posts__post__reaction-bar__reaction">1 👍</div>
                            <div class="main__content-area__posts__post__reaction-bar__reaction">10 👎</div>
                            <div class="main__content-area__posts__post__reaction-bar__reaction">5 💬</div>
                            <div class="main__content-area__posts__post__reaction-bar__reaction">2 📨</div>
                        </div>
                    </div>
                    <div class="main__content-area__posts__post">
                        <div class="main__content-area__posts__post__content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem eligendi enim facere fugit iure magnam molestiae nostrum! Assumenda distinctio eos eum fugit id illo, iste necessitatibus nemo non pariatur, rem?</div>
                        <div class="CenterRowFlex main__content-area__posts__post__reaction-bar">
                            <div class="main__content-area__posts__post__reaction-bar__reaction">1 👍</div>
                            <div class="main__content-area__posts__post__reaction-bar__reaction">10 👎</div>
                            <div class="main__content-area__posts__post__reaction-bar__reaction">5 💬</div>
                            <div class="main__content-area__posts__post__reaction-bar__reaction">2 📨</div>
                        </div>
                    </div>
                    <div class="main__content-area__posts__post">
                        <div class="main__content-area__posts__post__content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, animi aut autem dignissimos eius explicabo libero nihil, nostrum odit quae repellat, sed tempora? A commodi delectus dicta harum non sint.</div>
                        <div class="CenterRowFlex main__content-area__posts__post__reaction-bar">
                            <div class="main__content-area__posts__post__reaction-bar__reaction">1 👍</div>
                            <div class="main__content-area__posts__post__reaction-bar__reaction">10 👎</div>
                            <div class="main__content-area__posts__post__reaction-bar__reaction">5 💬</div>
                            <div class="main__content-area__posts__post__reaction-bar__reaction">2 📨</div>
                        </div>
                    </div>
                    <div class="main__content-area__posts__post">
                        <div class="main__content-area__posts__post__content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci beatae dignissimos ducimus neque quas. Alias animi asperiores beatae corporis culpa cupiditate et illo ipsam odit possimus quaerat quas, reiciendis sed!</div>
                        <div class="CenterRowFlex main__content-area__posts__post__reaction-bar">
                            <div class="main__content-area__posts__post__reaction-bar__reaction">1 👍</div>
                            <div class="main__content-area__posts__post__reaction-bar__reaction">10 👎</div>
                            <div class="main__content-area__posts__post__reaction-bar__reaction">5 💬</div>
                            <div class="main__content-area__posts__post__reaction-bar__reaction">2 📨</div>
                        </div>
                    </div>
                    <div class="main__content-area__posts__post">
                        <div class="main__content-area__posts__post__content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi ex inventore modi molestias voluptatum? Ab consectetur culpa facere fugit id illum in natus quas, ratione recusandae repellat unde? Animi, minus!</div>
                        <div class="CenterRowFlex main__content-area__posts__post__reaction-bar">
                            <div class="main__content-area__posts__post__reaction-bar__reaction">1 👍</div>
                            <div class="main__content-area__posts__post__reaction-bar__reaction">10 👎</div>
                            <div class="main__content-area__posts__post__reaction-bar__reaction">5 💬</div>
                            <div class="main__content-area__posts__post__reaction-bar__reaction">2 📨</div>
                        </div>
                    </div>
                    <div class="main__content-area__posts__post">
                        <div class="main__content-area__posts__post__content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. At, cupiditate dolore est ipsum, itaque magnam mollitia quam quis recusandae, reiciendis sequi sit. Beatae consequatur distinctio explicabo iste, molestiae ratione sequi?</div>
                        <div class="CenterRowFlex main__content-area__posts__post__reaction-bar">
                            <div class="main__content-area__posts__post__reaction-bar__reaction">1 👍</div>
                            <div class="main__content-area__posts__post__reaction-bar__reaction">10 👎</div>
                            <div class="main__content-area__posts__post__reaction-bar__reaction">5 💬</div>
                            <div class="main__content-area__posts__post__reaction-bar__reaction">2 📨</div>
                        </div>
                    </div>
                    <div class="main__content-area__posts__post">
                        <div class="main__content-area__posts__post__content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur, dolore dolorem est harum illo incidunt maiores nesciunt porro praesentium quam quidem quod ratione reiciendis sit temporibus tenetur vel voluptate voluptatibus?</div>
                        <div class="CenterRowFlex main__content-area__posts__post__reaction-bar">
                            <div class="main__content-area__posts__post__reaction-bar__reaction">1 👍</div>
                            <div class="main__content-area__posts__post__reaction-bar__reaction">10 👎</div>
                            <div class="main__content-area__posts__post__reaction-bar__reaction">5 💬</div>
                            <div class="main__content-area__posts__post__reaction-bar__reaction">2 📨</div>
                        </div>
                    </div>
                </div>
            {/if}
        </div>
    </div>
</main>
<!-------------------------------------------------------------------------->


<!-------------------------Style ----------------->
<style>

    .main__menu{
        width: 15%;
        height: 100vh;
        justify-content: space-between;
        padding: 2rem 1rem;
    }

    .main__menu__user__profile{
        padding: 1rem;
        background: greenyellow;
        border-radius: 39px;
    }

    .main__menu__items{
        width: 100%;
        gap: 1rem;
    }

    .main__menu__items__item{
        width: 100%;
        background: lightgray;
        padding: 0.75rem;
        border-radius: 8px;
    }

    .main__search-area{
        width: 35%;
        height: 100vh;
        background-color: aliceblue;
        padding: 2rem 1.5rem;
        justify-content: flex-start;
        gap: 1rem;
    }

    .main__search-area__search-box{
        width: 100%;
        justify-content: space-around;
    }

    .main__search-area__search-box__input{
        width: 68%;
        padding: 0.65rem;
        border-radius: 8px;
        border: 1px solid lightgray;
        outline: 0;
    }

    .main__search-area__filter-area{
        width: 100%;
        justify-content: space-between;
    }

    .main__search-area__filter-area__quick-filters{
        gap: 0.5rem;
    }

    .main__search-area__filter-area__quick-filters__filter{
        padding: 0.6rem;
        border-radius: 17px;
        background: cadetblue;
        font-size: small;
        font-weight: 600;
    }

    .main__search-area__results{
        gap: 0.75rem;
        height: 77vh;
        overflow-y: auto;
        justify-content: flex-start;
    }

    .main__search-area__results__result{
        background: lightsteelblue;
        padding: 0.8rem 1rem;
        border-radius: 10px;
        margin-right: 0.75rem;
    }

    .main__search-area__link-preview{
        width: 100%;
        background: white;
        border-radius: 10px;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

    }

    .main__search-area__link-preview__close{
        font-weight: 600;
        font-size: large;
        margin: 1rem auto 1rem 1rem;
        cursor: pointer;
    }

    .main__search-area__link-preview__area{
        background: black;
        width: 100%;
        display: flex;
        justify-content: center;
        height: 50vh;
    }

    .main__search-area__link-preview__reaction-bar{
        width: 100%;
        padding: 1rem;
        justify-content: space-around;
    }

    .main__content-area{
        width: 50%;
        height: 100vh;
        padding: 2rem 1.5rem;
        justify-content: flex-start;
        gap: 1rem;
        background: azure;
    }

    .main__content-area__user-post{
        width: 100%;
        justify-content: space-between;
        gap: 1rem;
        background: white;
        padding: 1rem;
        border-radius: 12px;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    }

    .main__content-area__posts__post__reaction-bar{
        width: 100%;
        padding-top: 1rem;
        justify-content: space-around;
    }

    .main__content-area__user-post__text{
        width: 100%;
    }

    .main__content-area__user-post__text__input{
        width: 100%;
        padding: 0.65rem;
        border-radius: 8px;
        border: 1px solid lightgray;
        outline: 0;
    }

    .main__content-area__user-post__link{
        width: 100%;
        display: flex;
        gap: 1rem;
    }

    .main__content-area__user-post__link__input{
        width: 100%;
        padding: 0.65rem;
        border-radius: 8px;
        border: 1px solid lightgray;
        outline: 0;
    }

    .main__content-area__user-post__option-bar{
        width: 100%;
        justify-content: space-between;
    }

    .main__content-area__user-post__option-bar__options{
        gap: 0.5rem;
    }

    .main__content-area__user-post__option-bar__options__option{
        padding: 0.5rem;
        font-size: medium;
        font-weight: 500;
    }

    .main__content-area__posts{
        width: 100%;
        gap: 1rem;
        background: white;
        padding: 1rem;
        border-radius: 12px;
        align-items: flex-start;
        height: 70vh;
        overflow: auto;
        justify-content: flex-start;
    }

    .main__content-area__posts__post{
        padding: 1rem;
        border-radius: 10px;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    }

    /** Utility Classes **/
    .btn {
        display: inline-block;
        outline: 0;
        border: 0;
        cursor: pointer;
        background: #000000;
        color: #FFFFFF;
        border-radius: 8px;
        padding: 11px 22px 13px;
        font-size: 15px;
        font-weight: 700;
        line-height: 1;
        transition: transform 200ms, background 200ms;
    }

    .btn[disabled]{
        opacity: 0.6;
        cursor: not-allowed;
    }

    /****** Side scrollbar ********/
    .main__search-area__results::-webkit-scrollbar {
        width: 0.25rem;
    }

    .main__search-area__results::-webkit-scrollbar-track {
        background: #1e1e24;
    }

    .main__search-area__results::-webkit-scrollbar-thumb {
        background: #6649b8;
    }
    /*******************************/

    /****** Side scrollbar ********/
    .main__content-area__posts::-webkit-scrollbar {
        width: 0.25rem;
    }

    .main__content-area__posts::-webkit-scrollbar-track {
        background: #1e1e24;
    }

    .main__content-area__posts::-webkit-scrollbar-thumb {
        background: #6649b8;
    }
    /*******************************/
</style>
<!------------------------------------------------>
