import { ToolHubPage } from "@/components/dashboard/tool-hub-page";
import { TOOL_MENUS } from "@/config/tool-menus";

const menu = TOOL_MENUS.find((m) => m.key === "text")!;

export default function TextToolPage() {
  return (
    <ToolHubPage
      title="Text"
      description="Write captions, hooks and post copy in your voice."
      icon={menu.icon}
      items={menu.items}
    />
  );
}
