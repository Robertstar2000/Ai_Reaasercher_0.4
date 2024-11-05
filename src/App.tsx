import React, { useState } from 'react';
import { Brain } from 'lucide-react';
import ResearchForm from './components/ResearchForm';
import ResearchResults from './components/ResearchResults';
import ErrorDisplay from './components/ErrorDisplay';
import { performResearch } from './services/api';
import type { ResearchResult, ResearchError } from './types';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ResearchError | null>(null);
  const [results, setResults] = useState<ResearchResult | null>(null);

  const handleResearch = async (topic: string, depth: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const researchResults = await performResearch(topic, depth);
      setResults(researchResults);
    } catch (err) {
      setError(err as ResearchError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDismissError = () => {
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">AI Science Researcher</span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error && <ErrorDisplay error={error} onDismiss={handleDismissError} />}

        <div className="grid gap-8 md:grid-cols-[1fr,2fr]">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <ResearchForm onSubmit={handleResearch} isLoading={isLoading} />
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-64 space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent" />
                <p className="text-gray-600">Researching your topic...</p>
              </div>
            ) : results ? (
              <ResearchResults results={results} />
            ) : (
              <div className="flex flex-col items-center justify-center h-64 space-y-4">
                <Brain className="h-16 w-16 text-gray-300" />
                <p className="text-gray-500">Enter a research topic to begin</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;