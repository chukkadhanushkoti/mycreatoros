import { Construction } from "lucide-react";

import { PlaceholderPage } from "@/components/dashboard/placeholder-page";

export default function PlatformComingSoonPage() {
  return (
    <PlaceholderPage
      title="Coming soon"
      description="Tools for this platform are still on the way."
      icon={Construction}
    />
  );
}
