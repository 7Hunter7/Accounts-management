<template>
  <v-container>
    <h1>Управление учетными записями</h1>
    <v-container>
      <span>Добавить учетную запись </span>
      <v-btn color="primary" @click="addAccount">
        <v-icon icon="mdi-plus"></v-icon>
      </v-btn>
    </v-container>

    <!-- Общий заголовок -->
    <v-container cols="12">
      <v-row class="account-header">
        <v-col cols="3">Метки</v-col>
        <v-col cols="3">Тип записи</v-col>
        <v-col cols="3">Логин</v-col>
        <v-col cols="2">Пароль</v-col>
        <v-col cols="1"></v-col>
      </v-row>
    </v-container>

    <v-row v-if="accounts.length > 0">
      <v-col cols="12" v-for="account in accounts" :key="account.id">
        <AccountItem
          :account="account"
          @update="updateAccount(account)"
          @delete="deleteAccount(account.id)"
        />
      </v-col>
    </v-row>

    <v-row v-else>
      <v-container>
        <v-col>
          <h2>Здесь пока нет учетных записей</h2>
        </v-col>
      </v-container>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import AccountItem from "@/components/AccountItem.vue";
import { useAppStore } from "@/stores/app";
import type { Account } from "@/types/account";

const store = useAppStore();

const accounts = computed(() => store.getAccounts);

onMounted(() => {
  console.log("Accounts from store:", accounts.value);
});

const addAccount = () => {
  const newId = crypto.randomUUID(); //  Генерация уникальных идентификаторов
  const newAccount = {
    id: newId,
    label: [{ text: "" }],
    recordType: "Локальная",
    login: "",
    password: "",
  };
  store.addAccount(newAccount);
};

const updateAccount = (account: Account) => {
  console.log("AccountForm received update:", account);
  store.updateAccount(account);
};

const deleteAccount = (id: string) => {
  store.deleteAccount(id);
};
</script>

<style scoped>
.account-header {
  font-weight: bold;
  margin-bottom: 10px;
}
</style>
