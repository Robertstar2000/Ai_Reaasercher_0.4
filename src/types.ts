export interface Source {
  title: string;
  url: string;
}

export interface ResearchResult {
  summary: string;
  keyFindings: string[];
  sources: Source[];
}

export interface ResearchError {
  message: string;
  code?: string;
}