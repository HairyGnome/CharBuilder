import type { ItemData } from './weapon_types';

export interface ToolData extends ItemData {
  bulk: 0;
  charges: number;
  special: string;
  mastery: string;
  description: string;
}
