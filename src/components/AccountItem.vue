<template>
  <v-container>
    <v-row>
      <v-card>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="3">
              <v-text-field
                label="Метка"
                v-model="localLabel"
                :rules="labelRules"
                @blur="onLabelBlur"
                :error="labelError"
                hint="Метки вводятся через знак ';'"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="3">
              <v-select
                label="Тип записи"
                :items="recordTypes"
                v-model="localAccount.recordType"
                @change="onRecordTypeChange"
              ></v-select>
            </v-col>

            <v-col cols="12" md="3">
              <v-text-field
                label="Логин"
                v-model="localAccount.login"
                :rules="loginRules"
                @blur="onLoginBlur"
                :error="loginError"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="3">
              <v-text-field
                v-if="localAccount.recordType === 'Локальная'"
                label="Пароль"
                v-model="localAccount.password"
                :rules="passwordRules"
                @blur="onPasswordBlur"
                :error="passwordError"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions justify="end">
          <v-btn color="error" @click="onDelete">
            <v-icon icon="mdi-delete"></v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";

interface Account {
  id: string;
  label: string;
  recordType: string;
  login: string;
  password?: string | null;
}

const props = defineProps<{
  account: Account;
}>();

const emit = defineEmits<{
  (e: "update", account: Account): void;
  (e: "delete"): void;
}>();

const localAccount = ref<Account>({ ...props.account });
const localLabel = ref(props.account.label); // Отдельная ссылка для метки
const recordTypes = ref(["LDAP", "Локальная"]);

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

const onUpdate = () => {
  // Преобразование метки в массив объектов
  localAccount.value.label = localLabel.value;
  emit("update", localAccount.value);
};

const onDelete = () => {
  emit("delete");
};

watch(
  () => props.account,
  (newAccount) => {
    localAccount.value = { ...newAccount };
    localLabel.value = newAccount.label;
    if (newAccount.label) {
      localLabel.value = newAccount.label;
    }
  },
  { immediate: true, deep: true }
);
</script>
