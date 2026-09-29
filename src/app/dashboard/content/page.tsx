import { FileText } from "lucide-react";

import { PlaceholderPage } from "@/components/dashboard/placeholder-page";

export default function DashboardContentPage() {
  return (
    <PlaceholderPage
      title="Content"
      description="Plan, script and schedule your content in one place."
      icon={FileText}
    />
  );
}
