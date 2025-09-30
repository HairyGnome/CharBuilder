<template>
  <div class="text-h6">
    <a v-if="hyperlink" :href="hyperlink" target="blank"> {{ label }}</a>
    <div v-else>{{ label }}</div>
  </div>
</template>

<script lang="ts">
import { useDataStore } from 'src/stores/data-store';
import { defineComponent } from 'vue';

const dataStore = useDataStore();

export default defineComponent({
  name: 'LinkableItem',

  props: {
    name: {
      type: String,
      required: true,
    },
  },

  computed: {
    label() {
      return this.name.unslugify().capitalize();
    },

    hyperlink() {
      return dataStore.getHyperlink(this.name);
    },
  },
});
</script>
