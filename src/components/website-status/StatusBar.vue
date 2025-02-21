<script setup lang="ts">
import { getDateOrToday } from './StatusBar.util.ts'
import type { WebInfo } from './WebsiteCard.util.ts'

// 使用 defineProps 定义 prop
const props = defineProps<{
  webInfo: WebInfo // 从返回结果解析的网站信息
}>()
</script>

<template>
  <div class="status-bar">
    <el-tooltip
      v-for="statusRangeInfo in props.webInfo.statusRangeInfos"
      :key="statusRangeInfo.startDate"
      :content="statusRangeInfo.status.statusText"
      effect="dark"
      :hide-after="0"
      placement="top"
    >
      <i
        :class="{
          'status-bar-item': true,
          ok: statusRangeInfo.status.status === 'ok',
          down: statusRangeInfo.status.status === 'down',
        }"
      />
    </el-tooltip>
  </div>
  <div class="summary mobile-hide">
    <span>
      {{ getDateOrToday(webInfo.startTime) }}
    </span>
    <span>{{ webInfo.analyse.toString() }}</span>
    <span>
      {{ getDateOrToday(webInfo.endTime) }}
    </span>
  </div>
</template>

<style scoped>
/*状态条盒子*/
.status-bar {
  display: flex;
}
/*状态豆儿*/
.status-bar-item {
  flex-grow: 1;
  margin: 0 1px;
  height: 25px;
  border-radius: 5px;
  transition: opacityease 150ms;
}
/*状态豆儿状态-正常*/
.ok {
  background-color: #3bd672;
}
/*状态豆儿状态-下线*/
.down {
  background-color: #de484a;
}
/*总结内容*/
.summary {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  line-height: 15px;
  color: #9aa2af;
}
</style>
