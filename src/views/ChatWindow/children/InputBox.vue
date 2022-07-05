<template>
  <div class="InputBox">
    <div class="options">
      <!-- v-model:visible="showEmoji" -->
      <el-tooltip v-model:visible="isShowEmoji" effect="light" placement="top" :hide-after="200">
        <template #content> <Emoji @emoji-click="(emoji) => (value += emoji)" /> </template>
        <Icon
          icon="fontisto:smiley"
          class="icon"
          size="20px"
          tabindex="-1"
          @click="isShowEmoji = !isShowEmoji"
          @blur="emojiBlur"
        />
      </el-tooltip>
    </div>
    <div class="message">
      <textarea
        ref="textarea"
        v-model="value"
        autofocus
        @paste="onHandlePaste"
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

import { handlePaste, systematicNotification } from '../common'
import Emoji from './Emoji.vue'
const socket = useSocket()
const { userInfo, friendTargets } = useStore('user')
const { $isUserExist } = useUtils()
const curFriendItem = inject<FriendList>('curFriendItem')

const visible = ref<boolean>(false)
const textarea = ref<HTMLTextAreaElement>()
const value = ref<string>('')

const isShowEmoji = ref<boolean>(false)
const emojiBlur = () =>
  setTimeout(() => {
    isShowEmoji.value = false
    textarea.value?.focus()
  }, 250)

// @功能
// eslint-disable-next-line no-undef
const friendTarget_Watch = (target: User.FriendTargets[]) => {
  if (!target.length) return
  const lastIndex = target.length - 1
  const name = target[lastIndex].name
  value.value += ` @${name} `
  textarea.value?.focus()
}
watch(friendTargets, friendTarget_Watch, { deep: true })

interface SendDataType {
  msg: string
  type: FriendListMsg['type']
}
const sendData = ({ msg, type }: SendDataType) => {
  const nowDate = moment().format('YYYY-MM-DD HH:mm:ss')
  const sendData: FriendListMsg = {
    msg,
    name: userInfo.value.name,
    isMe: true,
    date: nowDate,
    type,
    userId: socket.id,
  }
  let aiteTargets = undefined
  // 过滤 @
  if (type === 'text') {
    aiteTargets = friendTargets.value
      .filter((e) => msg.indexOf('@' + e.name) !== -1)
      .map((e) => e.userId)
    aiteTargets = Array.from(new Set(aiteTargets))
    friendTargets.value = []
  }
  socket?.emit('sendMsg', sendData, aiteTargets)
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
  sendData({
    msg: value.value,
    type: 'text',
  })
}
// 广播接收消息 + 提示音
// eslint-disable-next-line no-undef
const prompt = inject<Prompt>('prompt')
socket?.on('sendMsg', (e: FriendListMsg) => {
  curFriendItem?.list.push(e)
  prompt?.newMsgVoice.play()

  const isUserExist: false | 'Exist' | 'Leave' = $isUserExist()
  if (isUserExist && isUserExist === 'Leave') systematicNotification(e)
})
// 粘贴图片
const onHandlePaste = async (event: ClipboardEvent) => {
  const res = await handlePaste(event).catch((err) => err)
  res !== 'null' && sendData({ msg: res, type: 'image' })
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
