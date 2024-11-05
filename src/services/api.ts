import type { ResearchResult, ResearchError } from '../types';

const API_URL = 'http://localhost:3000/api';

export async function performResearch(topic: string, depth: string): Promise<ResearchResult> {
  try {
    const response = await fetch(`${API_URL}/research`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topic, depth }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data || !data.summary || !data.keyFindings || !data.sources) {
      throw new Error('Invalid response format from server');
    }

    return data as ResearchResult;
  } catch (error) {
    const researchError: ResearchError = {
      message: error instanceof Error ? error.message : 'An unexpected error occurred',
      code: error instanceof TypeError ? 'BACKEND_CONNECTION' : undefined,
    };
    throw researchError;
  }
}