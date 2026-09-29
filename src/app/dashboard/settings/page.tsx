import { Settings } from "lucide-react";

import { PlaceholderPage } from "@/components/dashboard/placeholder-page";

export default function DashboardSettingsPage() {
  return (
    <PlaceholderPage
      title="Settings"
      description="Manage your account, billing and connected platforms."
      icon={Settings}
    />
  );
}
