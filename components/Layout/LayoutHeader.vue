<template>
  <div class="app-header py-3 shadow-md bg-white sticky top-0 z-40">
    <UContainer class="header-container" :ui="{ constrained: 'max-w-screen-lg' }">
      <div class="flex justify-between items-center space-x-5">
        <div class="flex-1 flex items-center">
          <ULink class="mr-5" to="/">
            <img class="logo h-7" src="~/assets/image/logo.png" />
          </ULink>

          <UDropdown :items="types" :popper="{ placement: 'bottom-start' }">
            <ULink class="flex items-center space-x-1" inactive-class="text-primary">
              <span>{{ headerTitle }}</span>
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

        <LayoutUserMenu :user="store.user" v-if="store.isUsered" />

        <UButton label="登录/注册" color="gray" @click="gotoLogin" v-else>
          <template #leading>
            <UAvatar size="2xs" alt="M" />
          </template>
        </UButton>
      </div>
    </UContainer>
  </div>
</template>

<script setup>
import { useAppStore } from '@/store/useAppStore';

const store = useAppStore();
const route = useRoute();

const headerTitle = ref('心情');
const types = ref([
  [{ label: '心情', icon: 'i-heroicons-fire-20-solid', to: '/' }],
  [{ label: '文章', icon: 'i-heroicons-document-text-solid', to: '/posts' }],
]);
const items = ref([
  [
    {
      label: '发心情',
      icon: 'i-heroicons-chat-bubble-left-ellipsis',
      to: '/posts/edit?type=3',
    },
  ],
  [
    {
      label: '写文章',
      icon: 'i-heroicons-pencil-square-20-solid',
      to: '/posts/edit?type=1',
    },
  ],
]);

watch(
  () => route.name,
  (val) => {
    if (val == 'index') {
      headerTitle.value = '心情';
    } else if (val == 'posts') {
      headerTitle.value = '文章';
    }
  },
  {
    immediate: true,
  },
);

function gotoLogin() {
  navigateTo('/login');
}
</script>

<style lang="scss">
.app-header {
}
</style>
