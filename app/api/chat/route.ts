import OpenAI from "openai";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenerativeAIStream, Message, StreamingTextResponse } from "ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

// IMPORTANT! Set the runtime to edge
// export const runtime = "edge";

const buildGoogleGenAIPrompt = (messages: Message[]) => ({
  contents: messages
    .filter(
      (message) => message.role === "user" || message.role === "assistant"
    )
    .map((message) => ({
      role: message.role === "user" ? "user" : "model",
      parts: [{ text: message.content }],
    })),
});

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

    const geminiStream = await genAI
      .getGenerativeModel({ model: "gemini-pro" })
      .generateContentStream(buildGoogleGenAIPrompt(messages));

    // Convert the response into a friendly text-stream
    const stream = GoogleGenerativeAIStream(geminiStream, {
      async onCompletion(completion: string) {
        console.log("completion", completion);
        const prompt = messages[0].content.substring(0, 100);
        await saveCompletionToDatabase(completion, prompt, id, userId);
        revalidatePath("/", "page");
      },
    });

    // Respond with the stream
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

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { message: "Missing required ID parameter" },
      { status: 400 }
    );
  }

  try {
    const deletedItem = await deleteItemFromDatabase(id); // Replace with your function
    if (deletedItem) {
      revalidatePath(`/chat`);
      return NextResponse.json({ message: "Resource deleted successfully" });
    } else {
      return NextResponse.json(
        { message: "Resource not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// Function to delete item from database (replace with your actual implementation):
async function deleteItemFromDatabase(id: string) {
  const res = await prisma.chat.delete({
    where: { id },
  });
  return res.id;
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
  await prisma.message.create({
    data: {
      role: "assistant",
      content: completion,
      createdAt: new Date(),
      chat_id: chatId,
    },
  });
  await prisma.message.create({
    data: {
      role: "user",
      content: prompt,
      createdAt: new Date(),
      chat_id: chatId,
    },
  });
};
