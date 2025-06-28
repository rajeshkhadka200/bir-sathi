import { GoogleGenerativeAI } from "@google/generative-ai";
const CLIENT_ID = "";
const genAI = new GoogleGenerativeAI();

export async function getGeminiReply(userMsg) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
You are a WhatsApp hospital assistant bot. Detect the language of this message (Nepali or English). 
Then, based on user intent, reply politely in the same language. 

User Message:
"${userMsg}"

Reply like a WhatsApp bot (1 short message only).
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}
