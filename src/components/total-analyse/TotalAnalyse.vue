<script setup lang="ts">
import type { Monitor } from '../../types/uptime-robot-type.ts'
import { getTotalAnalyse } from './TotalAnalyse.util.vue.ts'

// 使用 defineProps 定义 prop
const props = defineProps<{
  monitors: Monitor[] // UptimeRobot返回的网站状态信息
}>()

const totalAnalyse = getTotalAnalyse(props.monitors) // 网站所有的监控数据
</script>

<template>
  <el-row>
    <el-col :span="12">
      <el-card>
        <span>平均可用率：</span>
        <span>{{ totalAnalyse.avgUptime }}%</span>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card>
        <span>平均可用率：</span>
        <span>{{ totalAnalyse.avgUptime }}%</span>
      </el-card>
    </el-col>
  </el-row>
</template>

<style scoped></style>
