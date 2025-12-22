<template>
  <q-dialog :model-value="storeDialogShow" persistent>
    <q-card style="min-width: 1600px; height: 80vh" class="column justify-end">
      <q-card-section class="q-py-none">
        <div class="text-h4 q-ml-sm">Store</div>
        <q-separator />
      </q-card-section>

      <q-card-section class="q-py-none">
        <q-tabs v-model="tabName" style="border-bottom: 1px solid gray">
          <q-tab name="weapons" label="Weapons" icon="mdi-sword" class="col" />
          <q-tab name="armor" label="Armor" icon="mdi-shield" class="col" />
          <q-tab name="tools" label="Tools" icon="mdi-hammer-wrench" class="col" />
          <q-tab name="foci" label="Spell Foci" icon="mdi-diamond-stone" class="col" />
          <!-- <q-tab name="potions" label="Potions" icon="mdi-flask" class="col" /> -->
        </q-tabs>

        <q-tab-panels v-model="tabName" class="q-mb-none">
          <q-tab-panel name="weapons" class="q-py-none q-pl-none">
            <base-store-tab :items="weapons" />
          </q-tab-panel>
          <q-tab-panel name="armor" class="q-py-none q-pl-none">
            <base-store-tab :items="armors" />
          </q-tab-panel>
          <q-tab-panel name="tools" class="q-py-none q-pl-none">
            <base-store-tab :items="tools" />
          </q-tab-panel>
          <q-tab-panel name="foci" class="q-py-none q-pl-none">
            <base-store-tab :items="foci" />
          </q-tab-panel>
          <!-- <q-tab-panel name="potions">
            <div class="text-h6 q-pa-md">Potion Store Coming Soon!</div>
          </q-tab-panel> -->
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
import { mapState, mapWritableState } from 'pinia';
import { useUiStore } from 'src/stores/ui-store';
import { defineComponent } from 'vue';
import BaseStoreTab from '../store-tabs/BaseStoreTab.vue';
import { useDataStore } from 'src/stores/data-store';

export default defineComponent({
  name: 'StoreDialog',

  components: { BaseStoreTab },

  data() {
    return {
      tabName: 'weapons',
    };
  },

  computed: {
    ...mapWritableState(useUiStore, ['storeDialogShow']),
    ...mapState(useDataStore, ['weapons', 'armors', 'tools', 'foci']),
  },

  methods: {
    closeDialog() {
      this.storeDialogShow = false;
    },
  },
});
</script>
