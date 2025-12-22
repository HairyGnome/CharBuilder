export interface ToolData {
  name: string;
  charges: number;
  special: string;
  mastery: string;
  description: string;
}

export function isToolData(item: unknown): item is ToolData {
  const toolItem = item as ToolData;
  return (
    toolItem.name !== undefined &&
    toolItem.charges !== undefined &&
    toolItem.special !== undefined &&
    toolItem.mastery !== undefined &&
    toolItem.description !== undefined
  );
}
