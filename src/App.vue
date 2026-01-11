<template>
  <router-view />
  <ability-score-improvement-dialog />
  <feat-select-dialog />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AbilityScoreImprovementDialog from "./components/dialogs/AbilityScoreImprovementDialog.vue";
import FeatSelectDialog from "./components/dialogs/FeatSelectDialog.vue";

export default defineComponent({
  name: "App",

  components: { AbilityScoreImprovementDialog, FeatSelectDialog },
});
</script>
