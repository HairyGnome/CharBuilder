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
  SpellData,
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
      spells: [],
      feats: [],
      hyperlinks: {},
    };
  },

  getters: {},

  actions: {
    /* Setters */

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
    setSpells(spells: object) {
      this.spells = spells as SpellData[];
    },
    setFeats(feats: object) {
      this.feats = feats as Feat[];
    },
    setHyperlinks(hyperlinks: object) {
      this.hyperlinks = hyperlinks as Record<string, string>;
    },

    /* Individual Getters */

    getHyperlink(item: string): string | undefined {
      const link = this.hyperlinks[item];
      return link;
    },

    getWeaponByName(name: string): WeaponData | null {
      const weapon = this.weapons.find((w) => w.name === name);
      return weapon ?? null;
    },

    getClassByName(name: string): ClassData | null {
      const classData = this.classes.find((c) => c.name === name);
      return classData ?? null;
    },
    getArmorByName(name: string): ArmorData | null {
      const armor = this.armors.find((a) => a.name === name);
      return armor ?? null;
    },

    getToolByName(name: string): ToolData | null {
      const tool = this.tools.find((a) => a.name === name);
      return tool ?? null;
    },

    getFociByName(name: string): FociData | null {
      const foci = this.foci.find((f) => f.name === name);
      return foci ?? null;
    },

    /* Array Getters */
    getSpellsByNames(names: string[]): SpellData[] {
      return this.spells.filter((spell) => names.includes(spell.name));
    },
  },
});
