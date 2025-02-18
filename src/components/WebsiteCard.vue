<script setup lang="ts">
import { useCounterStore } from '../store'

const store = useCounterStore()
</script>

<template>
  <h1>{{ store.count }}</h1>
  <h1>{{ store.double }}</h1>
  <el-button @click="store.increment" type="primary">按钮点击调用increment方法</el-button>
</template>

<style scoped></style>
