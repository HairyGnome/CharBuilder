export interface FociData {
  name: string;
  mastery: string;
}

export function isFociData(item: unknown): item is FociData {
  const fociItem = item as FociData;
  return fociItem.name !== undefined && fociItem.mastery !== undefined;
}
