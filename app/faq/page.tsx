import { Metadata } from 'next'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export const metadata: Metadata = {
    title: 'FAQ | iLee LLC',
    description: 'Frequently asked questions about water delivery, logistics, and service areas.',
}

export default function FAQPage() {
    const faqs = [
        {
            question: "How long does delivery take?",
            answer: "Regular Delivery: up to 5 business days. Express Delivery: within 48 hours (additional fee). All orders are confirmed before dispatch."
        },
        {
            question: "Do you offer express delivery?",
            answer: "Yes, Express Delivery is available for delivery within 48 hours (additional fee applies at checkout). This prioritizes your order in our queue."
        },
        {
            question: "Do you deliver 24/7?",
            answer: "We deliver 24/7 across the Tri-State Area. Whether you need water early in the morning or late at night, our on-demand service has you covered."
        },
        {
            question: "Do you support recurring deliveries?",
            answer: "Yes. Weekly, bi-weekly, and monthly recurring deliveries are available for both homes and businesses. You can set this up easily on our Order page."
        },
        {
            question: "What areas do you serve?",
            answer: "We serve the entire Tri-State Area, including New York, New Jersey, and Connecticut. Enter your delivery address at checkout to confirm specific availability."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards, Apple Pay, Square, and Zelle."
        },
        {
            question: "Is there a minimum order size?",
            answer: "Yes, for free delivery we typically require a minimum order. This will be calculated based on your location and items selected."
        },
        {
            question: "Do you deliver to walk-up apartments?",
            answer: "Yes! We specialize in door-to-door service, including walk-ups. If you have specific delivery instructions (e.g., leaving at door, door code), please include them in your order notes."
        }
    ]

    return (
        <div className="relative min-h-screen py-24 px-4 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-slate-50 -z-20" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-40 -z-10" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-100/40 rounded-full blur-[100px] -z-10 animate-pulse" />

            <div className="container mx-auto max-w-4xl relative z-10">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl mb-6">
                        Frequently Asked <span className="text-blue-600">Questions</span>
                    </h1>
                    <p className="text-xl text-slate-600">
                        Everything you need to know about our water delivery and logistics services.
                    </p>
                </div>

                <div className="glass p-8 rounded-3xl border-white/50 bg-white/60 shadow-xl backdrop-blur-md">
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`} className="border-b border-slate-200/60 last:border-0 px-2">
                                <AccordionTrigger className="text-left text-lg font-bold text-slate-900 hover:text-blue-600 hover:no-underline transition-colors py-4">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-slate-600 text-lg leading-relaxed pb-4">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>

                <div className="mt-16 text-center glass p-10 rounded-3xl border-white/50 bg-blue-600 shadow-2xl shadow-blue-500/30">
                    <h3 className="text-2xl font-bold text-white mb-3">Still have questions?</h3>
                    <p className="text-blue-50 text-lg mb-8 max-w-xl mx-auto">
                        Can&apos;t find the answer you&apos;re looking for? Please chat to our friendly team.
                    </p>
                    <a
                        href="/contact"
                        className="inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-base font-bold text-blue-600 shadow-lg hover:bg-blue-50 hover:scale-105 transition-all duration-300"
                    >
                        Contact Support
                    </a>
                </div>
            </div>
        </div>
    )
}
