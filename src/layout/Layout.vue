<template>
  <el-card class="box-card">
    <Layout.SideMenu />
    <router-view class="ovo" />
  </el-card>
</template>

<script setup lang="ts">
import * as Layout from '~/layout'
</script>

<style lang="less" scoped>
.box-card {
  margin: 20px auto 0;
  width: 860px;
  height: 570px;
  /* stylelint-disable-next-line selector-class-pattern */
  :deep(.el-card__body) {
    display: flex;
    padding: 0;
    width: 100%;
    height: 100%;
    .ovo main {
      width: 250px;
      height: 100%;
    }
  }
}
</style>
