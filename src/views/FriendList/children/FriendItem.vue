<template>
  <div class="FriendItem">
    <el-avatar shape="square" :size="40" :src="avatar || defaultImg" />
    <section>
      <p class="name line1">{{ name }}</p>
      <div class="msg line1">{{ msg }}</div>
    </section>
    <div class="date">{{ date }}</div>
  </div>
</template>

<script setup lang="ts">
import defaultImg from '~/assets/imgs/logo.png'
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
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0 10px;
    width: 128px;
    height: 40px;
    .name {
      font-size: 14px;
      color: #000;
    }
    .msg {
      font-size: 12px;
      color: #999;
    }
  }
  .date {
    align-self: flex-start;
    margin-top: 16px;
    width: 36px;
    color: #b9b9b9;
  }
}
.FriendItem:hover {
  background: #d5d3d2;
}
</style>
