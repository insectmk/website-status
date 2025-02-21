<script setup lang="ts">
import type { Log } from '../../types/uptime-robot-type.ts'
import { getWebsiteLogs } from './WebsiteLogs.util.ts'

// 使用 defineProps 定义 prop
const props = defineProps<{
  logs: Log[] // 网站日志信息
}>()
const websiteLogs = getWebsiteLogs(props.logs)
</script>

<template>
  <el-popover ref="popover" placement="right-start" title="网站日志" :width="600" trigger="hover">
    <template #reference>
      <el-statistic
        :value-style="{ fontSize: '32px', fontWeight: 'bold' }"
        :value="websiteLogs.length"
        style="cursor: pointer"
      />
    </template>
    <el-card v-for="websiteLog in websiteLogs" :key="websiteLog.log.id">
      <div>
        {{
          `类型：${websiteLog.typeCodeInfo.name}持续时间：${websiteLog.durationTime}原因：${websiteLog.reasonCodeInfo.desc}`
        }}
      </div>
    </el-card>
  </el-popover>
</template>

<style scoped></style>
