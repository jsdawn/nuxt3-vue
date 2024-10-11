<template>
  <div class="v-page login-page">
    <UContainer class="login-form py-7">
      <UForm :schema="schema" :state="form" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="账号/邮箱" name="email">
          <UInput v-model="form.email" />
        </UFormGroup>

        <UFormGroup label="密码" name="password">
          <UInput v-model="form.password" type="password" />
        </UFormGroup>

        <div class="pt-4">
          <UButton size="md" block type="submit" :loading="posting"> 登录 </UButton>
        </div>
        <UButton size="md" block color="white" to="/login/register" replace>
          去注册
        </UButton>
      </UForm>
    </UContainer>
  </div>
</template>

<script setup>
import { loginUser } from '@/api';
import { useToastStore } from '@/store/useToastStore';
import { useAppStore } from '@/store/useAppStore';
import Joi from 'joi';

const toast = useToastStore();
const store = useAppStore();

const schema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const posting = ref(false);
const form = reactive({
  email: 'wyh@qq.com',
  password: '123456',
});

async function onSubmit(event) {
  posting.value = true;
  try {
    const res = await loginUser(event.data);
    store.setToken(res.data.token);
    store.setUser(res.data.user);
    navigateTo('/');
  } catch (error) {
    toast.error({ title: error.message });
  }
  posting.value = false;
}
</script>

<style lang="scss">
.login-page {
}
</style>
