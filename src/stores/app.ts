import { defineStore } from "pinia";

interface Account {
  id: string;
  label: string;
  recordType: string;
  login: string;
  password?: string;
}

export const useAppStore = defineStore("app", {
  state: () => ({
    accounts: [] as Account[],
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
