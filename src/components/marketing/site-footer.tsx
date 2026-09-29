import Link from "next/link";
import { FaInstagram, FaTiktok, FaXTwitter, FaYoutube } from "react-icons/fa6";

const columns = [
  {
    title: "Product",
    links: ["What we do", "Why CreatorOS", "Services", "Pricing"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Blog", "Contact"],
  },
  {
    title: "Resources",
    links: ["Help center", "Community", "Creator guide", "API docs"],
  },
  {
    title: "Legal",
    links: ["Privacy policy", "Terms of service", "Cookie policy"],
  },
];

const socials = [
  { icon: FaInstagram, label: "Instagram" },
  { icon: FaXTwitter, label: "X" },
  { icon: FaTiktok, label: "TikTok" },
  { icon: FaYoutube, label: "YouTube" },
];

export function SiteFooter() {
  return (
    <footer id="footer" className="w-full border-t border-neutral-200 bg-white dark:border-white/10 dark:bg-black">
      <div className="container py-16">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_repeat(4,1fr)]">
          <div>
            <span className="font-sans text-xl font-extrabold text-neutral-900 dark:text-white">
              Creator<span className="text-orange-500">OS</span>
            </span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              The all-in-one platform for creators to build, grow and
              monetize their audience with AI.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="glass flex h-9 w-9 items-center justify-center rounded-full text-neutral-600 transition-colors hover:text-orange-500 dark:text-neutral-400"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-sans text-sm font-semibold text-neutral-900 dark:text-white">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-neutral-600 transition-colors hover:text-orange-500 dark:text-neutral-400"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-neutral-200 pt-8 text-sm text-neutral-500 sm:flex-row dark:border-white/10 dark:text-neutral-400">
          <p>© {new Date().getFullYear()} CreatorOS Inc. All rights reserved.</p>
          <p>Made for creators, everywhere.</p>
        </div>
      </div>
    </footer>
  );
}
