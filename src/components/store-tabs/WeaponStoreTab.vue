<template>
  <base-store-tab :items="weapons" :selectItem="onSelectItem">
    <template #details>
      <q-card-section
        v-if="selectedItem !== null"
        class="column text-h6 justify-evenly q-pl-xl"
        style="height: 100%"
      >
        <div>Name: {{ displayItem?.name }}</div>
        <div>Damage: {{ displayItem?.damage }}</div>
        <div>Bulk: {{ displayItem?.bulk }}</div>
        <div>Properties: {{ displayItem?.properties }}</div>
        <div>Heft: {{ displayItem?.heft }}</div>
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
import { useDataStore } from 'src/stores/data-store';
import { mapState } from 'pinia';
import type { ItemData, WeaponData } from 'src/models/weapon_types';

export default defineComponent({
  name: 'WeaponStoreTab',

  components: { BaseStoreTab },

  data() {
    return {
      selectedItem: null as WeaponData | null,
    };
  },

  computed: {
    ...mapState(useDataStore, { weapons: (store) => Object.values(store.weapons) }),

    displayItem() {
      if (this.selectedItem === null) {
        return null;
      }
      return {
        name: this.selectedItem.name.unslugify().capitalize(),
        damage: `${this.selectedItem.damage.amount.amount}d${this.selectedItem.damage.amount.type} ${this.selectedItem.damage.type.unslugify().capitalize()}`,
        bulk: this.selectedItem.bulk === 0.1 ? 'L' : this.selectedItem.bulk,
        properties:
          this.selectedItem.properties.length > 0
            ? this.selectedItem.properties.map((p) => p.unslugify().capitalize()).join(', ')
            : '-',
        heft: this.selectedItem.heft,
        special: this.selectedItem.special.unslugify().capitalize(),
        mastery: this.selectedItem.mastery.unslugify().capitalize(),
      };
    },
  },

  methods: {
    onSelectItem(item: ItemData) {
      if (this.isWeaponData(item)) {
        this.selectedItem = item;
      } else {
        console.warn('Selected item is not a WeaponData type.');
      }
    },

    isWeaponData(item: ItemData): item is WeaponData {
      return (
        'damage' in item &&
        'properties' in item &&
        'heft' in item &&
        'special' in item &&
        'mastery' in item
      );
    },
  },
});
</script>
