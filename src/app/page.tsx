import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import HomeClient from "@/components/HomeClient";

export default async function Home() {
  const { userId } = auth();
  const isAuth = !!userId;
  
  let firstChat;
  if (userId) {
    const userChats = await db.select().from(chats).where(eq(chats.userId, userId));
    firstChat = userChats.length > 0 ? userChats[0] : null;
  }

  return <HomeClient isAuth={isAuth} userId={userId} firstChat={firstChat} />;
}
