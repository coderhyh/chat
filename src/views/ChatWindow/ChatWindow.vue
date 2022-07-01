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
  const isTarget = socket.id === options?.selfId
  const isSelf = socket.id === options?.targetId
  let msg: string
  const nowDate = moment().format('YYYY-MM-DD HH:mm:ss')
  if (isSelf) msg = `${options.selfName} 拍了拍我`
  else if (isTarget) msg = `我拍了拍 ${options.targetName}`
  else msg = `${options?.selfName} 拍了拍 ${options?.targetName}`
  curFriendItem?.list.push({
    type: 'inform',
    msg,
    isMe: isSelf,
    date: nowDate,
    name: options?.selfName as string,
    userId: options?.selfId as string,
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
