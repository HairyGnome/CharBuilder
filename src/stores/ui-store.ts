import { defineStore } from 'pinia';

export const useUiStore = defineStore('uiStore', {
  state() {
    return {
      diceRollerShow: false,
      menuShow: false,
    };
  },
});
