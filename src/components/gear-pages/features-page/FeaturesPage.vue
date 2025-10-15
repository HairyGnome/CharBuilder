<template>
  <q-card-section style="height: 100%">
    <q-scroll-area class="column" style="height: 100%">
      <q-card-section>
        <div class="text-h4">Ancestry & lineage features</div>
        <q-separator />
        <div class="column q-mt-sm">
          <linkable-item
            v-for="(feat, idx) in ancestryAndLineageFeatures"
            :key="idx"
            :name="feat"
            class="text-h6"
          />
        </div>
      </q-card-section>
      <q-card-section>
        <div class="text-h4">Role features</div>
        <q-separator />
        <div class="column q-mt-sm">
          <linkable-item
            v-for="(feat, idx) in roleFeatures"
            :key="idx"
            :name="feat"
            class="text-h6"
          />
        </div>
      </q-card-section>
      <q-card-section>
        <div class="text-h4">Class features</div>
        <q-separator />
        <div class="column q-mt-sm">
          <linkable-item v-for="(feat, idx) in []" :key="idx" :name="feat" class="text-h6" />
        </div>
      </q-card-section>
    </q-scroll-area>
  </q-card-section>
</template>

<script lang="ts">
import { useCharacterStore } from 'src/stores/character_store';
import { defineComponent } from 'vue';
import LinkableItem from 'src/components/common/LinkableItem.vue';

const characterStore = useCharacterStore();

export default defineComponent({
  name: 'FeaturesPage',

  components: { LinkableItem },

  computed: {
    ancestryAndLineageFeatures() {
      return characterStore.getAncestryAndLineageFeats;
    },

    roleFeatures() {
      return characterStore.getRoleFeatures;
    },
  },
});
</script>
