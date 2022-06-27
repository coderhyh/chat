<template>
  <div class="FriendItem">
    <el-avatar shape="square" :size="40" src="https://www.coderhyh.top/logo.png" />
    <section>
      <p class="name">黄玉豪</p>
      <div class="msg">海南鸡饭双倍积分</div>
    </section>
    <div class="date">00:00</div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.FriendItem {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 0 13px;
  width: 100%;
  height: 65px;
  background: #ece9e8;
  section {
    margin: 0 10px;
    width: 140px;
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
  }
}
</style>
