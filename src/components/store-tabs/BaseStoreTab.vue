<template>
  <q-splitter v-model="ratio" disable style="height: 420px">
    <template v-slot:before>
      <q-scroll-area style="height: 100%">
        <q-btn
          v-for="(item, idx) in items"
          :key="idx"
          class="full-width q-mb-sm"
          :label="item"
          flat
          unelevated
        />
      </q-scroll-area>
    </template>
    <template v-slot:after> </template>
  </q-splitter>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseStoreTab',

  data() {
    return {
      ratio: 25,
    };
  },

  props: {
    items: {
      type: Array<string>,
      required: true,
    },
  },
});
</script>
