export async function load({ fetch, params }) {
  const res = await fetch(`/api/items/${params.id}`);
  const item = await res.json();

  return { item };
}
