<template>
  <v-container>
    <h1>Управление учетными записями</h1>
    <span>Добавить учетную запись </span>
    <v-btn color="primary" @click="addAccount">
      <v-icon icon="mdi-plus"></v-icon>
    </v-btn>

    <v-row v-if="accounts.length > 0">
      <v-col
        cols="12"
        md="6"
        v-for="(account, index) in accounts"
        :key="account.id"
      >
        <AccountItem
          :account="account"
          @update="updateAccount(index, $event)"
          @delete="deleteAccount(index)"
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
import { ref, onMounted } from "vue";
import AccountItem from "@/components/AccountItem.vue";
import { useAppStore } from "@/stores/app";
import type { Account } from "@/types/account";

const store = useAppStore();

const accounts = ref<Account[]>([]);

onMounted(() => {
  accounts.value = store.getAccounts;
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
  accounts.value.push(newAccount);
  store.addAccount(newAccount);
};

const updateAccount = (index: number, updatedAccount: Account) => {
  accounts.value[index] = updatedAccount;
  store.updateAccount(updatedAccount);
};

const deleteAccount = (index: number) => {
  const idToDelete = accounts.value[index].id;
  accounts.value.splice(index, 1);
  store.deleteAccount(idToDelete);
};
</script>
