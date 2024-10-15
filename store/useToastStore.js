import { defineStore } from 'pinia';

/**
 * UNotification 全局toast状态管理
 */
export const useToastStore = defineStore('toast', {
  state: () => ({
    instance: null, // useToast实例
  }),
  getters: {},
  actions: {
    setInstance(val) {
      this.instance = val;
    },
    add(params) {
      if (!this.instance) return;
      this.instance.add({ ...params });
    },
    remove() {
      if (!this.instance) return;
      this.instance.remove();
    },
    success(params) {
      this.add({ icon: 'i-heroicons-check-circle-20-solid', ...params });
    },
    error(params) {
      this.add({
        icon: 'i-heroicons-exclamation-circle-20-solid',
        color: 'red',
        ...params,
      });
    },
  },
});
