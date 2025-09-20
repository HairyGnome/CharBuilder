<template>
  <q-card-section class="column q-gutter-y-md">
    <div class="text-subtitle1">Ancestry</div>
    <q-select
      v-model="selectedAncestry"
      :options="ancestryLabels"
      label="Select Ancestry"
      dense
      outlined
      class="col q-mt-none"
    />
    <div class="text-subtitle1">Lineage</div>
    <q-select
      v-model="selectedLineage"
      :options="lineageLabels"
      dense
      outlined
      class="col q-mt-none"
    />
  </q-card-section>
  <q-separator class="q-my-md" />
  <q-card-section class="column q-gutter-y-md">
    <div class="text-subtitle1">Class</div>
    <q-select
      v-model="selectedClass"
      :options="classLabels"
      label="Select Class"
      dense
      outlined
      class="col q-mt-none"
    />
    <div class="text-subtitle1">Class Roles</div>
    <div class="row q-gutter-x-sm q-mt-none">
      <q-input
        v-for="(role, idx) in classRoles"
        :model-value="role.toUpperCase()"
        dense
        outlined
        readonly
        :key="idx"
        class="col"
      />
    </div>
  </q-card-section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useDataStore } from 'src/stores/data-store';
import { useCharacterStore } from 'src/stores/character_store';

const dataStore = useDataStore();
const characterStore = useCharacterStore();

export default defineComponent({
  name: 'ClassSelectCard',

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
});
</script>
