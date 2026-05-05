import type { DocListItem } from "@/content/types";

export function docListItemKey(item: DocListItem, index: number): string {
  if (typeof item === "string") return `${index}-${item}`;
  return `${index}-${item.amber}-${item.graphite}`;
}

/** Renders list row text with optional amber lead (orange brand accent). */
export function DocListItemBody({
  item,
  bodyClassName,
}: {
  item: DocListItem;
  bodyClassName: string;
}) {
  if (typeof item === "string") {
    return item;
  }
  return (
    <>
      <span className="text-amber-glow">{item.amber}</span>
      <span className={bodyClassName}>{item.graphite}</span>
    </>
  );
}
