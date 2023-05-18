import {PUBLIC_LENS_API_URL} from "$env/static/public";
import {APP_LENS_ID} from "$env/static/private";
import getPosts from "../../graphql/getPosts";

export const getParentPost = async (request) => {

    const hashedURL = request.url.searchParams.get('hashedURL');
    try {
        const posts = await fetch(PUBLIC_LENS_API_URL, {
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
        const response = await posts.json()
        const parentPostID = response.data.publications.items[0].id;
        const sourceURL = response.data.publications.items[0].metadata.content;

        return {
            "status_code": 200,
            "parent_post_ID": parentPostID,
            "source_url": sourceURL
        };

    } catch (err) {
        console.log('ERROR: failed to fetch details about parent Publication ID');
    }
}