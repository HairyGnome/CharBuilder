import { defineStore } from 'pinia';
import type { Class, Data } from 'src/models/types';

export const useDataStore = defineStore('dataStore', {
  state: (): Data => {
    return {
      classes: {},
    };
  },

  getters: {},

  actions: {
    setClasses(classes: object) {
      this.classes = classes as Record<string, Class>;
    },
  },
});
