const {ethers} = require('ethers')
const axios = require("axios");

// get max fees from gas station


const fetchGas = async () => {
    let maxFeePerGas = ethers.BigNumber.from(40000000000) // fallback to 40 gwei
    let maxPriorityFeePerGas = ethers.BigNumber.from(40000000000) // fallback to 40 gwei
    try {
        console.log("FetchGas called")
        console.log("Estimating gas for the transaction")
        const { data } = await axios({
            method: 'get',
            url: true
                ? 'https://gasstation-mainnet.matic.network/v2'
                : 'https://gasstation-mumbai.matic.today/v2',
        })
        maxFeePerGas = ethers.utils.parseUnits(
            Math.ceil(data.fast.maxFee) + '',
            'gwei'
        )
        maxPriorityFeePerGas = ethers.utils.parseUnits(
            Math.ceil(data.fast.maxPriorityFee) + '',
            'gwei'
        )
        return [Number(maxFeePerGas._hex),Number(maxPriorityFeePerGas._hex)]
    } catch (error) {
        // ignore
        console.log(error)
    }
}

const getGas = async() => {
    let gas = await fetchGas()
    let maxFeePerGas = gas[0]
    let maxPriorityFeePerGas = gas[1]
    console.log("max fee per gas",maxFeePerGas)
    console.log("max priority fee per gas",maxPriorityFeePerGas)
    return [maxFeePerGas, maxPriorityFeePerGas]
}



module.exports = {getGas}
