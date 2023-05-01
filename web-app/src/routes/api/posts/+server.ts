import { PUBLIC_LENS_API_URL } from "$env/static/public";
import getPosts from '../../../graphql/getPosts';
import { json } from '@sveltejs/kit';
import { APP_LENS_ID } from '$env/static/private';


export async function GET(request) {

    const hashedURL = request.url.searchParams.get('hashedURL');

    try {
        const data = await fetch(PUBLIC_LENS_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: getPosts,
                    variables: {
                      hashedURL: hashedURL,
                      lensId: APP_LENS_ID
                    },
                }),
            })

        const response = await data.json()

        return json(response);
    } catch {
        console.log("error");
    }
}

