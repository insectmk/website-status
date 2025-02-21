<script setup lang="ts">
import type { Monitor } from '../../types/uptime-robot-type.ts'
import {
  getAvgUptimeColor,
  getAvgUptimeMsg,
  getDownTimesMsg,
  getMostStableWebsiteMsg,
  getMostUnstableWebsiteMsg,
  getTotalAnalyse,
  getUptimeWebsiteMsg,
} from './TotalAnalyse.util.ts'
import TotalAnalyseCard from './TotalAnalyseCard.vue'
import systemConfig from '../../config/system-config.ts'

// 使用 defineProps 定义 prop
const props = defineProps<{
  monitors: Monitor[] // UptimeRobot返回的网站状态信息
}>()

const totalAnalyse = getTotalAnalyse(props.monitors) // 网站所有的监控数据
const mostStableWebInfo = totalAnalyse.getMostStableWebsite() // 最稳定的网站
const mostUnstableWebInfo = totalAnalyse.getMostUnstableWebsite() // 最不稳定的网站
// 统计数字的样式
const statisticValueStyle = { fontSize: '32px', fontWeight: 'bold' }
</script>

<template>
  <el-row :gutter="10">
    <el-col :xs="24" :sm="8" :md="8" :lg="4" :xl="4">
      <total-analyse-card
        title="在线网站"
        color="#67c23a"
        :footer="getUptimeWebsiteMsg(totalAnalyse)"
      >
        <template #icon>
          <icon-ep-select />
        </template>
        <template #content>
          <el-statistic
            :value-style="statisticValueStyle"
            :value="totalAnalyse.websiteCount - totalAnalyse.downWebsiteCount"
          />
        </template>
      </total-analyse-card>
    </el-col>
    <el-col :xs="24" :sm="8" :md="8" :lg="4" :xl="4">
      <total-analyse-card
        title="离线网站"
        color="#f56c6c"
        :footer="getUptimeWebsiteMsg(totalAnalyse)"
      >
        <template #icon>
          <icon-ep-close-bold />
        </template>
        <template #content>
          <el-statistic :value-style="statisticValueStyle" :value="totalAnalyse.downWebsiteCount" />
        </template>
      </total-analyse-card>
    </el-col>
    <el-col :xs="24" :sm="8" :md="8" :lg="4" :xl="4">
      <total-analyse-card
        title="平均可用率"
        color="#409EFF"
        :footer="getAvgUptimeMsg(totalAnalyse)"
      >
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
      </total-analyse-card>
    </el-col>
    <el-col :xs="24" :sm="8" :md="8" :lg="4" :xl="4">
      <total-analyse-card title="故障次数" color="#E6A23C" :footer="getDownTimesMsg(totalAnalyse)">
        <template #icon>
          <icon-ep-warning />
        </template>
        <template #content>
          <el-statistic :value-style="statisticValueStyle" :value="totalAnalyse.downTimes" />
        </template>
      </total-analyse-card>
    </el-col>
    <el-col :xs="24" :sm="8" :md="8" :lg="4" :xl="4">
      <total-analyse-card
        title="最强网站"
        color="#9254DE"
        :footer="getMostStableWebsiteMsg(mostStableWebInfo)"
      >
        <template #icon>
          <icon-ep-trophy />
        </template>
        <template #content>
          <el-link
            v-if="systemConfig.showLink"
            class="content-website-name"
            :underline="false"
            :href="mostStableWebInfo.url"
            target="_blank"
          >
            {{ mostStableWebInfo.friendly_name }}
          </el-link>
          <span v-else class="content-website-name">
            {{ mostStableWebInfo.friendly_name }}
          </span>
        </template>
      </total-analyse-card>
    </el-col>
    <el-col :xs="24" :sm="8" :md="8" :lg="4" :xl="4">
      <total-analyse-card
        title="最弱网站"
        color="#F78989"
        :footer="getMostUnstableWebsiteMsg(mostUnstableWebInfo)"
      >
        <template #icon>
          <icon-ep-dish />
        </template>
        <template #content>
          <el-link
            v-if="systemConfig.showLink"
            class="content-website-name"
            :underline="false"
            :href="mostUnstableWebInfo.url"
            target="_blank"
          >
            {{ mostUnstableWebInfo.friendly_name }}
          </el-link>
          <span v-else class="content-website-name">
            {{ mostUnstableWebInfo.friendly_name }}
          </span>
        </template>
      </total-analyse-card>
    </el-col>
  </el-row>
</template>

<style scoped>
/*内容-网站名称*/
.content-website-name {
  font-size: 18px;
  font-weight: 600;
}
</style>
