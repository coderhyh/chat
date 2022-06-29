<template>
  <div :class="{ NewsControl: true, right: item.right }">
    <el-avatar class="avatar" shape="square" :size="45" :src="avatarUrl" />
    <section>
      <span>{{ item.name }}</span>
      <pre class="msg">{{ item.msg }}</pre>
      <p class="date">{{ item.date }}</p>
    </section>
  </div>
</template>

<script lang="ts" setup>
const avatarUrl = 'https://www.coderhyh.top/logo.png'
interface SendData {
  msg: string
  name: string
  right: boolean
  date: string
}
defineProps<{
  item: SendData
}>()
</script>

<style lang="less" scoped>
.right {
  justify-content: flex-end;
  .avatar {
    order: 1;
  }
  section {
    span {
      margin: 0 13px 5px 0 !important;
      text-align: right;
    }
    .msg {
      align-self: flex-end !important;
      background: #95ec69 !important;
    }
    .date {
      margin: 5px 13px 5px 0 !important;
      text-align: right;
    }
  }
}
.NewsControl {
  display: flex;
  align-items: flex-start;
  margin: 10px 0;
  .avatar {
    margin-top: 5px;
  }
  section {
    display: flex;
    flex-direction: column;
    span {
      margin: 0 0 5px 13px;
      font-size: 14px;
    }
    .msg {
      align-self: flex-start;
      box-sizing: border-box;
      margin: 0 10px;
      padding: 7px 10px;
      border-radius: 8px;
      max-width: 500px;
      max-width: 370px;
      background: white;
      line-height: 25px;
      /* stylelint-disable-next-line font-family-no-missing-generic-family-keyword */
      font-family: '微软雅黑';
      font-size: 15px;
      color: #232323;
      letter-spacing: 0.5px;
      white-space: pre-wrap;
    }
    .date {
      margin: 5px 0 5px 13px;
      font-size: 12px;
      color: rgb(173, 173, 173);
    }
  }
}
</style>
