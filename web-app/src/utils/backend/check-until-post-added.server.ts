import checkTxHashBeenIndexed from "../checkTxHashBeenIndexed";
import {logger} from "../../log/logManager";

export const checkUntilMainPostAdded = async (txHash, startTime) => {
    /** If link is not added to lensview within 60 seconds, then stop checking */
    logger.info("utils/backend: check-until-post-added :: " + "EXECUTION START: checkUntilMainPostAdded");
    if (Date.now() - startTime > 25000) {
        logger.error("utils/backend: check-until-post-added :: " + "EXECUTION END: checkUntilMainPostAdded: FAILED: Error Indexing Transaction Hash: " + txHash);
        return false
    }

    const hasIndexedResponse = await checkTxHashBeenIndexed(txHash);

    if (hasIndexedResponse?.data?.hasTxHashBeenIndexed?.indexed === false) {
        logger.info("utils/backend: check-until-post-added :: " + "Indexing: checkUntilMainPostAdded: Waiting to Index Transaction Hash: " + txHash);
        await checkUntilMainPostAdded(txHash, startTime);
    } else {
        logger.info("utils/backend: check-until-post-added :: " + "EXECUTION END: checkUntilMainPostAdded: SUCCESS: Indexed Transaction Hash: " + txHash);
        return true
    }
};