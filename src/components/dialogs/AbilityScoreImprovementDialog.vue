<template>
  <q-dialog v-model="abilityScoreImprovementDialogShow" @dismiss="closeDialog">
    <q-card style="min-width: 1000px">
      <q-card-section class="text-h5"> Ability Score Improvement </q-card-section>
      <q-separator class="q-mx-md" />
      <q-card-section class="row text-h5 justify-end q-mr-md">
        Points to allocate: {{ improvementLeft }}
      </q-card-section>
      <q-card-section>
        <table class="q-table q-mx-auto" style="width: 100%">
          <thead>
            <tr>
              <th v-for="(name, idx) in abilityScoreKeys" :key="idx" class="text-center col">
                {{ name.toUpperCase() }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                colspan="1"
                class="text-center col"
                v-for="(key, idx) in abilityScoreKeys"
                :key="idx"
                style="width: 1%"
              >
                <div class="row justify-center items-center q-col-gutter-x-md">
                  <q-icon
                    name="mdi-minus"
                    @click="decreaseScore(key as keyof AbilityScores)"
                    class="col"
                    size="md"
                  />
                  <q-input
                    :model-value="abilityScoreValues[key as keyof AbilityScores]"
                    outlined
                    readonly
                    input-class="text-center"
                    class="col-5"
                  />
                  <q-icon
                    name="mdi-plus"
                    @click="increaseScore(key as keyof AbilityScores)"
                    class="col"
                    size="md"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </q-card-section>
      <q-card-actions align="right" class="q-mb-sm q-mr-sm">
        <q-btn label="Save" color="primary" @click="saveImprovements" />
        <q-btn label="Close" color="primary" @click="closeDialog" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { mapActions, mapState, mapWritableState } from "pinia";
import type { AbilityScores } from "src/models/types";
import { useCharacterStore } from "src/stores/character_store";
import { useUiStore } from "src/stores/ui-store";
import { defineComponent } from "vue";

export default defineComponent({
  name: "AbilityScoreImprovementDialog",

  data() {
    const characterStore = useCharacterStore();
    return {
      allocatedImprovement: {
        str: characterStore.abilityScores.lv4Improvement.str,
        dex: characterStore.abilityScores.lv4Improvement.dex,
        con: characterStore.abilityScores.lv4Improvement.con,
        int: characterStore.abilityScores.lv4Improvement.int,
        wis: characterStore.abilityScores.lv4Improvement.wis,
        cha: characterStore.abilityScores.lv4Improvement.cha,
      } as AbilityScores,
      improvementLeft:
        4 -
        (characterStore.abilityScores.lv4Improvement.str +
          characterStore.abilityScores.lv4Improvement.dex +
          characterStore.abilityScores.lv4Improvement.con +
          characterStore.abilityScores.lv4Improvement.int +
          characterStore.abilityScores.lv4Improvement.wis +
          characterStore.abilityScores.lv4Improvement.cha),
    };
  },

  computed: {
    ...mapWritableState(useUiStore, ["abilityScoreImprovementDialogShow"]),
    ...mapState(useCharacterStore, ["abilityScores"]),

    abilityScoreKeys() {
      return Object.keys(this.abilityScores.baseScores);
    },

    abilityScoreValues() {
      const baseScores = this.abilityScores.baseScores;
      return {
        str: baseScores.str + this.allocatedImprovement.str,
        dex: baseScores.dex + this.allocatedImprovement.dex,
        con: baseScores.con + this.allocatedImprovement.con,
        int: baseScores.int + this.allocatedImprovement.int,
        wis: baseScores.wis + this.allocatedImprovement.wis,
        cha: baseScores.cha + this.allocatedImprovement.cha,
      };
    },
  },

  methods: {
    ...mapActions(useCharacterStore, ["setLv4Improvement"]),

    saveImprovements() {
      this.setLv4Improvement({
        str: this.allocatedImprovement.str,
        dex: this.allocatedImprovement.dex,
        con: this.allocatedImprovement.con,
        int: this.allocatedImprovement.int,
        wis: this.allocatedImprovement.wis,
        cha: this.allocatedImprovement.cha,
      });
      this.closeDialog();
    },

    closeDialog() {
      this.abilityScoreImprovementDialogShow = false;
    },

    increaseScore(scoreKey: keyof AbilityScores) {
      if (this.improvementLeft > 0 && this.abilityScoreValues[scoreKey] < 20) {
        this.allocatedImprovement[scoreKey]++;
        this.improvementLeft--;
      }
    },

    decreaseScore(scoreKey: keyof AbilityScores) {
      if (this.allocatedImprovement[scoreKey] > 0) {
        this.allocatedImprovement[scoreKey]--;
        this.improvementLeft++;
      }
    },
  },
});
</script>
