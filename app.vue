<template>
  <div id="app">
    <Head>
      <Title>{{ seoMeta.title }}</Title>
      <Meta name="description" :content="seoMeta.description" />
    </Head>

    <AppHeader />

    <NuxtPage />
  </div>
</template>

<script setup>
import AppHeader from '@/components/Layout/AppHeader.vue';

// 入口seo设置，页面使用useSeoMeta
const seoMeta = reactive({
  title: 'Kexpress',
  description: 'Kexpress Description.',
});

useServerSeoMeta({
  title: () => seoMeta.title,
  description: () => seoMeta.description,
});
</script>

<style lang="scss" scoped>
#app {
}
</style>
