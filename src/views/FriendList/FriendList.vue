<template>
  <div class="FriendList">
    <main>
      <Search />
      <el-scrollbar height="503px">
        <FriendItem
          v-for="item in friendList"
          :key="item.id"
          :name="item.name"
          :msg="item.msg"
          :date="item.date"
          :avatar="item.avatar"
          :class="{ currentFriend: item.id === currentFriendId }"
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

const friendList = ref<FriendList[]>([
  { name: '群聊', msg: '', date: '00:00', avatar: '', id: 'all', list: [] },
  { name: '黄玉豪', msg: '哈哈哈', date: '00:00', avatar: '', id: '1', list: [] },
  { name: '黄玉豪', msg: '哈哈哈', date: '00:00', avatar: '', id: '2', list: [] },
  { name: '黄玉豪', msg: '哈哈哈', date: '00:00', avatar: '', id: '3', list: [] },
  { name: '黄玉豪', msg: '哈哈哈', date: '00:00', avatar: '', id: '4', list: [] },
])
const currentFriendId = ref<string>('all')
provide(
  'curFriendItem',
  friendList.value.find((e) => e.id === currentFriendId.value)
)
</script>

<style lang="less" scoped>
.FriendList {
  display: flex;
  flex: 1;
  main {
    border-right: 1px solid #d6d6d6;
    background: #f5f5f5;
    .currentFriend {
      background: #c3c3c4;
    }
  }
  .ChatWindow {
    flex: 1;
  }
}
</style>
