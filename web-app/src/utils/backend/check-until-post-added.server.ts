import checkTxHashBeenIndexed from "../checkTxHashBeenIndexed";

export const checkUntilMainPostAdded = async (txHash, startTime) => {
    /** If link is not added to lensview within 60 seconds, then stop checking */
    // console.log("date timestamps", startTime, Date.now());

    if (Date.now() - startTime > 20000000) {
        console.log("Error indexing main post, time exceeded 25 seconds");
        return false
    }

    const hasIndexedResponse = await checkTxHashBeenIndexed(txHash);

    if (hasIndexedResponse?.data?.hasTxHashBeenIndexed?.indexed === false) {
        console.log("Waiting for link to be added to lensview");
        setTimeout(() => checkUntilMainPostAdded(txHash, startTime), 1000);
    } else {
        console.log("Transaction indexed");
        return true
    }
};