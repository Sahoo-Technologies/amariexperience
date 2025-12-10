import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Initialize Gemini
// Note: In a real app, handle missing API key gracefully.
// We are following the instruction to assume process.env.API_KEY is valid.
const ai = new GoogleGenAI({ apiKey });

export const getPlanningAdvice = async (userMessage: string, context?: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    const systemInstruction = `You are "Amari", a luxury wedding concierge for Diani, Kenya. 
    Your goal is to assist couples in planning their dream wedding on the Kenyan coast.
    You are knowledgeable about:
    - Diani Beach venues and local customs (Swahili culture).
    - Weather patterns (best time: Dec-Mar, Jul-Oct).
    - Legal requirements for weddings in Kenya.
    - Vendor types (Photographers, Caterers, etc.).
    - Creating romantic itineraries.
    
    Tone: Warm, sophisticated, helpful, and celebratory.
    Keep responses concise and easy to read.
    `;

    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction,
      }
    });

    const response = await chat.sendMessage({
      message: userMessage + (context ? `\nContext: ${context}` : '')
    });

    return response.text || "I apologize, I couldn't generate a response at the moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the wedding planning servers right now. Please try again later.";
  }
};
