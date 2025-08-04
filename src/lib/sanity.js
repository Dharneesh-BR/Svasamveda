import { createClient } from '@sanity/client';

// Configuration for Sanity client
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'n5smwbzi';
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production1';
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2023-07-21';
const useCdn = true; // Always use CDN for now

// Create a client with configuration
const config = {
  projectId,
  dataset,
  apiVersion,
  useCdn,
  withCredentials: false,
  token: import.meta.env.VITE_SANITY_TOKEN,
  
  // Force the correct URL format
  apiHost: 'https://api.sanity.io',
  
  // Add CORS headers to all requests
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Cache-Control': 'no-cache',
  },
  
  // Completely override the URL construction
  url: `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`,
  
  // Custom fetch function to handle CORS and better error handling
  fetch: async (url, options = {}) => {
    // Construct the correct URL manually
    const queryParams = new URLSearchParams({
      query: options.body ? JSON.parse(options.body).query : '',
      ...(options.body ? JSON.parse(options.body).params : {})
    });
    
    const fullUrl = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?${queryParams}`;
    
    console.log('Sanity API Request URL:', fullUrl);
    
    try {
      // Make the fetch request with the correct URL
      const response = await fetch(fullUrl, {
        method: 'GET', // Always use GET for queries
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SANITY_TOKEN || ''}`
        }
      });

      // Handle non-OK responses
      if (!response.ok) {
        const errorText = await response.text();
        const errorData = {
          status: response.status,
          statusText: response.statusText,
          url: fullUrl,
          responseText: errorText,
          headers: Object.fromEntries(response.headers.entries())
        };
        
        console.error('Sanity API Error:', errorData);
        throw new Error(`Sanity API Error (${response.status}): ${errorText || response.statusText}`);
      }
      
      return response;
    } catch (error) {
      console.error('Fetch Error:', {
        message: error.message,
        url: fullUrl,
        error: error.toString(),
        config: {
          projectId,
          dataset,
          apiVersion,
          useCdn,
          apiHost: 'https://api.sanity.io'
        }
      });
      
      // Create a more user-friendly error message
      const friendlyError = new Error('Failed to fetch data from Sanity. Please check your internet connection and try again.');
      friendlyError.originalError = error;
      throw friendlyError;
    }
  }
};

// Log configuration in development
if (import.meta.env.DEV) {
  console.log('Sanity Client Config:', {
    projectId: config.projectId,
    dataset: config.dataset,
    apiVersion: config.apiVersion,
    useCdn: config.useCdn,
    hasToken: !!config.token,
    apiHost: config.apiHost,
  });
}

// Create the Sanity client
export const client = createClient(config);

// Add a custom fetch function to handle CORS
const customFetch = (url, options = {}) => {
  // Add CORS headers to the request
  const headers = {
    ...options.headers,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  // For preflight requests, return a successful response
  if (options.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  // For regular requests, use the fetch API with CORS mode
  return fetch(url, {
    ...options,
    headers,
    mode: 'cors',
    credentials: 'same-origin', // or 'include' if you need to send cookies
  });
};

// Override the default fetch function
client.config().fetch = customFetch;

// Helper function to fetch all documents of a specific type
export async function getAllDocuments(type) {
  const query = `*[_type == "${type}"]`;
  const documents = await client.fetch(query);
  return documents;
}

// Helper function to fetch a single document by ID
export async function getDocumentById(type, id) {
  const query = `*[_type == "${type}" && _id == "${id}"][0]`;
  const document = await client.fetch(query);
  return document;
}

// Helper function to fetch documents with GROQ filters
export async function getFilteredDocuments(type, filters = '') {
  const query = `*[_type == "${type}"${filters ? ` && ${filters}` : ''}]`;
  const documents = await client.fetch(query);
  return documents;
}
