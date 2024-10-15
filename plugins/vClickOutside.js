/**
 * 指令：点击元素之外触发
 * v-click-outside:[dom|domRef|domRef.$el|'#exclude-button'|'.exclude-button']="callback"
 */
const vClickOutside = {
  mounted(el, binding) {
    let excludes = [];
    if (Array.isArray(binding.arg)) {
      excludes = binding.arg;
    } else if (binding.arg) {
      excludes.push(binding.arg);
    }

    function eventHandler(event) {
      // 是否排除触发元素
      if (excludes.length) {
        const excludeNodes = [];
        excludes.forEach((item) => {
          if (item instanceof Element) {
            excludeNodes.push(item);
          } else if (typeof item == 'string') {
            excludeNodes.push(...document.querySelectorAll(item));
          } else if (item && item.$el) {
            excludeNodes.push(item.$el);
          }
        });

        if (excludeNodes.length == 0) {
          return false;
        }
        if (
          excludeNodes.some((item) => item?.contains(event.target)) ||
          excludeNodes.includes(event.target)
        ) {
          return false;
        }
      }

      // 是否子元素与自己
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
