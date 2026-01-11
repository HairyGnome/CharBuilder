import type { Die } from "../types";

export interface ArmorData {
  name: string;
  armor: Die;
  bulk: number;
  vigor: number;
  clumsy: number;
  properties: string[];
  special: string;
  mastery: string;
}

export function isArmorData(item: unknown): item is ArmorData {
  const armorItem = item as ArmorData;
  return (
    armorItem.name !== undefined &&
    armorItem.armor !== undefined &&
    armorItem.bulk !== undefined &&
    armorItem.vigor !== undefined &&
    armorItem.clumsy !== undefined &&
    armorItem.properties !== undefined &&
    armorItem.special !== undefined &&
    armorItem.mastery !== undefined
  );
}
