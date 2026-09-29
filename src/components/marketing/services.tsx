"use client";

import {
  ArrowRight,
  CalendarClock,
  LineChart,
  Link2,
  Mail,
  ShoppingBag,
  Wand2,
} from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import { ScrollReveal } from "@/components/marketing/scroll-reveal";

// TODO: replace with real session check once auth is wired up.
const isAuthenticated = false;

const services = [
  {
    icon: Wand2,
    title: "AI Content Studio",
    desc: "Generate scripts, hooks, captions and post ideas tailored to your niche.",
  },
  {
    icon: Link2,
    title: "BioStore Pages",
    desc: "A fast, premium link-in-bio storefront with themes and animated blocks.",
  },
  {
    icon: CalendarClock,
    title: "Content Scheduler",
    desc: "Plan and auto-publish across platforms from a single content calendar.",
  },
  {
    icon: LineChart,
    title: "Growth Analytics",
    desc: "Track follower growth, engagement and revenue trends in real time.",
  },
  {
    icon: ShoppingBag,
    title: "Digital Storefront",
    desc: "Sell courses, presets and merch directly from your creator page.",
  },
  {
    icon: Mail,
    title: "Email & DM Automation",
    desc: "Nurture your audience with automated email flows and smart DM replies.",
  },
];

export function Services() {
  const router = useRouter();

  const handleUseService = () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    // TODO: route to the actual tool once auth + dashboard exist.
  };

  return (
    <section id="services" className="w-full bg-neutral-50 py-24 lg:py-32 [perspective:1400px] dark:bg-white/[0.03]">
      <div className="container">
        <ScrollReveal className="mx-auto flex max-w-[46rem] flex-col items-center text-center">
          <span className="rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-orange-600 dark:text-orange-400">
            Services
          </span>
          <h2 className="mt-5 font-sans text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl md:text-5xl dark:text-white">
            Everything to run your creator business.
          </h2>
        </ScrollReveal>

        <div className="mx-auto mt-16 grid max-w-[70rem] gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="h-full rounded-3xl border border-neutral-200 bg-white p-7 shadow-sm transition-shadow hover:shadow-xl dark:border-white/10 dark:bg-neutral-900"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/10">
                  <service.icon className="h-5 w-5 text-orange-500" />
                </div>
                <h3 className="mt-5 font-sans text-lg font-bold text-neutral-900 dark:text-white">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {service.desc}
                </p>
                <button
                  onClick={handleUseService}
                  className="group mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-orange-600 transition-colors hover:text-orange-500 dark:text-orange-400"
                >
                  Use this tool
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
