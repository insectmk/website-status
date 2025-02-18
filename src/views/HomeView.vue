<script setup lang="ts">
import WebsiteCard from '../components/WebsiteCard.vue'
import { getMonitors } from '../api/uptime-robot.ts'
import system from '../config/system-config'
import { ref } from 'vue'
import type { Monitor } from '../types/uptime-robot-type.ts'

const monitorList = ref<Monitor[]>([]) // 所有的网站监控信息

// 获取所有网站数据
system.apiKeys.forEach((apiKey) => {
  getMonitors({
    api_key: apiKey
  }).then((resp) => {
    // 将所有apikey获取到的网站信息合并到一个list
    monitorList.value = monitorList.value.concat(resp.monitors)
  })
})
</script>

<template>
  <website-card v-for="monitor in monitorList" :key="monitor.id" :monitor="monitor" />
</template>

<style scoped></style>
