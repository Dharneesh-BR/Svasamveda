import { client } from '../lib/sanity.js';

export const testSanityConnection = async () => {
  try {
    const result = await client.fetch('*[_type == "program"][0]');
    console.log('✅ Sanity connection successful');
    return { success: true, data: result };
  } catch (error) {
    console.error('❌ Sanity connection failed:', error.message);
    return { success: false, error: error.message };
  }
};

// Auto-test in development and production preview
if (import.meta.env.DEV || window.location.port === '4173') {
  testSanityConnection();
}

// Export for manual testing
window.testSanity = testSanityConnection;