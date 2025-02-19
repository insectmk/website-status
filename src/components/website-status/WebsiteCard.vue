<script setup lang="ts">
import type { Monitor } from '../../types/uptime-robot-type.ts'
import { downTimes, avgUptime, getWebInfo } from './WebSiteCard.util.ts'
import { ref } from 'vue'
import StatusBar from './StatusBar.vue'

// 使用 defineProps 定义 prop
const props = defineProps<{
  monitor: Monitor // UptimeRobot返回的网站状态信息
}>()
const activeNames = ref([])

const webInfo = getWebInfo(props.monitor) //网站信息
console.log(webInfo, '内容')
// 状态条盒子
// 详细信息
</script>

<template>
  <el-card>
    <h3>{{ props.monitor.friendly_name }}</h3>
    <el-row>
      <el-col :span="12">
        <el-card>
          平均运行状态
          <span>{{ avgUptime(webInfo.statusRangeInfos) }}</span>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          故障次数
          <span>{{ downTimes(webInfo.statusRangeInfos) }}</span>
        </el-card>
      </el-col>
      <el-col :span="24">
        <status-bar :webInfo="webInfo" />
      </el-col>
    </el-row>
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

<style scoped></style>
