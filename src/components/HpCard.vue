<template>
  <q-card class="row q-gutter-x-lg items-center q-pr-lg q-py-sm col">
    <div class="column">
      <div>DC</div>
      <div>14</div>
    </div>
    <q-linear-progress :value="hpRatio" color="primary" class="col" style="height: 15px">
      <div class="absolute-full flex flex-center text-white text-caption" style="line-height: 15px">
        {{ currentHp }} / {{ maxHp }}
      </div>
    </q-linear-progress>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HpCard',

  data() {
    return {
      maxHp: 22,
      currentHp: 14,
    };
  },

  computed: {
    hpRatio(): number {
      console.log('ratio: ', this.currentHp / this.maxHp);
      return this.currentHp / this.maxHp;
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
