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
      <v-col> Нет учетных записей. </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import AccountItem from "./AccountItem.vue";
import { useAppStore } from "@/stores/app";

const store = useAppStore();

interface Account {
  id: string;
  label: string;
  recordType: string;
  login: string;
  password?: string;
}

const accounts = ref<Account[]>([]);

onMounted(() => {
  accounts.value = store.accounts;
});

const addAccount = () => {
  const newId = crypto.randomUUID();
  accounts.value.push({
    id: newId,
    label: "",
    recordType: "Локальная",
    login: "",
    password: "",
  });
  store.addAccount({
    id: newId,
    label: "",
    recordType: "Локальная",
    login: "",
    password: "",
  });
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
