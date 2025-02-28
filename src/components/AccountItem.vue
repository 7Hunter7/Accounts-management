<template>
  <v-card class="account-item">
    <v-card-text>
      <v-row>
        <v-col col="3">
          <v-text-field
            label="Метка"
            v-model="localLabel"
            :rules="labelRules"
            @blur="() => onBlur('label')"
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
            @blur="() => onBlur('login')"
            :error="loginError"
          ></v-text-field>
        </v-col>

        <v-col col="2">
          <v-text-field
            v-if="localAccount.recordType === 'Локальная'"
            label="Пароль"
            v-model="localAccount.password"
            :rules="passwordRules"
            @blur="() => onBlur('password')"
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
import {
  formatLabel,
  labelRules,
  loginRules,
  passwordRules,
  validateField,
} from "@/utils/accountUtils";

interface AccountProps {
  account: Account;
}

const props = defineProps<AccountProps>();

const emit = defineEmits<{
  (e: "update", account: Account): void;
  (e: "delete"): void;
}>();

const localAccount = ref<Account>({ ...props.account });
const localLabel = ref<string>(formatLabel(props.account.label));
const recordTypes = ref(["LDAP", "Локальная"]);
const showPassword = ref(false);

// ref для отслеживания ошибок валидации
const loginError = ref(false);
const passwordError = ref(false);
const labelError = ref(false);

const onRecordTypeChange = () => {
  if (localAccount.value.recordType === "LDAP") {
    localAccount.value.password = null; // Устанавливаем пароль на null
  }
  onUpdate();
};

const onBlur = (fieldName: "login" | "password" | "label") => {
  validateField(
    fieldName,
    localAccount.value,
    localLabel.value,
    loginError,
    passwordError,
    labelError
  );
  onUpdate();
};

const onUpdate = () => {
  // Отправляем `localAccount` и `localLabel` как отдельные параметры
  emit("update", {
    ...localAccount.value,
    labelString: localLabel.value, // Передаем localLabel как строку
  });
};

watch(
  () => props.account,
  (newAccount) => {
    // Обновляем localAccount напрямую, чтобы сохранить реактивность
    localAccount.value.login = newAccount.login;
    localAccount.value.password = newAccount.password;
    localAccount.value.recordType = newAccount.recordType;
    localLabel.value = formatLabel(newAccount.label);
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
