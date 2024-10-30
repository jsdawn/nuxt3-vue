import { getUsers } from '@/api/users';
import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
  state: () => ({
    requestObj: null, // 请求体缓存，防止请求重复提交
    token: '',
    user: null,
    defaultAvatar: 'https://dummyimage.com/100x100/064b6e/fff.png',
  }),
  getters: {
    isUsered: (state) => !!(state.user && state.user.id),
  },
  actions: {
    // set fun
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

    // actions fun
    signOut() {
      this.token = '';
      this.user = null;
      reloadNuxtApp();
    },

    async getUserInfo() {
      const res = await getUsers();
      this.setUser(res.data);
      return res.data;
    },
  },
  persist: {
    key: 'app-cache',
    pick: ['token'],
  },
});
