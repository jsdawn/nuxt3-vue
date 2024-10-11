<template>
  <div class="v-page index-page">
    <UContainer class="mood-list">
      <MoodListItem v-for="n in state.dataList" :key="n" />

      <UDivider id="load-more" class="py-6" :label="state.finished ? '完' : '加载中'" />
    </UContainer>
  </div>
</template>

<script setup>
import { getUser } from '@/api/user';
import { useAppStore } from '@/store/useAppStore';

const store = useAppStore();

const [startObserve] = useLoadMoreObserver('#load-more', onLoadMore);
const state = reactive({
  loading: false,
  finished: false,
  page: 1,
  size: 20,
  dataList: 0,
});

function fetchList() {
  state.loading = true;
  setTimeout(() => {
    state.dataList += 20;
    state.page++;
    state.loading = false;
    state.finished = true;
  }, 500);
}

function onLoadMore() {
  if (state.loading || state.finished) return;
  fetchList();
}

onMounted(() => {
  startObserve();
});
</script>

<style lang="scss" scoped></style>
