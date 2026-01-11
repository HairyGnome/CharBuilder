<template>
  <q-card-section class="text-subtitle1">
    Class
    <q-separator />
  </q-card-section>
  <q-card-section class="column q-gutter-y-md">
    <q-select
      v-model="selectedClass"
      :options="classLabels"
      label="Class"
      dense
      outlined
      class="col q-mt-none"
    />
    <div class="row q-gutter-x-sm">
      <q-input
        v-for="(role, idx) in classRoles"
        :model-value="role.unslugify().capitalize()"
        :label="`Role ${idx + 1}`"
        dense
        outlined
        readonly
        :key="idx"
        class="col"
      />
    </div>
  </q-card-section>
  <q-card-section class="text-subtitle1">
    Ancestry
    <q-separator />
  </q-card-section>
  <q-card-section class="column q-gutter-y-md">
    <q-select
      v-model="selectedAncestry"
      :options="ancestryLabels"
      label="Ancestry"
      dense
      outlined
      class="col q-mt-none"
    />
    <q-select
      v-model="selectedLineage"
      :options="lineageLabels"
      label="Lineage"
      dense
      outlined
      class="col"
    />
    <div class="row q-col-gutter-x-sm">
      <q-input
        v-model="ancestryFeature"
        label="Ancestry Feature"
        dense
        outlined
        readonly
        class="col"
      />
      <q-input
        v-model="lineageFeature"
        label="Lineage Feature"
        dense
        outlined
        readonly
        class="col"
      />
    </div>
    <q-input
      v-for="(passive, idx) in rolePassives"
      :model-value="passive"
      :label="`Role Passive ${idx + 1}`"
      dense
      outlined
      readonly
      :key="idx"
      class="col"
    />
  </q-card-section>
  <q-card-section class="text-subtitle1">
    Region
    <q-separator />
  </q-card-section>
  <q-card-section class="column q-gutter-y-md">
    <q-select
      v-model="selectedRegion"
      :options="regionLabels"
      label="Region"
      dense
      outlined
      class="col"
    />
    <q-input
      v-for="(feat, idx) in regionFeats"
      :model-value="feat"
      :label="`Region Feat ${idx + 1}`"
      dense
      outlined
      readonly
      :key="idx"
      class="col"
    />
  </q-card-section>
  <level-up-section v-for="level in 5" :key="level" :req-level="level">
    <template #extra>
      <div class="column col" v-if="level === 1">
        <q-btn
          v-if="level === 1"
          label="Select base ability scores"
          @click="openAbilityScoreArrayDialog"
        />
        <ability-score-array-dialog v-model="showAbilityScoreArrayDialog" />
      </div>
      <div v-else-if="level === 4" class="column q-gutter-y-md">
        <q-select
          v-model="lv4Selection"
          :options="lv4SelectOptions"
          dense
          outlined
          @update:model-value="onLv4SelectionUpdate"
        />
        <q-btn
          v-if="abilityScoreSelected"
          label="Select Ability Score Improvement"
          dense
          @click="openAbilityScoreImprovementDialog"
        />
        <div v-else class="column">
          <q-input
            :model-value="selectedFeats.lv4.unslugify().capitalize()"
            v-if="selectedFeats.lv4 !== null"
            readonly
            dense
            outlined
            label="Feat"
            class="q-mb-md"
          />
          <q-btn label="Select Feat" dense outlined @click="openFeatSelectDialog" />
        </div>
      </div>
      <div v-else>
        <q-input
          v-for="feat in classData?.feats[level] || []"
          :model-value="feat.unslugify().capitalize()"
          :key="feat"
          readonly
          dense
          outlined
          label="Feat"
          class="q-mb-md"
        />
      </div>
    </template>
  </level-up-section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useDataStore } from "src/stores/data-store";
import { useCharacterStore } from "src/stores/character_store";
import AbilityScoreArrayDialog from "../dialogs/AbilityScoreArrayDialog.vue";
import LevelUpSection from "./LevelUpSection.vue";
import { mapActions, mapState } from "pinia";
import { useUiStore } from "src/stores/ui-store";

const dataStore = useDataStore();
const characterStore = useCharacterStore();

export default defineComponent({
  name: "ClassSelectCard",

  components: { AbilityScoreArrayDialog, LevelUpSection },

  data() {
    return {
      showAbilityScoreArrayDialog: false,
      lv4Selection: {
        id: "ability_score",
        label: "Ability Score Improvement",
      },
      lv4SelectOptions: [
        {
          id: "ability_score",
          label: "Ability Score Improvement",
        },
        {
          id: "feat",
          label: "Feat",
        },
      ],
    };
  },

  computed: {
    ...mapState(useDataStore, ["classes"]),
    ...mapState(useCharacterStore, ["class", "ancestry", "region", "selectedFeats"]),

    abilityScoreSelected() {
      return this.lv4Selection.id === "ability_score";
    },

    classData() {
      const className = characterStore.class;
      return dataStore.getClassByName(className);
    },

    classLabels() {
      return dataStore.classes.map((cls) => cls.name.unslugify().capitalize());
    },

    ancestryLabels() {
      return Object.keys(dataStore.ancestries).map((key) => key.capitalize());
    },

    lineageLabels() {
      return (
        dataStore.ancestries[characterStore.ancestry.ancestry]?.lineages.map((lineage) =>
          lineage.unslugify().capitalize(),
        ) || []
      );
    },

    regionLabels() {
      return Object.keys(dataStore.regions).map((key: string) => key.unslugify().capitalize());
    },

    classRoles() {
      return dataStore.getClassByName(characterStore.class)?.roles || [];
    },

    ancestryFeature() {
      return (
        dataStore.ancestries[characterStore.ancestry.ancestry]?.feature.unslugify().capitalize() ||
        "N/A"
      );
    },

    lineageFeature() {
      return dataStore.lineages[characterStore.ancestry.lineage]?.feats.lv1
        .unslugify()
        .capitalize();
    },

    rolePassives(): string[] {
      return characterStore.getRoleFeatures.map((feature) => feature.unslugify().capitalize());
    },

    regionFeats(): string[] {
      const regionPassives: { [key: string]: string } =
        dataStore.regions[characterStore.region]?.feats ?? {};
      const roles = dataStore.getClassByName(characterStore.class)?.roles ?? [];
      return roles.map((role) => regionPassives[role]?.unslugify().capitalize() ?? "N/A");
    },

    selectedClass: {
      get() {
        return characterStore.class.capitalize();
      },
      set(value: string) {
        characterStore.setClass(value);
      },
    },

    selectedAncestry: {
      get() {
        return characterStore.ancestry.ancestry.capitalize();
      },
      set(value: string) {
        characterStore.setAncestry(value);
      },
    },

    selectedLineage: {
      get() {
        return characterStore.ancestry.lineage.unslugify().capitalize();
      },
      set(value: string) {
        characterStore.setLineage(value);
      },
    },

    selectedRegion: {
      get() {
        return characterStore.region.unslugify().capitalize();
      },
      set(value: string) {
        characterStore.setRegion(value);
      },
    },
  },

  methods: {
    ...mapActions(useUiStore, ["openAbilityScoreImprovementDialog", "openFeatSelectDialog"]),
    ...mapActions(useCharacterStore, ["resetLv4AbilityScoreImprovements"]),

    openAbilityScoreArrayDialog() {
      this.showAbilityScoreArrayDialog = true;
    },

    onLv4SelectionUpdate() {
      characterStore.selectedFeats.lv4 = null;
      characterStore.resetLv4AbilityScoreImprovements();
    },
  },
});
</script>
