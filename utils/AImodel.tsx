import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
  ChatSession,
} from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY is not set in environment variables");
}

let genAI: GoogleGenerativeAI;
let model: any;
let chatSession: ChatSession;

try {
  genAI = new GoogleGenerativeAI(apiKey);
  model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  chatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [],
  });
} catch (error) {
  console.error("Error initializing Gemini AI:", error);
  throw new Error("Failed to initialize Gemini AI model");
}

export { chatSession };
