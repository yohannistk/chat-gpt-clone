import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";
import { currentUser, auth } from "@clerk/nextjs";
import prisma from "@/lib/db";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// export const runtime = "edge";

export async function POST(req: Request) {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Custom Unauthorized", { status: 401 });
  }

  try {
    const {
      messages,
      data: { id },
    } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      stream: true,
      messages,
    });

    const stream = OpenAIStream(response, {
      onCompletion: async (completion: string) => {
        console.log("completion", completion);
        const prompt = messages[0].content.substring(0, 100);
        await saveCompletionToDatabase(completion, prompt, id, userId);
      },
    });

    return new StreamingTextResponse(stream);
  } catch (error) {
    // Check if the error is an APIError
    console.log(error);
    if (error instanceof OpenAI.APIError) {
      const { name, status, headers, message } = error;
      return NextResponse.json({ name, status, headers, message }, { status });
    } else {
      throw error;
    }
  }
}

const saveCompletionToDatabase = async (
  completion: string,
  prompt: string,
  chatId: string,
  userId: string
) => {
  const existingChat = await prisma.chat.findUnique({
    where: { id: chatId },
  });
  if (!existingChat) {
    const chat = await prisma.chat.create({
      data: { id: chatId, label: prompt, user_id: userId },
    });
    console.log("chat created", chat);
  }
  const message = await prisma.message.create({
    data: {
      role: "assistant",
      content: completion,
      createdAt: new Date(),
      chat_id: chatId,
    },
  });
  console.log("message created", message);
};
