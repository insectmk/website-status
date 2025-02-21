<script setup lang="ts">
import type { Monitor } from '../../types/uptime-robot-type.ts'
import { getWebInfo } from './WebsiteCard.util.ts'
import StatusBar from './StatusBar.vue'
import systemConfig from '../../config/system-config.ts'
import WebsiteLogs from './WebsiteLogs.vue'
import TotalAnalyseCard from '../total-analyse/TotalAnalyseCard.vue'
import { getAvgUptimeColor } from '../total-analyse/TotalAnalyse.util.ts'

// 使用 defineProps 定义 prop
const props = defineProps<{
  monitor: Monitor // UptimeRobot返回的网站状态信息
}>()

const webInfo = getWebInfo(props.monitor) //网站信息
console.log(webInfo, '内容')
</script>

<template>
  <el-card class="website-card">
    <!-- 网站名称及状态 -->
    <el-container>
      <span class="website-name mobile-hide">{{ webInfo.friendly_name }}</span>
      <el-link
        :title="webInfo.friendly_name"
        v-show="systemConfig.showLink"
        :href="webInfo.url"
        target="_blank"
      >
        <el-icon :size="20"> <icon-ep-link /> </el-icon>
      </el-link>
      <span :class="['status', webInfo.statusInfo.status]">{{
        webInfo.statusInfo.statusText
      }}</span>
    </el-container>
    <!-- 网站统计信息 -->
    <el-row :gutter="10">
      <el-col :span="12">
        <el-card class="website-analyse-card">
          <span class="mobile-hide">平均可用率：</span>
          <span class="website-analyse-data">{{ webInfo.analyse.avgUptime }}%</span>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="website-analyse-card">
          <span class="mobile-hide">故障次数：</span>
          <span class="website-analyse-data">{{ webInfo.analyse.downTimes }}次</span>
        </el-card>
      </el-col>
      <!-- 网站每日状态条 -->
      <el-col :span="24">
        <el-card class="website-analyse-card">
          <status-bar :webInfo="webInfo" />
        </el-card>
      </el-col>
      <el-col :span="8">
        <!-- 网站日志信息 -->
        <total-analyse-card class="website-analyse-card" title="网站日志" color="#8E44AD">
          <template #icon>
            <icon-ep-document />
          </template>
          <template #content>
            <website-logs class="website-analyse-card" :logs="webInfo.logs" />
          </template>
        </total-analyse-card>
      </el-col>
      <el-col :span="8">
        <!-- 可用率 -->
        <total-analyse-card class="website-analyse-card" title="可用率" color="#67c23a">
          <template #icon>
            <icon-ep-trend-charts />
          </template>
          <template #content>
            <el-progress
              type="circle"
              :color="getAvgUptimeColor(webInfo.analyse.avgUptime)"
              :percentage="webInfo.analyse.avgUptime"
              :width="90"
            />
          </template>
        </total-analyse-card>
      </el-col>
      <el-col :span="8">
        <!-- 故障次数 -->
        <total-analyse-card class="website-analyse-card" title="故障次数" color="#E6A23C">
          <template #icon>
            <icon-ep-warning />
          </template>
          <template #content>
            <el-statistic
              :value-style="{ fontSize: '32px', fontWeight: 'bold' }"
              :value="webInfo.analyse.downTimes"
              style="cursor: pointer"
            />
          </template>
        </total-analyse-card>
      </el-col>
    </el-row>
  </el-card>
</template>

<style scoped>
/*统计分析卡片*/
.total-analyse-card {
  margin-bottom: 8px;
  font-size: 14px;
}
/*网站名称*/
.website-name {
  font-size: 16px;
  font-weight: 600;
}
/*网站状态*/
.status {
  background-position: left center;
  background-size: 14px auto;
  background-repeat: no-repeat;
  padding-left: 20px;
  margin-left: auto;
  /*正常*/
  &.ok {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='10'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M12 2l-8 8-4-4 1.5-1.5L4 7 10.5.5 12 2z' fill='%233bd672'/%3E%3C/svg%3E");
    color: #3bd672;
  }
  /*离线*/
  &.down {
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 1064 1024' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M205.09 959.373l327.82-327.83 327.827 327.83L981.31 838.79 653.49 510.97l327.82-327.814L860.737 62.58 532.91 390.4 205.09 62.581 84.527 183.155l327.82 327.814-327.82 327.82z' fill='%23DE484A'/%3E%3C/svg%3E");
    color: #de484a;
  }
  /*未知*/
  &.unknow {
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M521.216 164.864c161.792 0 199.68 149.504 106.496 242.688C523.264 512 441.344 532.48 441.344 749.568h158.72c1.024-123.904 62.464-182.272 125.952-239.616 58.368-53.248 120.832-99.328 120.832-206.848 0-171.008-159.744-292.864-325.632-292.864-187.392 0-344.064 132.096-344.064 316.416h158.72c0-92.16 92.16-161.792 185.344-161.792M441.344 855.04h158.72v158.72h-158.72V855.04z' fill='%23969ea8'/%3E%3C/svg%3E");
    color: #969ea8;
  }
}
/*卡片圆角*/
.website-analyse-card,
.website-card {
  border-radius: 12px;
}
/*分析数据卡片*/
.website-analyse-card {
  margin-top: 14px;
  font-size: 14px;
}
/*分析数据*/
.website-analyse-data {
  font-size: 14px;
  font-weight: 600;
}
</style>
