<template>
  <div class="app-header py-4 shadow-md bg-white sticky top-0">
    <UContainer class="header-container">
      <div class="flex justify-between items-center md:space-x-5">
        <UIcon class="text-2xl cursor-pointer" name="i-heroicons-bars-3" />
        <div class="md:flex-1">
          <img class="logo h-8 md:h-11" src="~/assets/image/logo.png" />
        </div>

        <div class="text-gray-500 font-light border-r pr-5 hidden md:block">
          Unser Kugellager‑Shop
        </div>

        <UIcon
          class="text-2xl cursor-pointer text-primary-500 sm:text-3xl md:text-4xl"
          name="i-heroicons-shopping-cart-solid"
        />
      </div>

      <div
        class="pt-4 lg:pt-0 lg:w-1/3 lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2"
      >
        <UInput
          icon="i-heroicons-magnifying-glass-20-solid"
          size="md"
          color="white"
          :trailing="false"
          placeholder="Search..."
        />
      </div>
    </UContainer>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
</script>

<style lang="scss">
.app-header {
}
</style>
