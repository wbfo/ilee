import { siteConfig } from "@/lib/siteConfig"

export function AnnouncementBar() {
    return (
        <div className="bg-slate-900 text-white px-4 py-2 text-center text-sm font-medium tracking-wide">
            {siteConfig.announcement}
        </div>
    )
}
