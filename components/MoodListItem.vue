<template>
  <div class="mood-list-item flex space-x-3 text-sm pt-7">
    <UAvatar size="md" :src="author.avatar || store.defaultAvatar" alt="M" />

    <div class="item__bd space-y-1 flex-1">
      <ULink class="item__title text-base" inactive-class="text-primary-600">
        {{ author.name }}
      </ULink>

      <!-- 内容区 -->
      <div class="item__content" v-html="lineFeed(item.content || item.title)"></div>

      <div class="flex justify-between">
        <p class="item__date text-gray-400">{{ item.created_at }}</p>

        <div class="item__actions space-x-3">
          <UIcon
            class="w-5 h-5"
            name="i-heroicons-heart-solid"
            @click="toggleLike(item)"
            v-if="isLiked"
          />
          <UIcon
            class="w-5 h-5"
            name="i-heroicons-heart"
            @click="toggleLike(item)"
            v-else
          />

          <UIcon
            class="w-5 h-5"
            ref="refCommentIcon"
            name="i-heroicons-chat-bubble-left"
            @click="openReply()"
          />
        </div>
      </div>

      <div
        class="bg-gray-100 py-1 rounded-sm space-y-1"
        v-show="likes.length || comments.length || replyState.show"
      >
        <!-- 点赞区 -->
        <div class="item__likes px-2 text-primary-600 space-x-1" v-if="likes.length">
          <UIcon class="w-5 h-5 align-text-bottom" name="i-heroicons-heart" />
          <span v-for="(likeItem, index) in likes" :key="index">
            {{ likeItem.user.name + (index < likes.length - 1 ? '，' : '') }}
          </span>
        </div>

        <!-- 评论区 -->
        <div
          class="item__comments text-gray-700"
          ref="refComments"
          v-if="comments.length"
        >
          <div
            class="item__comment-item px-2 py-1 flex hover:bg-gray-200"
            v-for="(comment, index) in comments"
            :key="index"
          >
            <div class="comment-item__content flex-1" @click="openReply(comment)">
              <div class="user-info inline-block">
                <span class="text-primary-600">{{
                  comment.user?.name || '匿名用户'
                }}</span>
                <template v-if="comment.to_user">
                  <span class="mx-1">回复</span>
                  <span class="text-primary-600">{{ comment.to_user.name }}</span>
                </template>
                <span class="mx-0.5">:</span>
              </div>
              <span v-html="lineFeed(comment.content)"></span>
            </div>

            <div class="comment-item__opr hidden">
              <UIcon
                class="w-5 h-5 text-red-500 cursor-pointer"
                name="i-heroicons-trash"
                @click="deleteReply(comment)"
                v-if="store.isUsered && comment.user.id == store.user.id"
              />
            </div>
          </div>
        </div>

        <!-- 评论输入框 -->
        <div
          class="item__comment-area border border-primary rounded-sm bg-white mx-2"
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
import { updArticleLikes } from '@/api/articles';
import { addArticleComments, delComments } from '@/api/comments';
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
const likes = computed(() => props.item.likes || []);
const isLiked = computed(
  () => store.isUsered && likes.value.some((v) => v.user_id == store.user.id),
);

// 切换点赞
async function toggleLike(item) {
  if (!store.isUsered) {
    return; // 未登录
  }

  const toStatus = isLiked.value ? 0 : 1;
  try {
    const res = await updArticleLikes({
      article_id: props.item.id,
      status: toStatus,
    });
    const idx = props.item.likes.findIndex((v) => v.id == res.data.id);
    if (idx !== -1) {
      props.item.likes.splice(idx, 1);
    }
    if (toStatus == 1) {
      props.item.likes.push(res.data);
    }
  } catch (error) {}
}

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

async function deleteReply(item) {
  if (!item) return;
  try {
    const res = await delComments(item.id);
    const idx = props.item.comments.findIndex((v) => v.id == res.data.id);
    props.item.comments.splice(idx, 1);
  } catch (error) {
    toast.error({ title: error.message });
  }
}
</script>

<style lang="scss">
.mood-list-item {
  .item__comment-item:hover {
    .comment-item__opr {
      display: inline-flex;
    }
  }
}
</style>
