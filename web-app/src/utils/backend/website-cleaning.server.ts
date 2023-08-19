export const websiteSpecificCleaning = (input: string) => {
    const inputURL = new URL(input)
    // youtube specific cleaning, convert 'm.youtube' to 'youtube' and remove query parameter 't='
    if (inputURL.hostname == 'm.youtube.com' || inputURL.hostname == 'youtube.com' ){
        let webUrl = input.replace('m.youtube.com', 'youtube.com');
        webUrl = webUrl.replace(/&t=\d+s/, '');
        return webUrl;
    } else {
        return input;
    }
}