import { action } from "./_generated/server";
import { v } from "convex/values";
import OpenAI from "openai";
import { api } from "./_generated/api";

const openai = new OpenAI({
  baseURL: process.env.CONVEX_OPENAI_BASE_URL,
  apiKey: process.env.CONVEX_OPENAI_API_KEY,
});

export const categorizeTransaction = action({
  args: {
    description: v.string(),
  },
  handler: async (ctx, args) => {
    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-nano",
      messages: [
        {
          role: "system",
          content: "You are a financial transaction categorizer. Given a transaction description, respond with a single word category that best describes the transaction. Categories should be one of: Food, Shopping, Transport, Entertainment, Bills, Health, Travel, Other."
        },
        {
          role: "user",
          content: args.description
        }
      ]
    });

    return completion.choices[0].message.content;
  }
});
