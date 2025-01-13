import { redirect } from "@sveltejs/kit";

export async function load() {
  throw redirect(301, "https://explorer.gitcoin.co/#/round/42161/23/19"); // Replace with actual URL
}
