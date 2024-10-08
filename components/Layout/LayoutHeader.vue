<template>
  <div class="app-header py-3 shadow-md bg-white sticky top-0 z-40">
    <UContainer class="header-container" :ui="{ constrained: 'max-w-screen-lg' }">
      <div class="flex justify-between items-center space-x-5">
        <div class="flex-1 flex items-center">
          <img class="logo h-7 mr-5" src="~/assets/image/logo.png" />

          <UDropdown :items="types" :popper="{ placement: 'bottom-start' }">
            <ULink class="flex items-center space-x-1" inactive-class="text-primary">
              <span>心情</span>
              <UIcon name="i-heroicons-chevron-down-20-solid" />
            </ULink>
          </UDropdown>
        </div>

        <UInput
          class="hidden sm:block"
          icon="i-heroicons-magnifying-glass-20-solid"
          size="md"
          color="white"
          :trailing="false"
          placeholder="Search..."
        />

        <UDropdown
          class="hidden sm:block"
          :items="items"
          :popper="{ placement: 'bottom-start' }"
        >
          <UButton
            color="primary"
            label="发心情"
            trailing-icon="i-heroicons-chevron-down-20-solid"
          />
        </UDropdown>

        <UButton label="登录/注册" color="gray">
          <template #leading>
            <UAvatar size="2xs" alt="M" />
          </template>
        </UButton>
      </div>
    </UContainer>
  </div>
</template>

<script setup>
const types = ref([
  [
    {
      label: '心情',
      icon: 'i-heroicons-fire-20-solid',
    },
  ],
  [
    {
      label: '文章',
      icon: 'i-heroicons-document-text-solid',
    },
  ],
]);

const items = ref([
  [
    {
      label: '发心情',
      icon: 'i-heroicons-chat-bubble-left-ellipsis',
    },
  ],
  [
    {
      label: '写文章',
      icon: 'i-heroicons-pencil-square-20-solid',
    },
  ],
]);
</script>

<style lang="scss">
.app-header {
}
</style>
