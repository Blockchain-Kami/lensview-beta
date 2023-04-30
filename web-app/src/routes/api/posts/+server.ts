
import { APP_ADDRESS } from "$env/static/private";
import { PUBLIC_LENS_API_URL } from "$env/static/public";
import getPosts from '../../../graphql/getPosts';
import { json } from '@sveltejs/kit';
import createHash from "../../../utils/backend/getHash";





export async function GET(url) {

    console.log(url.length)
    const hashedURL = createHash(url)

    console.log(hashedURL)
    try {
        const data = await fetch(PUBLIC_LENS_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: getPosts,
                    variables: {
                        url: hashedURL,
                    },
                }),
            })

        const response = await data.json()

        return json(response);
    } catch {
        console.log("error")
    }
}