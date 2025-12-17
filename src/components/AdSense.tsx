import Script from "next/script"

export default function AdSense() {
    return (
        <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5088107520547104"
            crossOrigin="anonymous"
            strategy="beforeInteractive"
        />
    )
}
