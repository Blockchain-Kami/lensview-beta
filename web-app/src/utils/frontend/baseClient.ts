import { createClient, Client } from '@urql/core';
import { PUBLIC_LENS_API_URL } from '$env/static/public';

const baseClient: Client = createClient({
  url: PUBLIC_LENS_API_URL
});

export default baseClient;
