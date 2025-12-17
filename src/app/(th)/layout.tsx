import type { Metadata } from "next";
import { Noto_Sans_Thai, Playfair_Display } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "../globals.css";

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
    title: "เว็บไซต์สอนศาสนา",
    description: "แหล่งรวบรวมบทความสอนศาสนา อะกีเดาะห์ ฟิกฮ์ ตัฟซีรฺ และฮะดีษ",
};

import AdSense from "@/components/AdSense";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="th">
            <body
                className={`${notoSansThai.variable} ${playfairDisplay.variable} antialiased font-sans flex flex-col min-h-screen`}
            >
                <AdSense />
                <Header lang="th" />
                <main className="flex-1">
                    {children}
                </main>
                <Footer lang="th" />
            </body>
        </html>
    );
}
