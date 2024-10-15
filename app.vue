<template>
  <div id="app">
    <Head>
      <Title>{{ seoMeta.title }}</Title>
      <Meta name="description" :content="seoMeta.description" />
    </Head>

    <LayoutHeader />

    <NuxtPage />

    <!-- 全局toast -->
    <UNotifications />
    <!-- <UIcon name="i-heroicons-check-circle-20-solid" /> -->
    <!-- <UIcon name="i-heroicons-exclamation-circle-20-solid" /> -->
  </div>
</template>

<script setup>
import { useToastStore } from '@/store/useToastStore';

const runtimeConfig = useRuntimeConfig();
const toast = useToast();
const toastStore = useToastStore(); // 自定义全局toast

const seoMeta = reactive({
  title: '木得 mood',
  description: '木得是英文mood（心境）的中文谐音，有木心情都来mood。',
});

onMounted(() => {
  // 将toast实例存入store以便使用
  toastStore.setInstance(toast);
  console.log('[RuntimeConfig] apiBase: ' + runtimeConfig.public.apiBase);
});

// 入口seo设置，页面使用useSeoMeta
useServerSeoMeta({
  title: () => seoMeta.title,
  description: () => seoMeta.description,
});
</script>

<style lang="scss" scoped>
#app {
}
</style>
