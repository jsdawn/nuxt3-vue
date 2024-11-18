<template>
  <div class="v-page posts-edit-page">
    <UContainer class="login-form py-7">
      <UForm
        :schema="form.type == 3 ? schema3 : schema"
        :state="form"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormGroup label="标题" name="title" required v-if="form.type != 3">
          <UInput v-model.trim="form.title" :maxlength="50" />
        </UFormGroup>

        <UFormGroup label="简介" name="brief" required v-if="form.type != 3">
          <UTextarea
            v-model="form.brief"
            :rows="2"
            :maxlength="190"
            placeholder="这一刻的想法..."
          />
        </UFormGroup>

        <UFormGroup label="内容" name="content" required>
          <UTextarea
            v-model="form.content"
            :rows="5"
            :maxrows="10"
            autoresize
            placeholder="这一刻的想法..."
          />
        </UFormGroup>

        <div class="pt-4">
          <UButton size="md" block type="submit" :loading="posting">
            {{ form.type == 3 ? '发表心情' : '发表文章' }}
          </UButton>
        </div>
        <UButton size="md" block color="white" @click="router.back()"> 返回 </UButton>
      </UForm>
    </UContainer>
  </div>
</template>

<script setup>
import { useToastStore } from '@/store/useToastStore';
import Joi from 'joi';
import { updArticles } from '@/api/articles';

const router = useRouter();
const route = useRoute();
const toast = useToastStore();

const schema = Joi.object({
  title: Joi.string().required(),
  brief: Joi.string().min(10).required().messages({
    'string.min': '简介 长度不能小于 10 个字符',
  }),
  content: Joi.string().min(10).required().messages({
    'string.min': '内容 长度不能小于 10 个字符',
  }),
}).unknown();

// 心情类型规则
const schema3 = Joi.object({
  title: Joi.string().allow(''),
  content: Joi.string().min(10).required().messages({
    'string.min': '内容 长度不能小于 10 个字符',
  }),
}).unknown(); // 允许未定义规则的key通过

const posting = ref(false);
const form = reactive({
  title: '',
  brief: '',
  content: '',
  type: +route.query.type,
});

async function onSubmit(event) {
  posting.value = true;
  try {
    const res = await updArticles(event.data);
    router.back();
  } catch (error) {
    toast.error({ title: error.message });
  }
  posting.value = false;
}

definePageMeta({
  // 路由验证，返回false则不匹配该路由，如无另一个匹配项，则会导致404错误
  // 运行顺序先于全局路由中间件
  validate: async (route) => {
    const type = +route.query.type;
    // 检查id是否由数字组成
    return /^\d+$/.test(type) && [1, 2, 3].includes(type);
  },
  // 指定具名路由中间件
  middleware: 'posts-auth',
});
</script>

<style lang="scss">
.posts-edit-page {
}
</style>
