const ethers = require("ethers")
require('dotenv').config()

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const API_URL = process.env.API_URL
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS

const contract = require("../artifacts/contracts/LensStorage.sol/LensStorage.json")

const provider = new ethers.providers.AlchemyProvider("maticmum", API_KEY)

const signer = new ethers.Wallet(PRIVATE_KEY, provider)

const LensStorageContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer)

async function getUrl(id) {
    const url = await LensStorageContract.urls(id)
    console.log(url)
    return url
}

async function addPublication(url, publicationID) {
    console.log("Writing to contract 0x1eFa4D3BC84EF7C06cD8Ff8B0d7747E1a88fbC43..")
    const trx = await LensStorageContract.addPublication(url, publicationID)
    const response = await trx.wait()

    if(response == "ok") {
        console.log("Publication: " + publicationID +" added to url: " + url)
    } else {
        console.log("Transaction failed")
    }
}

async function getPublications(url) {
    const trx = await LensStorageContract.getPublications(url)
    console.log(trx)
    return trx
}

const resolvers = {
    Query: {
        getUrlAt: async (_,args) => {
            const url = getUrl(args.id)
            return url
        },
        getPublicationsForUrl: async (_, args) => {
            const publications = getPublications(args.url)
            return publications
        }
    },
    Mutation: {
        addPublicationTo: async (_, args) => {
            await addPublication(args.url, args.publicationId)
            return true
        }
    }
}

module.exports = {resolvers}