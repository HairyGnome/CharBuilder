import { defineStore } from "pinia";

export const useUiStore = defineStore("uiStore", {
  state() {
    return {
      diceRollerShow: false,
      menuShow: false,
      storeDialogShow: false,
      abilityScoreImprovementDialogShow: false,
      featSelectDialogShow: false,
      manageSpellsDialogShow: false,
    };
  },

  getters: {},

  actions: {
    openAbilityScoreImprovementDialog() {
      this.abilityScoreImprovementDialogShow = true;
    },

    openFeatSelectDialog() {
      this.featSelectDialogShow = true;
    },

    openManageSpellsDialog() {
      this.manageSpellsDialogShow = true;
      console.log("Opening Manage Spells Dialog");
    },
  },
});
