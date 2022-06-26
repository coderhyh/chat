<template>
  <div class="NewsList">
    <NewsControl
      v-for="item in list"
      :key="item.val"
      :right="item.isMe"
      :value="item.val"
      :name="item.name"
    />
  </div>
</template>

<script lang="ts" setup>
import { ListType } from '~/views/Index/index.d'
defineProps<{
  list: ListType[]
}>()
</script>

<style lang="less" scoped>
.NewsList {
  :deep(.NewsControl:first-child) {
    margin-top: 0;
  }
  :deep(.NewsControl:last-child) {
    margin-bottom: 0;
  }
}
</style>
