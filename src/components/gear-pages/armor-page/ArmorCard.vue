<template>
  <q-card class="column q-px-md q-my-md" bordered flat>
    <q-card-section class="row justify-between text-center">
      <linkable-item class="col" :name="armorName" />
      <div class="col">{{ armor.armor.amount }}d{{ armor.armor.type }}</div>
      <div class="col">{{ armor.bulk === 0.1 ? "L" : armor.bulk }}</div>
      <div class="col">
        {{
          armor.properties.length > 0
            ? armor.properties.map((p) => p.unslugify().capitalize()).join(", ")
            : "-"
        }}
      </div>
      <linkable-item class="col" :name="armor.special" />
      <linkable-item class="col" :name="armor.mastery" />
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import LinkableItem from "src/components/common/LinkableItem.vue";
import { defineComponent } from "vue";
import { useDataStore } from "src/stores/data-store";

const dataStore = useDataStore();

export default defineComponent({
  name: "ArmorCard",

  components: { LinkableItem },

  props: {
    armorName: {
      type: String,
      required: true,
    },
  },

  computed: {
    armor() {
      const armor = dataStore.getArmorByName(this.armorName);
      if (!armor) throw new Error(`Armor ${this.armorName} not found in data store`);
      return armor;
    },
  },
});
</script>
