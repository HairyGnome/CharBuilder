<template>
  <q-card class="row q-gutter-x-lg q-pr-lg q-py-sm justify-evenly col-auto">
    <div class="column items-center col">
      <div>SIZE</div>
      <div>{{ size }}</div>
    </div>
    <div class="column items-center col">
      <div>SPEED</div>
      <div>{{ speed }}</div>
    </div>
    <div class="column items-center col-auto">
      <div>STR</div>
      <div>{{ strModifier }}</div>
    </div>
    <div class="column items-center col-auto">
      <div>DEX</div>
      <div>{{ dexModifier }}</div>
    </div>
    <div class="column items-center col-auto">
      <div>CON</div>
      <div>{{ conModifier }}</div>
    </div>
    <div class="column items-center col-auto">
      <div>INT</div>
      <div>{{ intModifier }}</div>
    </div>
    <div class="column items-center col-auto">
      <div>WIS</div>
      <div>{{ wisModifier }}</div>
    </div>
    <div class="column items-center col-auto">
      <div>CHA</div>
      <div>{{ chaModifier }}</div>
    </div>
  </q-card>
</template>

<script lang="ts">
import { useCharacterStore } from 'src/stores/character_store';
import { defineComponent } from 'vue';

const characterStore = useCharacterStore();

export default defineComponent({
  name: 'AbilityScoreCard',

  computed: {
    speed(): string {
      return `${characterStore.speed} ft.`;
    },
    size(): string {
      return characterStore.size.toUpperCase();
    },
    strModifier(): string {
      const modifier = characterStore.getAbilityScoreModifier('str');
      const sign = modifier >= 0 ? '+' : '';
      return `${sign}${modifier}`;
    },
    dexModifier(): string {
      const modifier = characterStore.getAbilityScoreModifier('dex');
      const sign = modifier >= 0 ? '+' : '';
      return `${sign}${modifier}`;
    },
    conModifier(): string {
      const modifier = characterStore.getAbilityScoreModifier('con');
      const sign = modifier >= 0 ? '+' : '';
      return `${sign}${modifier}`;
    },
    intModifier(): string {
      const modifier = characterStore.getAbilityScoreModifier('int');
      const sign = modifier >= 0 ? '+' : '';
      return `${sign}${modifier}`;
    },
    wisModifier(): string {
      const modifier = characterStore.getAbilityScoreModifier('wis');
      const sign = modifier >= 0 ? '+' : '';
      return `${sign}${modifier}`;
    },
    chaModifier(): string {
      const modifier = characterStore.getAbilityScoreModifier('cha');
      const sign = modifier >= 0 ? '+' : '';
      return `${sign}${modifier}`;
    },
  },
});
</script>
