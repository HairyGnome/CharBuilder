<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <!-- <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" /> -->

        <q-toolbar-title> {{ productName }} </q-toolbar-title>

        <div class="q-mr-md">v{{ version }}</div>
        <!-- <q-btn
          flat
          dense
          round
          aria-label="Roll"
          size="lg"
          class="d20-btn"
          @click="toggleRightDrawer"
        >
          <template v-slot:default>
            <q-img src="@/assets/icons/D20.svg" />
          </template>
        </q-btn> -->
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered>
      <q-list>
        <q-item-label header> Menu </q-item-label>
        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-drawer v-model="rightDrawerOpen" bordered side="right">
      <dice-roller />
    </q-drawer>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import EssentialLink, { type EssentialLinkProps } from 'components/EssentialLink.vue';

import { productName, version } from '../../package.json';
import DiceRoller from 'src/components/DiceRoller.vue';

const linksList: EssentialLinkProps[] = [
  // {
  //   title: 'Docs',
  //   caption: 'quasar.dev',
  //   icon: 'school',
  //   link: 'https://quasar.dev',
  // },
];

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
    DiceRoller,
  },

  data() {
    return {
      linksList,
      leftDrawerOpen: false,
      rightDrawerOpen: false,
      productName,
      version,
    };
  },

  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },

    toggleRightDrawer() {
      this.rightDrawerOpen = !this.rightDrawerOpen;
    },
  },
});
</script>

<style lang="scss" scoped>
/* Define the roll animation */
@keyframes roll-d20 {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(180deg) scale(1.1);
  }
  50% {
    transform: rotate(360deg) scale(1);
  }
  75% {
    transform: rotate(540deg) scale(1.1);
  }
  100% {
    transform: rotate(720deg) scale(1);
  }
}

/* Style the button */
.d20-btn {
  transition: transform 0.3s ease;
}

/* Trigger the roll animation on hover */
.d20-btn:hover {
  animation: roll-d20 1s ease-in-out;
}
</style>
