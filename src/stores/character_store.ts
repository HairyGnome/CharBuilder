import { defineStore } from 'pinia';
import type { AbilityScores, CharacterState, Transaction } from 'src/models/types';
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
      region: 'sleepless_sands',
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
        currentHp: 22,
        maxHp: 22,
        tempHp: 0,
      },
      weapons: ['longsword', 'crossbow,_heavy'] as string[],
      money: {
        gold: 0,
        silver: 0,
        copper: 0,
        transactionHistory: [],
      },
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

    getAncestryAndLineageFeats(state: CharacterState): string[] {
      const ancestryFeat = dataStore.ancestries[state.ancestry.ancestry]?.feature;
      const lineageFeatures: string[] = [];
      const lineageFeatData = dataStore.lineages[state.ancestry.lineage]?.feats || {};
      for (let i = 1; i <= state.level; i++) {
        const levelTag = `lv${i}` as keyof typeof lineageFeatData;
        const feat = lineageFeatData[levelTag];
        lineageFeatures.push(feat);
      }
      return [...(ancestryFeat ? [ancestryFeat] : []), ...lineageFeatures];
    },

    getRoleFeatures(): string[] {
      const roles = dataStore.classes[this.class]?.roles || [];
      const rolePassives: { [key: string]: string } =
        dataStore.ancestries[this.ancestry.ancestry]?.rolePassives || {};
      const result = roles.map((role) => rolePassives[role] || '');
      return result.filter((role) => role !== '');
    },
  },

  actions: {
    setAncestry(ancestry: string) {
      ancestry = ancestry.toLowerCase();
      this.ancestry.ancestry = ancestry;
      this.ancestry.lineage = dataStore.ancestries[ancestry]?.lineages[0] || 'N/A';
    },
    setLineage(lineage: string) {
      this.ancestry.lineage = lineage.toLowerCase().slugify();
    },
    setRegion(region: string) {
      this.region = region.toLocaleLowerCase().slugify();
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

    // calculateMaxHealth() {
    //   const maxHealth =
    // }

    adjustHealth(value: number) {
      this.hp.currentHp += value;
      if (this.hp.currentHp < 0) this.hp.currentHp = 0;
      if (this.hp.currentHp > this.hp.maxHp) this.hp.currentHp = this.hp.maxHp;
    },

    setTempHp(value: number) {
      if (value >= 0) {
        this.hp.tempHp = value;
      }
    },

    setCurrentHealth(value: number) {
      if (value > 0 && value < this.hp.maxHp) {
        this.hp.currentHp = value;
      }
    },
    addTransaction(transaction: Transaction) {
      this.money.transactionHistory.push(transaction);
      this.money.gold += transaction.goldChange;
      this.money.silver += transaction.silverChange;
      this.money.copper += transaction.copperChange;
    },

    simplifyCurrency() {
      let baseCopper = this.money.copper;
      let baseSilver = this.money.silver;
      let baseGold = this.money.gold;

      while (baseCopper >= 100) {
        baseCopper -= 100;
        baseSilver += 1;
      }
      while (baseSilver >= 100) {
        baseSilver -= 100;
        baseGold += 1;
      }
      const copperChange = baseCopper - this.money.copper;
      const silverChange = baseSilver - this.money.silver;
      const goldChange = baseGold - this.money.gold;

      if (copperChange === 0 && silverChange === 0 && goldChange === 0) {
        return; // No changes needed
      }

      const transaction: Transaction = {
        label: 'Simplify Currency',
        timestamp: new Date(),
        goldChange,
        silverChange,
        copperChange,
      };
      this.addTransaction(transaction);
    },
  },
});
