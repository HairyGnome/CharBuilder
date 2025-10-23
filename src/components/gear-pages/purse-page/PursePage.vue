<template>
  <q-card-section class="row justify-evenly q-col-gutter-xl items-center q-mt-xl q-mb-lg">
    <q-input v-model.number="gold" label="Gold" readonly outlined class="col-3">
      <template v-slot:prepend>
        <q-icon name="monetization_on" style="color: #d4af37" />
      </template>
    </q-input>
    <q-input v-model.number="silver" label="Silver" readonly outlined class="col-3">
      <template v-slot:prepend>
        <q-icon name="monetization_on" style="color: #c0c0c0" />
      </template>
    </q-input>
    <q-input v-model.number="copper" label="Copper" readonly outlined class="col-3">
      <template v-slot:prepend>
        <q-icon name="monetization_on" style="color: #cd7f32" />
      </template>
    </q-input>
  </q-card-section>
  <q-separator class="q-mx-xl" />
  <q-card-actions class="row q-col-gutter-xl q-mt-lg q-mb-xl q-mx-xl">
    <q-btn
      label="Add Transaction"
      color="primary"
      icon="add_shopping_cart"
      @click="openAddTransactionDialog"
      class="col"
    />
    <q-btn
      label="View Transaction History"
      color="primary"
      icon="history"
      @click="openTransactionHistoryDialog"
      class="col"
    />
    <q-btn label="Shop" color="primary" icon="mdi-store" class="col" @click="openStoreDialog" />
  </q-card-actions>
  <add-transaction-dialog v-model:show="showAddTransactionDialog" />
  <transaction-history-dialog v-model:show="showTransactionHistoryDialog" />
  <store-dialog />
</template>

<script lang="ts">
import { mapActions, mapState, mapWritableState } from 'pinia';
import AddTransactionDialog from 'src/components/dialogs/AddTransactionDialog.vue';
import StoreDialog from 'src/components/dialogs/StoreDialog.vue';
import TransactionHistoryDialog from 'src/components/dialogs/TransactionHistoryDialog.vue';
import type { CharacterState } from 'src/models/types';
import { useCharacterStore } from 'src/stores/character_store';
import { useUiStore } from 'src/stores/ui-store';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PursePage',

  components: { AddTransactionDialog, TransactionHistoryDialog, StoreDialog },

  data() {
    return {
      showAddTransactionDialog: false,
      showTransactionHistoryDialog: false,
    };
  },

  computed: {
    ...mapState(useCharacterStore, {
      gold: (state: CharacterState) => state.money.gold,
      silver: (state: CharacterState) => state.money.silver,
      copper: (state: CharacterState) => state.money.copper,
      transactionHistory: (state: CharacterState) => state.money.transactionHistory,
    }),

    ...mapWritableState(useUiStore, ['storeDialogShow']),
  },
  methods: {
    ...mapActions(useCharacterStore, ['simplifyCurrency']),

    openAddTransactionDialog() {
      this.showAddTransactionDialog = true;
    },

    openTransactionHistoryDialog() {
      this.showTransactionHistoryDialog = true;
    },

    openStoreDialog() {
      this.storeDialogShow = true;
    },
  },
});
</script>
