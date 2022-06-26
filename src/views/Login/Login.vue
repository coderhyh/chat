<template>
  <div class="Login">
    <el-card class="box-card">
      <template #header>
        <span>Your Name</span>
      </template>
      <el-input v-model="value" placeholder="Your Name" @keyup.enter="submit" />
      <el-button class="submit" type="primary" @click="submit">Login</el-button>
    </el-card>
  </div>
</template>

<script setup lang="ts">
const value = ref<string>('')
const user = useStore('user')
const router = useRouter()
const submit = () => {
  user.setName(value.value)
  router.push('/')
}
</script>

<style lang="less" scoped>
.Login {
  width: 100%;
  height: 100vh;
  .box-card {
    margin: 10% auto 0;
    width: 500px;
    .submit {
      display: block;
      margin: 15px auto 0;
    }
  }
}
</style>
