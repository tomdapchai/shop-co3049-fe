"use client";
import Footer from "@/components/userLayout/Footer";
import Header from "@/components/userLayout/Header";
import React from "react";
import CartProvider from "@/context/CartContext";
import ChatWindow from "@/components/chatbot/ChatWindow";
import { useProduct } from "@/context/ProductContext";
import ServiceFeatures from "@/components/userLayout/ServiceFeatures";

const layout = ({ children }: { children: React.ReactNode }) => {
    const { extensions } = useProduct();
    return (
        <div className="relative w-full min-h-screen flex flex-col justify-between ">
            <CartProvider>
                <Header />
                <div className="flex min-w-full flex-grow">{children}</div>
                {extensions.find((ex) => ex.id == "chatbot")?.enabled && (
                    <ChatWindow />
                )}
                <ServiceFeatures />
                <Footer />
            </CartProvider>
        </div>
    );
};

export default layout;
