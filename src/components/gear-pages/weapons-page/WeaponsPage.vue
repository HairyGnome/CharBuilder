<template>
  <q-card-section style="height: 100%">
    <q-scroll-area class="column" style="height: 100%">
      <weapon-card v-for="(weapon, idx) in weapons" :key="idx" :weapon="weapon" />
    </q-scroll-area>
  </q-card-section>
</template>

<script lang="ts">
import type { Weapon } from 'src/models/weapon_types';
import { DamageTypes } from 'src/models/weapon_types';
import { defineComponent } from 'vue';
import WeaponCard from './WeaponCard.vue';

export default defineComponent({
  name: 'WeaponsPage',

  components: { WeaponCard },

  data() {
    return {
      weapons: [
        {
          name: 'longsword',
          damage: { amount: { amount: 1, type: 8 }, type: DamageTypes.SLASHING },
          bulk: 1,
          properties: [],
          heft: 4,
          special: 'Quick parry',
          mastery: 'Prince slayer',
        },
        {
          name: 'crowssow, heavy',
          damage: { amount: { amount: 1, type: 10 }, type: DamageTypes.PIERCING },
          bulk: 2,
          properties: ['projectile (range 100/400)', 'loading'],
          heft: 4,
          special: 'Braced fire',
          mastery: 'Fast hands',
        },
        {
          name: 'longsword',
          damage: { amount: { amount: 1, type: 8 }, type: DamageTypes.SLASHING },
          bulk: 1,
          properties: [],
          heft: 4,
          special: 'Quick parry',
          mastery: 'Prince slayer',
        },
        {
          name: 'longsword',
          damage: { amount: { amount: 1, type: 8 }, type: DamageTypes.SLASHING },
          bulk: 1,
          properties: [],
          heft: 4,
          special: 'Quick parry',
          mastery: 'Prince slayer',
        },
        {
          name: 'crowssow, heavy',
          damage: { amount: { amount: 1, type: 10 }, type: DamageTypes.PIERCING },
          bulk: 2,
          properties: ['projectile (range 100/400)', 'loading'],
          heft: 4,
          special: 'Braced fire',
          mastery: 'Fast hands',
        },
        {
          name: 'longsword',
          damage: { amount: { amount: 1, type: 8 }, type: DamageTypes.SLASHING },
          bulk: 1,
          properties: [],
          heft: 4,
          special: 'Quick parry',
          mastery: 'Prince slayer',
        },
        {
          name: 'longsword',
          damage: { amount: { amount: 1, type: 8 }, type: DamageTypes.SLASHING },
          bulk: 1,
          properties: [],
          heft: 4,
          special: 'Quick parry',
          mastery: 'Prince slayer',
        },
        {
          name: 'crowssow, heavy',
          damage: { amount: { amount: 1, type: 10 }, type: DamageTypes.PIERCING },
          bulk: 2,
          properties: ['projectile (range 100/400)', 'loading'],
          heft: 4,
          special: 'Braced fire',
          mastery: 'Fast hands',
        },
        {
          name: 'longsword',
          damage: { amount: { amount: 1, type: 8 }, type: DamageTypes.SLASHING },
          bulk: 1,
          properties: [],
          heft: 4,
          special: 'Quick parry',
          mastery: 'Prince slayer',
        },
      ] as Weapon[],
    };
  },
});
</script>
