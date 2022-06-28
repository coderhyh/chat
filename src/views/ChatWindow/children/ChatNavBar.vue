<template>
  <div class="ChatNavBar">
    <h2>{{ curFriendItem?.name }}</h2>
  </div>
</template>

<script setup lang="ts">
const curFriendItem = inject<FriendList>('curFriendItem')
</script>

<style lang="less" scoped>
.ChatNavBar {
  border-bottom: 1px solid #e7e7e7;
  height: 65px;
  background: #f5f5f5;
  h2 {
    margin-left: 25px;
    line-height: 65px;
    font-size: 21px;
  }
}
</style>
