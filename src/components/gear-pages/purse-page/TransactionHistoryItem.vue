<template>
  <div class="row items-center q-mx-md">
    <span class="text-subtitle1 col-3 text-left">{{
      new Date(transaction.timestamp).toLocaleString()
    }}</span>
    <span class="text-h6 col-4"> {{ transaction.label }} </span>
    <span class="col text-h6">
      <q-icon name="currency_exchange" style="color: #d4af37" class="q-mr-sm" />
      <span class="text-right" style="display: inline-block; min-width: 60px">
        {{ transaction.goldChange }}
      </span>
    </span>
    <span class="text-h6 col">
      <q-icon name="currency_exchange" style="color: #c0c0c0" class="q-mr-sm" />
      <span class="text-right col" style="display: inline-block; min-width: 60px">
        {{ transaction.silverChange }}
      </span>
    </span>
    <span class="text-h6 col">
      <q-icon name="currency_exchange" style="color: #cd7f32" class="q-mr-sm" />
      <span class="text-right col" style="display: inline-block; min-width: 60px">
        {{ transaction.copperChange }}
      </span>
    </span>
  </div>
</template>

<script lang="ts">
import type { Transaction } from 'src/models/types';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TransactionHistoryItem',

  props: {
    transaction: {
      type: Object as () => Transaction,
      required: true,
    },
  },
});
</script>
