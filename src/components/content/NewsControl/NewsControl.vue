<template>
  <div :class="{ NewsControl: true, right: item.isMe }">
    <el-avatar
      :class="{ avatar: true, animate__animated: true, animate__shakeX: pai_yi_pai_flag }"
      shape="square"
      :size="45"
      :src="avatarUrl"
      tabindex="-1"
      @contextmenu="contextMenuFlag = true"
      @blur="contextMenuBlur"
    />
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
      <p class="date">
        {{ item.date }}
      </p>
    </section>

    <template v-if="!item.isMe">
      <div v-show="contextMenuFlag" class="contextMenu">
        <p @click="aiteTa">@{{ item.name }}</p>
        <p @click="pai_yi_pai">拍一拍</p>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
const { userInfo, friendTargets } = useStore('user')
const socket = useSocket()
const avatarUrl = 'https://www.coderhyh.top/logo.png'
const props = defineProps<{
  item: FriendListMsg
  previewList: string[] | undefined
}>()
const contextMenuFlag = ref<boolean>(false)
const contextMenuBlur = () =>
  setTimeout(() => {
    contextMenuFlag.value = false
  }, 200)

const aiteTa = () => {
  friendTargets.value.push({
    name: props.item.name as string,
    userId: props.item.userId as string,
  })
}

const pai_yi_pai_flag = ref<boolean>(false)
const pai_yi_pai = () => {
  socket.emit('contextmenu_avatar', {
    type: 'PAI_YI_PAI',
    receiveId: props.item.userId as string,
    receiveName: props.item.name as string,
    launchName: userInfo.value.name,
    launchId: socket.id,
  })
  changePai_yi_pai_flag()
}
const changePai_yi_pai_flag = () => {
  pai_yi_pai_flag.value = true
  setTimeout(() => {
    pai_yi_pai_flag.value = false
  }, 1500)
}
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
  position: relative;
  align-items: flex-start;
  margin: 10px 0;
  .contextMenu {
    position: absolute;
    left: 23px;
    top: 23px;
    border: 1px solid #858585;
    background: white;
    line-height: 34px;
    text-align: center;
    p {
      padding: 0 20px;
      cursor: pointer;
    }
    p:hover {
      background: #e2e2e2;
    }
  }
  .avatar {
    margin-top: 5px;
    cursor: pointer;
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
