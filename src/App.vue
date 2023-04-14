<script setup>
// This starter template is using Vue 3 <script setup> SFCs

import { ref } from 'vue';
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
const menus = ref([
        {
          title: 'Item #1',
          value: 1,
        },
        {
          title: 'Item #2',
          value: 2,
        },
        {
          title: 'Item #3',
          value: 3,
        },
      ])

// example for vue3 data

</script>

<template>
  <v-card>
    <v-layout>
      <v-app-bar title="Application bar"></v-app-bar>

      <v-navigation-drawer>
        <v-list :items="menus"></v-list>
      </v-navigation-drawer>

      <v-main style="min-height: 300px;"></v-main>
    </v-layout>
  </v-card>
</template>