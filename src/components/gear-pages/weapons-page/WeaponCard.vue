<template>
  <q-card class="column q-px-md q-my-md" bordered flat>
    <q-card-section class="row justify-between text-center">
      <div class="col">{{ weaponName.toUpperCase() }}</div>
      <div class="col">
        {{ weapon.damage.amount.amount }}d{{ weapon.damage.amount.type }}
        {{ weapon.damage.type.toUpperCase() }}
      </div>
      <div class="col">BULK: {{ weapon.bulk }}</div>
      <div class="col">
        {{
          weapon.properties.length > 0
            ? weapon.properties.map((p) => p.unslugify().capitalize()).join(', ')
            : '-'
        }}
      </div>
      <div class="col">HEFT: {{ weapon.heft }}</div>
      <div class="col">{{ weapon.special.unslugify().capitalize() }}</div>
      <div class="col">{{ weapon.mastery.unslugify().capitalize() }}</div>
    </q-card-section>
    <q-card-section class="row"></q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { WeaponData } from 'src/models/weapon_types';
import { useDataStore } from 'src/stores/data-store';

const dataStore = useDataStore();

export default defineComponent({
  name: 'WeaponCard',

  props: {
    weaponName: {
      type: String,
      required: true,
    },
  },

  computed: {
    weapon(): WeaponData {
      const name = this.weaponName as keyof typeof dataStore.weapons;
      const weapon: WeaponData | undefined = dataStore.weapons[name];
      if (!weapon) {
        throw new Error('Error: weapon not found');
      }
      return weapon;
    },
  },
});
</script>
