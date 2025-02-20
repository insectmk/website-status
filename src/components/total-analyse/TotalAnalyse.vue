<script setup lang="ts">
import type { Monitor } from '../../types/uptime-robot-type.ts'
import { getTotalAnalyse } from './TotalAnalyse.util.ts'
import { formatDuration } from '../../utils/date-util.ts'

// 使用 defineProps 定义 prop
const props = defineProps<{
  monitors: Monitor[] // UptimeRobot返回的网站状态信息
}>()

const totalAnalyse = getTotalAnalyse(props.monitors) // 网站所有的监控数据
</script>

<template>
  <el-row>
    <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
      <el-card>
        <span>在线网站：</span>
        <span>{{ totalAnalyse.websiteCount - totalAnalyse.downWebsiteCount }}</span>
      </el-card>
    </el-col>
    <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
      <el-card>
        <span>离线网站：</span>
        <span>{{ totalAnalyse.downWebsiteCount }}</span>
      </el-card>
    </el-col>
    <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
      <el-card>
        <span>平均可用率：</span>
        <span>{{ totalAnalyse.avgUptime }}%</span>
      </el-card>
    </el-col>
    <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
      <el-card>
        <span>故障次数：</span>
        <span>{{ totalAnalyse.downTimes }}%</span><br />
        <span>持续时间：{{ formatDuration(totalAnalyse.downDuration) }}%</span>
      </el-card>
    </el-col>
  </el-row>
</template>

<style scoped></style>
