"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";

import { ScrollReveal } from "@/components/marketing/scroll-reveal";

const reviews = [
  {
    name: "Amara Bello",
    handle: "@amara.creates",
    quote:
      "CreatorOS cut my content planning time in half. The AI scripts actually sound like me.",
    rating: 5,
  },
  {
    name: "Jonah Reyes",
    handle: "@jonahreyes",
    quote:
      "My BioStore page converts way better than my old link-in-bio tool. Clean, fast, premium.",
    rating: 5,
  },
  {
    name: "Priya Nair",
    handle: "@priyanair",
    quote:
      "The analytics finally tell me what my audience actually wants. Total game changer.",
    rating: 5,
  },
  {
    name: "Diego Fuentes",
    handle: "@diego.f",
    quote:
      "Auto DM alone paid for the subscription in the first week. Setup took five minutes.",
    rating: 4,
  },
  {
    name: "Lena Kovac",
    handle: "@lenakovac",
    quote:
      "Support team feels like they actually use the product. Rare for a tool this powerful.",
    rating: 5,
  },
  {
    name: "Marcus Webb",
    handle: "@marcuswebb",
    quote:
      "Switched from three separate apps to just CreatorOS. Everything finally lives in one place.",
    rating: 5,
  },
];

export function Reviews() {
  return (
    <section id="reviews" className="w-full bg-neutral-50 py-24 lg:py-32 [perspective:1400px] dark:bg-white/[0.03]">
      <div className="container">
        <ScrollReveal className="mx-auto flex max-w-[46rem] flex-col items-center text-center">
          <span className="rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-orange-600 dark:text-orange-400">
            Reviews
          </span>
          <h2 className="mt-5 font-sans text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl md:text-5xl dark:text-white">
            Loved by creators everywhere.
          </h2>
        </ScrollReveal>

        <div className="mx-auto mt-16 grid max-w-[76rem] gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, i) => (
            <ScrollReveal key={review.handle} delay={i * 0.05}>
              <motion.div
                whileHover={{ y: -6, rotateX: -3 }}
                style={{ transformPerspective: 800 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="h-full rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-xl dark:border-white/10 dark:bg-neutral-900"
              >
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className={
                        idx < review.rating
                          ? "h-4 w-4 fill-orange-500 text-orange-500"
                          : "h-4 w-4 fill-neutral-200 text-neutral-200 dark:fill-white/10 dark:text-white/10"
                      }
                    />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                  “{review.quote}”
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
                    {review.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                      {review.name}
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">{review.handle}</p>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
