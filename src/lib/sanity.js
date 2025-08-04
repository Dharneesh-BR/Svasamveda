import { createClient } from '@sanity/client';

const config = {
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'n5smwbzi',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production1',
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2023-07-21',
  useCdn: true,
  token: import.meta.env.VITE_SANITY_TOKEN,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Cache-Control': 'no-cache',
  },
};

export const client = createClient(config);
