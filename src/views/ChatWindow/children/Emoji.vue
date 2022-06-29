<template>
  <ul class="Emoji">
    <li v-for="item in emojiJson" :key="item" @click="$emit('emojiClick', item)">{{ item }}</li>
  </ul>
</template>

<script setup lang="ts">
import emojiJson from '~/common/emojiJson.json'
defineEmits(['emojiClick'])
</script>

<style lang="less" scoped>
.Emoji {
  display: flex;
  flex-wrap: wrap;
  width: 372px;
  user-select: none;
  li {
    width: 31px;
    height: 31px;
    line-height: 31px;
    font-size: 23px;
  }
  li:hover {
    background: #d5d3d2;
    cursor: pointer;
  }
}
</style>
