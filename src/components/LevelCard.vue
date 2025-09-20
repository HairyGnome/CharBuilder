<template>
  <q-card class="row q-py-sm q-col-gutter-x-md q-pr-md">
    <q-input label="Character Name" v-model="characterName" dense class="col" />
    <q-input label="Level" v-model="level" dense type="number" class="col-3" />
    <q-input label="XP" v-model="xp" dense type="number" class="col-3" />
  </q-card>
</template>

<script lang="ts">
import { useCharacterStore } from 'src/stores/character_store';
import { defineComponent } from 'vue';

const characterStore = useCharacterStore();

export default defineComponent({
  name: 'LevelCard',

  computed: {
    characterName: {
      get(): string {
        return characterStore.name;
      },
      set(value: string) {
        characterStore.name = value;
      },
    },

    level: {
      get(): number {
        return characterStore.level;
      },
      set(value: number) {
        characterStore.level = Number(value);
      },
    },

    xp: {
      get(): number {
        return characterStore.xp;
      },
      set(value: number) {
        characterStore.xp = Number(value);
      },
    },
  },
});
</script>
