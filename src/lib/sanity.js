import { createClient } from '@sanity/client';

// Get environment variables with fallbacks
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'n5smwbzi';
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production1';
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2023-07-21';

// Custom fetch to ensure correct URL format
const customFetch = async (url, options = {}) => {
  try {
    const urlObj = new URL(url);
    const query = urlObj.searchParams.get('query') || '';
    const params = new URLSearchParams();

    // Keep all params except 'query'
    urlObj.searchParams.forEach((value, key) => {
      if (key !== 'query') params.append(key, value);
    });

    // Correct Sanity API URL
    const apiUrl = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(query)}&${params.toString()}`;

    console.log('Sanity API Request:', {
      originalUrl: url,
      correctedUrl: apiUrl,
      method: options.method || 'GET'
    });

    const response = await fetch(apiUrl, {
      ...options,
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cache-Control': 'no-cache',
        ...(options.headers || {})
      }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Sanity API Error:', {
        status: response.status,
        statusText: response.statusText,
        url: apiUrl,
        error: errorData
      });
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error('Error in Sanity client fetch:', error);
    throw error;
  }
};

const config = {
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: import.meta.env.VITE_SANITY_TOKEN,
  withCredentials: false,
  fetch: customFetch,
  apiHost: `https://api.sanity.io`,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Cache-Control': 'no-cache',
  },
  requestTagPrefix: 'sanity-js',
};

export const client = createClient(config);

console.log('Sanity Client Config:', {
  projectId: config.projectId,
  dataset: config.dataset,
  apiVersion: config.apiVersion,
  apiHost: config.apiHost,
  useCdn: config.useCdn,
});
