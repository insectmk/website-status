import { defineStore } from 'pinia'

// 系统相关
export const SystemStore = defineStore('system', {
  state: () => ({})
})
// store测试
export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 10 }),
  getters: {
    double: (state) => state.count * 2
  },
  actions: {
    increment() {
      this.count++
    }
  }
})
