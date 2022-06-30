<template>
  <div class="FriendList">
    <main>
      <Search />
      <el-scrollbar height="503px">
        <FriendItem
          v-for="item in friendList"
          :key="item.userId"
          :name="item.name"
          :msg="getLatestVal(item.list, 'msg')"
          :date="getLatestVal(item.list, 'date')"
          :avatar="item.avatar"
          :class="{ currentFriend: item.userId === currentFriendId }"
        />
      </el-scrollbar>
    </main>
    <ChatWindow />
  </div>
</template>

<script setup lang="ts">
import ChatWindow from '~/views/ChatWindow/ChatWindow.vue'

import FriendItem from './children/FriendItem.vue'
import Search from './children/Search.vue'
const { friendList } = useStore('user')
// const friendList = ref<FriendList[]>([
//   { name: '群聊', avatar: '', userId: 'all', list: [] },
//   { name: '黄玉豪', avatar: '', userId: '1', list: [] },
//   { name: '黄玉豪', avatar: '', userId: '2', list: [] },
//   { name: '黄玉豪', avatar: '', userId: '3', list: [] },
//   { name: '黄玉豪', avatar: '', userId: '4', list: [] },
// ])
const currentFriendId = ref<string>('all')
provide(
  'curFriendItem',
  friendList.value.find((e) => e.userId === currentFriendId.value)
)
const getLatestVal = (list: FriendListMsg[], key: 'msg' | 'date'): string => {
  const L = list[list.length - 1]
  if (!L?.name) return ''
  if (key === 'msg') {
    return L?.type === 'image' ? `${L?.name}: [涩涩图]` : `${L?.name}: ${L?.[key]}`
  }
  return L[key].split(' ')[1].substring(0, 5)
}
</script>

<style lang="less" scoped>
.FriendList {
  display: flex;
  flex: 1;
  main {
    border-right: 1px solid #d6d6d6;
    background: #f5f5f5;
    .currentFriend {
      background: #c3c4c5;
      :deep(.date) {
        color: #999;
      }
    }
  }
  .ChatWindow {
    flex: 1;
  }
}
</style>
