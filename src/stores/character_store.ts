import { defineStore } from 'pinia';
import type { AbilityScores, CharacterState } from 'src/models/types';
import { useDataStore } from './data-store';

const dataStore = useDataStore();

export const useCharacterStore = defineStore('characterStore', {
  state(): CharacterState {
    return {
      name: 'Unknown advernturer',
      level: 1,
      class: 'fighter',
      ancestry: {
        ancestry: 'human',
        lineage: 'lún',
      },
      speed: 25,
      selectedAbilityScoreArray: 'specialist',
      baseAbilityScores: {
        str: 16,
        dex: 12,
        con: 12,
        int: 10,
        wis: 10,
        cha: 8,
      },
      hp: {
        currentHp: 14,
        maxHp: 22,
        tempHp: 0,
      },
      weapons: ['longsword', 'crossbow,_heavy'] as string[],
    };
  },

  getters: {
    getAbilityScoreModifier:
      (state: CharacterState) =>
      (ability: keyof CharacterState['baseAbilityScores']): number => {
        // TODO: add ability scores from all sources
        return Math.floor((state.baseAbilityScores[ability] - 10) / 2);
      },

    getBaseAbilityScores(state: CharacterState) {
      return state.baseAbilityScores;
    },
  },

  actions: {
    setAncestry(ancestry: string) {
      ancestry = ancestry.toLowerCase();
      this.ancestry.ancestry = ancestry;
      this.ancestry.lineage = dataStore.ancestries[ancestry]?.lineages[0] || 'N/A';
    },
    setLineage(lineage: string) {
      this.ancestry.lineage = lineage.toLowerCase();
    },
    setClass(className: string) {
      this.class = className.toLowerCase();
    },
    setAbilityScores(abilityScores: AbilityScores) {
      this.baseAbilityScores = abilityScores;
    },

    setLevel(value: number) {
      if (value <= 10 && value >= 1) {
        this.level = value;
      }
    },

    incrementLevel() {
      if (this.level < 10) {
        this.level++;
      }
    },
  },
});
