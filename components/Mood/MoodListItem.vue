<template>
  <div class="mood-list-item flex space-x-3 text-sm pt-7">
    <UAvatar
      size="md"
      :src="item.avatar || 'https://dummyimage.com/100x100/064b6e/fff.png'"
      alt="M"
    />

    <div class="item__bd space-y-1 flex-1">
      <ULink class="item__title text-base" inactive-class="text-primary-600">
        {{ author.name }}
      </ULink>

      <!-- 内容区 -->
      <div class="item__content">
        {{ item.content || item.title }}
      </div>

      <div class="flex justify-between">
        <p class="item__date text-gray-400">{{ item.created_at }}</p>

        <div class="item__actions space-x-3">
          <UIcon class="w-5 h-5" name="i-heroicons-heart" />
          <!-- <UIcon class="w-5 h-5" name="i-heroicons-heart-solid" /> -->
          <UIcon
            class="w-5 h-5"
            ref="refCommentIcon"
            name="i-heroicons-chat-bubble-left"
            @click="openReply()"
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
          <div
            class="item__comment-item"
            v-for="(comment, index) in comments"
            :key="index"
            @click="openReply(comment)"
          >
            <div class="user-info inline-block">
              <span class="text-primary-600">{{ comment.user?.name || '匿名用户' }}</span>
              <template v-if="comment.to_user">
                <span class="mx-1">回复</span>
                <span class="text-primary-600">{{ comment.to_user.name }}</span>
              </template>
              <span class="mx-0.5">:</span>
            </div>
            <span v-html="comment.content?.replace(/\n/g, '<br>')"></span>
          </div>
        </div>

        <div
          class="item__comment-area border border-primary rounded-sm bg-white"
          v-if="replyState.show"
          v-click-outside:[outsideExcludes]="clickOutReply"
        >
          <UTextarea
            ref="refReplyInput"
            v-model="replyState.caches[replyState.current]"
            variant="none"
            :rows="1"
            :maxrows="3"
            autoresize
            :placeholder="replyState.toUser ? `回复${replyState.toUser.name}` : '评论'"
          />
          <div class="opr flex justify-end p-2.5 pt-0">
            <UButton
              color="primary"
              :disabled="replyState.caches[replyState.current].trim() == ''"
              :loading="replyState.posting"
              @click="sendReply"
              >发送</UButton
            >
          </div>
        </div>
      </div>

      <UDivider class="pt-2" />
    </div>
  </div>
</template>

<script setup>
import { addArticleComments } from '@/api/comments';
import { useAppStore } from '@/store/useAppStore';
import { useToastStore } from '@/store/useToastStore';

const props = defineProps({
  item: { type: Object, required: true },
});

const toast = useToastStore();
const store = useAppStore();
const refCommentIcon = ref();
const refComments = ref();
const refReplyInput = ref();
// 记录评论状态
const replyState = reactive({
  caches: {
    0: '', // 内容 {to_user_id: content}
  },
  current: 0, // 当前回复对象user_id
  toUser: null,
  show: false,
  posting: false,
});

const outsideExcludes = computed(() => [refCommentIcon.value, refComments.value]);
const author = computed(() => props.item.author);
const comments = computed(() => props.item.comments || []);

// 回复/评论
function openReply(item) {
  if (!store.isUsered) {
    return; // 未登录
  }
  let toUserId = 0;
  // 回复对象（自己=无）
  if (item && item.user_id != store.user.id) {
    toUserId = item.user_id;
    replyState.caches[toUserId] = replyState.caches[toUserId] || '';
    replyState.toUser = item.user;
  } else {
    replyState.toUser = null;
  }
  replyState.current = toUserId;
  replyState.show = true;
  nextTick(() => {
    if (refReplyInput.value) {
      refReplyInput.value.textarea.focus();
    }
  });
}

function clickOutReply() {
  replyState.show = false;
}

async function sendReply() {
  const content = replyState.caches[replyState.current]?.trim();
  if (!content) return;

  replyState.posting = true;
  try {
    const res = await addArticleComments({
      article_id: props.item.id,
      content,
      to_user_id: replyState.current || undefined,
    });
    props.item.comments.push(res.data);
  } catch (error) {
    toast.error({ title: error.message });
  }
  replyState.caches[replyState.current] = '';
  replyState.posting = false;
  replyState.show = false;
}
</script>

<style lang="scss">
.mood-list-item {
}
</style>
