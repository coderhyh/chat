<template>
  <div class="ChatWindow">
    <ChatNavBar />
    <div class="main">
      <el-scrollbar ref="scrollbar" height="329px">
        <template v-for="item in curFriendItem?.list" :key="item.userId">
          <NewsControl
            v-if="item.type !== 'inform'"
            :item="item"
            :preview-list="curFriendItem?.list.filter((e) => e.type === 'image').map((e) => e.msg)"
          />
          <p v-else class="inform">{{ item.msg }}</p>
        </template>
      </el-scrollbar>
    </div>
    <InputBox />
  </div>
</template>

<script setup lang="ts">
import { ElScrollbar } from 'element-plus'
import moment from 'moment'

import ChatNavBar from './children/ChatNavBar.vue'
import InputBox from './children/InputBox.vue'
const { userInfo } = useStore('user')
const socket = useSocket()
const curFriendItem = inject<FriendList>('curFriendItem')
const scrollbar = ref<InstanceType<typeof ElScrollbar>>()

const scrollDown = async () => {
  await nextTick()
  const h: number = scrollbar.value?.$el.querySelector('.el-scrollbar__view').offsetHeight
  scrollbar.value?.setScrollTop(h)
}
watch(() => curFriendItem?.list, scrollDown, { deep: true, immediate: true })

socket.on('contextmenu_avatar', (_, options) => {
  if (options?.type !== 'PAI_YI_PAI') return
  const { userId } = userInfo.value
  const isReceive = userId === options?.receiveId // 接收
  const isLaunch = userId === options?.launchId // 发起

  let msg: string
  const nowDate = moment().format('YYYY-MM-DD HH:mm:ss')
  if (isReceive) msg = `${options.launchName} 拍了拍我`
  else if (isLaunch) msg = `我拍了拍 ${options.receiveName}`
  else msg = `${options?.launchName} 拍了拍 ${options?.receiveName}`
  curFriendItem?.list.push({
    type: 'inform',
    msg,
    date: nowDate,
  })
})
</script>

<style lang="less" scoped>
.ChatWindow {
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
  .main {
    flex: 1;
    padding: 12px 0;
    height: auto;
    /* stylelint-disable-next-line selector-class-pattern */
    :deep(.el-scrollbar__wrap) {
      padding: 0 30px;
    }
    .inform {
      line-height: 45px;
      text-align: center;
      font-size: 12px;
      color: #999;
    }
  }
}
</style>
