<template>
  <Head>
    <Title>我是文章{{ route.params.id }}</Title>
    <!--    <Meta name="description" :content="'这是我的文章详情' + route.params.id" />-->
  </Head>

  <div class="v-page posts-[id]">
    <h1>posts-{{ route.params.id }}</h1>
    <p>数字: {{ stroe.count }}</p>
  </div>
</template>

<script setup>
import { useCounterStore } from '@/store/useCounterStore';

const route = useRoute();
const stroe = useCounterStore();

definePageMeta({
  // 路由验证，返回false则不匹配该路由，如无另一个匹配项，则会导致404错误
  // 运行顺序先于全局路由中间件
  validate: async (route) => {
    // 检查id是否由数字组成
    return /^\d+$/.test(route.params.id);
  },
  // 指定具名路由中间件
  middleware: 'posts-auth',
});

useSeoMeta({
  title: () => '我是文章001',
});
</script>

<style lang="scss" scoped></style>
