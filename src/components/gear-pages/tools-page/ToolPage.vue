<template>
  <q-card-section class="armor-page">
    <q-card class="q-px-md" flat>
      <q-card-section class="row justify-between text-center text-h5">
        <div class="col">Name</div>
        <div class="col">Charges Left</div>
        <div class="col">Special</div>
        <div class="col">Mastery</div>
        <div class="col">Action</div>
      </q-card-section>
    </q-card>
    <q-separator />
    <q-scroll-area class="armor-scroll column">
      <tool-card v-for="(tool, idx) in tools" :key="idx" :tool="tool" />
    </q-scroll-area>
  </q-card-section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useCharacterStore } from "src/stores/character_store";
import ToolCard from "./ToolCard.vue";
import { type Tool } from "src/models/types";

const characterStore = useCharacterStore();

export default defineComponent({
  name: "ToolPage",

  components: { ToolCard },

  computed: {
    tools(): Tool[] {
      return characterStore.getTools;
    },
  },
});
</script>

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
