<template>
  <div class="index">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>websocket</span>
          <span>name: {{ name }}</span>
          <el-button @click="logout">Logout</el-button>
        </div>
      </template>
      <section>
        <div ref="content" class="content">
          <NewsList :list="list" />
        </div>
        <div class="friendList"></div>
      </section>
      <div class="iptWrap">
        <div class="ipt">
          <el-input v-model="textarea" autosize type="textarea" placeholder="Please input" />
        </div>
        <el-button type="primary" @click="send">发送</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ListType } from './index.d'
const content = ref<HTMLDivElement | null>(null)
const { name } = useStore('user')
const property = inject<GlobalProperties>('property')
const list = ref<ListType[]>([])
const textarea = ref<string>('')
const client = new WebSocket('ws://101.43.173.17:5000')
client.onopen = (e: Event) => {
  property?.$message('连接成功', 'success')
}
client.onmessage = (e: MessageEvent<any>) => {
  const data = JSON.parse(e.data)
  const _name = data.name._object.name
  list.value.push({
    val: data.msg,
    isMe: _name === name.value,
    name: _name,
  })
  nextTick(setScroll)
}
const setScroll = () => {
  const contentItem: HTMLDivElement = content.value?.children[0] as HTMLDivElement
  const h: number = contentItem.offsetHeight
  content.value!.scrollTop = h
}
client.onerror = (err: Event) => {
  property?.$message('err', 'error')
}
const send = () => {
  client.send(
    JSON.stringify({
      name: name,
      msg: textarea.value,
    })
  )
  textarea.value = ''
}
const router = useRouter()
const logout = () => {
  name.value = ''
  router.replace('/login')
  property?.$message('退出成功', 'success')
}
</script>

<style lang="less" scoped>
.index {
  padding-top: 10px;
  width: 100%;
  height: 100vh;
  .box-card {
    overflow: hidden;
    margin: 0 auto;
    padding: 20px;
    border-radius: 10px;
    width: 50%;
    min-height: 500px;
    background: white;
    box-shadow: 5px 5px 15px #eee;
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    section {
      display: flex;
      overflow: hidden;
      border-radius: 10px;
      height: 400px;
      background: #eaedf4;
      .content,
      .friendList {
        box-sizing: border-box;
        padding: 18px;
      }
      .content {
        overflow-y: auto;
        border-right: 1px solid #dfdfdf;
        width: 660px;
      }
      .friendList {
        flex: 1;
        height: 100%;
      }
    }
    .iptWrap {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-top: 16px;
      width: 660px;
      .ipt {
        width: 570px;
      }
    }
  }
}
</style>
