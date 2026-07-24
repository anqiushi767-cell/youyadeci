<script setup>
import { ref, onMounted } from 'vue'
import ThemeToggle from './ThemeToggle.vue'

const emit = defineEmits(['done'])
const lines = ref([])
const finished = ref(false)
const isTouch = matchMedia('(pointer: coarse)').matches
// 移动端开机动画更短
const step = isTouch ? 160 : 260
const script = [
  '> NOCTURNE OS v2.6 — 初始化中 ...',
  '> 加载胶片颗粒 ............ OK',
  '> 连接图床节点 ............ OK',
  '> 显影液温度 20°C ......... OK',
  '> 进入暗房 ▮'
]

function finish() { if (!finished.value) { finished.value = true; emit('done') } }

onMounted(() => {
  script.forEach((l, i) => setTimeout(() => lines.value.push(l), i * step))
  setTimeout(finish, script.length * step + 450)
})
</script>

<template>
  <div class="boot-screen" :class="{ done: finished }" @click="finish">
    <div class="boot-theme"><ThemeToggle /></div>
    <div class="boot-box">
      <p v-for="(l, i) in lines" :key="i" :class="{ dim: i < script.length - 1 }">{{ l }}</p>
      <span class="boot-caret"></span>
    </div>
  </div>
</template>