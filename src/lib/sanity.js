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
  
  // Use the CDN with the project ID
  apiHost: `https://${projectId}.api.sanity.io`,
  
  // Add CORS headers to all requests
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Cache-Control': 'no-cache',
  },
  
  // Custom fetch function to handle CORS
  fetch: (url, options = {}) => {
    console.log('Sanity API Request:', url.toString());
    
    return fetch(url, {
      ...options,
      mode: 'cors',
      credentials: 'omit',
    }).then(response => {
      if (!response.ok) {
        console.error('Sanity API Error:', response.status, response.statusText);
        return response.text().then(text => {
          console.error('Response body:', text);
          throw new Error(`Sanity API Error: ${response.status} ${response.statusText}`);
        });
      }
      return response;
    });
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
