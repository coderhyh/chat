<template>
  <div class="InputBox">
    <div class="options">
      <!-- v-model:visible="showEmoji" -->
      <el-tooltip effect="light" placement="top" trigger="click" :hide-after="0">
        <template #content> <Emoji @emoji-click="(emoji) => (value += emoji)" /> </template>
        <Icon icon="fontisto:smiley" class="icon" size="20px" />
      </el-tooltip>
    </div>
    <div class="message">
      <textarea
        ref="textarea"
        v-model="value"
        autofocus
        @paste="handlePaste"
        @keydown.prevent.enter="submit"
      />
    </div>
    <el-tooltip
      v-model:visible="visible"
      class="box-item"
      effect="light"
      content="不可以发空消息"
      :enterable="false"
      placement="top-end"
    >
      <div class="submit" @click="submit">发送</div>
    </el-tooltip>
  </div>
</template>

<script setup lang="ts">
import moment from 'moment'
import { Ref } from 'vue'

import Emoji from './Emoji.vue'
const socket = useSocket()
const { userName } = useStore('user')
const { $blobToDataURL, $isUserExist } = useUtils()
const curFriendItem = inject<FriendList>('curFriendItem')

const visible = ref<boolean>(false)
const textarea = ref<HTMLTextAreaElement>()
const value = ref<string>('')

const sendData = (msg: string, type: FriendListMsg['type'], isMe = false) => {
  const nowDate = moment().format('YYYY-MM-DD HH:mm:ss')
  const sendData: FriendListMsg = {
    msg,
    name: userName.value,
    isMe, // 默认左边
    date: nowDate,
    type,
  }
  socket?.emit('sendMsg', sendData)
  curFriendItem?.list.push(sendData)
  value.value = ''
  textarea.value?.focus()
}
const submit = (event: Event) => {
  if (/^ *$/g.test(value.value)) {
    visible.value = true
    value.value = ''
    setTimeout(() => {
      visible.value = false
    }, 1000)
    return
  }
  sendData(value.value, 'text', true)
}
// 广播接收消息 + 提示音
// eslint-disable-next-line no-undef
let timer: NodeJS.Timeout
const prompt = inject<Prompt>('prompt')
socket?.on('sendMsg', (e: FriendListMsg) => {
  curFriendItem?.list.push(e)
  prompt?.newMsgVoice.play()

  const isUserExist: false | 'Exist' | 'Leave' = $isUserExist()
  if (isUserExist && isUserExist === 'Leave') systematicNotification(e)
})
// 系统通知
const systematicNotification = (e: FriendListMsg) => {
  clearTimeout(timer)
  timer = setTimeout(() => {
    const body = e?.type === 'image' ? `${e?.name}: [涩涩图]` : `${e?.name}: ${e?.msg}`
    new Notification('新消息', {
      body,
      icon: 'https://www.coderhyh.top/logo.png',
    })
  }, 1000)
}

// 粘贴图片
const handlePaste = (event: ClipboardEvent) => {
  // eslint-disable-next-line no-unsafe-optional-chaining
  const items = event?.clipboardData?.items
  let file = null
  if (!items || items.length === 0) {
    // self?.$message('当前浏览器不支持本地')
    return
  }
  if (items?.[0].type.indexOf('image') !== -1) file = items?.[0].getAsFile()
  if (!file) return

  $blobToDataURL(file, (base64Url: string) => {
    sendData(base64Url, 'image', true)
  })
  // const reader = new FileReader()
  // reader.onload = (event: ProgressEvent<FileReader>) => {
  //   preview.innerHTML = `<img id="pase-img" src="${event?.target?.result}" style="width: 100%">`
  // }
  // reader.readAsDataURL(file)
  // this.pasteFile = file
}
</script>

<style lang="less" scoped>
.InputBox {
  display: flex;
  flex-direction: column;
  padding: 15px 30px 0;
  border-top: 1px solid #ececec;
  height: 150px;
  .options {
    height: 20px;
    color: #494949;
    .icon {
      cursor: pointer;
    }
  }
  .message {
    margin-top: 10px;
    height: 55px;
    textarea {
      width: 100%;
      height: 100%;
      background: initial;
      font-size: 15px;
      color: black;
    }
  }
  .submit {
    align-self: flex-end;
    margin-top: 9px;
    border-radius: 5px;
    width: 80px;
    height: 32px;
    background: #e9e9e9;
    cursor: pointer;
    user-select: none;
    line-height: 32px;
    text-align: center;
    font-size: 16px;
    color: #07c160;
  }
  .submit:hover {
    background: #d2d2d2;
  }
}
</style>
