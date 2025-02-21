<script setup lang="ts">
import type { Monitor } from '../../types/uptime-robot-type.ts'
import { getWebInfo } from './WebSiteCard.util.ts'
import { ref } from 'vue'
import StatusBar from './StatusBar.vue'
import systemConfig from '../../config/system-config.ts'

// 使用 defineProps 定义 prop
const props = defineProps<{
  monitor: Monitor // UptimeRobot返回的网站状态信息
}>()
const activeNames = ref([])

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
      <span :class="['right-align', 'status', webInfo.statusInfo.status]">{{
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
    </el-row>
    <!-- 网站日志信息 -->
    <el-collapse v-model="activeNames">
      <el-collapse-item title="网站日志" name="1">
        <el-card v-for="log in props.monitor.logs" :key="log.id">
          <div>
            {{ `类型：${log.type}持续时间：${log.duration}原因：${log.reason.detail}` }}
          </div>
        </el-card>
      </el-collapse-item>
    </el-collapse>
  </el-card>
</template>

<style scoped>
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
