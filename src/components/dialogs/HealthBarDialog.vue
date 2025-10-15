<template>
  <q-dialog>
    <q-card style="max-width: 800px; min-width: 765px">
      <q-card-section class="text-h5">
        Adjust health
        <q-separator />
      </q-card-section>
      <q-card-section class="row justify-evenly">
        <q-input v-model="displayHealth" label="Health" type="number" outlined />
        <q-input v-model="displayTempHp" label="Temporary health" type="number" outlined />
      </q-card-section>
      <q-card-section class="q-mx-xl q-px-xl">
        <q-slider v-model="displayAdjustment" :min="-range" :max="range" label />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="Adjust" @click="adjustHealth" />
        <q-btn label="Cancel" @click="cancelAdjustment" />
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
      tempHp: characterStore.hp.tempHp,
      health: characterStore.hp.currentHp,
      range: characterStore.hp.maxHp * 3,
    };
  },

  computed: {
    displayHealth: {
      get(): number {
        return this.health;
      },
      set(value: string) {
        this.health = Number(value);
        this.adjustment =
          this.health + this.tempHp - (characterStore.hp.currentHp + characterStore.hp.tempHp);
      },
    },

    displayTempHp: {
      get(): number {
        return this.tempHp;
      },
      set(value: string) {
        this.tempHp = Number(value);
        this.adjustment =
          this.health + this.tempHp - (characterStore.hp.currentHp + characterStore.hp.tempHp);
      },
    },

    displayAdjustment: {
      get(): number {
        return this.adjustment;
      },
      set(value: string) {
        this.adjustment = Number(value);
        if (this.adjustment <= 0) {
          // this took me 2 weeks btw
          this.tempHp = Math.max(0, characterStore.hp.tempHp + this.adjustment);
          const leftover = Math.min(0, characterStore.hp.tempHp + this.adjustment);
          this.health = Math.max(0, characterStore.hp.currentHp + leftover);
        } else {
          // this too lol
          this.health = Math.min(
            characterStore.hp.maxHp,
            characterStore.hp.currentHp + this.adjustment,
          );
        }
      },
    },
  },

  methods: {
    adjustHealth() {
      characterStore.setTempHp(Number(this.tempHp));
      characterStore.adjustHealth(this.adjustment);
      this.adjustment = 0;
      this.health = characterStore.hp.currentHp;
      this.tempHp = characterStore.hp.tempHp;
      this.$emit('update:modelValue', false);
    },

    cancelAdjustment() {
      this.adjustment = 0;
      this.health = characterStore.hp.currentHp;
      this.tempHp = characterStore.hp.tempHp;
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
