<script setup lang="ts">
import type { Monitor } from '../types/uptime-robot-type'
import { downTimes, avgUptime } from './WebSiteCard.util'
import { getStatusRangeInfos } from '../utils/uptime-robot-param-util.ts'

// 使用 defineProps 定义 prop
const props = defineProps<{
  monitor: Monitor // UptimeRobot返回的网站状态信息
}>()

const statusRangeInfos = getStatusRangeInfos(props.monitor.custom_uptime_ranges, props.monitor.logs)
console.log(statusRangeInfos, '内容')
// 状态条盒子
// 详细信息
</script>

<template>
  <el-card>
    <h3>{{ props.monitor.friendly_name }}</h3>
    <div>
      平均运行状态
      <span>{{ avgUptime(statusRangeInfos) }}</span>
    </div>
    <div>
      故障次数
      <span>{{ downTimes(statusRangeInfos) }}</span>
    </div>
    <div>状态条盒子</div>
    <div>网站日志</div>
  </el-card>
</template>

<style scoped></style>
