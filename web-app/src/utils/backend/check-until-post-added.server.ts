import checkTxHashBeenIndexed from "../checkTxHashBeenIndexed";
import {logger} from "../../log/logManager";

export const checkUntilMainPostAdded = async (txHash, startTime) => {
    /** If link is not added to lensview within 60 seconds, then stop checking */
    logger.info("check-until-post-added: server.ts:: " + "EXECUTION START: checkUntilMainPostAdded");
    if (Date.now() - startTime > 20000000) {
        logger.error("check-until-post-added: server.ts:: " + "EXECUTION END: checkUntilMainPostAdded: FAILED: Error Indexing Transaction Hash: " + txHash);
        return false
    }

    const hasIndexedResponse = await checkTxHashBeenIndexed(txHash);

    if (hasIndexedResponse?.data?.hasTxHashBeenIndexed?.indexed === false) {
        logger.info("check-until-post-added: server.ts:: " + "Indexing: checkUntilMainPostAdded: Waiting to Index Transaction Hash: " + txHash);
        setTimeout(async () => await checkUntilMainPostAdded(txHash, startTime), 1000);
    } else {
        logger.info("check-until-post-added: server.ts:: " + "EXECUTION END: checkUntilMainPostAdded: SUCCESS: Indexed Transaction Hash: " + txHash);
        return true
    }
};