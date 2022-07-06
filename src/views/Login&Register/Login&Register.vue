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
      <InputControl v-model="userName" title="userName" @keydown.enter="submit" />
      <el-tooltip effect="light" content="6-12位" placement="right">
        <InputControl v-model="passWord" title="passWord" type="password" @keydown.enter="submit" />
      </el-tooltip>
      <CommonButton class="button" :name="isLogin ? 'LOGIN' : 'SIGN UP'" @click="submit" />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'

import { reqLogin, reqSignup } from '~/network/user'
type ReqLoginRes = {
  code: number
  msg: string
  userName: string
  userId: string
  avatar: string
  token: string
}
type ReqSignupRes = Pick<ReqLoginRes, 'code' | 'msg'>
const userName = ref<string>('')
const passWord = ref<string>('')
const isLogin = ref<boolean>(true)
const imageUrl = ref('')
const imageFile = ref<File>()
const { userInfo, token } = useStore('user')
const { $message } = useUtils()
const socket = useSocket()
const router = useRouter()
const login = async () => {
  const res: ReqLoginRes = await reqLogin({
    userName: userName.value,
    passWord: passWord.value,
  })
  if (res.code === 200) {
    userInfo.value = {
      userId: res.userId,
      userName: res.userName,
      avatar: res.avatar,
    }
    token.value = res.token
    socket.auth = { token: token.value }
    $message(res.msg, 'success')
    await router.push('/')
    socket.connect()
  } else $message(res.msg, 'error')
}
const signup = async () => {
  const formData = new FormData()
  formData.append('userName', userName.value)
  formData.append('passWord', passWord.value)
  formData.append('avatar', imageFile.value!)
  const res: ReqSignupRes = await reqSignup(formData)
  $message(res.msg, res.code === 200 ? 'success' : 'error')
  res.code === 200 && (isLogin.value = true)
}
const submit = async () => {
  if (!userName.value || !passWord.value) {
    $message('输入不可有空 !', 'error')
    return
  }
  if (!isLogin.value && !imageFile.value) {
    $message('请上传头像 !', 'error')
    return
  }
  if (!/^\w{6,12}$/g.test(passWord.value)) {
    $message('请输入数字、字母、下划线6-12位密码 !', 'error')
    return
  }
  isLogin.value ? login() : signup()
}
const uploadChange: UploadProps['onChange'] = (file, files) => {
  if (file.raw?.type !== 'image/jpeg') {
    $message('Avatar picture must be JPG format!', 'error')
    return false
  } else if (file.raw?.size / 1024 / 1024 > 2) {
    $message('Avatar picture size can not exceed 2MB!', 'error')
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
