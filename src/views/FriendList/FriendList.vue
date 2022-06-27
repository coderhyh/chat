<template>
  <div class="FriendList">
    <main>
      <Search />
      <FriendItem />
    </main>
    <ChatWindow />
  </div>
</template>

<script setup lang="ts">
import ChatWindow from '~/views/ChatWindow/ChatWindow.vue'

import FriendItem from './children/FriendItem.vue'
import Search from './children/Search.vue'
</script>

<style lang="less" scoped>
.FriendList {
  display: flex;
  flex: 1;
  main {
    border-right: 1px solid #d6d6d6;
    background: #f5f5f5;
  }
  .ChatWindow {
    flex: 1;
  }
}
</style>
