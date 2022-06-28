<template>
  <div class="ChatWindow">
    <ChatNavBar />
    <div class="main">
      <NewsControl value="回复数部副教授" name="dasfd" right />
    </div>
    <InputBox />
  </div>
</template>

<script setup lang="ts">
import ChatNavBar from './children/ChatNavBar.vue'
import InputBox from './children/InputBox.vue'
const { initSocket, socket } = useStore('socket')
initSocket()

socket.value?.on('connect', () => {
  socket.value?.emit('hehe', '666')
  socket.value?.on('connectSuccess', (e: string) => {
    console.log(e)
  })
})
</script>

<style lang="less" scoped>
.ChatWindow {
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
  .main {
    flex: 1;
    padding: 12px 30px;
    width: auto;
  }
}
</style>
