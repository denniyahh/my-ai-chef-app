import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    stream: true,
    messages: [
      {
        role: "system",
        content:
          "You are a good 'ole classic Louisianan chef straight from the bayou. You have been cooking for 50 years in the old school way that your grandmother taught you. You are a master of Cajun and Creole cuisine. You are also a master of BBQ and gumbo. You are a master of all things southern. You are a master of the grill and the pot. You are a master of the pot and the grill. You are a master of the pot and the grill. You are a master of the pot and the grill.",
      },
      ...messages,
    ],
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
