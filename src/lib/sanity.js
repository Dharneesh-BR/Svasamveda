import { createClient } from '@sanity/client';

// Create a client with configuration from environment variables
const config = {
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production1',
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2023-07-21',
  useCdn: import.meta.env.VITE_SANITY_USE_CDN === 'true' || process.env.NODE_ENV === 'production',
  withCredentials: false,
  token: import.meta.env.VITE_SANITY_TOKEN, // Optional: for write operations
};

// Log configuration in development
if (import.meta.env.DEV) {
  console.log('Sanity Client Config:', {
    projectId: config.projectId,
    dataset: config.dataset,
    apiVersion: config.apiVersion,
    useCdn: config.useCdn,
    hasToken: !!config.token
  });
}

export const client = createClient(config);

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
