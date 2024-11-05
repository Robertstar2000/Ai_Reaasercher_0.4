import axios from 'axios';

const SEARX_INSTANCE = 'https://searx.be';
const MAX_RETRIES = 3;
const TIMEOUT = 10000; // 10 seconds

export async function performSearch(query) {
  let retries = 0;

  while (retries < MAX_RETRIES) {
    try {
      const response = await axios.get(`${SEARX_INSTANCE}/search`, {
        params: {
          q: query,
          format: 'json',
          categories: 'science',
          language: 'en'
        },
        timeout: TIMEOUT
      });

      if (!response.data?.results) {
        throw new Error('Invalid response format from SearX');
      }

      return response.data.results.map(result => ({
        title: result.title || 'Untitled',
        url: result.url,
        snippet: result.content || result.snippet || 'No description available'
      }));
    } catch (error) {
      retries++;
      
      if (retries === MAX_RETRIES) {
        console.error('SearX search failed after max retries:', error);
        throw new Error('Search service is currently unavailable');
      }
      
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, 1000 * retries));
    }
  }

  return [];
}