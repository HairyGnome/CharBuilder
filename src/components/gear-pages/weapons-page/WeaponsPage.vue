<template>
  <q-card-section class="weapons-page">
    <q-card class="q-px-md" flat>
      <q-card-section class="row justify-between text-center text-h5">
        <div class="col">Name</div>
        <div class="col">Damage</div>
        <div class="col">Bulk</div>
        <div class="col">Properties</div>
        <div class="col">Heft</div>
        <div class="col">Special</div>
        <div class="col">Mastery</div>
      </q-card-section>
    </q-card>
    <q-separator />
    <q-scroll-area class="weapons-scroll column">
      <weapon-card v-for="(weapon, idx) in weapons" :key="idx" :weaponName="weapon" />
    </q-scroll-area>
  </q-card-section>
</template>

<style scoped>
.weapons-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.weapons-scroll {
  flex: 1 1 auto;
  min-height: 0;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import WeaponCard from "./WeaponCard.vue";
import { useCharacterStore } from "src/stores/character_store";

const characterStore = useCharacterStore();

export default defineComponent({
  name: "WeaponsPage",

  components: { WeaponCard },

  computed: {
    weapons(): string[] {
      return characterStore.weapons;
    },
  },
});
</script>
