import type { Die } from './types';

export type Damage = {
  amount: Die;
  type: DamageTypes;
};

export type WeaponData = {
  name: string;
  damage: Damage;
  bulk: number;
  properties: string[];
  heft: number;
  special: string;
  mastery: string;
};

export enum DamageTypes {
  BLUDGEONING = 'bludgeoning',
  PIERCING = 'piercing',
  SLASHING = 'slashing',
}

export type WeaponProperty =
  | {
      name: 'light';
      hyperlink: 'https://balint0928.github.io/quartz/Core-Rules/f_Equipment/f_Weapon-Properties/light';
    }
  | { name: 'finesse'; hyperlink: 'https://balint0928.github.io/quartz/Finesse' }
  | {
      name: 'thrown';
      range: string;
      hyperlink: 'https://balint0928.github.io/quartz/Core-Rules/f_Equipment/f_Weapon-Properties/thrown';
    }
  | {
      name: 'twin';
      hyperlink: 'https://balint0928.github.io/quartz/Core-Rules/f_Equipment/f_Weapon-Properties/twin';
    }
  | {
      name: 'versatile';
      hyperlink: 'https://balint0928.github.io/quartz/Core-Rules/f_Equipment/f_Weapon-Properties/versatile';
    }
  | {
      name: 'reach';
      hypelink: 'https://balint0928.github.io/quartz/Core-Rules/f_Equipment/f_Weapon-Properties/reach';
    }
  | {
      name: 'projectile';
      range: string;
      hyperlink: 'https://balint0928.github.io/quartz/Projectile';
    }
  | {
      name: 'loading';
      hyperlink: 'https://balint0928.github.io/quartz/Core-Rules/f_Equipment/f_Weapon-Properties/loading';
    }
  | {
      name: 'two-handed';
      hyperlink: 'https://balint0928.github.io/quartz/Core-Rules/f_Equipment/f_Weapon-Properties/two-handed';
    }
  | { name: 'special' }
  | { name: 'dueling'; hyperlink: 'https://balint0928.github.io/quartz/Dueling' }
  | { name: 'armor value'; hyperlink: 'https://balint0928.github.io/quartz/1d6' }
  | { name: 'vigor'; hyperlink: 'https://balint0928.github.io/quartz/3' }
  | {
      name: 'interchangeable';
      hyperlink: 'https://balint0928.github.io/quartz/Core-Rules/f_Equipment/f_Weapon-Properties/Interchangeable';
    }
  | {
      name: 'composite';
      hyperlink: 'https://balint0928.github.io/quartz/Core-Rules/f_Equipment/f_Weapon-Properties/Composite';
    };
