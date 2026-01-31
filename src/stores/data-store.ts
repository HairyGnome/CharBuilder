import { defineStore } from "pinia";
import type { ArmorData } from "src/models/items/armor_types";
import type { ToolData } from "src/models/items/tool_types";
import type {
  AncestryData,
  ClassData,
  Data,
  Feat,
  LineageData,
  RegionData,
} from "src/models/types";
import type { WeaponData } from "src/models/items/weapon_types";
import type { FociData } from "src/models/items/foci_types";

export const useDataStore = defineStore("dataStore", {
  state: (): Data => {
    return {
      classes: [],
      ancestries: {},
      lineages: {},
      regions: {},
      weapons: [],
      armors: [],
      tools: [],
      foci: [],
      feats: [],
      hyperlinks: {},
    };
  },

  getters: {},

  actions: {
    setClasses(classes: object) {
      this.classes = classes as ClassData[];
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
      this.weapons = weapons as WeaponData[];
    },
    setArmors(armors: object) {
      this.armors = armors as ArmorData[];
    },
    setTools(tools: object) {
      this.tools = tools as ToolData[];
    },
    setFoci(foci: object) {
      this.foci = foci as FociData[];
    },
    setFeats(feats: object) {
      this.feats = feats as Feat[];
    },
    setHyperlinks(hyperlinks: object) {
      this.hyperlinks = hyperlinks as Record<string, string>;
    },
    getHyperlink(item: string): string | undefined {
      const link = this.hyperlinks[item];
      return link;
    },

    getWeaponByName(name: string): WeaponData | null {
      const weapon = this.weapons.find((w) => w.name === name);
      return weapon || null;
    },

    getClassByName(name: string): ClassData | null {
      const classData = this.classes.find((c) => c.name === name);
      return classData || null;
    },
    getArmorByName(name: string): ArmorData | null {
      const armor = this.armors.find((a) => a.name === name);
      return armor || null;
    },
  },
});
