<template>
  <Head>
    <Title>网站标题HEAD</Title>
    <Meta name="description" content="这是我的神奇网站，让我告诉您所有相关信息。HEAD" />
  </Head>

  <header>
    <nav>
      <ul>
        <li><NuxtLink to="/about">About</NuxtLink></li>
        <li><NuxtLink to="/posts/1">Post 1</NuxtLink></li>
        <li><NuxtLink to="/posts/2">Post 2</NuxtLink></li>
        <li><NuxtLink to="/posts/abc123">Post abc123</NuxtLink></li>
      </ul>
    </nav>
  </header>

  <NuxtPage />
</template>

<script setup>
const runtimeConfig = useRuntimeConfig();
console.log(runtimeConfig);
// const appConfig = useAppConfig();

// 入口seo设置，页面使用useSeoMeta
useServerSeoMeta({
  title: '网站标题222',
  description: '这是我的神奇网站，让我告诉您所有相关信息。',
});
</script>

<style lang="scss" scoped></style>
