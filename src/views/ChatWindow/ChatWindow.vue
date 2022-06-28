<template>
  <div class="ChatWindow">
    <ChatNavBar />
    <div class="main">
      <el-scrollbar ref="scrollbar" height="329px">
        <NewsControl
          v-for="item in curFriendItem?.list"
          :key="item.date"
          :msg="item.msg"
          :name="item.name"
          :right="item.right"
        />
      </el-scrollbar>
    </div>
    <InputBox />
  </div>
</template>

<script setup lang="ts">
import { ElScrollbar } from 'element-plus'

import ChatNavBar from './children/ChatNavBar.vue'
import InputBox from './children/InputBox.vue'
const curFriendItem = inject<FriendList>('curFriendItem')
const scrollbar = ref<InstanceType<typeof ElScrollbar>>()

const scrollDown = async () => {
  await nextTick()
  const h: number = scrollbar.value?.$el.querySelector('.el-scrollbar__view').offsetHeight
  console.log(h)
  scrollbar.value?.setScrollTop(h)
}
watch(() => curFriendItem?.list, scrollDown, { deep: true })
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
  }
}
</style>
