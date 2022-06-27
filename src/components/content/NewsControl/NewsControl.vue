<template>
  <div :class="{ NewsControl: true, right }">
    <section>
      <span>{{ name }}</span>
      <el-avatar class="avatar" shape="square" :size="45" :src="avatarUrl" />
    </section>
    <pre class="msg">{{ value }}</pre>
  </div>
</template>

<script lang="ts" setup>
const avatarUrl = 'https://www.coderhyh.top/logo.png'
defineProps<{
  value: string
  right?: boolean
  name: string
}>()
</script>

<style lang="less" scoped>
.right {
  justify-content: flex-end;
  section {
    order: 3;
  }
  .msg {
    background: #95ec69 !important;
  }
}
.NewsControl {
  display: flex;
  align-items: flex-start;
  margin: 10px 0;
  section {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .msg {
    order: 2;
    box-sizing: border-box;
    margin: 19px 10px 0;
    padding: 5px 10px;
    border-radius: 15px;
    max-width: 500px;
    background: white;
    line-height: 30px;
    /* stylelint-disable-next-line font-family-no-missing-generic-family-keyword */
    font-family: '微软雅黑';
    font-size: 16px;
    color: #232323;
    letter-spacing: 1px;
    white-space: pre-wrap;
  }
}
</style>
