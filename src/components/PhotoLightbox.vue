<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { albumById } from '../data/photos'

const props = defineProps({
  list: { type: Array, required: true },
  index: { type: Number, required: true }
})
const emit = defineEmits(['close', 'nav'])

const photo = computed(() => props.list[props.index])
const imgRef = ref(null)
const go = d => emit('nav', (props.index + d + props.list.length) % props.list.length)

function onKey(e) {
  if (e.key === 'Escape') emit('close')
  if (e.key === 'ArrowRight') go(1)
  if (e.key === 'ArrowLeft') go(-1)
}

// 移动端：左右滑动切换，下滑关闭
let sx = 0, sy = 0, dragging = false
function onStart(e) {
  const t = e.touches[0]; sx = t.clientX; sy = t.clientY; dragging = true
}
function onMove(e) {
  if (!dragging || !imgRef.value) return
  const t = e.touches[0]
  const dx = t.clientX - sx, dy = t.clientY - sy
  imgRef.value.style.transform = `translate(${dx * 0.4}px, ${Math.max(0, dy) * 0.4}px)`
  imgRef.value.style.opacity = String(Math.max(0.45, 1 - Math.abs(dx) / 500))
}
function onEnd(e) {
  if (!dragging) return
  dragging = false
  const t = e.changedTouches[0]
  const dx = t.clientX - sx, dy = t.clientY - sy
  if (imgRef.value) { imgRef.value.style.transform = ''; imgRef.value.style.opacity = '' }
  if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1)
  else if (dy > 90) emit('close')
}

onMounted(() => {
  addEventListener('keydown', onKey)
  document.body.style.overflow = 'hidden'
})
onBeforeUnmount(() => {
  removeEventListener('keydown', onKey)
  document.body.style.overflow = ''
})
</script>

<template>
  <div class="lightbox" @click.self="emit('close')">
    <button class="lb-btn lb-close" @click="emit('close')">✕</button>
    <button class="lb-btn lb-side lb-prev" @click="go(-1)">←</button>
    <img
      ref="imgRef" :key="photo.id" :src="photo.src" :alt="photo.title"
      @touchstart.passive="onStart" @touchmove.passive="onMove" @touchend="onEnd"
    />
    <button class="lb-btn lb-side lb-next" @click="go(1)">→</button>
    <div class="lb-bar">
      <span>{{ String(index + 1).padStart(2, '0') }} / {{ String(list.length).padStart(2, '0') }}</span>
      <span class="t">{{ photo.title }}</span>
      <span>{{ albumById(photo.album)?.name }} · {{ photo.date }}</span>
    </div>
  </div>
</template>