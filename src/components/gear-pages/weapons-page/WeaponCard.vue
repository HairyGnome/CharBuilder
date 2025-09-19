<template>
  <q-card class="column q-px-md q-my-md" bordered flat>
    <q-card-section class="row justify-between text-center">
      <div class="col">{{ weapon.name.toUpperCase() }}</div>
      <div class="col">
        {{ weapon.damage.amount.amount }}d{{ weapon.damage.amount.type }}
        {{ weapon.damage.type.toUpperCase() }}
      </div>
      <div class="col">BULK: {{ weapon.bulk }}</div>
      <div class="col">
        {{
          weapon.properties.length > 0
            ? weapon.properties.map((p) => p.toUpperCase()).join(', ')
            : '-'
        }}
      </div>
      <div class="col">HEFT: {{ weapon.heft }}</div>
      <div class="col">{{ weapon.special }}</div>
      <div class="col">{{ weapon.mastery }}</div>
    </q-card-section>
    <q-card-section class="row"></q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { Weapon } from 'src/models/weapon_types';

export default defineComponent({
  name: 'WeaponCard',

  props: {
    weapon: {
      type: Object as () => Weapon,
      required: true,
    },
  },
});
</script>
