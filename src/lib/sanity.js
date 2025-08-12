import { createClient } from '@sanity/client';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'n5smwbzi';
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production1';
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2023-07-21';

const customFetch = async (url, options = {}) => {
  console.log('Sanity API Request URL:', url);

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Cache-Control': 'no-cache',
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    let errorData = {};
    try {
      errorData = await response.json();
    } catch {}

    console.error('Sanity API Error:', {
      status: response.status,
      statusText: response.statusText,
      url,
      error: errorData,
    });

    throw new Error(`Sanity fetch HTTP error: ${response.status} ${response.statusText}`);
  }

  return response;
};
