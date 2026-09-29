import { ToolHubPage } from "@/components/dashboard/tool-hub-page";
import { TOOL_MENUS } from "@/config/tool-menus";

const menu = TOOL_MENUS.find((m) => m.key === "video")!;

export default function VideoToolPage() {
  return (
    <ToolHubPage
      title="Video"
      description="Edit, caption and repurpose your videos across platforms."
      icon={menu.icon}
      items={menu.items}
    />
  );
}
