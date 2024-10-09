/**
 * 指令：点击元素之外触发
 */
const vClickOutside = {
  mounted(el, binding) {
    // TODO 增加排除元素
    function eventHandler(event) {
      console.log(event);
      if (el.contains(event.target) || el === event.target) {
        return false;
      }
      if (binding.value && typeof binding.value === 'function') {
        binding.value(event);
      }
    }

    el.__click_outside__ = eventHandler;
    document.addEventListener('click', eventHandler);
  },

  beforeUnmount(el) {
    if (typeof el.__click_outside__ === 'function') {
      document.removeEventListener('click', el.__click_outside__);
    }
  },
};

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('click-outside', vClickOutside);
});
