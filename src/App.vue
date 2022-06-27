<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<script lang="ts" setup>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

import echarts from '~/common/initEcharts'
const property = getCurrentInstance()?.proxy

provide('echarts', echarts)
provide('self', property)
</script>

<style lang="less" scoped>
.App {
  min-width: 860px;
}
</style>
