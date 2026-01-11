<template>
  <q-dialog v-model="featSelectDialogShow">
    <q-card-section class="text-h5"> Select a Feat </q-card-section>
    <q-separator />
    <q-card-section></q-card-section>
  </q-dialog>
</template>

<script lang="ts">
import { mapWritableState } from "pinia";
import { useUiStore } from "src/stores/ui-store";
import { defineComponent } from "vue";

export default defineComponent({
  name: "FeatSelectDialog",

  computed: {
    ...mapWritableState(useUiStore, ["featSelectDialogShow"]),
  },

  methods: {
    closeDialog() {
      this.featSelectDialogShow = false;
    },
  },
});
</script>
