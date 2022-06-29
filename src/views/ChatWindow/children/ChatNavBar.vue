<template>
  <div class="ChatNavBar">
    <h2>{{ curFriendItem?.name }}</h2>
    <el-dropdown trigger="hover">
      <Icon class="icon" icon="material-symbols:more-horiz" size="22px" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item class="dropdownItem" @click="clearRecord"
            >清除聊天记录</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
const curFriendItem = inject<FriendList>('curFriendItem')

const clearRecord = () => {
  curFriendItem!.list = []
}
</script>

<style lang="less" scoped>
.ChatNavBar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e7e7e7;
  width: 100%;
  height: 65px;
  background: #f5f5f5;
  h2 {
    margin-left: 25px;
    line-height: 65px;
    font-size: 21px;
  }
  .icon {
    margin-right: 20px;
    cursor: pointer;
  }
}
</style>
<style lang="less">
.dropdownItem {
  color: #f45454 !important;
}
.dropdownItem:hover {
  background: #ececec !important;
}
</style>
