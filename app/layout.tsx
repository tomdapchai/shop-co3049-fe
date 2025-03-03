import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import ProductProvider from "@/context/ProductContext";
export const metadata: Metadata = {
    title: "FURNORA",
    description: "Best furniture store in VN",
    icons: {
        icon: {
            url: "/images/furnora_favicon.png",
            href: "/images/furnora_favicon.png",
        },
    },
};
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="no-scrollbar">
            <body className="min-h-screen">
                <ProductProvider>
                    <AuthProvider>{children}</AuthProvider>
                </ProductProvider>
                <Toaster />
            </body>
        </html>
    );
}
