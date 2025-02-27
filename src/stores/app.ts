import { defineStore } from "pinia";
import type { Account } from "@/types/account";

export const useAppStore = defineStore("app", {
  state: () => ({
    accounts: [
      // Массив начальных аккаунтов
      {
        id: crypto.randomUUID(), //  Генерации уникальных идентификаторов
        label: "XXX",
        recordType: "Локальная",
        login: "Значение_1",
        password: "pyfxtybt",
      },
      {
        id: crypto.randomUUID(),
        label: "YYY",
        recordType: "Локальная",
        login: "Значение_2",
        password: "pyfXtyBtyna",
      },
      {
        id: crypto.randomUUID(),
        label: "AAA",
        recordType: "Локальная",
        login: "Значение_3",
        password: "Pyfxtybtyna823",
      },
      {
        id: crypto.randomUUID(),
        label: "MMM",
        recordType: "LDAP",
        login: "",
        password: "",
      },
      {
        id: crypto.randomUUID(),
        label: "VVV",
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
    addAccount(account: Account) {
      this.accounts.push(account);
    },
    updateAccount(account: Account) {
      const index = this.accounts.findIndex((a) => a.id === account.id);
      if (index !== -1) {
        this.accounts[index] = account;
      }
    },
    deleteAccount(id: string) {
      this.accounts = this.accounts.filter((account) => account.id !== id);
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "account_management_accounts",
        storage: localStorage,
      },
    ],
  },
});
