const {addPublication} = require('./../scripts/post')
const {createHash} = require('./../scripts/utils')

// async function getPublications(url) {
//     const trx = await LensStorageContract.getPublications(url)
//     console.log(trx)
//     return trx
// }

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
            try{
                const hashedUrl = createHash(args.url)
                await addPublication(hashedUrl, args.publicationId)
                return true
            }
            catch (exception) {
                console.log(exception)
            }

        }
    }
}

// addPublication("Biancnedorg.com","0x002345")


// console.log(API_KEY)
// const provider = new ethers.providers.AlchemyProvider("matic", API_KEY);
// const getGasPrice = async () => {
//     // The gas price (in wei)...
//     const gas = await provider.getGasPrice()
// // { BigNumber: "23238878592" }
//
// // ...often this gas price is easier to understand or
// // display to the user in gwei
//     console.log(parseInt(gas._hex,16))
//
// // '23.238878592'
// }

// const gasPrice = getGasPrice()
module.exports = {resolvers}
