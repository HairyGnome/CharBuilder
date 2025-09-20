<template>
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
import type { ClassData } from 'src/models/types';
import { useCharacterStore } from 'src/stores/character_store';

const dataStore = useDataStore();
const characterStore = useCharacterStore();

export default defineComponent({
  name: 'ClassSelectCard',

  computed: {
    classLabels() {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return Object.entries(dataStore.classes).map(([key, _cls]: [string, ClassData]) =>
        key.capitalize(),
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
        characterStore.class = value.toLowerCase();
      },
    },
  },
});
</script>
