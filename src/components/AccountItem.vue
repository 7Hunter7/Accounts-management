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
                @blur="onUpdate"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="3">
              <v-text-field
                v-if="localAccount.recordType === 'Локальная'"
                label="Пароль"
                v-model="localAccount.password"
                :rules="passwordRules"
                @blur="onUpdate"
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
import { ref, watch, onMounted } from "vue";

interface Account {
  id: string;
  label: string;
  recordType: string;
  login: string;
  password?: string;
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
  if (localAccount.value.recordType === "LDAP") {
    localAccount.value.password = null; // Устанавливаем пароль на null
  }
  onUpdate();
};

const onDelete = () => {
  emit("delete");
};

const onLabelBlur = () => {
  onUpdate();
};

const onUpdate = () => {
  // Преобразование строки метки в массив объектов
  localAccount.value.label = localLabel.value;

  emit("update", localAccount.value);
};

watch(
  () => props.account,
  (newAccount) => {
    localAccount.value = { ...newAccount };
    localLabel.value = newAccount.label;
  },
  { immediate: true, deep: true }
);
</script>
