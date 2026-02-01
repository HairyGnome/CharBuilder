<template>
  <q-card class="column q-px-md q-my-md" bordered flat>
    <q-card-section class="row justify-between text-center items-center">
      <linkable-item class="col" :name="armorName" />
      <div class="col">{{ armor.armor }}</div>
      <div class="col">{{ armor.bulk === 0.1 ? "L" : armor.bulk }}</div>
      <div class="col">
        {{
          armor.properties.length > 0
            ? armor.properties.map((p) => p.unslugify().capitalize()).join(", ")
            : "-"
        }}
      </div>
      <div class="col">{{ armor.vigor ?? "-" }}</div>
      <div class="col">{{ armor.clumsy ?? "-" }}</div>
      <linkable-item class="col" :name="armor.special" />
      <linkable-item class="col" :name="armor.mastery" />
      <div class="col">
        <q-icon
          v-if="isEquipped"
          class="cursor-pointer"
          name="mdi-shield-remove-outline"
          size="sm"
          title="Equipped"
          @click="unequip"
        />
        <q-icon
          v-else
          class="cursor-pointer"
          name="mdi-shield-plus"
          title="Equip"
          size="sm"
          @click="equip"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import LinkableItem from "src/components/common/LinkableItem.vue";
import { defineComponent } from "vue";
import { useDataStore } from "src/stores/data-store";
import { useCharacterStore } from "src/stores/character_store";
import { ArmorCategory } from "src/models/items/armor_types";

const characterStore = useCharacterStore();
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

    isEquipped(): boolean {
      return (
        characterStore.defense.equippedArmor === this.armorName ||
        characterStore.defense.equippedShield === this.armorName
      );
    },
  },

  methods: {
    equip() {
      if (this.armor.category === ArmorCategory.SHIELD) {
        characterStore.defense.equippedShield = this.armorName;
      } else {
        characterStore.defense.equippedArmor = this.armorName;
      }
    },

    unequip() {
      if (this.armor.category === ArmorCategory.SHIELD) {
        characterStore.defense.equippedShield = null;
      } else {
        characterStore.defense.equippedArmor = null;
      }
    },
  },
});
</script>
