<template>
  <v-card class="account-item">
    <v-card-text>
      <v-row>
        <v-col col="3">
          <v-text-field
            label="Метка"
            v-model="localLabel"
            :rules="labelRules"
            @blur="onLabelBlur"
            :error="labelError"
            hint="Метки вводятся через знак ';'"
          ></v-text-field>
        </v-col>

        <v-col col="3">
          <v-select
            label="Тип записи"
            :items="recordTypes"
            v-model="localAccount.recordType"
            @change="onRecordTypeChange"
          ></v-select>
        </v-col>

        <v-col col="3">
          <v-text-field
            label="Логин"
            v-model="localAccount.login"
            :rules="loginRules"
            @blur="onLoginBlur"
            :error="loginError"
          ></v-text-field>
        </v-col>

        <v-col col="2">
          <v-text-field
            v-if="localAccount.recordType === 'Локальная'"
            label="Пароль"
            v-model="localAccount.password"
            :rules="passwordRules"
            @blur="onPasswordBlur"
            :error="passwordError"
            :type="showPassword ? 'text' : 'password'"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
          ></v-text-field>
        </v-col>

        <v-card-actions justify="end" row="1">
          <v-btn color="error" @click="onDelete">
            <v-icon icon="mdi-delete"></v-icon>
          </v-btn>
        </v-card-actions>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import type { Account } from "@/types/account";

interface AccountProps {
  account: Account;
}

const props = defineProps<AccountProps>();

const emit = defineEmits<{
  (e: "update", account: Account): void;
  (e: "delete"): void;
}>();

const localAccount = ref<Account>({ ...props.account });

// Преобразуеm массив объектов { text: string } в массив строк (извлекая значения text):
const localLabel = ref<string>(
  Array.isArray(props.account.label)
    ? props.account.label.map((item) => item.text).join(";")
    : ""
);
const recordTypes = ref(["LDAP", "Локальная"]);
const showPassword = ref(false);

// ref для отслеживания ошибок валидации
const loginError = ref(false);
const passwordError = ref(false);
const labelError = ref(false);

// Правила валидации:
const labelRules = ref([
  (v: any) => {
    if (v) {
      return v.length <= 50 || "Метка должна быть не больше 50 символов";
    }
    return true; // Не проверяем, если пусто.
  },
]);
const loginRules = ref([
  (v: any) => !!v || "Логин обязателен для заполнения",
  (v: any) => {
    if (v) {
      return v.length <= 100 || "Логин должен быть не больше 100 символов";
    }
    return true;
  },
]);
const passwordRules = ref([
  (v: any) => !!v || "Пароль обязателен для заполнения",
  (v: any) => {
    if (v) {
      return v.length <= 100 || "Пароль должен быть не больше 100 символов";
    }
    return true;
  },
]);

// Функция валидации:
const validateField = (fieldName: "login" | "password" | "label") => {
  switch (fieldName) {
    case "login":
      loginError.value = !loginRules.value.every((rule) => {
        const result =
          typeof rule === "function" ? rule(localAccount.value.login) : true;
        return result === true || result === undefined;
      });
      break;
    case "password":
      passwordError.value = !passwordRules.value.every((rule) => {
        const result =
          typeof rule === "function" ? rule(localAccount.value.password) : true;
        return result === true || result === undefined;
      });
      break;
    case "label":
      labelError.value = !labelRules.value.every((rule) => {
        const result =
          typeof rule === "function" ? rule(localLabel.value) : true;
        return result === true || result === undefined;
      });
      break;
  }
};

const onRecordTypeChange = () => {
  if (localAccount.value.recordType === "LDAP") {
    localAccount.value.password = null; // Устанавливаем пароль на null
  }
  onUpdate();
};

const onLabelBlur = () => {
  validateField("label");
  onUpdate();
};

const onLoginBlur = () => {
  validateField("login");
  onUpdate();
};

const onPasswordBlur = () => {
  validateField("password");
  onUpdate();
};

// Преобразование метки в массив объектов:
const onUpdate = () => {
  const updatedAccount = {
    ...localAccount.value,
    label: localLabel.value
      .split(";") // Разделим строку "Метки" на подстроку по символу “;”.
      .map((label) => ({ text: label.trim() })), // Преобразуем в массив объектов
  };
  console.log("AccountItem emitting update:", localAccount.value);
  emit("update", updatedAccount);
};

watch(
  () => props.account,
  (newAccount) => {
    localAccount.value = { ...newAccount };
    localLabel.value = newAccount.label
      ? Array.isArray(newAccount.label)
        ? newAccount.label.map((item) => item.text).join(";")
        : newAccount.label
      : "";
  },
  { immediate: true }
);

const onDelete = () => {
  emit("delete");
};
</script>

<style scoped>
.account-item {
  width: 100%;
  margin-bottom: 10px;
  border: 1px solid #ccc;
}
</style>
