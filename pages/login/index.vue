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
          <UButton size="md" block type="submit"> 登录 </UButton>
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
import Joi from 'joi';

const toast = useToast();
const schema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const form = reactive({
  email: undefined,
  password: undefined,
});

async function onSubmit(event) {
  try {
    const res = await loginUser(event.data);
    console.log(res);
  } catch (error) {
    console.log(error.message);
    toast.add({ title: error.message, timeout: 0 });
  }
}
</script>

<style lang="scss">
.login-page {
}
</style>
