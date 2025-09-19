<template>
  <q-card class="row q-gutter-x-lg items-center q-pr-lg q-py-sm col">
    <div class="column">
      <div>DV</div>
      <div>{{ dodgeValue }}</div>
    </div>
    <q-linear-progress :value="hpRatio" color="primary" class="col" style="height: 15px">
      <div class="absolute-full flex flex-center text-white text-caption" style="line-height: 15px">
        {{ currentHp }} / {{ maxHp }}
      </div>
    </q-linear-progress>
  </q-card>
</template>

<script lang="ts">
import { useCharacterStore } from 'src/stores/character_store';
import { defineComponent } from 'vue';

const characterStore = useCharacterStore();

export default defineComponent({
  name: 'HpCard',

  computed: {
    hpRatio(): number {
      return characterStore.hp.currentHp / characterStore.hp.maxHp;
    },

    currentHp(): number {
      return characterStore.hp.currentHp;
    },

    maxHp(): number {
      return characterStore.hp.maxHp;
    },

    dodgeValue(): number {
      const dexMod = characterStore.getAbilityScoreModifier('dex');
      return 10 + dexMod;
    },
  },
});
</script>

<style lang="scss" scoped>
.hp-bar {
  width: 200px;
  height: 15px;
}
</style>
