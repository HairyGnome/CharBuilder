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
  size: 'small' | 'medium' | 'large';
  speed: number;
  abilityScores: AbilityScores;
  dc: number;
  hp: HP;
};
