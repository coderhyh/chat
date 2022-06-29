<template>
  <div class="App">
    <audio ref="prompt" class="Prompt" :src="promptMp3"></audio>
    <el-config-provider :locale="zhCn">
      <router-view />
    </el-config-provider>
  </div>
</template>

<script lang="ts" setup>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

import promptMp3 from '~/assets/other/piaopiao.mp3'
import echarts from '~/common/initEcharts'
const prompt = ref<HTMLAudioElement>()

provide('echarts', echarts)
provide('prompt', prompt)
</script>

<style lang="less" scoped>
.App {
  min-width: 860px;
  .Prompt {
    position: fixed;
    top: -100vh;
    opacity: 0;
  }
}
</style>
