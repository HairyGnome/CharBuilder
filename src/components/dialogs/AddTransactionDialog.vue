<template>
  <q-dialog :model-value="modelValue" @hide="cancelTransaction">
    <q-card style="min-width: 400px">
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
      <q-card-actions align="right">
        <q-btn label="Add Transaction" color="primary" @click="addTransaction" />
        <q-btn label="Cancel" color="primary" @click="$emit('update:modelValue', false)" />
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
      gold: characterStore.money.gold,
      silver: characterStore.money.silver,
      copper: characterStore.money.copper,
    };
  },

  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
  },

  methods: {
    addTransaction() {
      const transaction: Transaction = {
        label: this.transactionLabel,
        timestamp: new Date(),
        goldChange: this.gold - characterStore.money.gold,
        silverChange: this.silver - characterStore.money.silver,
        copperChange: this.copper - characterStore.money.copper,
      };

      characterStore.addTransaction(transaction);
      this.$emit('update:modelValue', false);
    },

    cancelTransaction() {
      this.gold = characterStore.money.gold;
      this.silver = characterStore.money.silver;
      this.copper = characterStore.money.copper;
      this.$emit('update:modelValue', false);
    },
  },
});
</script>
