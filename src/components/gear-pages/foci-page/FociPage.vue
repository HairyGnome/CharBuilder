<template>
  <q-card-section class="armor-page">
    <q-card class="q-px-md" flat>
      <q-card-section class="row justify-between text-center text-h5">
        <div class="col">Name</div>
        <div class="col">Mastery</div>
      </q-card-section>
    </q-card>
    <q-separator />
    <q-scroll-area class="armor-scroll column">
      <foci-card v-for="(focus, idx) in foci" :key="idx" :focus="focus" />
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
import { useCharacterStore } from "src/stores/character_store";
import FociCard from "./FociCard.vue";
import { mapState } from "pinia";

export default defineComponent({
  name: "FociPage",

  components: { FociCard },

  computed: {
    ...mapState(useCharacterStore, ["foci"]),
  },
});
</script>
