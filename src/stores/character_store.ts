import { defineStore } from 'pinia';
import type { CharacterState } from 'src/models/types';
import type { Weapon } from 'src/models/weapon_types';
import { DamageTypes } from 'src/models/weapon_types';

export const useCharacterStore = defineStore('characterStore', {
  state(): CharacterState {
    return {
      name: 'Unknown advernturer',
      level: 1,
      xp: 0,
      class: 'fighter',
      ancestry: 'human',
      speed: 25,
      abilityScores: {
        str: 16,
        dex: 14,
        con: 14,
        int: 12,
        wis: 10,
        cha: 10,
      },
      hp: {
        currentHp: 14,
        maxHp: 22,
        tempHp: 0,
      },
      weapons: [
        {
          name: 'longsword',
          damage: { amount: { amount: 1, type: 8 }, type: DamageTypes.SLASHING },
          bulk: 1,
          properties: [],
          heft: 4,
          special: 'Quick parry',
          mastery: 'Prince slayer',
        },
        {
          name: 'crowssow, heavy',
          damage: { amount: { amount: 1, type: 10 }, type: DamageTypes.PIERCING },
          bulk: 2,
          properties: ['projectile (range 100/400)', 'loading'],
          heft: 4,
          special: 'Braced fire',
          mastery: 'Fast hands',
        },
      ] as Weapon[],
    };
  },

  getters: {
    getAbilityScoreModifier:
      (state: CharacterState) =>
      (ability: keyof CharacterState['abilityScores']): number => {
        return Math.floor((state.abilityScores[ability] - 10) / 2);
      },
  },

  actions: {},
});
