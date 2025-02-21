<script setup lang="ts">
import type { Monitor } from '../../types/uptime-robot-type.ts'
import { getAvgUptimeColor, getTotalAnalyse } from './TotalAnalyse.util.ts'
import { formatDuration } from '../../utils/date-util.ts'

// 使用 defineProps 定义 prop
const props = defineProps<{
  monitors: Monitor[] // UptimeRobot返回的网站状态信息
}>()

const totalAnalyse = getTotalAnalyse(props.monitors) // 网站所有的监控数据
</script>

<template>
  <el-row :gutter="10">
    <el-col :xs="24" :sm="8" :md="8" :lg="4" :xl="4">
      <el-card class="total-analyse-card">
        <el-row>
          <el-col :span="24">
            <span class="total-analyse-card-title">在线网站：</span>
          </el-col>
        </el-row>
        <el-col :span="24">
          <span>{{ totalAnalyse.websiteCount - totalAnalyse.downWebsiteCount }}</span>
        </el-col>
      </el-card>
    </el-col>
    <el-col :xs="24" :sm="8" :md="8" :lg="4" :xl="4">
      <el-card class="total-analyse-card">
        <el-row>
          <el-col :span="24">
            <span class="total-analyse-card-title">离线网站：</span>
          </el-col>
          <el-col :span="24">
            <span>{{ totalAnalyse.downWebsiteCount }}</span>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
    <el-col :xs="24" :sm="8" :md="8" :lg="4" :xl="4">
      <el-card class="total-analyse-card">
        <el-row>
          <el-col :span="24">
            <span class="total-analyse-card-title">平均可用率：</span>
          </el-col>
          <el-col :span="24" class="progress-container">
            <el-progress
              type="circle"
              :color="getAvgUptimeColor(totalAnalyse.avgUptime)"
              :percentage="totalAnalyse.avgUptime"
              :width="90"
            />
          </el-col>
        </el-row>
      </el-card>
    </el-col>
    <el-col :xs="24" :sm="8" :md="8" :lg="4" :xl="4">
      <el-card class="total-analyse-card">
        <el-row>
          <el-col :span="24">
            <span class="total-analyse-card-title">故障次数：</span>
          </el-col>
          <el-col :span="24">
            <span>{{ totalAnalyse.downTimes }}</span>
          </el-col>
          <el-col :span="24">
            <span>持续时间：{{ formatDuration(totalAnalyse.downDuration) }}%</span>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
    <el-col :xs="24" :sm="8" :md="8" :lg="4" :xl="4">
      <el-card class="total-analyse-card">
        <el-row>
          <el-col :span="24">
            <span class="total-analyse-card-title">最强网站：</span>
          </el-col>
          <el-col :span="24">
            <span>{{ totalAnalyse.getMostStableWebsite().friendly_name }}</span>
          </el-col>
          <el-col :span="24">
            <span
              >持续时间：{{
                formatDuration(totalAnalyse.getMostStableWebsite().analyse.downDuration)
              }}%</span
            >
          </el-col>
        </el-row>
      </el-card>
    </el-col>
    <el-col :xs="24" :sm="8" :md="8" :lg="4" :xl="4">
      <el-card class="total-analyse-card">
        <el-row>
          <el-col :span="24">
            <span class="total-analyse-card-title">最弱网站：</span>
          </el-col>
          <el-col :span="24">
            <span>{{ totalAnalyse.getMostUnstableWebsite().friendly_name }}</span>
          </el-col>
          <el-col :span="24">
            <span
              >持续时间：{{
                formatDuration(totalAnalyse.getMostUnstableWebsite().analyse.downDuration)
              }}%</span
            >
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
</template>

<style scoped>
/*统计分析卡片*/
.total-analyse-card {
  border-radius: 12px;
  margin-bottom: 8px;
  font-size: 14px;
}
/*统计分析卡片的标题*/
.total-analyse-card-title {
  font-size: 14px;
  font-weight: 400;
}
/*网站平均可用率进度条父盒子*/
.progress-container {
  display: flex; /* 使用 Flex 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}
</style>
