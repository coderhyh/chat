<template>
  <div ref="echertsRef" class="graph"></div>
</template>

<script setup lang="ts">
import { reqGraph } from '~/network/Index'
import { EChartsOption } from '~/types/echarts'

import { Graph } from './echerts.type'
const echarts = inject<any>('echarts')
const echertsRef = ref<HTMLDivElement | null>(null)
interface GraphNode {
  symbolSize: number
  label?: {
    show?: boolean
  }
}
// https://echarts.apache.org/examples/zh/editor.html?c=graph-circular-layout&lang=ts
onMounted(async () => {
  initEcharts()
})

const initEcharts = async () => {
  const myChart = echarts.init(echertsRef.value)
  myChart.showLoading()
  const graph: Graph = await reqGraph()
  myChart.hideLoading()

  graph.nodes.forEach(function (node: GraphNode) {
    node.label = {
      show: node.symbolSize > 30,
    }
  })

  const option: EChartsOption = {
    title: {
      text: 'Les Miserables',
      subtext: 'Circular layout',
      top: 'bottom',
      left: 'right',
    },
    tooltip: {},
    legend: [
      {
        data: graph.categories.map(function (a: { name: string }) {
          return a.name
        }),
      },
    ],
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [
      {
        name: 'Les Miserables',
        type: 'graph',
        layout: 'circular',
        circular: {
          rotateLabel: true,
        },
        data: graph.nodes,
        links: graph.links,
        categories: graph.categories,
        roam: true,
        label: {
          position: 'right',
          formatter: '{b}',
        },
        lineStyle: {
          color: 'source',
          curveness: 0.3,
        },
      },
    ],
  }

  myChart.setOption(option)
}
</script>

<style lang="less" scoped>
.graph {
  width: 500px;
  height: 500px;
}
</style>
