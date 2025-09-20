import type { Weapon } from './weapon_types';

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

export type CharacterState = {
  name: string;
  level: number;
  xp: number;
  class: string;
  ancestry: string;
  size: 'small' | 'medium' | 'large';
  speed: number;
  abilityScores: AbilityScores;
  hp: HP;
  weapons?: Weapon[];
};

export type Data = {
  classes: { [key: string]: Class };
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
