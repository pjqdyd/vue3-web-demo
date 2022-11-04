import { defineStore } from 'pinia'

export const useAppStore = defineStore({
  id: 'app',
  state: () => {
    return {
      config: 'app'
    }
  },
  actions: {
    setData(data: any) {
      this.config = data
    }
  }
})
