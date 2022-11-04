import { RouteRecordRaw } from 'vue-router'
import Layout from '@/views/layouts/index.vue'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    redirect: '/home',
    meta: {
      title: '首页',
      keepAlive: false
    },
    component: Layout,
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
        meta: { title: '首页', keepAlive: false, showTab: true }
      },
      {
        path: '/test',
        name: 'Test',
        component: () => import('@/test/testDemo.tsx'),
        meta: { title: '测试Demo', keepAlive: false, showTab: true }
      },
      {
        path: '/pinia',
        name: 'Pinia',
        component: () => import('@/test/testPinia.vue'),
        meta: { title: '测试Pinia', keepAlive: false, showTab: true }
      }
    ]
  }
]
