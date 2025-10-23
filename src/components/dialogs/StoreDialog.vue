<template>
  <q-dialog :model-value="storeDialogShow" persistent>
    <q-card style="min-width: 1600px; height: 600px">
      <q-card-section>
        <div class="text-h4">Store</div>
      </q-card-section>

      <q-separator inset />
      <q-card-section>
        <q-tabs>
          <q-tab name="weapons" label="Weapons" icon="mdi-sword" class="col" />
          <q-tab name="armor" label="Armor" icon="mdi-shield" class="col" />
          <q-tab name="items" label="Items" icon="mdi-bag-personal" class="col" />
          <q-tab name="potions" label="Potions" icon="mdi-flask" class="col" />
          <q-tab name="misc" label="Miscellaneous" icon="mdi-diamond-stone" class="col" />
        </q-tabs>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="Close" color="primary" @click="closeDialog" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { mapWritableState } from 'pinia';
import { useUiStore } from 'src/stores/ui-store';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'StoreDialog',

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
