import { onMounted, onUnmounted } from 'vue';

/**
 * 可视窗口底部元素加载更多监听器
 *
 * @param {String|Element} el 底部元素选择器|元素节点
 * @param {Function} onLoadMore 加载回调
 * @returns [startObserve]
 */
const useLoadMoreObserver = (selectorOrElement, onLoadMore) => {
  let observer;
  let el;

  function startObserve() {
    if (observer && el) {
      observer.observe(el);
    }
  }

  onMounted(() => {
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // 进入可视窗口
          onLoadMore?.();
        }
      });
    });

    if (typeof selectorOrElement == 'string') {
      el = document.querySelector(selectorOrElement);
    } else {
      el = selectorOrElement;
    }
  });

  onUnmounted(() => {
    if (observer && el) {
      observer.unobserve(el);
    }
  });

  return [startObserve];
};

export default useLoadMoreObserver;
