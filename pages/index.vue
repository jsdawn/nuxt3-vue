<template>
  <div class="v-page index-page">
    <UContainer class="mood-list">
      <MoodListItem v-for="n in 10" :key="n" />
    </UContainer>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
