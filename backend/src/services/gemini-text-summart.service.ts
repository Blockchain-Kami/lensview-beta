import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY } from "../config/env.config";
import { InternalServerError } from "../errors/internal-server-error.error";

export const geminiTextSummartService = async (text: string) => {
  try {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const summaryPrompt =
      "Summarize the following comments of users in 2-3 sentences. The comments are in the descending order of number of likes," +
      "so higher weightage should be given to first comment. Also do not use usernames and try not to repeat the comments. Instead" +
      "provide a summary of all the comments as a whole, with slightly higher weightage for the comments with more likes" +
      "Here are the comments-" +
      text;

    const summaryResponse = await model.generateContent(summaryPrompt);
    const summaryResult = summaryResponse.response;
    const summary = summaryResult.text();

    const sentimentPrompt =
      "Classify the sentiment of the following paragraph as positive, negative, or neutral-" +
      summary;

    const sentimentResponse = await model.generateContent(sentimentPrompt);
    const sentimentResult = sentimentResponse.response;
    const sentiment = sentimentResult.text();
    return {
      summary: summary,
      sentiment: sentiment
    };
  } catch (error) {
    throw new InternalServerError("Could not Fetch Summary From Gemini", 500);
  }
};
