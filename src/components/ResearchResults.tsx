import React from 'react';
import { ExternalLink } from 'lucide-react';
import type { ResearchResult } from '../types';

interface ResearchResultsProps {
  results: ResearchResult;
}

const ResearchResults: React.FC<ResearchResultsProps> = ({ results }) => {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-3">Summary</h2>
        <p className="text-gray-700 leading-relaxed">{results.summary}</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-3">Key Findings</h2>
        <ul className="space-y-2">
          {results.keyFindings.map((finding, index) => (
            <li key={index} className="flex items-start">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-indigo-100 text-indigo-800 text-sm font-medium mr-3">
                {index + 1}
              </span>
              <span className="text-gray-700">{finding}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-3">Sources</h2>
        <ul className="space-y-2">
          {results.sources.map((source, index) => (
            <li key={index} className="flex items-start">
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start text-gray-700 hover:text-indigo-600"
              >
                <ExternalLink className="h-5 w-5 mr-2 flex-shrink-0 group-hover:text-indigo-600" />
                <span className="underline">{source.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default ResearchResults;