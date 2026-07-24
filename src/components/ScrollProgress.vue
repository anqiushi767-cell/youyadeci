<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const bar = ref(null)
let raf = null
function update() {
  raf = null
  const h = document.documentElement
  const max = h.scrollHeight - h.clientHeight
  const p = max > 0 ? h.scrollTop / max : 0
  bar.value?.style.setProperty('transform', `scaleX(${p})`)
}
function onScroll() { if (!raf) raf = requestAnimationFrame(update) }

onMounted(() => {
  addEventListener('scroll', onScroll, { passive: true })
  update()
})
onBeforeUnmount(() => removeEventListener('scroll', onScroll))
</script>

<template>
  <div ref="bar" class="scroll-progress"></div>
</template>