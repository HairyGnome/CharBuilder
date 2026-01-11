<template>
  <q-dialog v-model="featSelectDialogShow">
    <q-card style="min-width: 1600px">
      <q-card-section class="text-h5"> Select a Feat </q-card-section>
      <q-separator class="q-mx-sm" />
      <q-card-section class="q-pl-none">
        <q-splitter v-model="splitterRatio" disable>
          <template #before>
            <q-input
              v-model="searchTerm"
              dense
              debounce="300"
              placeholder="Search Feats..."
              outlined
              class="q-mx-sm q-mb-md"
            />
            <q-scroll-area style="height: 60vh" class="q-mx-sm">
              <q-btn
                v-for="(feat, idx) in featList"
                :key="idx"
                class="full-width q-mb-sm"
                :label="feat"
                flat
                unelevated
                @click="onClickFeat(feat)"
              />
            </q-scroll-area>
          </template>
          <template #after>
            <q-card flat bordered class="q-mx-sm" style="height: 60vh">
              <q-card-section>
                <div v-if="selectedFeat === null" class="text-h6">
                  Select a feat to see its details here.
                </div>
                <div v-else class="column q-gutter-y-md">
                  <div class="text-h3">{{ selectedFeat.name }}</div>
                  <div v-if="selectedFeat.prerequisite !== undefined" class="text-h5">
                    Prerequisite: {{ selectedFeat.prerequisite }}
                  </div>
                  <div class="text-h5">{{ selectedFeat.description }}</div>
                </div>
              </q-card-section>
            </q-card>
            <q-card-actions align="right" class="q-mt-sm">
              <q-btn label="Cancel" color="primary" @click="closeDialog" />
              <q-btn
                label="Select Feat"
                color="primary"
                :disabled="selectedFeat === null"
                @click="selectFeat"
              />
            </q-card-actions>
          </template>
        </q-splitter>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { mapWritableState } from "pinia";
import type { Feat } from "src/models/types";
import { useCharacterStore } from "src/stores/character_store";
import { useDataStore } from "src/stores/data-store";
import { useUiStore } from "src/stores/ui-store";
import { defineComponent } from "vue";

export default defineComponent({
  name: "FeatSelectDialog",

  data() {
    return {
      splitterRatio: 25,
      searchTerm: "",
      selectedFeat: null as Feat | null,
    };
  },

  computed: {
    ...mapWritableState(useUiStore, ["featSelectDialogShow"]),

    featList(): string[] {
      const dataStore = useDataStore();
      return dataStore.feats
        .map((feat) => feat.name)
        .filter((feat) => feat.toLowerCase().includes(this.searchTerm.trim().toLowerCase()));
    },
  },

  methods: {
    closeDialog() {
      this.featSelectDialogShow = false;
    },

    onClickFeat(featName: string) {
      const dataStore = useDataStore();
      this.selectedFeat = dataStore.feats.find((feat) => feat.name === featName) || null;
    },

    selectFeat() {
      if (this.selectedFeat !== null) {
        const characterStore = useCharacterStore();
        characterStore.selectedFeats.lv4 = this.selectedFeat.name.toLowerCase().slugify();
        this.closeDialog();
      }
    },
  },
});
</script>
