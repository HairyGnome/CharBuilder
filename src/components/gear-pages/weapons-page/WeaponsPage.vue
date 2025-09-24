<template>
  <q-card-section style="height: 100%">
    <q-scroll-area class="column" style="height: 100%">
      <weapon-card v-for="(weapon, idx) in weapons" :key="idx" :weaponName="weapon" />
    </q-scroll-area>
  </q-card-section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import WeaponCard from './WeaponCard.vue';
import { useCharacterStore } from 'src/stores/character_store';

const characterStore = useCharacterStore();

export default defineComponent({
  name: 'WeaponsPage',

  components: { WeaponCard },

  computed: {
    weapons(): string[] {
      return characterStore.weapons;
    },
  },
});
</script>
