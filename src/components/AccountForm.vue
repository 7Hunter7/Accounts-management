<template>
  <v-container>
    <h1>Управление учетными записями</h1>
    <span>Добавить учетную запись </span>
    <v-btn color="primary" @click="addAccount">
      <v-icon icon="mdi-plus"></v-icon>
    </v-btn>
    <AccountItem />
  </v-container>
</template>

<script setup lang="ts">
import AccountItem from "./AccountItem.vue";
</script>
