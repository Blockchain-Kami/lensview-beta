import { redirect } from "@sveltejs/kit";

export async function load() {
    throw redirect(301, "https://gitcoindonordata.xyz/projects/lensview"); // Replace with actual URL
}
