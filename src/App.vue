<template>
  <router-view />
  <ability-score-improvement-dialog />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AbilityScoreImprovementDialog from "./components/dialogs/AbilityScoreImprovementDialog.vue";

export default defineComponent({
  name: "App",

  components: { AbilityScoreImprovementDialog },
});
</script>
