<template>
  <q-dialog>
    <q-card style="max-width: 800px; min-width: 765px">
      <q-card-section class="text-h5">
        Adjust health
        <q-separator />
      </q-card-section>
      <q-card-section class="row justify-between">
        <q-input v-model="targetHealth" label="Terget health" type="number" />
        <q-input v-model="tempHp" label="Temporary health" type="number">
          <q-tooltip>Not implemented, doesn't do anything</q-tooltip>
        </q-input>
      </q-card-section>
      <q-card-section class="q-mx-sm">
        <q-slider v-model="adjustment" :min="-range" :max="range" label />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="Adjust" @click="adjustHealth" />
        <q-btn label="Cancel" @click="$emit('update:modelValue', false)" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { useCharacterStore } from 'src/stores/character_store';
import { defineComponent } from 'vue';

const characterStore = useCharacterStore();

export default defineComponent({
  name: 'HealthBarDialog',

  data() {
    return {
      adjustment: 0,
      tempHp: 0,
      range: characterStore.hp.maxHp,
    };
  },

  computed: {
    targetHealth: {
      get() {
        return characterStore.hp.currentHp + this.adjustment;
      },
      set(value: number) {
        this.adjustment = value - characterStore.hp.currentHp;
      },
    },
  },

  methods: {
    adjustHealth() {
      characterStore.adjustHealth(this.adjustment);
      this.adjustment = 0;
      this.$emit('update:modelValue', false);
    },
  },
});
</script>

<style scoped>
.q-slider__selection {
  left: 50%;
}
</style>
