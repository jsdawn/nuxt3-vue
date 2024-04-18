<template>
  <div class="top-nav bg-green-100 hidden md:block">
    <UContainer class="flex justify-end">
      <ul class="nav-list h-10 leading-10 text-gray-500 flex">
        <li class="nav-item px-4 hover:bg-white cursor-pointer">Wish list</li>
        <li class="nav-item px-4 hover:bg-white cursor-pointer text-primary">Login</li>
        <li class="nav-item px-4 hover:bg-white cursor-pointer">Englisch</li>
      </ul>
    </UContainer>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
</script>

<style lang="scss">
.top-nav {
}
</style>
