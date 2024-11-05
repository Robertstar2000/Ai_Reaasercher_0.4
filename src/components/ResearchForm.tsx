import React from 'react';
import { Search } from 'lucide-react';

interface ResearchFormProps {
  onSubmit: (topic: string, depth: string) => Promise<void>;
  isLoading: boolean;
}

const ResearchForm: React.FC<ResearchFormProps> = ({ onSubmit, isLoading }) => {
  const [topic, setTopic] = React.useState('');
  const [depth, setDepth] = React.useState('intermediate');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(topic, depth);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="topic" className="block text-sm font-medium text-gray-700">
          Research Topic
        </label>
        <div className="mt-1 relative">
          <input
            type="text"
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your research topic"
            required
          />
          <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div>
        <label htmlFor="depth" className="block text-sm font-medium text-gray-700">
          Research Depth
        </label>
        <select
          id="depth"
          value={depth}
          onChange={(e) => setDepth(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="basic">Basic</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Researching...' : 'Start Research'}
      </button>
    </form>
  );
};

export default ResearchForm;