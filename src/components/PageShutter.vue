<script setup>
import { ref } from 'vue'

const running = ref(false)
let timer = null

// 播放三层绿色快门帘，在覆盖瞬间执行回调（路由跳转）
function play(mid) {
  if (running.value) { mid?.(); return }
  running.value = true
  setTimeout(() => mid?.(), 260)
  clearTimeout(timer)
  timer = setTimeout(() => { running.value = false }, 700)
}

defineExpose({ play })
</script>

<template>
  <div class="shutter" :class="{ run: running }" aria-hidden="true">
    <div class="shutter-panel p1"></div>
    <div class="shutter-panel p2"></div>
    <div class="shutter-panel p3"></div>
  </div>
</template>