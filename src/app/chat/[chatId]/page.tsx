import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import ChatPageClient from "./ChatPageClient";

export default async function ChatPage({ params: { chatId } }: { params: { chatId: string } }) {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const _chats = await db.select().from(chats).where(eq(chats.userId, userId));
  if (!_chats || !_chats.find((chat) => chat.id === parseInt(chatId))) {
    redirect("/");
  }

  const currentChat = _chats.find((chat) => chat.id === parseInt(chatId));
  const isPro = true; // await checkSubscription();

  return <ChatPageClient chats={_chats} currentChat={currentChat} chatId={parseInt(chatId)} isPro={isPro} />;
}