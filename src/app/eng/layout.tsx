import type { Metadata } from "next";
import { Noto_Sans_Thai, Playfair_Display } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "../globals.css";

// We can reuse fonts or use different ones. Reusing for consistency.
const notoSansThai = Noto_Sans_Thai({
    variable: "--font-noto-sans-thai",
    subsets: ["thai", "latin"],
    display: "swap",
});

const playfairDisplay = Playfair_Display({
    variable: "--font-playfair-display",
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Islamic Education Website",
    description: "Authentic Islamic knowledge based on Quran and Sunnah",
};

import AdSense from "@/components/AdSense";

export default function EngRootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${notoSansThai.variable} ${playfairDisplay.variable} antialiased font-sans flex flex-col min-h-screen`}
            >
                <AdSense />
                <Header lang="en" />
                <main className="flex-1">
                    {children}
                </main>
                <Footer lang="en" />
            </body>
        </html>
    );
}
