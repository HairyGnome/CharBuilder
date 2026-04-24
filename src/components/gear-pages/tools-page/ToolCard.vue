<template>
  <q-card class="column q-px-md q-my-md" bordered flat>
    <q-card-section class="row text-center items-center">
      <div class="col">{{ toolDisplay.name }}</div>
      <div class="col">{{ toolDisplay.chargeLeft }}</div>
      <div class="col">{{ toolDisplay.special }}</div>
      <div class="col">{{ toolDisplay.mastery }}</div>
      <div class="col cursor-pointer" @click="useTool">USE</div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { Tool } from "src/models/types";
import { useDataStore } from "src/stores/data-store";
import { useCharacterStore } from "src/stores/character_store";

const characterStore = useCharacterStore();

export default defineComponent({
  name: "ToolCard",

  props: {
    tool: {
      type: Object as () => Tool,
      required: true,
    },
  },

  computed: {
    toolDisplay() {
      const dataStore = useDataStore();

      const toolData = dataStore.getToolByName(this.tool.name);

      if (toolData === null) throw new Error("Could not find data for tool: " + this.tool.name);

      return {
        name: this.tool.name.unslugify().capitalize(),
        chargeLeft: this.tool.chargeLeft >= 0 ? this.tool.chargeLeft : "∞",
        special: toolData.special.unslugify().capitalize(),
        mastery: toolData.mastery.unslugify().capitalize(),
      };
    },
  },

  methods: {
    useTool() {
      console.log("Using tool: " + this.tool.name);
      characterStore.useTool(this.tool.name);
    },
  },
});
</script>
