export enum ArmorCategory {
  LIGHT = "light",
  MEDIUM = "medium",
  HEAVY = "heavy",
  SHIELD = "shield",
}

export interface ArmorData {
  cost: number;
  category: ArmorCategory;
  name: string;
  baseDv: number;
  armor: number;
  bulk: number;
  vigor?: number;
  clumsy?: number;
  properties: string[];
  special: string;
  mastery: string;
}

export function isArmorData(item: unknown): item is ArmorData {
  const armorItem = item as ArmorData;
  return (
    armorItem.cost !== undefined &&
    armorItem.category !== undefined &&
    armorItem.name !== undefined &&
    armorItem.armor !== undefined &&
    armorItem.bulk !== undefined &&
    armorItem.properties !== undefined &&
    armorItem.special !== undefined &&
    armorItem.mastery !== undefined
  );
}
