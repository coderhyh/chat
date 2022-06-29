<template>
  <div class="InputBox">
    <div class="options">
      <!-- v-model:visible="showEmoji" -->
      <el-tooltip effect="light" placement="top" trigger="click" :hide-after="0">
        <template #content> <Emoji @emoji-click="emojiClick" /> </template>
        <Icon icon="fontisto:smiley" class="icon" size="20px" />
      </el-tooltip>
    </div>
    <div class="message">
      <textarea ref="textarea" v-model="value" autofocus @keydown.prevent.enter="submit" />
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
interface SendData {
  msg: string
  name: string
  right: boolean
  date: string
}

const socket = useSocket()
const { userName } = useStore('user')
const curFriendItem = inject<FriendList>('curFriendItem')

const emojiClick = (emoji: string) => {
  console.log(emoji)
}

const visible = ref<boolean>(false)
const textarea = ref<HTMLTextAreaElement>()
const value = ref<string>('')
const submit = (event: Event) => {
  if (/^ *$/g.test(value.value)) {
    visible.value = true
    value.value = ''
    setTimeout(() => {
      visible.value = false
    }, 1000)
    return
  }
  const nowDate = moment().format('YYYY-MM-DD HH:mm:ss')
  const sendData: SendData = { msg: value.value, name: userName.value, right: true, date: nowDate }
  socket?.emit('sendMsg', JSON.stringify(sendData))
  curFriendItem?.list.push(sendData)
  value.value = ''
  textarea.value?.focus()
}
const prompt = inject<Ref<HTMLAudioElement>>('prompt')
socket?.on('sendMsg', (e: SendData) => {
  curFriendItem?.list.push(e)
  prompt?.value.play()
})
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
