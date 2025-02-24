<script setup lang="ts">
import type { Log } from '../../types/uptime-robot-type.ts'
import { getWebsiteLogs } from './WebsiteLogs.util.ts'
import { formatDuration } from '../../utils/date-util.ts'

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
    <el-table :data="websiteLogs" style="width: 100%" show-overflow-tooltip>
      <el-table-column label="类型" width="70">
        <template #default="scope">
          <el-tag effect="dark" :type="scope.row.typeCodeInfo.type">{{
            scope.row.typeCodeInfo.name
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="持续时间" width="180">
        <template #default="scope">
          {{ formatDuration(scope.row.durationTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="reasonCodeInfo.desc" label="原因" />
    </el-table>
  </el-popover>
</template>

<style scoped></style>
