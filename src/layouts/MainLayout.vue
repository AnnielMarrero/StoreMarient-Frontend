<template>
  <q-layout view="lHh Lpr lFf" style="background-color: #f0f2f5">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Tienda
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EssentialLink, { EssentialLinkProps } from 'components/EssentialLink.vue';
import { baseURL } from 'src/boot/axios';

const essentialLinks: EssentialLinkProps[] = [
  {
    title: 'Productos',
    caption: 'productos',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Celulares',
    caption: 'celulares',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Micas',
    caption: 'micas',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Covers',
    caption: 'covers',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Reporte',
    caption: 'reporte',
    icon: 'rss_feed',
    link: `${baseURL}/Pdf/generate`
  }
];

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
