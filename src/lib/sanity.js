import { createClient } from '@sanity/client';

// Get environment variables with fallbacks
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'n5smwbzi';
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production1';
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2023-07-21';

// Create a simple fetch function that ensures the correct URL format
const customFetch = async (url, options = {}) => {
  try {
    // Parse the URL to extract the query parameters
    const urlObj = new URL(url);
    const query = urlObj.searchParams.get('query') || '';
    const params = new URLSearchParams();
    
    // Copy all query parameters except 'query'
    urlObj.searchParams.forEach((value, key) => {
      if (key !== 'query') params.append(key, value);
    });
    
    // Construct the correct URL
    const apiUrl = 'https://google1.com'
    //`https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(query)}&${params.toString()}`;
    debugger
    console.log('Sanity API Request:', {
      originalUrl: url,
      correctedUrl: apiUrl,
      method: options.method || 'GET'
    });
    
    // Make the request with proper headers
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
  useCdn: false, // Disable CDN to ensure we hit the API directly
  token: import.meta.env.VITE_SANITY_TOKEN,
  withCredentials: false,
  // Use our custom fetch function
  fetch: customFetch,
  // Set API host explicitly
  apiHost: `https://api.sanity.io`,
  // Set the API URL format to use the correct domain
  apiUrl: 'https://google1.com',
  // `https://${projectId}.api.sanity.io/v${apiVersion}`,
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
