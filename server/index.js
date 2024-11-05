import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import { performSearch } from './searx.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/research', async (req, res) => {
  try {
    const { topic, depth } = req.body;

    if (!topic || !depth) {
      return res.status(400).json({ 
        error: 'Topic and depth are required' 
      });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ 
        error: 'OpenAI API key is not configured' 
      });
    }

    // Perform search using SearX
    const searchResults = await performSearch(topic);

    if (!searchResults || searchResults.length === 0) {
      return res.status(404).json({ 
        error: 'No search results found' 
      });
    }

    // Generate research prompt
    const prompt = `Analyze the following research topic and search results to create a comprehensive summary:
Topic: ${topic}
Depth: ${depth}

Search Results:
${searchResults.map(result => `- ${result.title}: ${result.snippet}`).join('\n')}

Please provide:
1. A detailed summary
2. Key findings
3. Analysis of the sources`;

    // Get AI analysis
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        { 
          role: "system", 
          content: "You are an expert research assistant specializing in scientific analysis." 
        },
        { 
          role: "user", 
          content: prompt 
        }
      ],
      temperature: 0.7,
    });

    if (!completion.choices[0]?.message?.content) {
      throw new Error('No response from AI model');
    }

    // Process AI response
    const response = completion.choices[0].message.content;
    
    // Format results
    const results = {
      summary: response.split('Key findings:')[0].trim(),
      keyFindings: response.split('Key findings:')[1].split('Sources:')[0]
        .split('\n')
        .filter(line => line.trim())
        .map(finding => finding.replace(/^-\s*/, '')),
      sources: searchResults.slice(0, 5).map(result => ({
        title: result.title,
        url: result.url
      }))
    };

    res.json(results);
  } catch (error) {
    console.error('Research error:', error);
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    });
  }
});