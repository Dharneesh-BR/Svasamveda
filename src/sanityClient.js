import sanityClient from '@sanity/client';

export default sanityClient({
  projectId: 'your_project_id', // Find this in sanity.io/manage
  dataset: 'production',        // Or your dataset name
  useCdn: true,                 // `false` if you want to ensure fresh data
  apiVersion: '2023-01-01',     // Use a UTC date string
});