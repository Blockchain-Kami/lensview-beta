import { redirect } from "@sveltejs/kit";

export async function load() {
  throw redirect(301, "https://explorer.gitcoin.co/#/round/10/44/89"); // Replace with actual URL
}
