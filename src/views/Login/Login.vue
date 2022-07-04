<template>
  <div class="Login">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>We Chat</span>
          <el-button text @click="isLogin = !isLogin">
            {{ isLogin ? 'Sign up' : 'Login' }}
          </el-button>
        </div>
      </template>
      <img v-if="isLogin" class="avatar" src="~~/assets/imgs/wxicon.jpg" alt="wxIcon" />
      <el-upload
        v-else
        class="avatar-uploader"
        action=""
        :auto-upload="false"
        :show-file-list="false"
        :on-change="uploadChange"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
      <InputControl v-model="userName" title="userName" />
      <InputControl v-model="password" title="passWord" type="password" />
      <CommonButton class="button" :name="isLogin ? 'LOGIN' : 'SIGN UP'" @click="submit" />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'
const userName = ref<string>('')
const password = ref<string>('')
const isLogin = ref<boolean>(true)
const imageUrl = ref('')
const imageFile = ref<File>()
// const { userName } = useStore('user')
const socket = useSocket()
const router = useRouter()
const login = () => {}
const signup = () => {}
const submit = async () => {
  isLogin.value ? login() : signup()
  // userName.value = value.value
  // socket.auth = { userName: value.value }
  // await router.push('/')
  // socket.connect()
}
const uploadChange: UploadProps['onChange'] = (file, files) => {
  if (file.raw?.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (file.raw?.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }

  imageUrl.value = URL.createObjectURL(file.raw!)
  imageFile.value = file.raw
}
</script>

<style lang="less" scoped>
.Login {
  width: 100%;
  height: 100vh;
  .avatar {
    display: block;
    margin: 0 auto;
    width: 100px;
  }
  .box-card {
    margin: 10% auto 0;
    width: 280px;
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    /* stylelint-disable-next-line selector-class-pattern */
    :deep(.el-card__body) {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .button {
      margin: 30px 0 0;
    }
  }
}
:deep(.avatar-uploader) {
  .el-upload {
    overflow: hidden;
    position: relative;
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    transition: var(--el-transition-duration-fast);
  }
  .el-upload:hover {
    border-color: var(--el-color-primary);
  }
  .el-icon.avatar-uploader-icon {
    width: 100px;
    height: 100px;
    text-align: center;
    font-size: 28px;
    color: #8c939d;
  }
}
</style>
