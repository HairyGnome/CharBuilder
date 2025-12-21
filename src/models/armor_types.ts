import type { Die } from './types';
import type { ItemData } from './weapon_types';

export interface ArmorData extends ItemData {
  armor: Die;
  vigor: number;
  clumsy: number;
  properties: string[];
  special: string;
  mastery: string;
}
