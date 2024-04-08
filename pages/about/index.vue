<template>
  <!--  <Head>-->
  <!--    <Title>我是关于</Title>-->
  <!--    <Meta name="description" :content="'这是我的文章详情' + route.params.id" />-->
  <!--  </Head>-->

  <div class="v-page about-page">
    <h1>about-page</h1>

    <p>数字: {{ stroe.count }}</p>
    <button @click="stroe.increment">增加+</button>
  </div>
</template>

<script setup>
import { useCounterStore } from '@/store/useCounterStore';

const stroe = useCounterStore();
</script>

<style lang="scss" scoped></style>
