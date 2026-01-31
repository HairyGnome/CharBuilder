<template>
  <q-card-section class="armor-page">
    <q-card class="q-px-md" flat>
      <q-card-section class="row justify-between text-center text-h5">
        <div class="col">Name</div>
        <div class="col">Armor</div>
        <div class="col">Bulk</div>
        <div class="col">Properties</div>
        <div class="col">Special</div>
        <div class="col">Mastery</div>
      </q-card-section>
    </q-card>
    <q-separator />
    <q-scroll-area class="armor-scroll column">
      <armor-card v-for="(armor, idx) in armors" :key="idx" :armorName="armor" />
    </q-scroll-area>
  </q-card-section>
</template>

<style scoped>
.armor-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.armor-scroll {
  flex: 1 1 auto;
  min-height: 0;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import ArmorCard from "./ArmorCard.vue";
import { useCharacterStore } from "src/stores/character_store";

const characterStore = useCharacterStore();

export default defineComponent({
  name: "ArmorPage",

  components: { ArmorCard },

  computed: {
    armors() {
      return characterStore.armors;
    },
  },
});
</script>
