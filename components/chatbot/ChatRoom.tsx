import { getAnswer } from "@/utils/chat";
// import { Button, TextField, Box, Typography, Paper } from "@mui/material";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { FormEvent, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { Separator } from "../ui/separator";

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

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { role: "user", message: input };
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
                <div className="flex w-[400px] h-[400px] flex-col bg-white rounded-lg shadow-lg absolute bottom-0 right-0">
                    <div className="flex w-full justify-between items-center bg-sub border-b-2 py-2 px-4 rounded-t-lg border-sub">
                        <Label className="font-bold text-lg text-main">
                            Furnora Assistant
                        </Label>
                        <Button
                            onClick={() => {
                                setIsOpened(false);
                            }}
                            size="icon"
                            className="rounded-full bg-transparent shadow-none border-none hover:bg-transparent hover:shadow-none hover:border-none">
                            <X size={24} />
                        </Button>
                    </div>

                    <div
                        id="window"
                        className="flex-1 flex flex-col w-full space-y-4 overflow-y-auto py-2 px-4">
                        {messages.length === 0 ? (
                            <div className="w-full h-full flex justify-center items-center">
                                <Label className="select-none text-slate-500">
                                    Ask me anything about furnitures!
                                </Label>
                            </div>
                        ) : (
                            messages.map((msg, i) => (
                                <Card
                                    key={i}
                                    className={`${
                                        msg.role === "user"
                                            ? "bg-sub ml-auto mr-0 text-main"
                                            : "bg-[#f5f5f5] ml-0 mr-auto"
                                    } max-w-[80%]`}>
                                    <CardContent className="flex justify-center items-center px-3 py-2 text-sm">
                                        {msg.message}
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="flex p-2 space-x-2">
                        <Input
                            className="w-full mr-1"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your questions here..."
                            disabled={isLoading}
                        />
                        <Button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="bg-sub">
                            <Send size={24} />
                        </Button>
                    </form>
                </div>
            ) : (
                ""
            )}
            <Button
                onClick={() => {
                    setIsOpened(true);
                }}
                size="icon"
                className="w-[48px] h-[48px] rounded-full bg-sub hover:bg-[#b88e2f]/90">
                <MessageCircle size={48} />
            </Button>
        </>
    );
}
