import { defineStore } from 'pinia';
import type { AncestryData, ClassData, Data, LineageData, RegionData } from 'src/models/types';
import type { WeaponData } from 'src/models/weapon_types';

export const useDataStore = defineStore('dataStore', {
  state: (): Data => {
    return {
      classes: {},
      ancestries: {},
      lineages: {},
      regions: {},
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
    setLineages(lineages: object) {
      this.lineages = lineages as Record<string, LineageData>;
    },
    setRegions(regions: object) {
      this.regions = regions as Record<string, RegionData>;
    },
    setWeapons(weapons: object) {
      this.weapons = weapons as Record<string, WeaponData>;
    },
  },
});
