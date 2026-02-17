import Link from "next/link"
import { siteConfig } from "@/lib/siteConfig"

export function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 relative overflow-hidden">
            {/* Abstract Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl opacity-50" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl opacity-50" />
            </div>

            <div className="container mx-auto px-4 py-16 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 text-center md:text-left">
                    <div className="md:col-span-1 space-y-6 flex flex-col items-center md:items-start">
                        <h3 className="text-2xl font-bold text-white tracking-tight">{siteConfig.name}</h3>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
                            {siteConfig.description}
                        </p>
                        <div className="flex gap-4 justify-center md:justify-start">
                            {/* Social Icons Placeholder */}
                            <div className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-primary transition-all duration-300 cursor-pointer flex items-center justify-center group shadow-md hover:shadow-lg hover:-translate-y-0.5">
                                <span className="sr-only">Twitter</span>
                                <svg className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6">Services</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="/shop" className="hover:text-blue-400 transition-colors">Shop Products</Link></li>
                            <li><Link href="/order" className="hover:text-blue-400 transition-colors">Order Water</Link></li>
                            <li><Link href="/availability" className="hover:text-blue-400 transition-colors">Check Availability</Link></li>
                            <li><Link href="/logistics" className="hover:text-blue-400 transition-colors">Logistics & Transport</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6">Company</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
                            <li><Link href="/reviews" className="hover:text-blue-400 transition-colors">Reviews</Link></li>
                            <li><Link href="/contact" className="hover:text-blue-400 transition-colors">Contact</Link></li>
                            <li><Link href="/faq" className="hover:text-blue-400 transition-colors">FAQ</Link></li>
                            <li><Link href="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6">Contact</h4>
                        <ul className="space-y-4 text-sm flex flex-col items-center md:items-start">
                            <li className="flex items-center gap-2">
                                <span className="text-blue-500">✉</span>
                                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-blue-400 transition-colors">{siteConfig.contact.email}</a>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-blue-500">📞</span>
                                <a href={`tel:${siteConfig.contact.phone.replace(/[^0-9]/g, '')}`} className="hover:text-blue-400 transition-colors">{siteConfig.contact.phone}</a>
                            </li>
                            <li className="flex items-start gap-2 justify-center md:justify-start">
                                <span className="text-blue-500 mt-1">📍</span>
                                <span>{siteConfig.contact.address}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 pb-4">
                    <p className="text-slate-500 text-xs leading-relaxed max-w-2xl mx-auto text-center">
                        Disclaimer: iLee LLC is an independent water sourcing and delivery service and is not affiliated with the brands listed.
                        All product names, logos, and brands are property of their respective owners. All company, product and service names used in this website are for identification purposes only.
                    </p>
                </div>

                <div className="pt-4 text-center text-xs text-slate-500">
                    &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved. Made with Next.js & Tailwind.
                </div>
            </div>
        </footer>
    )
}
