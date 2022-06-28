<template>
  <div class="InputBox">
    <div class="options">
      <Icon icon="fontisto:smiley" size="20px" />
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

const socket = useSocket()
const { userName } = useStore('user')
const curFriendItem = inject<FriendList>('curFriendItem')

const visible = ref<boolean>(false)
const textarea = ref<HTMLTextAreaElement>()
const value = ref<string>('')
const submit = (event: Event) => {
  if (value.value.length === 0) {
    visible.value = true
    setTimeout(() => {
      visible.value = false
    }, 1000)
    return
  }
  socket?.emit('sendMsg', value.value)
  const nowDate = moment().format('YYYY-MM-DD HH:mm:ss')
  curFriendItem?.list.push({ msg: value.value, name: userName.value, right: true, date: nowDate })
  value.value = ''
  textarea.value?.focus()
}
socket?.on('sendMsg', (e: string) => {
  const nowDate = moment().format('YYYY-MM-DD HH:mm:ss')
  curFriendItem?.list.push({ msg: e, name: userName.value, right: false, date: nowDate })
})
watch(value, (val: string) => (value.value = val.trim()))
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
