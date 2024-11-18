<template>
  <div
    class="post-list-item text-sm pt-3 cursor-pointer hover:bg-gray-600/5"
    @click="gotoDetail"
  >
    <h3 class="font-bold text-base">{{ item.title }}</h3>
    <div class="text-slate-500 truncate mt-1">
      {{ item.brief }}
    </div>

    <div class="text-slate-500 flex space-x-3 mt-2">
      <RouterLink class="hover:text-primary">{{ author.name }}</RouterLink>
      <UDivider orientation="vertical" />
      <span class="flex">
        <UIcon class="w-5 h-5" name="i-heroicons-hand-thumb-up" />
        <code class="ml-1">189</code>
      </span>
      <span class="flex">
        <UIcon class="w-5 h-5" name="i-heroicons-chat-bubble-left" />
        <code class="ml-1">189</code>
      </span>
    </div>

    <UDivider class="pt-3" />
  </div>
</template>

<script setup>
const props = defineProps({
  item: { type: Object, required: true },
});

const author = computed(() => props.item.author);

function gotoDetail() {
  navigateTo('/posts/' + props.item.id);
}
</script>

<style lang="scss" scoped>
.post-list-item {
}
</style>
