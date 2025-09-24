<template>
  <div class="text-subtitle1 q-mt-lg">Class</div>
  <q-separator class="q-mb-md" />
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
        :model-value="role.toUpperCase()"
        :label="`Role ${idx + 1}`"
        dense
        outlined
        readonly
        :key="idx"
        class="col"
      />
    </div>
  </q-card-section>
  <div class="text-subtitle1 q-mt-lg">Ancestry</div>
  <q-separator class="q-mb-md" />
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
    <q-input
      v-model="ancestryFeature"
      label="Ancestry Feature"
      dense
      outlined
      readonly
      class="col"
    />
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
  <div class="text-subtitle1 q-mt-lg">Level 1</div>
  <q-separator class="q-mb-lg" />
  <q-card-section class="column">
    <q-btn label="Select base ability scores" @click="openAbilityScoreArrayDialog" />
    <ability-score-array-dialog v-model="showAbilityScoreArrayDialog" />
  </q-card-section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useDataStore } from 'src/stores/data-store';
import { useCharacterStore } from 'src/stores/character_store';
import AbilityScoreArrayDialog from '../dialogs/AbilityScoreArrayDialog.vue';

const dataStore = useDataStore();
const characterStore = useCharacterStore();

export default defineComponent({
  name: 'ClassSelectCard',

  components: { AbilityScoreArrayDialog },

  data() {
    return {
      showAbilityScoreArrayDialog: false,
    };
  },

  computed: {
    classLabels() {
      return Object.keys(dataStore.classes).map((key: string) => key.capitalize());
    },

    ancestryLabels() {
      return Object.keys(dataStore.ancestries).map((key) => key.capitalize());
    },

    lineageLabels() {
      return (
        dataStore.ancestries[characterStore.ancestry.ancestry]?.lineages.map((lineage) =>
          lineage.capitalize(),
        ) || []
      );
    },

    classRoles() {
      return dataStore.classes[characterStore.class]?.roles || [];
    },

    ancestryFeature() {
      return (
        dataStore.ancestries[characterStore.ancestry.ancestry]?.feature.unslugify().capitalize() ||
        'N/A'
      );
    },

    rolePassives(): string[] {
      const roles = dataStore.classes[characterStore.class]?.roles || [];
      const rolePassives: { [key: string]: string } =
        dataStore.ancestries[characterStore.ancestry.ancestry]?.rolePassives || {};
      return roles.map((role) => rolePassives[role]?.unslugify().capitalize() || 'N/A');
    },

    selectedClass: {
      get() {
        return characterStore.class.capitalize();
      },
      set(value: string) {
        console.log(typeof value);
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
        return characterStore.ancestry.lineage.capitalize();
      },
      set(value: string) {
        characterStore.setLineage(value);
      },
    },
  },

  methods: {
    openAbilityScoreArrayDialog() {
      this.showAbilityScoreArrayDialog = true;
    },
  },
});
</script>
