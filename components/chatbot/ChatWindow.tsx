"use client";
import { useEffect, useState } from "react";
import ChatRoom from "./ChatRoom";

const ChatWindow = () => {
    const [chatMessages, setChatMessages] = useState<
        Array<{ role: string; message: string }>
    >([]);

    return (
        <div id="chat-window" className="fixed right-6 bottom-6 z-50">
            <ChatRoom messages={chatMessages} setMessages={setChatMessages} />
        </div>
    );
};

export default ChatWindow;
