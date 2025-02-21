<script setup lang="ts">
// 使用 defineProps 定义 prop
const props = defineProps<{
  title: string // 标题
  footer: string // 底部描述
  color: string // 颜色
}>()
</script>

<template>
  <el-card class="total-analyse-card">
    <el-row>
      <el-col :span="24">
        <!-- 标题 -->
        <el-tag
          class="total-analyse-card-title"
          type="info"
          :color="props.color"
          effect="dark"
          :hit="false"
          round
        >
          {{ props.title }}
        </el-tag>
        <!-- 标题右侧图标 -->
        <span style="float: right">
          <el-icon :size="20" :color="props.color">
            <slot name="icon">
              <icon-ep-select />
            </slot>
          </el-icon>
        </span>
      </el-col>
    </el-row>
    <el-col :span="24" class="total-analyse-card-content">
      <!-- 主要内容 -->
      <slot name="content"></slot>
    </el-col>
    <el-col :span="24" class="total-analyse-card-footer">
      <!-- 底部内容，暂时只支持文字 -->
      <el-tooltip :content="props.footer" effect="dark" :hide-after="0" placement="top">
        <span>{{ props.footer }}</span>
      </el-tooltip>
    </el-col>
  </el-card>
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
  border: none;
  font-size: 14px;
  font-weight: 400;
}
/*统计分析卡片的内容*/
.total-analyse-card-content {
  height: 100px;
  display: flex; /* 使用 Flex 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  font-size: 16px;
  font-weight: 600;
}
/*统计分析卡片的底部内容*/
.total-analyse-card-footer {
  font-size: 12px;
  font-weight: 400;
  white-space: nowrap; /* 禁止换行 */
  overflow: hidden; /* 隐藏超出部分 */
  text-overflow: ellipsis; /* 显示省略号 */
  cursor: pointer; /*小手*/
}
</style>
