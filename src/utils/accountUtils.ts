// Функция преобразования label в формат [{ text: string }]
export const formatLabel = (label: any): string => {
  if (Array.isArray(label)) {
    return label.map((item: any) => item.text).join(";");
  }
  return label || "";
};

// Правила валидации
export const labelRules = [
  (v: any) => {
    if (v) {
      return v.length <= 50 || "Метка должна быть не больше 50 символов";
    }
    return true; // Не проверяем, если пусто.
  },
];
export const loginRules = [
  (v: any) => !!v || "Логин обязателен для заполнения",
  (v: any) => {
    if (v) {
      return v.length <= 100 || "Логин должен быть не больше 100 символов";
    }
    return true;
  },
];
export const passwordRules = [
  (v: any) => !!v || "Пароль обязателен для заполнения",
  (v: any) => {
    if (v) {
      return v.length <= 100 || "Пароль должен быть не больше 100 символов";
    }
    return true;
  },
];

// Функция валидации полей
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
      loginError.value = !loginRules.every((rule) => {
        const result =
          typeof rule === "function" ? rule(localAccount.login) : true;
        return result === true || result === undefined;
      });
      break;
    case "password":
      passwordError.value = !passwordRules.every((rule) => {
        const result =
          typeof rule === "function" ? rule(localAccount.password) : true;
        return result === true || result === undefined;
      });
      break;
    case "label":
      labelError.value = !labelRules.every((rule) => {
        const result = typeof rule === "function" ? rule(localLabel) : true;
        return result === true || result === undefined;
      });
      break;
  }
};
