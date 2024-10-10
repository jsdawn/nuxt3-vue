import { defineStore } from 'pinia';

/**
 * UNotification 全局toast状态管理
 */
export const useToastStore = defineStore('toast', {
  state: () => ({
    show: true,
    options: {
      title: '系统提示',
    },
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    add(params) {
      this.options = { ...params };
      this.show = true;
    },
    remove() {
      this.show = false;
    },
  },
});
