<template>
  <div class="App">
    <audio ref="newMsgVoice" class="Prompt" :src="promptMp3"></audio>
    <audio ref="findMeVoice" class="Prompt" :src="findMePromptMp3"></audio>
    <el-config-provider :locale="zhCn">
      <router-view @contextmenu.prevent />
    </el-config-provider>
  </div>
</template>

<script lang="ts" setup>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

import findMePromptMp3 from '~/assets/other/piaopiao@.mp3'
import promptMp3 from '~/assets/other/piaopiao2.0.mp3'
import echarts from '~/common/initEcharts'
const newMsgVoice = ref<HTMLAudioElement>()
const findMeVoice = ref<HTMLAudioElement>()

provide('echarts', echarts)
onMounted(() => {
  provide('prompt', { newMsgVoice: newMsgVoice.value, findMeVoice: findMeVoice.value })
})
// 请求通知权限
Notification.requestPermission()
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
