<template>
  <br />
  <div>姓名：{{ name }}</div>
  <div>年龄：{{ age }}</div>
  <div>计算的名字：{{ userStore.fullName }}</div>
  <div>app的config: {{ appStore.config }}</div>
  <br />
  <button @click="updateUserState">更新数据</button>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/modules/user'
import { useAppStore } from '@/store/modules/app'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const userStore = useUserStore()
const appStore = useAppStore()

const name = computed(() => userStore.name)
const { age } = storeToRefs(userStore)

const updateUserState = () => {
  const { name, age } = userStore.$state
  userStore.updateState({ name: name + 1, age: age + 1 })
}
</script>

<style lang="scss" scoped></style>
