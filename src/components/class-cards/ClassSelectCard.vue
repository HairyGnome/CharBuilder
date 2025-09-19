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
import type { Class } from 'src/models/types';

const dataStore = useDataStore();

export default defineComponent({
  name: 'ClassSelectCard',

  data() {
    return {
      selectedClass: { label: 'Fighter', value: 'fighter' },
    };
  },

  computed: {
    classLabels() {
      return Object.entries(dataStore.classes).map(([key, cls]: [string, Class]) => ({
        label: cls.label,
        value: key,
      }));
    },

    classRoles() {
      return dataStore.classes[this.selectedClass.value]?.roles || [];
    },
  },
});
</script>
