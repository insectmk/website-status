<script setup lang="ts">
import type { Monitor } from '../../types/uptime-robot-type.ts'
import { getAvgUptimeColor, getTotalAnalyse } from './TotalAnalyse.util.ts'
import { formatDuration } from '../../utils/date-util.ts'
import TotalAnalyseCard from './TotalAnalyseCard.vue'

// 使用 defineProps 定义 prop
const props = defineProps<{
  monitors: Monitor[] // UptimeRobot返回的网站状态信息
}>()

const totalAnalyse = getTotalAnalyse(props.monitors) // 网站所有的监控数据
</script>

<template>
  <el-row :gutter="10">
    <el-col :xs="24" :sm="8" :md="8" :lg="4" :xl="4">
      <total-analyse-card title="在线网站" color="#67c23a">
        <template #icon>
          <icon-ep-select />
        </template>
        <template #content>
          <span>{{ totalAnalyse.websiteCount - totalAnalyse.downWebsiteCount }}</span>
        </template>
        <template #footer>
          <span>持续：{{ formatDuration(totalAnalyse.downDuration) }}</span>
        </template>
      </total-analyse-card>
    </el-col>
    <el-col :xs="24" :sm="8" :md="8" :lg="4" :xl="4">
      <total-analyse-card title="离线网站" color="#f56c6c">
        <template #icon>
          <icon-ep-close-bold />
        </template>
        <template #content>
          <span>{{ totalAnalyse.downWebsiteCount }}</span>
        </template>
        <template #footer>
          <span>持续：{{ formatDuration(totalAnalyse.downDuration) }}</span>
        </template>
      </total-analyse-card>
    </el-col>
    <el-col :xs="24" :sm="8" :md="8" :lg="4" :xl="4">
      <total-analyse-card title="平均可用率" color="#409EFF">
        <template #icon>
          <icon-ep-trend-charts />
        </template>
        <template #content>
          <el-progress
            type="circle"
            :color="getAvgUptimeColor(totalAnalyse.avgUptime)"
            :percentage="totalAnalyse.avgUptime"
            :width="90"
          />
        </template>
        <template #footer>
          <span>持续：{{ formatDuration(totalAnalyse.downDuration) }}</span>
        </template>
      </total-analyse-card>
    </el-col>
    <el-col :xs="24" :sm="8" :md="8" :lg="4" :xl="4">
      <total-analyse-card title="故障次数" color="#E6A23C">
        <template #icon>
          <icon-ep-warning />
        </template>
        <template #content>
          <span>{{ totalAnalyse.downTimes }}</span>
        </template>
        <template #footer>
          <span>持续：{{ formatDuration(totalAnalyse.downDuration) }}</span>
        </template>
      </total-analyse-card>
    </el-col>
    <el-col :xs="24" :sm="8" :md="8" :lg="4" :xl="4">
      <total-analyse-card title="最强网站" color="#9254DE">
        <template #icon>
          <icon-ep-trophy />
        </template>
        <template #content>
          <span>{{ totalAnalyse.getMostStableWebsite().friendly_name }}</span>
        </template>
        <template #footer>
          <span>持续：{{ formatDuration(totalAnalyse.downDuration) }}</span>
        </template>
      </total-analyse-card>
    </el-col>
    <el-col :xs="24" :sm="8" :md="8" :lg="4" :xl="4">
      <total-analyse-card title="最弱网站" color="#F78989">
        <template #icon>
          <icon-ep-dish />
        </template>
        <template #content>
          <span>{{ totalAnalyse.getMostUnstableWebsite().friendly_name }}</span>
        </template>
        <template #footer>
          <span>持续：{{ formatDuration(totalAnalyse.downDuration) }}</span>
        </template>
      </total-analyse-card>
    </el-col>
  </el-row>
</template>

<style scoped></style>
