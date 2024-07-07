import ChatComponent from "@/components/ChatComponent";
import ChatSideBar from "@/components/ChatSidebar";
import PDFViewer from "@/components/PDFViewer";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
// import { checkSubscription } from "@/lib/subscription";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    chatId: string;
  };
};

export function userAuth() {
  const { user } = useUser();

  return user;
}

const ChatPage = async ({ params: { chatId } }: Props) => {
  const user = userAuth();
  const userId = user?.id;
  if (!userId) {
    return redirect("/sign-in");
  }
  const _chats = await db.select().from(chats).where(eq(chats.userId, userId));
  if (!_chats) {
    return redirect("/");
  }
  if (!_chats.find((chat) => chat.id === parseInt(chatId))) {
    return redirect("/");
  }

  const currentChat = _chats.find((chat) => chat.id === parseInt(chatId));
  const isPro = true;
  //    await checkSubscription();

  return (
    <div className="flex h-screen ">
      <div className="flex w-full h-screen ">
        {/* chat sidebar */}
        <ChatSideBar chats={_chats} chatId={parseInt(chatId)} isPro={isPro} />
        {/* pdf viewer */}
        <div className="max-h-screen p-4 flex-[5]">
          <PDFViewer pdf_url={currentChat?.pdfUrl || ""} />
        </div>
        {/* chat component */}
        <div className="flex-[3] border-l-4 border-l-slate-200">
          <ChatComponent chatId={parseInt(chatId)} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
