import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    name: '张三',
    age: 18
  }),
  getters: {
    fullName: (state) => state.name + '丰'
  },
  actions: {
    updateState(data: any) {
      // @ts-ignore
      this.$state = data
    }
  },
  // 开启数据缓存
  persist: {
    key: 'user',
    storage: window.localStorage,
    paths: ['name'],
    // @ts-ignore
    overwrite: true
  }
})
