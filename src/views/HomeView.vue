<script setup lang="ts">
import WebsiteCard from '../components/website-status/WebsiteCard.vue'
import { getMonitors } from '../api/uptime-robot.ts'
import system from '../config/system-config'
import { ref } from 'vue'
import type { Monitor } from '../types/uptime-robot-type.ts'
import TotalAnalyse from '../components/total-analyse/TotalAnalyse.vue'

const monitorList = ref<Monitor[]>([]) // 所有的网站监控信息
const isDataLoaded = ref(false) // 数据是否加载完成

// 获取所有网站数据
const fetchAllMonitors = async () => {
  const promises = system.apiKeys.map(apiKey =>
    getMonitors({ api_key: apiKey }).then(resp => resp.monitors)
  )

  // 等待所有请求完成
  const results = await Promise.all(promises)

  // 按顺序合并结果
  monitorList.value = results.flat()

  // 数据是加载完成
  isDataLoaded.value = true
}

fetchAllMonitors()
</script>

<template>
  <el-container v-if="isDataLoaded">
    <el-row :gutter="10">
      <!-- 监控分析卡片 -->
      <el-col :span="24">
        <total-analyse :monitors="monitorList" />
      </el-col>
      <!-- 网站状态卡片 -->
      <el-col
        :xs="24"
        :sm="24"
        :md="12"
        :lg="12"
        :xl="12"
        :style="{ marginTop: '5px', marginBottom: '5px' }"
        v-for="monitor in monitorList"
        :key="monitor.id"
      >
        <website-card :monitor="monitor" />
      </el-col>
    </el-row>
  </el-container>
</template>

<style scoped></style>
