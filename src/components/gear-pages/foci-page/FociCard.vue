<template>
  <q-card class="column q-px-md q-my-md" bordered flat>
    <q-card-section class="row justify-between text-center items-center">
      <linkable-item class="col" :name="focus" />
      <div class="col">{{ focusData.mastery }}</div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import LinkableItem from "src/components/common/LinkableItem.vue";
import { defineComponent } from "vue";
import { useDataStore } from "src/stores/data-store";

const dataStore = useDataStore();

export default defineComponent({
  name: "FociCard",

  components: { LinkableItem },

  props: {
    focus: {
      type: String,
      required: true,
    },
  },

  computed: {
    focusData() {
      const focusData = dataStore.getFociByName(this.focus);
      console.log(focusData);
      if (!focusData) throw new Error(`Foci ${this.focus} not found in data store`);
      return focusData;
    },
  },
});
</script>
