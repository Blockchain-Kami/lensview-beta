export async function load({ fetch, params }) {
  const { hashedURL }= params;
  const res = await fetch(`/api/posts?hashedURL=${hashedURL}`);
  return await res.json();
}
