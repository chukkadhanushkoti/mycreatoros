import { ToolHubPage } from "@/components/dashboard/tool-hub-page";
import { TOOL_MENUS } from "@/config/tool-menus";

const menu = TOOL_MENUS.find((m) => m.key === "audio")!;

export default function AudioToolPage() {
  return (
    <ToolHubPage
      title="Audio"
      description="Clean up, transcribe and generate voiceovers for your content."
      icon={menu.icon}
      items={menu.items}
    />
  );
}
