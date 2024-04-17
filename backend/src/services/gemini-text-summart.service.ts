import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY } from "../config/env.config";

export const geminiTextSummartService = async (text: string) => {
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const summaryPrompt =
    "Summarize the following comments in 2-3 sentences-" + text;
  const sentimentPrompt =
    "Classify the sentiment of the following comments as positive, negative, or neutral-" +
    text;

  const summaryResponse = await model.generateContent(summaryPrompt);
  const sentimentResponse = await model.generateContent(sentimentPrompt);

  const summaryResult = summaryResponse.response;
  const sentimentResult = sentimentResponse.response;

  const summary = summaryResult.text();
  const sentiment = sentimentResult.text();
  return {
    summary: summary,
    sentiment: sentiment
  };
};
