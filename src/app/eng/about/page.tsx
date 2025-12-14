import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle2 } from "lucide-react"

export default function EnglishAboutPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <div className="bg-primary/10 py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-primary">About Us</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Dedicated to spreading authentic Islamic knowledge for the benefit of all humanity.
                    </p>
                </div>
            </div>

            {/* Mission & Vision */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-serif font-bold mb-4">Our Mission</h2>
                        <p className="text-muted-foreground leading-relaxed text-lg">
                            Our mission is to provide accessible, authentic, and high-quality Islamic education based on the Quran and the Sunnah of the Prophet Muhammad (Peace Be Upon Him). We aim to foster a correct understanding of Islam, free from misconceptions and extremism.
                        </p>
                        <div className="space-y-3 mt-6">
                            {[
                                "Authentic Sources (Quran & Sunnah)",
                                "Academic Excellence",
                                "Community Building",
                                "Continuous Learning"
                            ].map((item, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-muted p-8 rounded-2xl flex items-center justify-center">
                        {/* Placeholder for image */}
                        <div className="text-center">
                            <span className="text-6xl mb-4 block">📖</span>
                            <p className="font-serif text-xl italic text-muted-foreground">
                                "Seeking knowledge is a duty upon every Muslim."
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Support Section */}
            <div className="bg-emerald-900 text-emerald-50 py-20">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">Join Us in This Noble Cause</h2>
                    <p className="text-emerald-100 mb-8 max-w-2xl mx-auto">
                        Support the dissemination of Islamic knowledge so that the light of wisdom may reach everyone.
                    </p>
                    <Button size="lg" variant="secondary" className="font-bold text-emerald-900" asChild>
                        <Link href="/eng/donate">Support Us</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
