<template>
  <div class="App">
    <audio ref="newMsgVoice" class="Prompt" :src="audioUrl"></audio>
    <el-config-provider :locale="zhCn">
      <router-view
        :class="{ animate__animated: true, animate__shakeX: pai_yi_pai_flag }"
        @contextmenu.prevent
      />
    </el-config-provider>
  </div>
</template>

<script lang="ts" setup>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

import findMePromptMp3 from '~/assets/other/piaopiao@.mp3'
import promptMp3 from '~/assets/other/piaopiao2.0.mp3'
import echarts from '~/common/initEcharts'
const { userName, userList } = useStore('user')
const socket = useSocket()
const newMsgVoice = ref<HTMLAudioElement>()
const audioUrl = ref<string>(promptMp3)

provide('echarts', echarts)
onMounted(() => {
  provide('prompt', { newMsgVoice: newMsgVoice.value })
})

if (userName.value) {
  socket.auth = { userName: userName.value }
  socket.connect()
}
socket.on('userList', (_userList) => {
  // if (!userName.value) return
  // userList.value = [{ name: '群聊', avatar: '', userId: 'all', list: [] }]
  // _userList.map((e) => {
  //   if (e.userId !== socket.id) {
  //     userList.value.push({ name: e.userName as string, avatar: '', userId: e.userId, list: [] })
  //   }
  // })
})
// 右键头像 功能
const pai_yi_pai_flag = ref<boolean>(false)
socket.on('contextmenu_avatar', (type) => {
  if (type === '@AITE_NAME') {
    audioUrl.value = findMePromptMp3
    setTimeout(() => {
      audioUrl.value = promptMp3
    }, 4000)
  } else if (type === 'PAI_YI_PAI') changePai_yi_pai_flag()
})
const changePai_yi_pai_flag = () => {
  pai_yi_pai_flag.value = true
  setTimeout(() => {
    pai_yi_pai_flag.value = false
  }, 1500)
}

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
