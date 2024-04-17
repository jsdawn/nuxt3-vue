<template>
  <div class="app-header py-4 shadow-md">
    <UContainer>
      <div class="flex justify-between items-center">
        <UIcon class="text-2xl cursor-pointer" name="i-heroicons-bars-3" />
        <img class="logo h-8" src="~/assets/image/logo.png" />
        <UIcon
          class="text-2xl cursor-pointer text-primary-500"
          name="i-heroicons-shopping-cart-solid"
        />
      </div>
      <div class="pt-4">
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
