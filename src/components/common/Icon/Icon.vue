<template>
  <el-icon :size="size || 12">
    <i :class="className" />
  </el-icon>
</template>

<script setup lang="ts">
const props = defineProps<{
  icon?: string | unknown
  size?: string
}>()

const className = computed(() => {
  const { icon } = props
  return [icon || 'carbon:unknown']
})
const icons = [
  'bxs:message-rounded',
  'ep:avatar',
  'material-symbols:collections-bookmark',
  'material-symbols:screenshot-monitor-outline',
  'material-symbols:folder-open-rounded',
  'fontisto:smiley',
  'material-symbols:more-horiz',
  'ic:round-logout',
]
</script>

<style lang="less">
:root {
  --el-menu-icon-width: auto;
}
</style>
