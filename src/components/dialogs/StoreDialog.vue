<template>
  <q-dialog :model-value="storeDialogShow" persistent>
    <q-card style="min-width: 1600px; height: 80vh" class="column justify-end">
      <q-card-section class="q-py-none">
        <div class="text-h4 q-ml-sm">Store</div>
        <q-separator />
      </q-card-section>

      <q-card-section class="q-py-none">
        <q-tabs v-model="tabName">
          <q-tab name="weapons" label="Weapons" icon="mdi-sword" class="col" />
          <q-tab name="armor" label="Armor" icon="mdi-shield" class="col" />
          <q-tab name="items" label="Items" icon="mdi-sack" class="col" />
          <q-tab name="potions" label="Potions" icon="mdi-flask" class="col" />
          <!-- <q-tab name="misc" label="Miscellaneous" icon="mdi-diamond-stone" class="col" /> -->
        </q-tabs>

        <q-tab-panels v-model="tabName" animated class="q-mb-none">
          <q-tab-panel name="weapons" class="q-py-none">
            <weapon-store-tab />
          </q-tab-panel>
          <q-tab-panel name="armor">
            <div class="text-h6 q-pa-md">Armor Store Coming Soon!</div>
          </q-tab-panel>
          <q-tab-panel name="items">
            <div class="text-h6 q-pa-md">Item Store Coming Soon!</div>
          </q-tab-panel>
          <q-tab-panel name="potions">
            <div class="text-h6 q-pa-md">Potion Store Coming Soon!</div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>

      <q-card-actions
        align="right"
        class="row items-center q-py-sm"
        style="border-top: 1px gray solid; height: 64px"
      >
        <q-btn label="Close" color="primary" @click="closeDialog" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { mapWritableState } from 'pinia';
import { useUiStore } from 'src/stores/ui-store';
import { defineComponent } from 'vue';
import WeaponStoreTab from '../store-tabs/WeaponStoreTab.vue';

export default defineComponent({
  name: 'StoreDialog',

  components: { WeaponStoreTab },

  data() {
    return {
      tabName: 'weapons',
    };
  },

  computed: {
    ...mapWritableState(useUiStore, ['storeDialogShow']),
  },

  methods: {
    closeDialog() {
      this.storeDialogShow = false;
    },
  },
});
</script>
