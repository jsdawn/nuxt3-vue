<template>
  <div class="v-page login-page">
    <UContainer class="login-form py-7">
      <UForm
        :schema="schema"
        :validate="validate"
        :state="form"
        class="space-y-4"
        @submit="onSubmit"
      >
        <div class="flex justify-center">
          <div class="relative leading-none">
            <UAvatar :src="form.avatar" alt="M" size="3xl" />
            <label
              for="avatar"
              class="absolute inset-0 z-10 bg-black rounded-full flex justify-center items-center cursor-pointer opacity-0 hover:opacity-70"
            >
              <span class="text-primary">{{ uploading ? '上传中...' : '修改' }}</span>
            </label>
            <input
              id="avatar"
              type="file"
              hidden
              :disabled="uploading"
              @change="fileChange"
            />
          </div>
        </div>

        <UFormGroup label="昵称" name="name" required>
          <UInput v-model="form.name" />
        </UFormGroup>

        <UFormGroup label="账号/邮箱" name="email" required>
          <UInput v-model="form.email" />
        </UFormGroup>

        <UFormGroup label="密码" name="password">
          <UInput
            v-model="form.password"
            type="password"
            placeholder="选填，默认不修改密码"
          />
        </UFormGroup>

        <UFormGroup label="确认密码" name="password_confirmation" v-show="form.password">
          <UInput
            v-model="form.password_confirmation"
            type="password"
            placeholder="再次确认密码"
          />
        </UFormGroup>

        <div class="pt-4">
          <UButton size="md" block type="submit" :disabled="loading" :loading="posting">
            修改
          </UButton>
        </div>
        <UButton size="md" block color="white" @click="router.back()"> 返回 </UButton>
      </UForm>
    </UContainer>
  </div>
</template>

<script setup>
import { useToastStore } from '@/store/useToastStore';
import { useAppStore } from '@/store/useAppStore';
import Joi from 'joi';
import { updUsers } from '@/api/users';
import { uploadImage } from '@/api';

const router = useRouter();
const toast = useToastStore();
const store = useAppStore();

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().min(6).allow(''),
}).unknown();

const loading = ref(true);
const uploading = ref(false);
const posting = ref(false);
const form = ref({});

function validate(state) {
  const errors = [];
  if (state.password && state.password !== state.password_confirmation) {
    errors.push({ path: 'password_confirmation', message: '两次输入的密码必须一致' });
  }
  return errors;
}

async function fileChange(e) {
  if (uploading.value || !e.target.files[0]) {
    return;
  }
  uploading.value = true;
  try {
    const data = new FormData();
    data.append('file', e.target.files[0]);
    const res = await uploadImage(data);
    form.value.avatar = res.data.path;
  } catch (error) {
    toast.error({ title: error.message });
  }
  uploading.value = false;
}

async function onSubmit(event) {
  posting.value = true;
  try {
    const res = await updUsers(event.data);
    store.setUser(res.data);
    toast.success({ title: '修改成功' });
  } catch (error) {
    toast.error({ title: error.message });
  }
  posting.value = false;
}

async function fetchDetail() {
  try {
    const res = await store.getUserInfo();
    form.value = { ...res };
    loading.value = false;
  } catch (error) {
    toast.error({ title: error.message });
  }
}

onMounted(() => {
  fetchDetail();
});
</script>

<style lang="scss">
.login-page {
}
</style>
