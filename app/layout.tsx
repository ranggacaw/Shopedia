import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/components/CartProvider";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Shopedia",
    description: "You will get anything fresh here.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/images/shopedia-logo.png" sizes="any" />
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >   
                <CartProvider>
                    <AuthProvider>{children}</AuthProvider>
                </CartProvider>
            </body>
        </html>
    );
}
