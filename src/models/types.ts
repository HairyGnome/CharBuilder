import type { WeaponData } from './weapon_types';

export type Stat = {
  name: string;
  value: string | number;
  icon?: string;
};

export type LinkedProperty = {
  name: string;
  hyperlink?: string;
};

export type Die = {
  amount: number;
  type: number;
};

export type AbilityScores = {
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
};

export type HP = {
  maxHp: number;
  currentHp: number;
  tempHp: number;
};

export type Skills = {
  name: string;
  value: number;
};

export type Role = 'martial' | 'mundane' | 'magic' | 'wanderer';

export type AncestryData = {
  lineages: string[];
  size: 'small' | 'medium' | 'large';
  feature: string;
  rolePassives: { [key: string]: string };
};

export type LineageData = {
  name: string;
  feature: string;
};

export type CharacterState = {
  name: string;
  level: number;
  xp: number;
  class: string;
  ancestry: {
    ancestry: string;
    lineage: string;
  };
  speed: number;
  selectedAbilityScoreArray: string;
  baseAbilityScores: AbilityScores;
  hp: HP;
  weapons: string[];
};

export type Data = {
  classes: { [key: string]: ClassData };
  ancestries: { [key: string]: AncestryData };
  weapons: { [key: string]: WeaponData };
};

export type ClassData = {
  label: string;
  hitDie: number;
  roles: string[];
  proficiencies: {
    armor: {
      choose?: number;
      granted: string[];
    };
    weapons: {
      choose?: number;
      granted: string[];
    };
    saves: string[];
    skills: {
      choose: number;
      granted: string[];
    };
    tools: {
      choose?: number;
      granted: string[];
    };
  };
};
