import { Metadata } from 'next'
import { siteConfig } from '@/lib/siteConfig'
import { ContactForm } from '@/components/contact/ContactForm'
import { Mail, Phone, MapPin, Instagram } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Contact Us | iLee LLC',
    description: 'Get in touch with iLee LLC for water delivery, logistics, or general inquiries.',
}

export default function ContactPage() {
    return (
        <div className="relative min-h-screen pt-44 pb-24 px-4 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-slate-50 -z-20" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-40 -z-10" />
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-purple-200/30 rounded-full blur-[100px] -z-10 animate-pulse" />
            <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-pink-200/30 rounded-full blur-[100px] -z-10 animate-pulse delay-1000" />

            <div className="container mx-auto relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                        Get in <span className="text-blue-600">Touch</span>
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        Have a question about our delivery zones, bulk orders, or custom logistics? We&apos;re here to help.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">
                    {/* Contact Details */}
                    <div className="space-y-8 glass p-8 rounded-3xl border-white/50 bg-white/40">
                        <h2 className="text-3xl font-bold text-slate-900 mb-8">Contact Info</h2>
                        <div className="space-y-8">
                            <div className="flex items-start group">
                                <div className="p-3 bg-blue-100 rounded-xl mr-5 group-hover:scale-110 transition-transform">
                                    <Mail className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900">Email</h3>
                                    <a href={`mailto:${siteConfig.contact.email}`} className="text-blue-600 hover:text-blue-700 font-medium text-lg">
                                        {siteConfig.contact.email}
                                    </a>
                                    <p className="text-sm text-slate-500 mt-1">For general inquiries and support.</p>
                                </div>
                            </div>
                            <div className="flex items-start group">
                                <div className="p-3 bg-blue-100 rounded-xl mr-5 group-hover:scale-110 transition-transform">
                                    <Phone className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900">Phone</h3>
                                    <a href={`tel:${siteConfig.contact.phone.replace(/\D/g, '')}`} className="text-blue-600 hover:text-blue-700 font-medium text-lg">
                                        {siteConfig.contact.phone}
                                    </a>
                                    <p className="text-sm text-slate-500 mt-1">Mon-Fri: 9am - 5pm EST</p>
                                </div>
                            </div>
                            <div className="flex items-start group">
                                <div className="p-3 bg-blue-100 rounded-xl mr-5 group-hover:scale-110 transition-transform">
                                    <MapPin className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900">Office</h3>
                                    <p className="text-slate-700 font-medium text-lg">
                                        {siteConfig.contact.address}<br />
                                        New York, NY
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start group">
                                <div className="p-3 bg-blue-100 rounded-xl mr-5 group-hover:scale-110 transition-transform">
                                    <Instagram className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900">Social</h3>
                                    <Link href={siteConfig.links.instagram} className="text-blue-600 hover:text-blue-700 font-medium text-lg">
                                        @ilee.moves
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="glass p-8 rounded-3xl border-white/50 bg-white/60 shadow-2xl backdrop-blur-xl">
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-slate-900">Send a Message</h2>
                            <p className="text-slate-600 mt-2">Fill out the form and we&apos;ll reply ASAP.</p>
                        </div>
                        <ContactForm />
                    </div>
                </div>
            </div>
        </div>
    )
}
