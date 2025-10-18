<template>
  <q-dialog :model-value="show" @hide="cancelTransaction">
    <q-card style="min-width: 600px; min-height: 500px">
      <q-card-section>
        <q-input
          v-model="transactionLabel"
          label="Transaction Label"
          type="text"
          outlined
          class="q-mt-md q-mx-md"
        />

        <q-input v-model.number="gold" label="Gold" type="number" outlined class="q-mt-md q-mx-md">
          <template v-slot:prepend>
            <q-icon name="currency_exchange" style="color: #d4af37" />
          </template>
        </q-input>
        <q-input
          v-model.number="silver"
          label="Silver"
          type="number"
          outlined
          class="q-mt-md q-mx-md"
        >
          <template v-slot:prepend>
            <q-icon name="currency_exchange" style="color: #c0c0c0" />
          </template>
        </q-input>
        <q-input
          v-model.number="copper"
          label="Copper"
          type="number"
          outlined
          class="q-mt-md q-mx-md q-mb-md"
        >
          <template v-slot:prepend>
            <q-icon name="currency_exchange" style="color: #cd7f32" />
          </template>
        </q-input>
      </q-card-section>
      <q-card-section v-if="showError" class="text-negative text-h5 q-mx-md">
        You do not have enough funds to complete this transaction.
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="Add Transaction" color="primary" @click="addTransaction" />
        <q-btn label="Cancel" color="primary" @click="cancelTransaction" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import type { Transaction } from 'src/models/types';
import { useCharacterStore } from 'src/stores/character_store';
import { defineComponent } from 'vue';

const characterStore = useCharacterStore();

export default defineComponent({
  name: 'AddTransactionDialog',

  data() {
    return {
      transactionLabel: 'Unlabeled Transaction',
      gold: 0,
      silver: 0,
      copper: 0,
      showError: false,
    };
  },

  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },

  methods: {
    addTransaction() {
      const transaction: Transaction = {
        label: this.transactionLabel,
        timestamp: new Date(),
        goldChange: this.gold,
        silverChange: this.silver,
        copperChange: this.copper,
      };

      const transactionSuccessful = characterStore.addTransaction(transaction);
      if (transactionSuccessful) {
        this.transactionLabel = 'Unlabeled Transaction';
        this.gold = 0;
        this.silver = 0;
        this.copper = 0;
        this.showError = false;
        this.$emit('update:show', false);
      } else {
        this.showError = true;
      }
    },

    cancelTransaction() {
      this.transactionLabel = 'Unlabeled Transaction';
      this.gold = 0;
      this.silver = 0;
      this.copper = 0;
      this.showError = false;
      this.$emit('update:show', false);
    },
  },
});
</script>
