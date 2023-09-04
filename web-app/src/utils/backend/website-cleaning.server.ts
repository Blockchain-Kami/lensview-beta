import {logger} from "../../log/logManager";

export const websiteSpecificCleaning = (input: string) => {
    logger.info("utils/backend: website-cleaning :: " + "EXECUTION START: websiteSpecificCleaning");
    const inputURL = new URL(input)
    // YouTube specific cleaning, convert 'm.youtube' to 'youtube' and remove query parameter 't='
    if (inputURL.hostname == 'm.youtube.com' || inputURL.hostname == 'youtube.com' ){
        let webUrl = input.replace('m.youtube.com', 'youtube.com');
        webUrl = webUrl.replace(/&t=\d+s/, '');
        logger.info("utils/backend: website-cleaning :: " + "EXECUTION END: websiteSpecificCleaning: " + " YouTube URL");
        return webUrl;
    } else {
        logger.info("utils/backend: website-cleaning :: " + "EXECUTION END: websiteSpecificCleaning: " + "Not a YouTube URL");
        return input;
    }
}