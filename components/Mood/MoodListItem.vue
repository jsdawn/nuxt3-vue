<template>
  <div class="mood-list-item flex space-x-3 text-sm pt-7">
    <UAvatar
      size="md"
      src="https://avatars.githubusercontent.com/u/739984?v=4"
      alt="Avatar"
    />

    <div class="item__bd space-y-1">
      <ULink class="item__title text-base" inactive-class="text-primary-600"
        >你的昵称</ULink
      >

      <!-- 内容区 -->
      <div class="item__content">
        《天龙八部》看完了，125万字，半个多月，读了49个小时24分钟
        现在开始看《射雕英雄传》了，昨天在返程的火车上看了5个小时，已经渐入佳境。
      </div>

      <div class="flex justify-between">
        <p class="item__date text-gray-400">15分钟前</p>

        <div class="item__actions space-x-3">
          <UIcon class="w-5 h-5" name="i-heroicons-heart" />
          <!-- <UIcon class="w-5 h-5" name="i-heroicons-heart-solid" /> -->
          <UIcon
            class="w-5 h-5"
            ref="refCommentIcon"
            name="i-heroicons-chat-bubble-left"
            @click="openComment()"
          />
        </div>
      </div>

      <div class="bg-gray-100 p-2 rounded-sm space-y-2">
        <!-- 点赞区 -->
        <div class="item__likes text-primary-600 space-x-1">
          <UIcon class="w-5 h-5 align-text-bottom" name="i-heroicons-heart" />
          <span>青山依旧，</span>
          <span>情非得已的军哥，</span>
          <span>正在追忆往昔</span>
        </div>

        <!-- 评论区 -->
        <div class="item__comments space-y-2 text-gray-700" ref="refComments">
          <div class="item__comment-item" @click="openComment()">
            <div class="user-info inline-block">
              <span class="text-primary-600">正在追忆往昔</span>:
            </div>
            既然看完了《天龙八部》那我问问你，它讲的是什么内容
          </div>

          <div class="item__comment-item" @click="openComment()">
            <div class="user-info inline-block">
              <span class="text-primary-600">周不夜天</span>
              <span class="mx-1">回复</span>
              <span class="text-primary-600">正在追忆往昔</span>
              :
            </div>
            既然看完了《天龙八部》那我问问你，它讲的是什么内容
          </div>
        </div>

        <div
          class="item__comment-area border border-primary rounded-sm bg-white"
          v-if="showInput"
          v-click-outside:[outsideExcludes]="clickOutComment"
        >
          <UTextarea
            v-model="inputValue"
            variant="none"
            :rows="1"
            :maxrows="3"
            autoresize
            placeholder="评论"
          />
          <div class="opr flex justify-end p-2.5 pt-0">
            <UButton color="primary" :disabled="true">发送</UButton>
          </div>
        </div>
      </div>

      <UDivider class="pt-2" />
    </div>
  </div>
</template>

<script setup>
const refCommentIcon = ref();
const refComments = ref();
const showInput = ref(false);
const inputValue = ref('');

const outsideExcludes = computed(() => [refCommentIcon.value, refComments.value]);

function openComment() {
  console.log('oepn');
  nextTick(() => {
    showInput.value = true;
  });
}
function clickOutComment() {
  showInput.value = false;
}
</script>

<style lang="scss">
.mood-list-item {
}
</style>
