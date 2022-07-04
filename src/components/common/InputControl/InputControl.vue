<template>
  <div class="form-control">
    <input v-model="value" :type="type ?? 'text'" :class="{ ipt: value.length }" />
    <label>
      <span
        v-for="(item, index) in title"
        :key="item"
        :style="{ 'transition-delay': `${index * 50}ms` }"
        >{{ item }}</span
      >
    </label>
    <div class="line"></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  modelValue: string
  type?: string
}>()
const emit = defineEmits(['update:modelValue'])
const value = ref<string>('')
watch(
  () => value.value,
  (val: string) => {
    value.value = val.trim()
    emit('update:modelValue', val.trim())
  }
)
</script>

<style scoped lang="less">
.form-control {
  position: relative;
  margin: 23px auto 0;
  width: 190px;
  .line {
    position: absolute;
    bottom: 0;
    width: 0;
    height: 2px;
    background: rgb(126, 201, 226);
    transition: all 0.3s;
  }
  input {
    display: block;
    padding: 10px 0 5px;
    border: 0;
    border-bottom: 2px #000 solid;
    width: 100%;
    background-color: transparent;
    font-size: 15px;
    color: rgb(126, 201, 226);
  }
  label {
    position: absolute;
    left: 0;
    top: 10px;
    pointer-events: none;
  }
  label span {
    display: inline-block;
    min-width: 5px;
    font-size: 18px;
    color: #000;
    transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
  .ipt,
  input:focus {
    // border-bottom-color: rgb(185, 223, 219);
    outline: 0;
    ~ .line {
      width: 100%;
    }
    + label span {
      color: rgb(126, 201, 226);
      transform: translateY(-23px);
    }
  }
}
</style>
