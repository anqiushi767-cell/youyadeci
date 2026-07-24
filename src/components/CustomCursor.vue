<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const dot = ref(null), ring = ref(null)
let x = 0, y = 0, rx = 0, ry = 0, raf = null

function loop() {
  rx += (x - rx) * 0.16; ry += (y - ry) * 0.16
  dot.value?.style.setProperty('transform', `translate(${x}px, ${y}px) translate(-50%,-50%)`)
  ring.value?.style.setProperty('transform', `translate(${rx}px, ${ry}px) translate(-50%,-50%)`)
  raf = requestAnimationFrame(loop)
}
function onMove(e) { x = e.clientX; y = e.clientY }
function onOver(e) {
  const img = e.target.closest('.photo-card, .stack-card')
  const link = e.target.closest('a, button, .chip, input')
  ring.value?.classList.toggle('is-view', !!img)
  ring.value?.classList.toggle('is-hover', !!link && !img)
  if (ring.value) ring.value.textContent = img ? 'VIEW' : ''
}

onMounted(() => {
  if (!matchMedia('(pointer: fine)').matches) return // 触屏设备不启用
  document.body.classList.add('cursor-fx')
  addEventListener('mousemove', onMove)
  addEventListener('mouseover', onOver)
  raf = requestAnimationFrame(loop)
})
onBeforeUnmount(() => {
  document.body.classList.remove('cursor-fx')
  removeEventListener('mousemove', onMove)
  removeEventListener('mouseover', onOver)
  cancelAnimationFrame(raf)
})
</script>

<template>
  <div ref="dot" class="cursor-dot"></div>
  <div ref="ring" class="cursor-ring"></div>
</template>