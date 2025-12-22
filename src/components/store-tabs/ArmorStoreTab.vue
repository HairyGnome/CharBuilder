<template>
  <base-store-tab :items="armors" :selectItem="onSelectItem">
    <template #details>
      <q-card-section
        v-if="selectedItem !== null"
        class="column text-h6 justify-evenly q-pl-xl"
        style="height: 100%"
      >
        <div>Name: {{ displayItem?.name }}</div>
        <div>Armor: {{ displayItem?.armor }}</div>
        <div>Bulk: {{ displayItem?.bulk }}</div>
        <div>Vigor: {{ displayItem?.vigor }}</div>
        <div>Clumsy: {{ displayItem?.clumsy }}</div>
        <div>Properties: {{ displayItem?.properties }}</div>
        <div>Special: {{ displayItem?.special }}</div>
        <div>Mastery: {{ displayItem?.mastery }}</div>
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
import { mapState } from 'pinia';
import { useDataStore } from 'src/stores/data-store';
import type { ItemData } from 'src/models/weapon_types';
import type { ArmorData } from 'src/models/armor_types';

export default defineComponent({
  name: 'ArmorStoreTab',

  components: { BaseStoreTab },

  data() {
    return {
      selectedItem: null as ArmorData | null,
    };
  },

  computed: {
    ...mapState(useDataStore, ['armors']),

    displayItem() {
      if (this.selectedItem === null) {
        return null;
      }
      return {
        name: this.selectedItem.name.unslugify().capitalize(),
        armor: `${this.selectedItem.armor.amount}d${this.selectedItem.armor.type}`,
        bulk: this.selectedItem.bulk === 0.1 ? 'L' : this.selectedItem.bulk,
        vigor: this.selectedItem.vigor,
        clumsy: this.selectedItem.clumsy,
        properties:
          this.selectedItem.properties.length > 0
            ? this.selectedItem.properties.map((p) => p.unslugify().capitalize()).join(', ')
            : '-',
        special: this.selectedItem.special.unslugify().capitalize(),
        mastery: this.selectedItem.mastery.unslugify().capitalize(),
      };
    },
  },

  methods: {
    onSelectItem(item: ItemData) {
      console.log('Selected item:', item);
      if (this.isArmorData(item)) {
        this.selectedItem = item;
      } else {
        throw new Error(`Error: Item ${item.name} is not an ArmorData type.`);
      }
    },

    isArmorData(item: ItemData): item is ArmorData {
      return (
        'armor' in item &&
        'vigor' in item &&
        'clumsy' in item &&
        'properties' in item &&
        'special' in item &&
        'mastery' in item
      );
    },
  },
});
</script>
