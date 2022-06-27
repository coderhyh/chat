<template>
  <div class="Search">
    <section>
      <el-input v-model="value" class="w-50 m-2" placeholder="搜索" :prefix-icon="Search" />
      <el-button>+</el-button>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
const value = ref<string>('')
</script>

<style lang="less" scoped>
.Search {
  overflow: hidden;
  width: 100%;
  height: 65px;
  background: #f7f7f7;
  section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 26px auto 0;
    width: 230px;
    height: 27px;
    :deep(.el-input) {
      margin: 0 10px 0 0;
      height: 27px;
      /* stylelint-disable-next-line selector-class-pattern */
      .el-input__wrapper {
        border: 0;
        background: #e2e2e2;
      }
      .is-focus {
        background: white;
        box-shadow: 0 0 0 1px #dcdbda inset;
      }
    }
    .el-button {
      padding: 8px;
      height: 27px;
      background: #e2e2e2;
      line-height: 27px;
      font-size: 16px;
    }
  }
}
</style>
