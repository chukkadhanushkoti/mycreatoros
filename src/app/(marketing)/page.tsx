import { Faqs } from "@/components/marketing/faqs";
import { Hero } from "@/components/marketing/hero";
import { Pricing } from "@/components/marketing/pricing";
import { Reviews } from "@/components/marketing/reviews";
import { Services } from "@/components/marketing/services";
import { SiteFooter } from "@/components/marketing/site-footer";
import { WhatWeDo } from "@/components/marketing/what-we-do";
import { WhyCreatorOS } from "@/components/marketing/why-creatoros";

export default function MarketingPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Hero />
      <WhatWeDo />
      <WhyCreatorOS />
      <Services />
      <Pricing />
      <Reviews />
      <Faqs />
      <SiteFooter />
    </div>
  );
}
