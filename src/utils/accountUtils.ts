export const formatLabel = (label: any): string => {
  if (Array.isArray(label)) {
    return label.map((item: any) => item.text).join(";");
  }
  return label || "";
};

// Правила валидации:
export const labelRules = ref([
  (v: any) => {
    if (v) {
      return v.length <= 50 || "Метка должна быть не больше 50 символов";
    }
    return true; // Не проверяем, если пусто.
  },
]);
export const loginRules = ref([
  (v: any) => !!v || "Логин обязателен для заполнения",
  (v: any) => {
    if (v) {
      return v.length <= 100 || "Логин должен быть не больше 100 символов";
    }
    return true;
  },
]);
export const passwordRules = ref([
  (v: any) => !!v || "Пароль обязателен для заполнения",
  (v: any) => {
    if (v) {
      return v.length <= 100 || "Пароль должен быть не больше 100 символов";
    }
    return true;
  },
]);

// Функция валидации:
export const validateField = (
  fieldName: "login" | "password" | "label",
  localAccount: any,
  localLabel: any,
  loginError: any,
  passwordError: any,
  labelError: any
) => {
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
