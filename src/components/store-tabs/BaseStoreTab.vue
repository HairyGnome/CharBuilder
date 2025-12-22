<template>
  <q-splitter v-model="ratio" disable style="height: 60vh">
    <template v-slot:before>
      <q-scroll-area style="height: 100%">
        <q-btn
          v-for="(item, idx) in items"
          :key="idx"
          class="full-width q-mb-sm"
          :label="item.name.unslugify()"
          flat
          unelevated
          @click="selectedItem = item"
        />
      </q-scroll-area>
    </template>
    <template v-slot:after>
      <q-card-section
        v-if="selectedItem != null"
        class="column full-width justify-between"
        style="height: 100%"
      >
        <div v-for="(value, key) in displayItem" :key="key" class="text-h6">
          {{ key.unslugify().capitalize() }}: {{ value }}
        </div>
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
  </q-splitter>
</template>

<script lang="ts">
import { isArmorData, type ArmorData } from 'src/models/items/armor_types';
import { isFociData, type FociData } from 'src/models/items/foci_types';
import { isToolData, type ToolData } from 'src/models/items/tool_types';
import { isWeaponData, type WeaponData } from 'src/models/items/weapon_types';
import { defineComponent, type PropType } from 'vue';

export default defineComponent({
  name: 'BaseStoreTab',

  props: {
    items: {
      type: Array as PropType<WeaponData[] | ArmorData[] | ToolData[] | FociData[]>,
      required: true,
    },
  },

  data() {
    return {
      ratio: 25.3,
      selectedItem: null as WeaponData | ArmorData | ToolData | FociData | null,
    };
  },

  computed: {
    displayDescription(): string | undefined {
      if (this.selectedItem === null) {
        return undefined;
      }
      if ('description' in this.selectedItem) {
        return this.selectedItem.description;
      }

      return undefined;
    },

    displayItem() {
      if (this.selectedItem === null) {
        return null;
      }
      if (isWeaponData(this.selectedItem)) {
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
      }
      if (isArmorData(this.selectedItem)) {
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
      }
      if (isToolData(this.selectedItem)) {
        return {
          name: this.selectedItem.name.unslugify().capitalize(),
          charges: this.selectedItem.charges,
          special: this.selectedItem.special.unslugify().capitalize(),
          mastery: this.selectedItem.mastery.unslugify().capitalize(),
        };
      }
      if (isFociData(this.selectedItem)) {
        return {
          name: this.selectedItem.name.unslugify().capitalize(),
          mastery: this.selectedItem.mastery.unslugify().capitalize(),
        };
      }
      return {};
    },
  },
});
</script>
