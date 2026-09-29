import { Home } from "lucide-react";

import { PlaceholderPage } from "@/components/dashboard/placeholder-page";

export default function DashboardHomePage() {
  return (
    <PlaceholderPage
      title="Home"
      description="Your personalized feed and quick actions."
      icon={Home}
    />
  );
}
