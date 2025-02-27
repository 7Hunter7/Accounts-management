<template>
  <v-container>
    <h1>Управление учетными записями</h1>
    <span>Добавить учетную запись </span>
    <v-btn color="primary" @click="addAccount">
      <v-icon icon="mdi-plus"></v-icon>
    </v-btn>
    <v-row v-if="accounts.length > 0">
      <v-col cols="12" md="6" v-for="account in accounts" :key="account.id">
        <AccountItem
          :account="account"
          @update="updateAccount(account.id, $event)"
          @delete="deleteAccount(account.id)"
        />
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col> Нет учетных записей. </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AccountItem from "./AccountItem.vue";

interface Account {
  id: number;
  label: string;
  recordType: string;
  login: string;
  password?: string;
}

const accounts = ref<Account[]>([
  {
    id: 1,
    label: "XXX",
    recordType: "Локальная",
    login: "Значение1",
    password: "Pyfxtybt",
  },
  {
    id: 2,
    label: "YYY",
    recordType: "Локальная",
    login: "Значение2",
    password: "Pyfxtybtyna",
  },
  {
    id: 3,
    label: "XXX; YYY",
    recordType: "Локальная",
    login: "Значение3",
    password: "Pyfxtybtyna823",
  },
  {
    id: 4,
    label: "MMM",
    recordType: "LDAP",
    login: "",
    password: "",
  },
  { id: 5, label: "VVV", recordType: "LDAP", login: "", password: "" },
]);

const addAccount = () => {
  const newId = crypto.randomUUID(); // Создание уникального идентификатора
  accounts.value.push({
    id: newId,
    label: "",
    recordType: "Локальная",
    login: "",
    password: "",
  });
};

const updateAccount = (id: number, updatedAccount: Account) => {
  accounts.value[id] = updatedAccount;
};

const deleteAccount = (id: number) => {
  accounts.value.splice(id, 1);
};
</script>
