<template>
  <q-dialog :model-value="show" @hide="$emit('update:show', false)">
    <q-card style="min-width: 1200px">
      <q-card-section>
        <div class="text-h6">Transaction History</div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-card flat bordered>
          <q-scroll-area v-if="transactionHistory.length > 0" style="width: 100%; height: 400px">
            <div v-for="(transaction, idx) in transactionHistory" :key="idx">
              <transaction-history-item :transaction="transaction" />
              <q-separator v-if="idx < transactionHistory.length - 1" />
            </div>
          </q-scroll-area>
          <q-card-section v-else class="text-subtitle1">No transactions recorded...</q-card-section>
        </q-card>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TransactionHistoryItem from '../gear-pages/purse-page/TransactionHistoryItem.vue';
import { useCharacterStore } from 'src/stores/character_store';
import { mapState } from 'pinia';

export default defineComponent({
  name: 'TransactionHistoryDialog',

  components: { TransactionHistoryItem },

  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
    ...mapState(useCharacterStore, {
      transactionHistory: (state) => state.money.transactionHistory,
    }),
  },
});
</script>
