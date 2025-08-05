import { createClient } from '@sanity/client';

// Get environment variables with fallbacks
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'n5smwbzi';
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production1';
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2023-07-21';

// Custom fetch function to ensure correct URL construction
const customFetch = (url, options = {}) => {
  // Extract the path from the URL
  const urlObj = new URL(url);
  const pathParts = urlObj.pathname.split('/').filter(Boolean);
  
  // Reconstruct the correct URL
  const correctUrl = new URL(
    `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`
  );
  
  // Add query parameters
  urlObj.searchParams.forEach((value, key) => {
    correctUrl.searchParams.append(key, value);
  });
  
  console.log('Sanity API Request:', {
    originalUrl: url,
    correctedUrl: correctUrl.toString(),
    method: options.method || 'GET',
    headers: options.headers || {}
  });
  
  // Use the corrected URL for the fetch
  return fetch(correctUrl.toString(), {
    ...options,
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Cache-Control': 'no-cache',
      ...(options.headers || {})
    }
  });
};

const config = {
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Disable CDN to ensure we hit the API directly
  token: import.meta.env.VITE_SANITY_TOKEN,
  withCredentials: false,
  // Use our custom fetch function
  fetch: customFetch,
  // Set API host explicitly
  apiHost: `https://${projectId}.api.sanity.io`,
  // Add CORS headers
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Cache-Control': 'no-cache',
  },
  // Add request tag for debugging
  requestTagPrefix: 'sanity-js',
};

// Create the client with our custom configuration
export const client = createClient(config);

// Log client configuration for debugging
console.log('Sanity Client Config:', {
  projectId: config.projectId,
  dataset: config.dataset,
  apiVersion: config.apiVersion,
  apiHost: config.apiHost,
  useCdn: config.useCdn,
});
