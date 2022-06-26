<template>
  <div ref="echertsRef" class="earth"></div>
</template>

<script setup lang="ts">
const echarts = inject<any>('echarts')
const echertsRef = ref<HTMLDivElement | null>(null)
const ROOT_PATH = 'https://fastly.jsdelivr.net/gh/apache/echarts-website@asf-site/examples'

onMounted(initEcharts)
function initEcharts() {
  const myChart = echarts.init(echertsRef.value)
  const option = {
    backgroundColor: '#000',
    globe: {
      baseTexture: ROOT_PATH + '/data-gl/asset/earth.jpg',
      shading: 'lambert',
      environment: '#FAFAFA',
      atmosphere: {
        show: true,
      },
      light: {
        ambient: {
          intensity: 0.7,
        },
        main: {
          intensity: 0.7,
        },
      },
    },
    series: [],
  }

  option && myChart.setOption(option)
}
</script>

<style lang="less" scoped>
.earth {
  width: 500px;
  height: 500px;
}
</style>
