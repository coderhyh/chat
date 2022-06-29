<template>
  <div :class="{ NewsControl: true, right: item.isMe }">
    <el-avatar class="avatar" shape="square" :size="45" :src="avatarUrl" />
    <section>
      <span>{{ item.name }}</span>
      <pre v-if="item.type === 'text'" class="msg">{{ item.msg }}</pre>
      <el-image
        v-else
        hide-on-click-modal
        :src="item.msg"
        :initial-index="previewList?.findIndex((e) => e === item.msg)"
        fit="cover"
        :preview-src-list="previewList"
      />
      <!-- :preview-src-list="srcList" -->
      <p class="date">{{ item.date }}</p>
    </section>
  </div>
</template>

<script lang="ts" setup>
const avatarUrl = 'https://www.coderhyh.top/logo.png'
defineProps<{
  item: FriendListMsg
  previewList: string[] | undefined
}>()
</script>

<style lang="less" scoped>
.right {
  justify-content: flex-end;
  .avatar {
    order: 1;
  }
  section {
    align-items: flex-end;
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
    :deep(.el-image) {
      margin-right: 13px;
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
    word-wrap: break-word;
    white-space: normal;
    span {
      margin: 0 0 5px 13px;
      font-size: 14px;
    }
    :deep(.el-image) {
      margin-left: 13px;
      max-width: 100px;
    }
    .msg {
      overflow: auto;
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
      word-wrap: break-word;
      word-break: break-all;
      letter-spacing: 0.5px;
      white-space: pre-wrap;
      white-space: -moz-pre-wrap;
      white-space: -pre-wrap;
      white-space: -o-pre-wrap;
    }
    .date {
      margin: 5px 0 5px 13px;
      font-size: 12px;
      color: rgb(173, 173, 173);
    }
  }
}
</style>
