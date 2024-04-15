<template>
  <Head>
    <Title>我是关于</Title>
  </Head>

  <div class="v-page about-page">
    <div>
      <UButton>以下是flex响应式布局</UButton>
    </div>

    <div class="flex flex-wrap px-2">
      <div class="shrink-0 w-1/2 p-2 md:w-1/4 md:p-2 xl:p-4" v-for="n in 10" :key="n">
        <div class="bg-blue-300 min-h-40"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCounterStore } from '@/store/useCounterStore';

const stroe = useCounterStore();
</script>

<style lang="scss" scoped></style>
