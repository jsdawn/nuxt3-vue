<template>
  <div class="v-page index-page">
    <UContainer class="mood-list">
      <MoodListItem :item="item" v-for="item in state.dataList" :key="item.id" />

      <UDivider id="load-more" class="py-6" :label="state.finished ? '完' : '加载中'" />
    </UContainer>
  </div>
</template>

<script setup>
import { listArticles } from '@/api/articles';
import { useToastStore } from '@/store/useToastStore';

const toast = useToastStore();

const [startObserve] = useLoadMoreObserver('#load-more', onLoadMore);
const state = reactive({
  loading: false,
  finished: false,
  page: 1,
  size: 5,
  dataList: [],
});

async function fetchList() {
  state.loading = true;
  try {
    const res = await listArticles({
      type: 3,
      page: state.page,
      size: state.size,
    });
    state.dataList.push(...res.data);
    if (state.dataList.length >= res.meta.total) {
      state.finished = true;
    }
  } catch (error) {
    toast.error({ title: error.message });
  }
  state.loading = false;
  state.page++;
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
