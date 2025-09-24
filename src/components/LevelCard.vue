<template>
  <q-card class="row q-py-sm q-pr-md">
    <q-input label="Character Name" v-model="characterName" dense class="col q-ml-md" />
    <q-input label="Level" v-model="level" dense type="number" class="col-3 q-ml-md" />
    <q-btn label="Level up!" dense @click="incrementLevel" class="col-auto q-ml-md" />
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
        characterStore.setLevel(value);
      },
    },
  },

  methods: {
    incrementLevel() {
      characterStore.incrementLevel();
    },
  },
});
</script>
