<template>
  <q-dialog v-model="manageSpellsDialogShow">
    <q-card flat bordered style="min-width: 800px; max-width: 800px">
      <q-card-section class="text-h3">Manage Spells</q-card-section>
      <q-card-section class="row justify-center">
        <q-card-section class="col-6">
          <div class="text-h6">Unknown Spells</div>
          <q-card
            flat
            bordered
            class="q-pa-sm"
            @dragenter.prevent="onDragEnter(unknownSpells)"
            @dragover.prevent
            @drop.prevent="onDrop"
          >
            <q-scroll-area>
              <div class="column q-gutter-y-md list-inner">
                <q-card
                  v-for="(spell, idx) in unknownSpells"
                  :key="idx"
                  flat
                  bordered
                  class="cursor-pointer"
                  draggable="true"
                  @dragstart="onDragStart(spell)"
                >
                  <q-card-section>{{ spell.unslugify().capitalize() }}</q-card-section>
                </q-card>
              </div>
            </q-scroll-area>
          </q-card>
        </q-card-section>
        <q-card-section class="col-6">
          <div class="text-h6">Known Spells</div>
          <q-card
            flat
            bordered
            class="q-pa-sm"
            @dragenter.prevent="onDragEnter(spells)"
            @dragover.prevent
            @drop.prevent="onDrop"
          >
            <q-scroll-area>
              <div class="column q-gutter-y-md list-inner">
                <q-card
                  v-for="(spell, idx) in spells"
                  :key="idx"
                  flat
                  bordered
                  class="cursor-pointer"
                  draggable="true"
                  @dragstart="onDragStart(spell)"
                >
                  <q-card-section>{{ spell.unslugify().capitalize() }}</q-card-section>
                </q-card>
              </div>
            </q-scroll-area>
          </q-card>
        </q-card-section>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="Close" color="primary" @click="manageSpellsDialogShow = false" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { mapWritableState } from "pinia";
import { useCharacterStore } from "src/stores/character_store";
import { useDataStore } from "src/stores/data-store";
import { useUiStore } from "src/stores/ui-store";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ManageSpellsDialog",

  data() {
    return {
      draggedElement: null as string | null,
      currentDragZone: null as string[] | null,
    };
  },

  computed: {
    ...mapWritableState(useUiStore, ["manageSpellsDialogShow"]),
    ...mapWritableState(useCharacterStore, ["spells"]),

    unknownSpells(): string[] {
      const dataStore = useDataStore();
      return dataStore.spells
        .map((spell) => spell.name)
        .filter((name) => !this.spells.includes(name));
    },
  },

  methods: {
    onDragStart(spell: string) {
      console.log("Started dragging element: ", spell);
      this.draggedElement = spell;
    },

    onDragEnter(list: string[]) {
      this.currentDragZone = list;
    },

    onDrop() {
      if (this.currentDragZone && this.draggedElement) {
        if (!this.currentDragZone.includes(this.draggedElement)) {
          if (this.currentDragZone === this.spells) {
            this.spells = [...this.spells, this.draggedElement];
          } else {
            this.spells = this.spells.filter((spell) => spell !== this.draggedElement);
          }
        }
      }
      this.draggedElement = null;
      this.currentDragZone = null;
    },
  },
});
</script>

<style scoped>
.q-scrollarea {
  min-width: 300px;
  min-height: 600px;
  height: 600px;
}
.list-inner {
  padding: 8px 0;
}
</style>
