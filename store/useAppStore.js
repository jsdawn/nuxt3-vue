import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
  state: () => ({
    token: '',
    user: null,
  }),
  getters: {
    isUsered: (state) => !!(state.userInfo && state.userInfo.id),
  },
  actions: {
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
