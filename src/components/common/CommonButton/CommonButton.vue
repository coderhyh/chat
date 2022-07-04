<template>
  <div class="CommonButton">
    <span class="top-key"></span>
    <span class="text">{{ name ?? 'button' }}</span>
    <span class="bottom-key-1"></span>
    <span class="bottom-key-2"></span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string
}>()
</script>

<style lang="less" scoped>
.CommonButton {
  display: inline-block;
  overflow: visible;
  position: relative;
  box-sizing: border-box;
  margin: 0;
  padding: 0.3em 2em;
  border: 2px solid #000;
  border-radius: 0;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  user-select: none;
  text-decoration: none;
  text-align: center;
  text-transform: none;
  font-weight: 700;
  font-size: 13px;
  color: #fff;
  letter-spacing: 0.05em;
  transition: all 0.3s ease-in-out;
  .text {
    display: block;
    padding-left: 2em;
    /* stylelint-disable-next-line number-max-precision */
    line-height: 1.33333em;
    text-decoration: none;
    text-align: left;
    text-transform: uppercase;
    font-size: 1.125em;
    color: black;
    transition: all 0.3s ease-in-out;
  }
  .top-key {
    position: absolute;
    left: 0.625rem;
    top: -2px;
    width: 1.5625rem;
    height: 2px;
    background: #e8e8e8;
    transition: width 0.5s ease-out, left 0.3s ease-out;
  }
  .bottom-key-1 {
    position: absolute;
    right: 1.875rem;
    bottom: -2px;
    width: 1.5625rem;
    height: 2px;
    background: #e8e8e8;
    transition: width 0.5s ease-out, right 0.3s ease-out;
  }
  .bottom-key-2 {
    position: absolute;
    right: 0.625rem;
    bottom: -2px;
    width: 0.625rem;
    height: 2px;
    background: #e8e8e8;
    transition: width 0.5s ease-out, right 0.3s ease-out;
  }
  &::before {
    position: absolute;
    left: 1.5em;
    top: 50%;
    width: 1.5625rem;
    height: 2px;
    background: black;
    content: ' ';
    transform: translateY(-50%);
    transform-origin: center;
    transition: background 0.3s linear, width 0.3s linear;
  }
  &:hover {
    background: black;
    color: white;
    .text {
      padding-left: 1.5em;
      color: white;
    }
    .top-key {
      left: -2px;
      width: 0;
    }
    .bottom-key-1,
    .bottom-key-2 {
      right: 0;
      width: 0;
    }
    &::before {
      width: 0.9375rem;
      background: white;
    }
  }
}
</style>
