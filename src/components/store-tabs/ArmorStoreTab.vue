<template>
  <base-store-tab :items="[]" :selectItem="() => {}">
    <template #details>
      <q-card-section
        v-if="selectedItem !== null"
        class="column text-h6 justify-evenly q-pl-xl"
        style="height: 100%"
      >
        <div class="row justify-end">
          <q-btn align="right" label="Purchase" color="primary" />
        </div>
      </q-card-section>
      <q-card-section
        v-else
        class="column text-h6 justify-center items-center"
        style="height: 100%"
      >
        Select an item to see details.
      </q-card-section>
    </template>
  </base-store-tab>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseStoreTab from './BaseStoreTab.vue';

export default defineComponent({
  name: 'ArmorStoreTab',

  components: { BaseStoreTab },

  data() {
    return {
      selectedItem: null,
    };
  },
});
</script>
