<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>
<template>
  <div class="layout-bar">
    <router-link to="/">首页</router-link>
    <router-link to="/test">测试页面</router-link>
    <router-link to="/pinia">测试Pinia</router-link>
  </div>
  <div class="layout-content">
    <keep-alive v-if="route.meta.keepAlive">
      <router-view />
    </keep-alive>
    <router-view v-else />
  </div>
</template>
<style lang="scss" scoped>
.layout-bar {
  a {
    display: inline-block;
    margin: 10px;
    padding: 10px 20px;
    color: #ffffff;
    background: #1890ff;
    border-radius: 10px;
  }
}
</style>
