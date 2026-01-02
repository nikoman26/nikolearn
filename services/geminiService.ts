import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ChatMessage } from "../types";

// Initialize Gemini Client
// In a real production app, ensure strict env var checks.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const MWALIMU_SYSTEM_INSTRUCTION = `
You are NIKOlearn's Mwalimu AI.
Tone: Encouraging, patient, uniquely Kenyan.
Curriculum: CBC (Competency Based Curriculum).
Audience: Primary school students (Grade 4-6).
Constraints: 
1. Keep answers under 3 sentences unless asked for a story.
2. Mix English with basic friendly Swahili terms (e.g., "Vizuri sana!", "Hujambo?", "Sasa").
3. Use local analogies (e.g., 'jiko', 'matatu', 'shamba') to explain complex concepts.
4. Always end with a curious question to keep the student engaged.
`;

export const sendMessageToMwalimu = async (
  history: ChatMessage[],
  newMessage: string
): Promise<string> => {
  try {
    if (!process.env.API_KEY) {
      return "Jambo! It looks like my API key is missing. Please tell the developer to check the environment variables.";
    }

    // Convert internal chat history to Gemini format if needed, 
    // but for single turn or simple context, we can just send the prompt with instruction.
    // For this MVP, we will use a fresh generateContent call with history context injected as text 
    // to ensure stateless simplicity or use the Chat API. Let's use Chat API for better context.
    
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: MWALIMU_SYSTEM_INSTRUCTION,
      },
      history: history.map(msg => ({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.text }],
      }))
    });

    const response: GenerateContentResponse = await chat.sendMessage({
      message: newMessage
    });

    return response.text || "Samahani, I didn't quite catch that. Can you say it again?";
  } catch (error) {
    console.error("Mwalimu AI Error:", error);
    return "Pole sana (So sorry)! I'm having trouble connecting to the internet right now. Please try again later.";
  }
};
