import { Users } from "lucide-react";

import { PlaceholderPage } from "@/components/dashboard/placeholder-page";

export default function DashboardCommunityPage() {
  return (
    <PlaceholderPage
      title="Community"
      description="Manage comments, DMs and your community in one inbox."
      icon={Users}
    />
  );
}
