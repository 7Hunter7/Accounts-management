import { defineStore } from "pinia";
import type { Account } from "@/types/account";

const STORAGE_KEY = "account_management_accounts";

export const useAppStore = defineStore("app", {
  state: () => ({
    accounts: [
      // Массив начальных аккаунтов
      {
        id: crypto.randomUUID(), //  Генерация уникальных идентификаторов
        label: [{ text: "XXX" }],
        recordType: "Локальная",
        login: "Значение_1",
        password: "pyfxtybt",
      },
      {
        id: crypto.randomUUID(),
        label: [{ text: "XXX" }, { text: "YYY" }],
        recordType: "Локальная",
        login: "Значение_2",
        password: "pyfXtyBtyna",
      },
      {
        id: crypto.randomUUID(),
        label: [{ text: "AAA" }, { text: "VVV" }, { text: "YYY" }],
        recordType: "Локальная",
        login: "Значение_3",
        password: "Pyfxtybtyna823",
      },
      {
        id: crypto.randomUUID(),
        label: [{ text: "MMM" }],
        recordType: "LDAP",
        login: "",
        password: "",
      },
      {
        id: crypto.randomUUID(),
        label: [{ text: "VVV" }],
        recordType: "LDAP",
        login: "",
        password: "",
      },
    ] as Account[],
  }),
  getters: {
    getAccounts: (state) => state.accounts,
  },
  actions: {
    // Функция загрузки данных из localStorage при инициализации стора
    loadAccountsFromLocalStorage() {
      const storedAccounts = localStorage.getItem(STORAGE_KEY);
      if (storedAccounts) {
        try {
          this.accounts = JSON.parse(storedAccounts);
        } catch (error) {
          // Обработка ошибок при парсинге JSON
          console.error("Error parsing accounts from localStorage:", error);
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    },
    // Функция сохранения данных в localStorage после каждого изменения
    saveAccountsToLocalStorage() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.accounts));
    },
    addAccount(account: Account) {
      // Создаем глубокую копию объекта
      this.accounts.push(JSON.parse(JSON.stringify(account)));
      this.saveAccountsToLocalStorage();
    },
    updateAccount(account: Account) {
      console.log("Store updating account:", account);
      const index = this.accounts.findIndex((a) => a.id === account.id);
      if (index !== -1) {
        this.accounts[index] = JSON.parse(JSON.stringify(account));
        this.saveAccountsToLocalStorage();
      }
    },
    deleteAccount(id: string) {
      this.accounts = this.accounts.filter((account) => account.id !== id);
      this.saveAccountsToLocalStorage();
    },
  },
  // persist: {
  //   enabled: true,
  //   strategies: [
  //     {
  //       key: "account_management_accounts",
  //       storage: localStorage,
  //     },
  //   ],
  // },
});
