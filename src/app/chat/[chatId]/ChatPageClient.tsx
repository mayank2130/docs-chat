// app/chat/[chatId]/ChatPageClient.tsx
"use client"
import React from "react";
import ChatComponent from "@/components/ChatComponent";
import ChatSideBar from "@/components/ChatSidebar";
import PDFViewer from "@/components/PDFViewer";

type Props = {
  chats: any[];
  currentChat: any;
  chatId: number;
  isPro: boolean;
};

const ChatPageClient = ({ chats, currentChat, chatId, isPro }: Props) => {
  return (
    <div className="flex h-screen ">
      <div className="flex w-full h-screen ">
        {/* chat sidebar */}
        <ChatSideBar chats={chats} chatId={chatId} isPro={isPro} />
        {/* pdf viewer */}
        <div className="max-h-screen p-4 flex-[5]">
          <PDFViewer pdf_url={currentChat?.pdfUrl || ""} />
        </div>
        {/* chat component */}
        <div className="flex-[3] border-l-4 border-l-slate-200">
          <ChatComponent chatId={chatId} />
        </div>
      </div>
    </div>
  );
};

export default ChatPageClient;