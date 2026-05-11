<template>
  <q-scroll-area class="spell-page">
    <q-card-section>
      <q-card class="q-px-md" flat>
        <q-card-section class="column items-center q-gutter-y-lg text-center text-h5">
          <div class="text-h3">Aether Points</div>
          <q-rating
            v-model="aetherPoints"
            :max="getMaxAetherPoints"
            color="primary"
            size="xl"
            icon="mdi-cards-diamond-outline"
            icon-selected="mdi-cards-diamond"
          />
        </q-card-section>
        <q-card-section v-if="hasCantrips">
          <base-table
            title="Cantrips"
            :columns="columns"
            :data="cantrips"
            :search-filters="searchFilters"
            :select-filters="selectFilters"
          />
        </q-card-section>
        <q-card-section v-if="hasLevel1Spells">
          <q-separator />
          <base-table title="Level 1 Spells" :columns="columns" :data="level1Spells" />
        </q-card-section>
        <q-card-section v-if="hasLevel2Spells">
          <q-separator />
          <base-table title="Level 2 Spells" :columns="columns" :data="level2Spells" />
        </q-card-section>
      </q-card>
      <q-scroll-area class="spell-scroll column">
        <spell-card v-for="(spell, idx) in spells" :key="idx" :spell="spell" />
      </q-scroll-area>
    </q-card-section>
  </q-scroll-area>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useCharacterStore } from "src/stores/character_store";
import { mapState, mapWritableState } from "pinia";
import { useDataStore } from "src/stores/data-store";
import type { SpellData } from "src/models/types";
import BaseTable from "src/components/common/BaseTable.vue";

const dataStore = useDataStore();

const columns = [
  {
    name: "name",
    label: "Name",
    field: (row: SpellData) => row.name.unslugify().capitalize(),
    align: "center" as "center" | "left" | "right",
    sortable: true,
  },
  {
    name: "time",
    label: "Time",
    field: (row: SpellData) => row.time.unslugify().capitalize(),
    align: "center" as "center" | "left" | "right",
    sortable: true,
  },
  {
    name: "ritual",
    label: "Ritual",
    field: (row: SpellData) => (row.ritual ? "Yes" : "No"),
    align: "center" as "center" | "left" | "right",
    sortable: true,
  },
  {
    name: "school",
    label: "School",
    field: (row: SpellData) => row.school.unslugify().capitalize(),
    align: "center" as "center" | "left" | "right",
    sortable: true,
  },
  {
    name: "concentration",
    label: "Concentration",
    field: (row: SpellData) => row.concentration.unslugify().capitalize(),
    align: "center" as "center" | "left" | "right",
    sortable: true,
  },
  {
    name: "range",
    label: "Range",
    field: (row: SpellData) => row.range.unslugify().capitalize(),
    align: "center" as "center" | "left" | "right",
    sortable: true,
  },
];

const searchFilters = ["name"];
const selectFilters = ["time", "ritual", "school", "concentration", "range"];

export default defineComponent({
  name: "SpellPage",

  components: { BaseTable },

  data() {
    return {
      ap: 0,
      columns,
      searchFilters,
      selectFilters,
    };
  },

  computed: {
    ...mapState(useCharacterStore, ["spells", "getMaxAetherPoints"]),
    ...mapWritableState(useCharacterStore, ["aetherPoints"]),

    spellData() {
      return dataStore.getSpellsByNames(this.spells);
    },

    cantrips() {
      return this.spellData.filter((spell) => spell.level === 0);
    },
    level1Spells() {
      return this.spellData.filter((spell) => spell.level === 1);
    },
    level2Spells() {
      return this.spellData.filter((spell) => spell.level === 2);
    },

    hasCantrips() {
      return this.cantrips.length > 0;
    },
    hasLevel1Spells() {
      return this.level1Spells.length > 0;
    },
    hasLevel2Spells() {
      return this.level2Spells.length > 0;
    },
  },
});
</script>

<style scoped>
.spell-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.spell-scroll {
  flex: 1 1 auto;
  min-height: 0;
}
</style>
