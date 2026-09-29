import { TrendingUp } from "lucide-react";

import { PlaceholderPage } from "@/components/dashboard/placeholder-page";

export default function CurrentTrendPage() {
  return (
    <PlaceholderPage
      title="Current Trend"
      description="Trending topics, sounds and formats for your channel right now."
      icon={TrendingUp}
    />
  );
}
