<template>
  <div class="SideMenu">
    <el-avatar shape="square" :size="42" :src="userInfo.avatar" />
    <el-menu
      active-text-color="#07C160"
      background-color="#2e2e2e"
      class="el-menu-vertical-demo"
      :default-active="route.path"
      text-color="#909090"
      collapse
      router
    >
      <el-menu-item v-for="item in menu" :key="item.name" :index="item.path">
        <Icon :icon="item.icon" size="26px" />
        <!-- <template #title>{{ item.name }}</template> -->
        <span>{{ item.name }}</span>
      </el-menu-item>
    </el-menu>
    <Icon class="logout" icon="ic:round-logout" size="26px" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { userInfo } = useStore('user')
type Menu = {
  icon: string
  name: string
  path: string
}
const menu: Menu[] = [
  { icon: 'bxs:message-rounded', name: '聊天', path: '/' },
  { icon: 'ep:avatar', name: '通讯录', path: '' },
  { icon: 'material-symbols:collections-bookmark', name: '收藏', path: '' },
  { icon: 'material-symbols:folder-open-rounded', name: '文件夹', path: '' },
  { icon: '', name: '朋友圈', path: '' },
  { icon: '', name: '', path: '' },
]
</script>

<style lang="less" scoped>
.SideMenu {
  display: flex;
  // overflow: hidden;
  flex-direction: column;
  align-items: center;
  padding-top: 35px;
  width: 55px;
  height: 100%;
  background: #2e2e2e;
  :deep(.el-menu) {
    margin-top: 25px;
    border: 0;
    width: 100%;
    /* stylelint-disable-next-line selector-class-pattern */
    .el-menu-tooltip__trigger {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0;
    }
    .el-menu-item {
      justify-content: center;
      padding: 0;
    }
    .el-menu-item:hover {
      background: inherit;
      color: white;
    }
  }
  .logout {
    margin-top: 90px;
    cursor: pointer;
    color: #909090;
    transition: all 0.3s;
  }
  .logout:hover {
    color: white;
  }
}
</style>
