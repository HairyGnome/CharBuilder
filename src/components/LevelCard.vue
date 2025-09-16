<template>
  <q-card class="row q-py-sm q-col-gutter-x-md q-pr-md">
    <q-input label="Character Name" v-model="characterName" dense class="col" />
    <q-input label="Level" v-model="level" dense class="col-3" />
    <q-input label="XP" v-model="xp" dense class="col-3" />
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LevelCard',

  data() {
    return {
      characterName: 'Unknown Adventurer',
      level: 1,
      xp: 0,
    };
  },
});
</script>
