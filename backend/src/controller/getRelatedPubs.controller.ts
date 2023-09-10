import dotenv from 'dotenv';
import {Request, Response} from "express";
import {isInputTypeUrl} from "../utils/checkInputType.utils.ts";
import {createHash} from "../utils/createHash.utils.ts";
import {preprocessURL} from "../utils/preprocessURL.utils.ts";
import {logger} from "../log/logManager.ts";
import relatedPubs from "../queries/relatedPubs.queries.ts";
import fetch from "node-fetch";

dotenv.config();

const PUBLIC_APP_LENS_ID: any = process.env.PUBLIC_APP_LENS_ID;
const PUBLIC_LENS_API_URL: any = process.env.PUBLIC_LENS_API_URL;

export const getRelatedPubsHandler = async (req: Request, res: Response) => {
    const inputString = req.body.toString();
    logger.info("routes/api/related-pubs: getRelatedPubsHandler :: " + "EXECUTION START: GET RELATED PUBS : input: " + inputString);

    const URL = isInputTypeUrl(inputString);
    const relatedPubArray: any = [];
    let tag;

    if (URL) {
        logger.info("routes/api/related-pubs: getRelatedPubsHandler :: " + "EXECUTION START: GET RELATED PUBS : input is URL");
        const urlObject: any = preprocessURL(URL);
        const hostname: any = urlObject[1];
        tag = createHash(hostname.toString());

        const relatedPosts = await getRelatedParentPublications(tag)

        if (relatedPosts['items'].length < 1) {
            logger.error("routes/api/related-pubs: getRelatedPubsHandler :: " + "EXECUTION END: GET RELATED PUBS: No related publications found for URL: " + URL);
            return res.status(200).send({
                message: 'No related publications found'
            });
        }

        for (let i = 0; i < relatedPosts['items'].length; i++) {
            relatedPubArray.push(relatedPosts['items'][i]['id']);
        }
        logger.info("routes/api/related-pubs: getRelatedPubsHandler :: " + "EXECUTION END: GET RELATED PUBS: DONE: Related Publications Fetched for URL: " + URL);
        return res.status(200).send({
            relatedPubArray
        });

    } else {
        logger.info("routes/api/related-pubs: getRelatedPubsHandler :: " + "EXECUTION START: GET RELATED PUBS : input is a keyword");
        const keywords = inputString.trim().split(' ');

        for (let i = 0; i < keywords.length ; i++) {
            const keyword = keywords[i].trim();

            if (keyword != '' ) {
                const res: any = await getRelatedParentPublications(keyword.toLowerCase());
                const items: any = res?.items;
                items.forEach((publication: any) => {
                    relatedPubArray.push(publication.id);
                })
            }

        }
        if (relatedPubArray.length > 0) {
            logger.info("routes/api/related-pubs: +server.ts :: " + "EXECUTION END: GET RELATED PUBS: DONE: Related Publication IDs Fetched for keywords: " + keywords);
            return res.status(200).send({
                relatedPubArray
            });
        } else {
            logger.info("routes/api/related-pubs: +server.ts :: " + "EXECUTION END: GET RELATED PUBS: DONE: Could Not Find Related Publication IDs for keywords: " + keywords);
            return res.status(200).send({
                relatedPubArray
            });
        }

    }
}

const getRelatedParentPublications = async (tag: string) => {
    logger.info("routes/api/related-pubs: +server.ts :: " + "EXECUTION START: getRelatedParentPublications: Entered Tag: " + tag );
    try {
        const posts = await fetch(PUBLIC_LENS_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: relatedPubs,
                variables: {
                    hashedURL: tag,
                    lensId: PUBLIC_APP_LENS_ID
                }
            })
        });

        const postJSON: any = await posts.json();
        logger.info("routes/api/related-pubs: +server.ts :: " + "EXECUTION END: getRelatedParentPublications: DONE: Entered Tag: " + tag );
        return postJSON.data['publications'];
    } catch (error) {
        logger.error("routes/api/related-pubs: +server.ts :: " + "EXECUTION END: getRelatedParentPublications: FAILED: Entered Tag: " + tag + " : Error: " + error );
    }
}