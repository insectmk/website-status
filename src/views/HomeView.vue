<script setup lang="ts">
import WebsiteCard from '../components/website-status/WebsiteCard.vue'
import { getMonitors } from '../api/uptime-robot.ts'
import system from '../config/system-config'
import { ref } from 'vue'
import type { Monitor } from '../types/uptime-robot-type.ts'
import TotalAnalyse from '../components/total-analyse/TotalAnalyse.vue'
import ProjectCopyright from '../components/footer/ProjectCopyright.vue'

const monitorList = ref<Monitor[]>([]) // 所有的网站监控信息
const isLoading = ref(true) // 数据是否在加载

// 获取所有网站数据
const fetchAllMonitors = async () => {
  const promises = system.apiKeys.map(apiKey =>
    getMonitors({ api_key: apiKey }).then(resp => resp.monitors)
  )

  // 等待所有请求完成
  const results = await Promise.all(promises)

  // 按顺序合并结果
  monitorList.value = results.flat()

  // 数据是加载完成
  isLoading.value = false
}

fetchAllMonitors()
</script>

<template>
  <!-- 骨架框 -->
  <el-skeleton :loading="isLoading" style="width: 100%" animated>
    <!-- 真正的内容 -->
    <template #default>
      <el-container>
        <el-row :gutter="10">
          <!-- 监控分析卡片 -->
          <el-col :span="24">
            <total-analyse :monitors="monitorList" />
          </el-col>
          <!-- 网站状态卡片 -->
          <el-col
            :xs="24"
            :sm="24"
            :md="12"
            :lg="12"
            :xl="12"
            :style="{ marginTop: '5px', marginBottom: '5px' }"
            v-for="monitor in monitorList"
            :key="monitor.id"
          >
            <website-card :monitor="monitor" />
          </el-col>
          <!-- 页脚内容 -->
          <el-col :span="24">
            <project-copyright />
          </el-col>
        </el-row>
      </el-container>
    </template>
    <!-- 骨架内容 -->
    <template #template>
      <el-row :gutter="10">
        <!-- 监控分析卡片 -->
        <el-col :span="24">
          <el-row :gutter="10">
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <el-card>
                <el-skeleton :rows="1" />
              </el-card>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <el-card>
                <el-skeleton :rows="1" />
              </el-card>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <el-card>
                <el-skeleton :rows="1" />
              </el-card>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <el-card>
                <el-skeleton :rows="1" />
              </el-card>
            </el-col>
          </el-row>
        </el-col>
        <!-- 网站状态卡片 -->
        <el-col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="12"
          :xl="12"
          :style="{ marginTop: '5px', marginBottom: '5px' }"
          v-for="item in Array(6)"
          :key="item"
        >
          <el-card>
            <el-row>
              <el-col :span="12">
                <el-card>
                  <el-skeleton-item />
                </el-card>
              </el-col>
              <el-col :span="12">
                <el-card>
                  <el-skeleton-item />
                </el-card>
              </el-col>
              <el-col :span="24">
                <el-card>
                  <el-skeleton :rows="1" />
                </el-card>
              </el-col>
              <el-col :span="24">
                <el-card>
                  <el-skeleton-item />
                </el-card>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </template>
  </el-skeleton>
</template>

<style scoped></style>
