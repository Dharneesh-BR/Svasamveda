import { createClient } from '@sanity/client';

// ✅ Validate required environment variables
function validateEnvVar(name) {
  const value = import.meta.env[name];
  if (!value) {
    throw new Error(`❌ Missing required environment variable: ${name}`);
  }
  return value.trim();
}

const projectId = validateEnvVar('VITE_SANITY_PROJECT_ID');
const dataset = validateEnvVar('VITE_SANITY_DATASET');
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2023-07-21';

// ✅ Fix: Clean projectId to prevent duplicate in URL
const cleanProjectId = projectId.replace(/\.api\.sanity\.io.*$/, '').trim();

if (cleanProjectId !== projectId) {
  console.warn('⚠️ Fixed malformed VITE_SANITY_PROJECT_ID:', projectId, '→', cleanProjectId);
}

const config = {
  projectId: cleanProjectId,
  dataset,
  apiVersion,
  useCdn: import.meta.env.VITE_SANITY_USE_CDN === 'true',
  token: import.meta.env.VITE_SANITY_TOKEN || undefined,
  withCredentials: false,
  ignoreBrowserTokenWarning: true
};

// ✅ Custom fetch with extra logging in development
const customFetch = async (url, options = {}) => {
  if (import.meta.env.DEV) {
    console.log('Sanity API Request:', { url, method: options.method || 'GET' });
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(config.token && { 'Authorization': `Bearer ${config.token}` }),
      ...(options.headers || {})
    }
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`❌ Sanity API Error: ${response.status} ${errorText}`);
  }

  return response;
};

// ✅ Create and export the client
export const client = createClient({
  ...config,
  fetch: customFetch,
  requestTagPrefix: 'sanity-js'
});

// Log final config in development
if (import.meta.env.DEV) {
  console.log('✅ Sanity Client Configuration:', {
    projectId: config.projectId,
    dataset: config.dataset,
    apiVersion: config.apiVersion,
    tokenSet: !!config.token
  });
}
