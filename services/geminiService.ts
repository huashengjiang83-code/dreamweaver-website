
import { GoogleGenAI, Type, Schema, Chat, GenerateContentResponse } from "@google/genai";
import { SCIENTIFIC_SYMBOLS, TRADITIONAL_SYMBOLS } from '../constants';
import { DreamReport } from '../types';

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// Define the output schema to ensure strict JSON structure
const reportSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    introduction: {
      type: Type.STRING,
      description: "A philosophical, elegant summary of the dream in a 'Wisdom-Oriented Philosopher' tone (Chinese).",
    },
    psychological_decode: {
      type: Type.OBJECT,
      properties: {
        content: { type: Type.STRING, description: "Analysis based on Western Psychology (Freud/Jung/Cognitive)." },
        key_concepts: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Key psychological terms used." }
      },
      required: ["content", "key_concepts"]
    },
    traditional_divination: {
      type: Type.OBJECT,
      properties: {
        content: { type: Type.STRING, description: "Analysis based on Eastern Tradition (Zhou Gong/I Ching/Taoism)." },
        cultural_context: { type: Type.STRING, description: "Specific cultural or historical context references." }
      },
      required: ["content", "cultural_context"]
    },
    sources: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING, description: "Unique ID for the source (e.g., 'Psych-1', 'Trad-1')" },
          text: { type: Type.STRING, description: "The full citation text (Book/Author)" }
        },
        required: ["id", "text"]
      },
      description: "A list of all sources cited in the analysis."
    }
  },
  required: ["introduction", "psychological_decode", "traditional_divination", "sources"]
};

// Context construction
const knowledgeBaseContext = `
[System Knowledge Base - Scientific]
${JSON.stringify(SCIENTIFIC_SYMBOLS)}

[System Knowledge Base - Traditional]
${JSON.stringify(TRADITIONAL_SYMBOLS)}
`;

const systemInstruction = `
You are "Tai Xu" (太虚), a dual-core dream interpretation AI with the persona of a "Wisdom-Oriented Philosopher" (哲人派).

Your Goal:
Provide a deep, elegant, and structured analysis of the user's dream.

Core Principles:
1. NO HALLUCINATIONS: You must strictly base your analysis on known psychological theories (Freud, Jung) and established Traditional Chinese texts (Zhou Gong, I Ching, Taoism). 
2. DUALITY: Your report must be balanced exactly 50% Western Science and 50% Eastern Tradition.
3. TONE: Elegant (典雅), Philosophical (富有哲理), Inspiring (启发性). Avoid cheap slang. Use Chinese language.
4. SOURCING: You MUST cite the source of your interpretation. Use the provided Knowledge Base where possible, or strictly factual external knowledge.

Context Data:
${knowledgeBaseContext}
`;

// Store the chat session instance
let currentChatSession: Chat | null = null;

export const analyzeDreamWithGemini = async (dreamText: string): Promise<DreamReport> => {
  if (!apiKey) {
    throw new Error("API Key is missing.");
  }

  // Initialize a new chat session for this dream analysis to maintain context for follow-ups
  currentChatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: systemInstruction,
      temperature: 0.4, 
    },
  });

  try {
    // We use sendMessage, but we enforce JSON schema for the FIRST response to get the report structure
    const response = await currentChatSession.sendMessage({
      message: `Analyze this dream: "${dreamText}". output valid JSON matching the specified schema.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: reportSchema,
      }
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("Empty response from Gemini.");
    }

    return JSON.parse(resultText) as DreamReport;

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};

export const chatWithTaiXu = async (message: string): Promise<string> => {
  if (!currentChatSession) {
    throw new Error("No active session. Please analyze a dream first.");
  }

  try {
    // For follow-up chat, we do NOT enforce JSON schema, we want natural text
    const response: GenerateContentResponse = await currentChatSession.sendMessage({
      message: message,
      config: {
        // Reset mimeType to text for conversation
        responseMimeType: "text/plain", 
      }
    });
    
    return response.text || "太虚静默无言...";
  } catch (error) {
    console.error("Chat Error:", error);
    throw error;
  }
};
