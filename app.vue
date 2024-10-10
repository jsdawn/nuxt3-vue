<template>
  <div id="app">
    <Head>
      <Title>{{ seoMeta.title }}</Title>
      <Meta name="description" :content="seoMeta.description" />
    </Head>

    <LayoutHeader />

    <NuxtPage />

    <!-- 自定义全局toast -->
    <UNotification :id="1" v-if="toast.show" v-bind="toast.options" />
  </div>
</template>

<script setup>
import { useToastStore } from '@/store/useToastStore';

const toast = useToastStore(); // 自定义全局toast

// 入口seo设置，页面使用useSeoMeta
const seoMeta = reactive({
  title: '木得 mood',
  description: '木得是英文mood（心境）的中文谐音，有木心情都来mood。',
});

const runtimeConfig = useRuntimeConfig();

console.log('[RuntimeConfig] apiBase: ' + runtimeConfig.public.apiBase);

useServerSeoMeta({
  title: () => seoMeta.title,
  description: () => seoMeta.description,
});
</script>

<style lang="scss" scoped>
#app {
}
</style>
