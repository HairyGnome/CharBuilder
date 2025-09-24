import { defineStore } from 'pinia';
import type { AncestryData, ClassData, Data } from 'src/models/types';
import type { WeaponData } from 'src/models/weapon_types';

export const useDataStore = defineStore('dataStore', {
  state: (): Data => {
    return {
      classes: {},
      ancestries: {},
      weapons: {},
    };
  },

  getters: {},

  actions: {
    setClasses(classes: object) {
      this.classes = classes as Record<string, ClassData>;
    },
    setAncestries(ancestries: object) {
      this.ancestries = ancestries as Record<string, AncestryData>;
    },
    setWeapons(weapons: object) {
      this.weapons = weapons as Record<string, WeaponData>;
    },
  },
});
