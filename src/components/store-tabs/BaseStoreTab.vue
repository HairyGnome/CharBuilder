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
          @click="selectItem(item)"
        />
      </q-scroll-area>
    </template>
    <template v-slot:after><slot name="details" /></template>
  </q-splitter>
</template>

<script lang="ts">
import type { ItemData } from 'src/models/weapon_types';
import { defineComponent, type PropType } from 'vue';

export default defineComponent({
  name: 'BaseStoreTab',

  props: {
    items: {
      type: Array as PropType<ItemData[]>,
      required: true,
    },
    selectItem: {
      type: Function as PropType<(item: ItemData) => void>,
      required: true,
    },
  },

  data() {
    return {
      ratio: 24.45,
    };
  },
});
</script>
