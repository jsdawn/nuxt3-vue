import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
  state: () => ({
    requestObj: null,
    token: '',
    user: null,
  }),
  getters: {
    isUsered: (state) => !!(state.user && state.user.id),
  },
  actions: {
    setRequestObj(val) {
      this.requestObj = val || null;
    },
    setToken(val) {
      const tokenStr = val ? 'Bearer ' + val : '';
      this.token = tokenStr;
    },
    setUser(val) {
      this.user = val || null;
    },
  },
  persist: {
    key: 'app-cache',
    pick: ['token'],
  },
});
