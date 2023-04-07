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
    let url;

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

                    const getPubIdPromise = lensViewBetaContract.getPublications(url);
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

                    console.log("URL : " + url);
                    const getPubIdPromise = lensViewBetaContract.addPublication(url, "0x544");
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
                <button class="btn">
                    Connect Wallet
                </button>
            </div>
        </div>
        <div class="CenterColumnFlex main__search-area">
            <div class="CenterRowFlex main__search-area__search-box">
                <input type="text" class="main__search-area__search-box__input" placeholder="Search for a publication">
                <button class="btn">
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
            <div class="CenterColumnFlex main__search-area__results">
                <div class="main__search-area__results__result">
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
        </div>
        <div class="CenterColumnFlex main__content-area">
            <div class="CenterColumnFlex main__content-area__user-post">
                <div class="main__content-area__user-post__text">
                    <input type="text" class="main__content-area__user-post__text__input" placeholder="What's on your mind?">
                </div>
                <div class="CenterRowFlex main__content-area__user-post__option-bar">
                    <div class="CenterRowFlex main__content-area__user-post__option-bar__options">
                        <div class="main__content-area__user-post__option-bar__options__option">Media</div>
                        <div class="main__content-area__user-post__option-bar__options__option">Hastags</div>
                        <div class="main__content-area__user-post__option-bar__options__option">@Mention</div>
                    </div>
                    <div class="main__content-area__user-post__option-bar__post-btn">
                        <button class="btn">Post</button>
                    </div>
                </div>
            </div>
            <div class="main__content-area__link-preview">
                <!--
                Iframe does not because of security issue, use below technique to get around it
                1. Use AJAX
                2. You could use a proxy which fetches the requested page on your behalf and then you can host the proxy on your domain and load the web page from this proxy server with the new proxy URL rather then "twitter.com" in this question.
                -->
                <iframe src="https://www.w3schools.com" name="iframe_a" title="Iframe Example"></iframe>

<!--                <p><a href="" target="iframe_a">W3Schools.com</a></p>-->
            </div>
            <div class="CenterColumnFlex main__content-area__comments">
                <div class="main__content-area__comments__comment">Lorem ipsum dolor sit amet, consectetur adip</div>
                <div class="main__content-area__comments__comment">Lorem ipsum dolor sit amet, consectetur adipisicing elit. El</div>
                <div class="main__content-area__comments__comment">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab a</div>
                <div class="main__content-area__comments__comment">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam a</div>
                <div class="main__content-area__comments__comment">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
                <div class="main__content-area__comments__comment">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A</div>
                <div class="main__content-area__comments__comment">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A</div>
                <div class="main__content-area__comments__comment">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A</div>
                <div class="main__content-area__comments__comment">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A</div>
            </div>
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
        overflow: auto;
    }

    .main__search-area__results__result{
        background: lightsteelblue;
        padding: 0.8rem 1rem;
        border-radius: 10px;
        margin-right: 0.75rem;
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

    .main__content-area__comments{
        width: 100%;
        gap: 1rem;
        background: white;
        padding: 1rem;
        border-radius: 12px;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        align-items: flex-start;
        height: 70vh;
        overflow: auto;
    }

    .main__content-area__comments__comment{
        padding: 1rem;
        background: khaki;
        border-radius: 10px;
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
    .main__content-area__comments::-webkit-scrollbar {
        width: 0.25rem;
    }

    .main__content-area__comments::-webkit-scrollbar-track {
        background: #1e1e24;
    }

    .main__content-area__comments::-webkit-scrollbar-thumb {
        background: #6649b8;
    }
    /*******************************/
</style>
<!------------------------------------------------>

<!--<div class="btn-div">-->
<!--    {#if !isConnected}-->
<!--        <button on:click="{connect}" class="btn">Connect  Wallet</button>-->
<!--    {:else}-->
<!--        <div>-->
<!--            <b>Connected Address :</b> {address}-->
<!--        </div>-->
<!--        <div>-->
<!--            {#if !accessTokenFromLens}-->
<!--                <button on:click={getAccessTokenFromLens} class="btn">Get Access Token</button>-->
<!--            {:else}-->
<!--                <b>Access Token From Lens:</b>  {accessTokenFromLens}-->
<!--                <div class="btn-div">-->
<!--                    <button on:click={getUserProfile} class="btn">First Get User Profile</button>-->
<!--                    <div style="text-align: center">{JSON.stringify(profile)}</div>-->
<!--                    <input type="text" bind:value={userEnteredContent}>-->
<!--                    <button on:click={savePost} class="btn">Post Trial Text</button>-->
<!--                </div>-->
<!--            {/if}-->
<!--        </div>-->
<!--        <div>-->
<!--            <button on:click={getPostById} class="btn">-->
<!--                Fetch Post-->
<!--            </button>-->
<!--        </div>-->
<!--    {/if}-->

<!--    <div>-->
<!--        <p>Here we can get publication id</p>-->
<!--        <label >Input Url:</label> <br />-->
<!--        <input type="text" id="mood" bind:value={url}/>-->
<!--        <button class="btn" on:click={getPubId}>Get Publication Id</button>-->
<!--        <button class="btn" on:click={putPubId}>Put Publication Id</button>-->
<!--    </div>-->

<!--</div>-->


