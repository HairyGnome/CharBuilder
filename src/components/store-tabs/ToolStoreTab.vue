<template>
  <base-store-tab :items="tools" :selectItem="onSelectItem">
    <template #details>
      <q-card-section
        v-if="selectedItem !== null"
        class="column text-h6 justify-evenly q-pl-xl"
        style="height: 100%"
      >
        <div>Name: {{ displayItem?.name }}</div>
        <div>Charges: {{ displayItem?.charges }}</div>
        <div>Special: {{ displayItem?.special }}</div>
        <div>Mastery: {{ displayItem?.mastery }}</div>
        <q-scroll-area style="height: 200px; width: 100%">
          {{ displayItem?.description }}
        </q-scroll-area>
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
import type { ToolData } from 'src/models/tool_types';
import { mapState } from 'pinia';
import { useDataStore } from 'src/stores/data-store';
import type { ItemData } from 'src/models/weapon_types';

export default defineComponent({
  name: 'ToolStoreTab',

  components: { BaseStoreTab },

  data() {
    return {
      selectedItem: null as ToolData | null,
    };
  },

  computed: {
    ...mapState(useDataStore, ['tools']),

    displayItem() {
      if (this.selectedItem === null) {
        return null;
      }
      return {
        name: this.selectedItem.name.unslugify().capitalize(),
        charges: this.selectedItem.charges,
        special: this.selectedItem.special.unslugify().capitalize(),
        mastery: this.selectedItem.mastery.unslugify().capitalize(),
        description: this.selectedItem.description,
      };
    },
  },

  methods: {
    onSelectItem(item: ItemData) {
      console.log('Selected item:', item);
      if (this.isToolData(item)) {
        this.selectedItem = item;
      } else {
        throw new Error(`Error: Item ${item.name} is not an ToolData type.`);
      }
    },

    isToolData(item: ItemData): item is ToolData {
      return 'charges' in item && 'special' in item && 'mastery' in item;
    },
  },
});
</script>
