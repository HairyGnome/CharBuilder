<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
  <div>
    <a v-if="hyperlink" :href="hyperlink" target="blank">
      {{ label }}
      <q-tooltip
        v-if="tooltipEl"
        v-html="tooltipEl"
        class="q-ma-none q-px-sm bg-dark text-h6"
        style="border: 1px solid white"
      />
    </a>
    <div v-else>{{ label }}</div>
  </div>
</template>

<script lang="ts">
import RemotePartialLoader from 'src/modules/RemotePartialLoader';
import { useDataStore } from 'src/stores/data-store';
import { defineComponent } from 'vue';

const dataStore = useDataStore();

export default defineComponent({
  name: 'LinkableItem',

  data() {
    return {
      tooltipEl: undefined as string | undefined,
    };
  },

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

  mounted() {
    const loader = new RemotePartialLoader(this.hyperlink || '', 'article');
    loader
      .getPartialHtml()
      .then((el) => {
        this.tooltipEl = el;
      })
      .catch((err) => {
        console.warn('Failed to load partial:', err);
      });
  },
});
</script>
