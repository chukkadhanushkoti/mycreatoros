import { ToolHubPage } from "@/components/dashboard/tool-hub-page";
import { TOOL_MENUS } from "@/config/tool-menus";

const menu = TOOL_MENUS.find((m) => m.key === "image")!;

export default function ImageToolPage() {
  return (
    <ToolHubPage
      title="Image"
      description="Generate and edit images for your posts, thumbnails and covers."
      icon={menu.icon}
      items={menu.items}
    />
  );
}
