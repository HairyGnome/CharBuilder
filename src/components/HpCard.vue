<template>
  <q-card class="row q-gutter-x-lg items-center q-pr-lg q-py-sm col">
    <div class="column">
      <div>DV</div>
      <div>{{ dodgeValue }}</div>
    </div>
    <div class="row cursor-pointer col" @click="showHealthDialog = true">
      <q-linear-progress
        :value="hpRatio"
        track-color="primary"
        class="col"
        style="height: 15px"
        @click="showHealthDialog = true"
      >
        <div
          class="absolute-full flex flex-center text-white text-caption"
          style="line-height: 15px"
        >
          {{ currentHp }} / {{ maxHp }}
        </div>
      </q-linear-progress>
      <q-linear-progress
        v-if="tempHp > 0"
        :model-value="1"
        track-color="green-14"
        class="col-3"
        style="height: 15px"
      >
        <div
          class="absolute-full flex flex-center text-white text-caption"
          style="line-height: 15px"
        >
          +{{ tempHp }}
        </div>
      </q-linear-progress>
    </div>
    <health-bar-dialog v-model="showHealthDialog" />
  </q-card>
</template>

<script lang="ts">
import { useCharacterStore } from 'src/stores/character_store';
import { defineComponent } from 'vue';
import HealthBarDialog from './dialogs/HealthBarDialog.vue';

const characterStore = useCharacterStore();

export default defineComponent({
  name: 'HpCard',

  components: { HealthBarDialog },

  data() {
    return {
      showHealthDialog: false,
    };
  },

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

    tempHp(): number {
      return characterStore.hp.tempHp;
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
