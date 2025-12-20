<template><base-store-tab :items="items" /></template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseStoreTab from './BaseStoreTab.vue';

export default defineComponent({
  name: 'WeaponStoreTab',

  components: { BaseStoreTab },

  computed: {
    items(): string[] {
      return [
        'Sword',
        'Axe',
        'Bow',
        'Dagger',
        'Mace',
        'Spear',
        'Crossbow',
        'Halberd',
        'Flail',
        'Rapier',
      ];
    },
  },
});
</script>
