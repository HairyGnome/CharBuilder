<template>
  <q-page>
    <div class="row items-stretch justify-evenly q-pt-xl" style="height: 90vh">
      <q-card class="q-pa-sm q-ml-lg">
        <q-scroll-area style="height: 100%; width: 300px">
          <class-select-card />
        </q-scroll-area>
      </q-card>
      <div class="column col q-px-xl">
        <div class="row items-center q-gutter-x-lg">
          <level-card />
          <ability-score-card class="col" />
          <hp-card />
        </div>
        <gear-card class="q-mt-lg col-grow" />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import AbilityScoreCard from 'src/components/AbilityScoreCard.vue';
import GearCard from 'src/components/GearCard.vue';
import HpCard from 'src/components/HpCard.vue';
import LevelCard from 'src/components/LevelCard.vue';
import ClassSelectCard from 'src/components/class-cards/ClassSelectCard.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IndexPage',

  components: { AbilityScoreCard, HpCard, GearCard, LevelCard, ClassSelectCard },
});
</script>
