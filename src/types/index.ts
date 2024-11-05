export interface ResearchResult {
  summary: string;
  keyFindings: string[];
  sources: {
    title: string;
    url: string;
  }[];
}

export interface ResearchFormData {
  topic: string;
  depth: 'basic' | 'intermediate' | 'advanced';
}

export interface ResearchError {
  message: string;
  code?: string;
}