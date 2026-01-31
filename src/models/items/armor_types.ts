import type { Die } from "../types";

export interface ArmorData {
  cost: number;
  name: string;
  armor: Die;
  bulk: number;
  properties: string[];
  special: string;
  mastery: string;
}

export function isArmorData(item: unknown): item is ArmorData {
  const armorItem = item as ArmorData;
  return (
    armorItem.cost !== undefined &&
    armorItem.name !== undefined &&
    armorItem.armor !== undefined &&
    armorItem.bulk !== undefined &&
    armorItem.properties !== undefined &&
    armorItem.special !== undefined &&
    armorItem.mastery !== undefined
  );
}
