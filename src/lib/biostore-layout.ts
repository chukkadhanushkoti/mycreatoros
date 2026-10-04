export function bioBlockLayout(layout?: string) {
  return layout === "bento" ? "grid grid-cols-2 gap-3 w-full" : "flex flex-col gap-3 w-full";
}
export function bioBlockSpan(layout: string | undefined, type: string) {
  return layout === "bento" && ["text","divider","spacer","image","video","newsletter"].includes(type) ? "col-span-2" : "min-w-0";
}
export function bioTile(layout: string | undefined, index?: number) {
  return layout === "bento" || layout === "spotlight" && index === 1;
}
