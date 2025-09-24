<template>
  <q-dialog>
    <q-card style="max-width: 800px; min-width: 765px">
      <q-card-section class="text-h5">
        <div>Select Ability Score Array</div>
        <q-separator />
      </q-card-section>
      <q-card-section class="q-ml-lg q-mr-lg">
        <div class="row justify-start">
          <q-select
            v-model="selectedAbilityScoreArray"
            :options="abilityScoreArrays"
            label="Select Array"
            outlined
            dense
            class="col-4"
          />
        </div>
        <div class="row justify-evenly q-mt-xl">
          <table class="q-table q-mx-auto" style="width: 100%">
            <thead>
              <tr>
                <th
                  v-for="(name, idx) in ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA']"
                  :key="idx"
                  class="text-center col"
                >
                  {{ name }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  colspan="1"
                  class="text-center col"
                  v-for="(score, idx) in actualAbilityScoreArray"
                  :key="idx"
                  style="width: 1%"
                >
                  <div class="row justify-center items-center q-col-gutter-x-md">
                    <q-icon
                      :name="idx > 0 ? 'chevron_left' : ''"
                      @click="moveToLeft(idx)"
                      class="col"
                      size="md"
                    />
                    <q-input
                      :model-value="score"
                      outlined
                      readonly
                      input-class="text-center"
                      class="col-8"
                    />
                    <q-icon
                      :name="idx < actualAbilityScoreArray.length - 1 ? 'chevron_right' : ''"
                      @click="moveToRight(idx)"
                      class="col"
                      size="md"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="Save" color="primary" @click="saveAbilityScoreArray" />
        <q-btn label="Cancel" color="primary" @click="$emit('update:modelValue', false)" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import type { AbilityScores } from 'src/models/types';
import { useCharacterStore } from 'src/stores/character_store';
import { defineComponent } from 'vue';

const characterStore = useCharacterStore();

export default defineComponent({
  name: 'AbilityScoreArrayDialog',

  props: {},

  data() {
    return {
      selectedAbilityScoreArray: 'Specialist',
      abilityScoreArrays: ['Specialist', 'Balanced', 'Generalist'],
      abilityScoreArray: {
        specialist: [16, 12, 12, 10, 10, 8],
        balanced: [14, 14, 12, 12, 10, 10],
        generalist: [14, 12, 12, 12, 12, 12],
      },
    };
  },

  computed: {
    actualAbilityScoreArray(): number[] {
      let array: number[] = [];
      switch (this.selectedAbilityScoreArray) {
        case 'Specialist':
          array = this.abilityScoreArray.specialist;
          break;
        case 'Balanced':
          array = this.abilityScoreArray.balanced;
          break;
        case 'Generalist':
          array = this.abilityScoreArray.generalist;
          break;
        default:
          break;
      }
      return array;
    },
  },

  methods: {
    moveToRight(idx: number) {
      if (
        idx < this.actualAbilityScoreArray.length - 1 &&
        typeof this.actualAbilityScoreArray[idx] === 'number' &&
        typeof this.actualAbilityScoreArray[idx + 1] === 'number'
      ) {
        [this.actualAbilityScoreArray[idx], this.actualAbilityScoreArray[idx + 1]] = [
          this.actualAbilityScoreArray[idx + 1] as number,
          this.actualAbilityScoreArray[idx],
        ];
      }
    },

    moveToLeft(idx: number) {
      if (
        idx > 0 &&
        typeof this.actualAbilityScoreArray[idx] === 'number' &&
        typeof this.actualAbilityScoreArray[idx - 1] === 'number'
      ) {
        [this.actualAbilityScoreArray[idx], this.actualAbilityScoreArray[idx - 1]] = [
          this.actualAbilityScoreArray[idx - 1] as number,
          this.actualAbilityScoreArray[idx],
        ];
      }
    },

    setDefaultValues() {
      this.selectedAbilityScoreArray = characterStore.selectedAbilityScoreArray
        .unslugify()
        .capitalize();
      const arrayKey =
        this.selectedAbilityScoreArray.toLowerCase() as keyof typeof this.abilityScoreArray;
      if (this.abilityScoreArray[arrayKey]) {
        this.abilityScoreArray[arrayKey] = [
          characterStore.baseAbilityScores.str,
          characterStore.baseAbilityScores.dex,
          characterStore.baseAbilityScores.con,
          characterStore.baseAbilityScores.int,
          characterStore.baseAbilityScores.wis,
          characterStore.baseAbilityScores.cha,
        ];
      }
    },

    saveAbilityScoreArray() {
      characterStore.setAbilityScores({
        str: this.actualAbilityScoreArray[0] || 0,
        dex: this.actualAbilityScoreArray[1] || 0,
        con: this.actualAbilityScoreArray[2] || 0,
        int: this.actualAbilityScoreArray[3] || 0,
        wis: this.actualAbilityScoreArray[4] || 0,
        cha: this.actualAbilityScoreArray[5] || 0,
      } as AbilityScores);
      characterStore.selectedAbilityScoreArray = this.selectedAbilityScoreArray.toLowerCase();
      this.$emit('update:modelValue', false);
    },
  },
});
</script>
