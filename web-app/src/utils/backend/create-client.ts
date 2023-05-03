import {createClient} from "@urql/core";
import { PUBLIC_LENS_API_URL } from "$env/static/public";


export let client = createClient({
    url: PUBLIC_LENS_API_URL
});

