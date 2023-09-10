import express from 'express';
import bodyParser from "body-parser";
import router from "./src/routes/posts.routes.ts";

const app = express();
app.use(bodyParser.json());

app.use('/', router);

app.listen(3000, () => {
    console.log(`Server started on http://localhost:3000`);
});