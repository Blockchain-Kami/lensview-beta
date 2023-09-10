import express, {Request, Response} from 'express';
import bodyParser from "body-parser";
import {getRelatedPubsHandler} from "../controller/getRelatedPubs.controller.ts";

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    return res.status(200).send({message: "Welcome to LensView API"})
});

router.post('/related-pubs',bodyParser.text({type: '*/*'}), getRelatedPubsHandler);

export default router;