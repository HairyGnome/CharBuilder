<template>
  <q-card-section v-if="show" class="text-subtitle1">
    <div>Level {{ reqLevel }}</div>
    <slot name="extra" />
  </q-card-section>
</template>

<script lang="ts">
import { mapState } from "pinia";
import { useCharacterStore } from "src/stores/character_store";
import { useDataStore } from "src/stores/data-store";
import { defineComponent } from "vue";

const dataStore = useDataStore();

export default defineComponent({
  name: "LevelUpSection",
  props: {
    reqLevel: {
      type: Number,
      required: true,
    },
  },

  computed: {
    ...mapState(useCharacterStore, ["class", "level"]),

    show(): boolean {
      return this.level >= this.reqLevel;
    },

    classData() {
      if (this.class in dataStore.classes) {
        return dataStore.getClassByName(this.class);
      }
      return null;
    },
  },
});
</script>
