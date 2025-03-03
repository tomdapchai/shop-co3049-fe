"use client";

import type React from "react";

import { getAnswer } from "@/utils/chat";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { type FormEvent, useState, useEffect, useRef } from "react";
import { MessageCircle, Send, X, ArrowRight } from "lucide-react";
import parser from "html-react-parser";
import Image from "next/image";

const botLogo = "/images/bot-logo.png";

interface ChatMessage {
    role: string;
    message: string;
}

interface ChatRoomProps {
    messages: ChatMessage[];
    setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

export default function ChatRoom({ messages, setMessages }: ChatRoomProps) {
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isOpened, setIsOpened] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [suggestedQuestions] = useState([
        "What are the best furniture styles for small apartments?",
        "How to choose the right sofa for my living room?",
        "What materials are most durable for dining tables?",
        "How to arrange furniture in an open floor plan?",
    ]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e: FormEvent | string) => {
        if (e instanceof Object) {
            e.preventDefault();
        }

        const messageText = typeof e === "string" ? e : input;
        if (!messageText.trim()) return;

        const userMessage = { role: "user", message: messageText };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await getAnswer(userMessage.message);
            setMessages((prev) => [...prev, response]);
        } catch (err) {
            console.error(err);
            setMessages((prev) => [
                ...prev,
                { role: "bot", message: "Sorry, an error occurred." },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {isOpened ? (
                <div className="flex w-[800px] h-[800px] max-md:w-[400px] max-md:h-[600px] max-sm:w-[300px] max-sm:h-[600px] flex-col bg-white rounded-lg shadow-lg absolute bottom-0 right-0 overflow-hidden">
                    <div className="flex w-full justify-between items-center bg-white border-b py-3 px-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center relative">
                                <Image
                                    src={botLogo}
                                    alt="Furnora Assistant"
                                    fill
                                    className="rounded-full"
                                />
                            </div>
                            <Label className="font-medium text-base">
                                Furnora Assistant
                            </Label>
                        </div>
                        <Button
                            onClick={() => {
                                setIsOpened(false);
                            }}
                            size="icon"
                            variant="ghost"
                            className="rounded-full h-8 w-8 hover:bg-gray-100">
                            <X size={20} />
                        </Button>
                    </div>

                    <div
                        id="window"
                        className="flex-1 flex flex-col w-full space-y-3 overflow-y-auto py-4 px-4 bg-gray-50">
                        {messages.length === 0 ? (
                            <div className="space-y-6">
                                <Card className="bg-blue-50 border-0 ml-0 mr-auto max-w-[90%]">
                                    <CardContent className="p-4 text-sm">
                                        <div className="flex gap-3">
                                            <div className="w-8 h-8 rounded-full bg-white flex-shrink-0 flex items-center justify-center relative">
                                                <Image
                                                    src={botLogo}
                                                    alt="Furnora Assistant"
                                                    fill
                                                    className="rounded-full"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <p>
                                                    Hello! I'm your Furnora
                                                    Assistant. I'm here to help
                                                    with any questions about
                                                    furniture.
                                                </p>
                                                <p>
                                                    How can I assist you today?
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <div className="space-y-2">
                                    {suggestedQuestions.map((question, i) => (
                                        <button
                                            key={i}
                                            onClick={() =>
                                                handleSubmit(question)
                                            }
                                            className="flex items-center justify-between w-full text-left px-4 py-3 rounded-full border border-gray-200 text-sm hover:bg-gray-100 transition-colors">
                                            <span>{question}</span>
                                            <ArrowRight className="w-4 h-4 text-blue-500" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <>
                                {messages.map((msg, i) => (
                                    <div
                                        key={i}
                                        className={`flex ${
                                            msg.role === "user"
                                                ? "justify-end"
                                                : "justify-start"
                                        }`}>
                                        {msg.role !== "user" && (
                                            <div className="w-8 h-8 rounded-full bg-white flex-shrink-0 flex items-center justify-center mr-2 relative">
                                                <Image
                                                    src={botLogo}
                                                    alt="Furnora Assistant"
                                                    fill
                                                    className="rounded-full"
                                                />
                                            </div>
                                        )}
                                        <Card
                                            className={`${
                                                msg.role === "user"
                                                    ? "bg-blue-500 text-white border-0"
                                                    : "bg-white border border-gray-200"
                                            } max-w-[75%]`}>
                                            <CardContent className="p-3 text-sm">
                                                {msg.role === "user"
                                                    ? msg.message
                                                    : parser(msg.message)}
                                            </CardContent>
                                        </Card>
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex justify-start">
                                        <div className="w-8 h-8 rounded-full bg-white flex-shrink-0 flex items-center justify-center mr-2 relative">
                                            <Image
                                                src={botLogo}
                                                alt="Furnora Assistant"
                                                fill
                                                className="rounded-full"
                                            />
                                        </div>
                                        <Card className="bg-white border border-gray-200 max-w-[75%]">
                                            <CardContent className="p-3 flex items-center">
                                                <div className="typing-indicator">
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                )}
                            </>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="flex p-3 border-t bg-white">
                        <Input
                            className="w-full rounded-full border-gray-300 focus-visible:ring-blue-500"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                            disabled={isLoading}
                        />
                        <Button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            size="icon"
                            className="ml-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 h-10 w-10">
                            <Send size={18} className="text-blue-500" />
                        </Button>
                    </form>
                </div>
            ) : (
                <Button
                    onClick={() => {
                        setIsOpened(true);
                    }}
                    size="icon"
                    className="w-14 h-14 p-0 rounded-full bg-white hover:bg-slate-200 shadow-lg fixed bottom-6 right-6">
                    <div className="relative w-full h-full">
                        <Image
                            src={botLogo}
                            alt="Furnora Assistant"
                            fill
                            className="rounded-full"
                        />
                    </div>
                </Button>
            )}

            <style jsx global>{`
                .typing-indicator {
                    display: flex;
                    align-items: center;
                }

                .typing-indicator span {
                    height: 8px;
                    width: 8px;
                    margin: 0 2px;
                    background-color: #bbb;
                    border-radius: 50%;
                    display: inline-block;
                    opacity: 0.4;
                }

                .typing-indicator span:nth-child(1) {
                    animation: bounce 1s infinite;
                }

                .typing-indicator span:nth-child(2) {
                    animation: bounce 1s infinite 0.2s;
                }

                .typing-indicator span:nth-child(3) {
                    animation: bounce 1s infinite 0.4s;
                }

                @keyframes bounce {
                    0%,
                    100% {
                        transform: translateY(0);
                        opacity: 0.4;
                    }
                    50% {
                        transform: translateY(-5px);
                        opacity: 1;
                    }
                }
            `}</style>
        </>
    );
}
