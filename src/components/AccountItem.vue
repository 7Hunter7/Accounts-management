<template>
  <v-card>
    <v-card-text>
      <v-text-field
        label="Метка"
        v-model="label"
        :rules="labelRules"
      ></v-text-field>

      <v-select
        label="Тип записи"
        :items="recordTypes"
        v-model="recordType"
        @change="onRecordTypeChange"
      ></v-select>

      <v-text-field
        label="Логин"
        v-model="login"
        :rules="loginRules"
      ></v-text-field>

      <v-text-field
        v-if="recordType === 'Локальная'"
        label="Пароль"
        v-model="password"
        :rules="passwordRules"
      ></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-btn color="error" @click="onDelete">
        <v-icon icon="mdi-delete"></v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const label = ref("");
const recordType = ref("Локальная");
const login = ref("");
const password = ref("");

const recordTypes = ref(["LDAP", "Локальная"]);

const labelRules = ref([
  (v: any) =>
    !v ||
    (v.length <= 50 && "Метка вводятся через знак ';'") ||
    "Метка должна быть не больше 50 символов",
]);
const loginRules = ref([
  (v: any) => !!v || "Логин обязателен для заполнения",
  (v: any) => v.length <= 100 || "Логин должен быть не больше 100 символов",
]);
const passwordRules = ref([
  (v: any) => !!v || "Пароль обязателен для заполнения",
  (v: any) => v.length <= 100 || "Пароль должен быть не больше 100 символов",
]);

const onRecordTypeChange = () => {
  if (recordType.value === "LDAP") {
    password.value = ""; // Сброс пароля при выборе LDAP
  }
};

const onDelete = () => {
  // Логика удаления
  console.log("Delete clicked");
};
</script>
