<template>
  <div class="FriendItem">
    <el-avatar shape="square" :size="40" :src="avatar || 'https://www.coderhyh.top/logo.png'" />
    <section>
      <p class="name">{{ name }}</p>
      <div class="msg">{{ msg }}</div>
    </section>
    <div class="date">{{ date }}</div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    name: string
    msg?: string
    date?: string
    avatar?: string
  }>(),
  {
    avatar: '',
    msg: '',
    date: '',
  }
)
</script>

<style lang="less" scoped>
.FriendItem {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 0 13px;
  width: 100%;
  height: 65px;
  background: #e1dfde;
  cursor: pointer;
  section {
    margin: 0 10px;
    width: 140px;
    height: 40px;
    .name {
      color: #000;
    }
    .msg {
      color: #999;
    }
  }
  .date {
    align-self: flex-start;
    margin-top: 16px;
    color: #b9b9b9;
  }
}
.FriendItem:hover {
  background: #d5d3d2;
}
</style>
