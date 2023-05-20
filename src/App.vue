<script setup>
// This starter template is using Vue 3 <script setup> SFCs

import { ref } from 'vue';
import AppConfig from './app.config';

console.log(AppConfig)

const items = AppConfig.region.map(item => {
  return {
    title: item.name,
    value: item.regionId,
    to: {name: "instance", params: {regionId: item.regionId}}
  }
})

const menus = ref(items)

</script>

<template>
  <v-card>
    <v-layout>
      <v-app-bar title="RocketMQ X"></v-app-bar>

      <v-navigation-drawer>
        <v-list>
          <v-list-item v-for="item in menus" :key="item.value" :to="item.to">
            <v-list-item-content>
              <v-list-title>{{ item.title }}</v-list-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main class="container">
        <router-view :key="$route.path" />
      </v-main>
    </v-layout>
  </v-card>
</template>

<style lang="css" scoped>
  .container {
    height: 100vh;
  }
</style>