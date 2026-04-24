import { defineStore } from "pinia";
import type { AbilityScores, CharacterState, Transaction } from "src/models/types";
import { useDataStore } from "./data-store";
import { ArmorCategory } from "src/models/items/armor_types";

export const useCharacterStore = defineStore("characterStore", {
  state(): CharacterState {
    return {
      name: "Unknown advernturer",
      level: 1,
      class: "fighter",
      ancestry: {
        ancestry: "human",
        lineage: "lún",
      },
      region: "sleepless_sands",
      speed: 25,
      selectedAbilityScoreArray: "specialist",
      abilityScores: {
        baseScores: {
          str: 16,
          dex: 12,
          con: 12,
          int: 10,
          wis: 10,
          cha: 8,
        },
        lv4Improvement: {
          str: 0,
          dex: 0,
          con: 0,
          int: 0,
          wis: 0,
          cha: 0,
        },
      },
      selectedFeats: {
        lv4: null,
      },
      hp: {
        currentHp: 22,
        maxHp: 22,
        tempHp: 0,
      },
      weapons: ["longsword", "crossbow,_heavy"] as string[],
      defense: {
        equippedArmor: null,
        equippedShield: null,
        armors: ["half_plate", "buckler", "chain_mail"] as string[],
      },
      tools: [
        { name: "mason's_tool", chargeLeft: -1 },
        { name: "disguise_kit", chargeLeft: 5 },
      ],
      money: {
        gold: 0,
        silver: 0,
        copper: 0,
        transactionHistory: [],
      },
    };
  },

  getters: {
    getArmors(state: CharacterState) {
      return state.defense.armors.filter((armorName) => {
        const dataStore = useDataStore();
        const armor = dataStore.getArmorByName(armorName);
        return armor && armor.category !== ArmorCategory.SHIELD;
      });
    },
    getShields(state: CharacterState) {
      return state.defense.armors.filter((armorName) => {
        const dataStore = useDataStore();
        const armor = dataStore.getArmorByName(armorName);
        return armor && armor.category === ArmorCategory.SHIELD;
      });
    },
    getTools(state: CharacterState) {
      return state.tools;
    },
    getDv(): number {
      const dataStore = useDataStore();
      let dv = 10;
      const equippedArmorName = this.defense.equippedArmor;
      const equippedShieldName = this.defense.equippedShield;
      if (equippedArmorName) {
        const armor = dataStore.getArmorByName(equippedArmorName);
        if (!armor) throw new Error(`Equipped armor ${equippedArmorName} not found in data store`);
        dv = armor.baseDv;
        if (armor.category === ArmorCategory.LIGHT) {
          dv += this.getAbilityScoreModifier("dex");
        } else if (armor.category === ArmorCategory.MEDIUM) {
          dv += Math.min(this.getAbilityScoreModifier("dex"), 2);
        }
      }
      if (equippedShieldName) {
        const shield = dataStore.getArmorByName(equippedShieldName);
        if (!shield)
          throw new Error(`Equipped shield ${equippedShieldName} not found in data store`);
        dv += shield.baseDv;
      }
      return dv;
    },

    getAbilityScoreModifier:
      (state: CharacterState) =>
      (ability: keyof AbilityScores): number => {
        const abilityScore =
          state.abilityScores.baseScores[ability] + state.abilityScores.lv4Improvement[ability];
        return Math.floor((abilityScore - 10) / 2);
      },

    getBaseAbilityScores(state: CharacterState) {
      return state.abilityScores.baseScores;
    },

    getAncestryAndLineageFeats(state: CharacterState): string[] {
      const dataStore = useDataStore();
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
      const dataStore = useDataStore();
      const roles = dataStore.getClassByName(this.class)?.roles ?? [];
      const rolePassives: { [key: string]: string } =
        dataStore.ancestries[this.ancestry.ancestry]?.rolePassives ?? {};
      const result = roles.map((role) => rolePassives[role] || "");
      return result.filter((role) => role !== "");
    },
  },

  actions: {
    setAncestry(ancestry: string) {
      ancestry = ancestry.toLowerCase();
      this.ancestry.ancestry = ancestry;
      const dataStore = useDataStore();
      this.ancestry.lineage = dataStore.ancestries[ancestry]?.lineages[0] || "N/A";
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
    setBaseAbilityScores(abilityScores: AbilityScores) {
      this.abilityScores.baseScores = abilityScores;
    },

    setLv4Improvement(abilityScores: AbilityScores) {
      this.abilityScores.lv4Improvement = abilityScores;
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

    useTool(toolName: string): boolean {
      const tool = this.tools.find((t) => t.name === toolName);
      if (!tool) {
        console.warn(`Tool ${toolName} not found`);
        return false;
      }
      if (tool.chargeLeft === 0) {
        console.warn(`Tool ${toolName} has no charges left`);
        return false;
      }
      if (tool.chargeLeft > 0) {
        tool.chargeLeft -= 1;
      }
      return true;
    },

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
    addTransaction(transaction: Transaction): boolean {
      let totalCopper = this.money.gold * 10000 + this.money.silver * 100 + this.money.copper;

      const transactionCopper =
        transaction.goldChange * 10000 + transaction.silverChange * 100 + transaction.copperChange;

      if (totalCopper + transactionCopper < 0) {
        return false;
      }

      totalCopper += transactionCopper;
      this.money.gold = Math.floor(totalCopper / 10000);
      totalCopper %= 10000;
      this.money.silver = Math.floor(totalCopper / 100);
      this.money.copper = totalCopper % 100;

      this.money.transactionHistory.push(transaction);
      return true;
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
        label: "Simplify Currency",
        timestamp: new Date(),
        goldChange,
        silverChange,
        copperChange,
      };
      this.addTransaction(transaction);
    },
    resetLv4AbilityScoreImprovements() {
      this.abilityScores.lv4Improvement = {
        str: 0,
        dex: 0,
        con: 0,
        int: 0,
        wis: 0,
        cha: 0,
      };
    },
  },
});
