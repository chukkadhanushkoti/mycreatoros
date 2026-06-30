import { ArrowRight, Sparkles, Layout, Zap, Users, BarChart } from "lucide-react";
import Link from "next/link";

export default function MarketingPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Hero Section */}
      <section className="w-full py-24 md:py-32 lg:py-40 flex items-center justify-center bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6 text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium bg-background shadow-sm">
              <Sparkles className="mr-2 h-4 w-4 text-primary" />
              <span>Introducing CreatorOS BioStore</span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-outfit max-w-[800px]">
              Build, Grow and Monetize your Creator Business with AI.
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl lg:text-2xl mt-4">
              The ultimate platform for creators. Everything you need from one powerful dashboard to scale your audience and income.
            </p>
            <div className="space-x-4 mt-8">
              <Link
                href="/signup"
                className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Get Started for Free
              </Link>
              <Link
                href="/demo"
                className="inline-flex h-12 items-center justify-center rounded-full border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                View Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="w-full py-20 lg:py-32 flex justify-center">
        <div className="container px-4 md:px-6">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-outfit font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
              Everything you need. Nothing you don't.
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              CreatorOS provides all the tools you need to build your audience and monetize your content.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 mt-12">
            {[
              { title: "AI Script Writer", icon: Zap, desc: "Generate viral video ideas and scripts instantly." },
              { title: "BioStore", icon: Layout, desc: "A beautiful, premium link-in-bio page for your followers." },
              { title: "Audience Analytics", icon: BarChart, desc: "Understand who your followers are and what they like." },
              { title: "Auto DM", icon: Users, desc: "Automatically reply to comments with your product links." },
            ].map((feature, i) => (
              <div key={i} className="relative overflow-hidden rounded-2xl border bg-background p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold font-outfit mt-4 text-xl">{feature.title}</h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
