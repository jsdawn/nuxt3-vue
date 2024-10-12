<template>
  <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
    <UButton :label="user.name" color="gray">
      <template #leading>
        <UAvatar
          :src="user.avatar || 'https://dummyimage.com/100x100/064b6e/fff.png'"
          size="2xs"
          alt="M"
        />
      </template>
    </UButton>

    <template #account="{ item }">
      <div class="text-left">
        <p>Signed in as</p>
        <p class="truncate font-medium text-gray-900 dark:text-white">
          {{ user.email }}
        </p>
      </div>
    </template>

    <template #item="{ item }">
      <span class="truncate">{{ item.label }}</span>
      <UIcon
        :name="item.icon"
        class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
      />
    </template>
  </UDropdown>
</template>

<script setup>
import { useAppStore } from '@/store/useAppStore';

const props = defineProps({
  user: { type: Object, required: true },
});

const store = useAppStore();
const items = ref([
  [{ label: '', slot: 'account', disabled: true }],
  [
    { label: '发心情', icon: 'i-heroicons-chat-bubble-left-ellipsis' },
    { label: '写文章', icon: 'i-heroicons-pencil-square-20-solid' },
  ],
  [
    {
      label: 'Sign out',
      icon: 'i-heroicons-arrow-left-on-rectangle',
      click: handleSignOut,
    },
  ],
]);

function handleSignOut() {
  store.signOut();
}
</script>

<style lang="scss">
.layout-user-menu {
}
</style>
