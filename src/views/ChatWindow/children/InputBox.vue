<template>
  <div class="InputBox">
    <div class="options">
      <Icon icon="fontisto:smiley" size="20px" />
    </div>
    <div class="message">
      <textarea v-model="value" autofocus @keydown.prevent.enter="submit" />
    </div>
    <div class="submit">发送</div>
  </div>
</template>

<script setup lang="ts">
const value = ref<string>('')
const submit = (event: Event) => {
  console.log('发送')
}
</script>

<style lang="less" scoped>
.InputBox {
  display: flex;
  flex-direction: column;
  padding: 15px 30px 0;
  border-top: 1px solid #ececec;
  height: 150px;
  .options {
    height: 20px;
    color: #494949;
  }
  .message {
    margin-top: 10px;
    height: 55px;
    textarea {
      width: 100%;
      height: 100%;
      background: initial;
      font-size: 15px;
      color: black;
    }
  }
  .submit {
    align-self: flex-end;
    margin-top: 9px;
    border-radius: 5px;
    width: 80px;
    height: 32px;
    background: #e9e9e9;
    line-height: 32px;
    text-align: center;
    font-size: 16px;
    color: #07c160;
  }
  .submit:hover {
    background: #d2d2d2;
  }
}
</style>
