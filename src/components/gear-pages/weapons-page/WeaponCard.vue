<template>
  <q-card class="column q-px-md q-my-md" bordered flat>
    <q-card-section class="row justify-between text-center">
      <linkable-item class="col" :name="weaponName" />
      <div class="col">
        {{ weapon.damage.amount.amount }}d{{ weapon.damage.amount.type }}
        {{ weapon.damage.type.capitalize() }}
      </div>
      <div class="col">Bulk: {{ weapon.bulk }}</div>
      <div class="col">
        {{
          weapon.properties.length > 0
            ? weapon.properties.map((p) => p.unslugify().capitalize()).join(', ')
            : '-'
        }}
      </div>
      <div class="col">Heft: {{ weapon.heft }}</div>
      <linkable-item class="col" :name="weapon.special" />
      <linkable-item class="col" :name="weapon.mastery" />
    </q-card-section>
    <q-card-section class="row justify-between text-center">
      <div class="col">
        <q-btn
          flat
          dense
          round
          aria-label="Roll"
          size="lg"
          icon="mdi-dice-d20-outline"
          @click="rollAttack"
        />
      </div>
      <div class="col">
        <q-btn
          flat
          dense
          round
          aria-label="Roll"
          size="lg"
          icon="mdi-sword-cross"
          @click="rollDamage"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { WeaponData } from 'src/models/weapon_types';
import { useDataStore } from 'src/stores/data-store';
import LinkableItem from 'src/components/common/LinkableItem.vue';
import { mapActions } from 'pinia';
import { useDiceRollStore } from 'src/stores/dice-roll-store';

const dataStore = useDataStore();

export default defineComponent({
  name: 'WeaponCard',

  components: { LinkableItem },

  props: {
    weaponName: {
      type: String,
      required: true,
    },
  },

  computed: {
    attackRollParams() {
      // TODO: implement attack roll params
      return {
        amount: 2,
        dice: 20,
        modifier: 3,
      };
    },

    damageRollParams() {
      // TODO: implement damage modifier
      return {
        amount: this.weapon.damage.amount.amount,
        dice: this.weapon.damage.amount.type,
        modifier: 0,
      };
    },

    weapon(): WeaponData {
      const name = this.weaponName as keyof typeof dataStore.weapons;
      const weapon: WeaponData | undefined = dataStore.weapons[name];
      if (!weapon) {
        throw new Error('Error: weapon not found');
      }
      return weapon;
    },
  },

  methods: {
    ...mapActions(useDiceRollStore, ['sendParamsAndOpen']),

    rollAttack() {
      this.sendParamsAndOpen(this.attackRollParams);
    },
    rollDamage() {
      this.sendParamsAndOpen(this.damageRollParams);
    },
  },
});
</script>
