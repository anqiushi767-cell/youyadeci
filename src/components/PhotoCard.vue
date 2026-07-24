<script setup>
import { ref } from 'vue'
import { albumById } from '../data/photos'

const props = defineProps({
  photo: { type: Object, required: true },
  showTag: { type: Boolean, default: true }
})
defineEmits(['open'])

const loaded = ref(false)
const frame = ref(null)
const card = ref(null)
const canHover = matchMedia('(hover: hover) and (pointer: fine)').matches

// 桌面：悬停视差，图片跟随鼠标轻微偏移
function onMove(e) {
  if (!canHover || !frame.value || !loaded.value) return
  const r = frame.value.getBoundingClientRect()
  const dx = (e.clientX - r.left) / r.width - 0.5
  const dy = (e.clientY - r.top) / r.height - 0.5
  frame.value.querySelector('img').style.translate = `${dx * -8}px ${dy * -8}px`
}
function onLeave() {
  const img = frame.value?.querySelector('img')
  if (img) img.style.translate = '0 0'
}
// 移动端：按压反馈
function onPress(s) { card.value?.classList.toggle('pressed', s) }
</script>

<template>
  <figure
    ref="card"
    class="photo-card"
    @click="$emit('open', photo)"
    @mousemove="onMove"
    @mouseleave="onLeave"
    @touchstart.passive="onPress(true)"
    @touchend="onPress(false)"
    @touchcancel="onPress(false)"
  >
    <span v-if="showTag" class="photo-tag">{{ albumById(photo.album)?.en }}</span>
    <div ref="frame" class="photo-frame" :style="{ aspectRatio: photo.ratio }">
      <div v-if="!loaded" class="skeleton"></div>
      <img
        :src="photo.src" :alt="photo.title" loading="lazy" decoding="async"
        :style="{ opacity: loaded ? 1 : 0 }"
        @load="loaded = true"
      />
    </div>
    <figcaption class="photo-meta">
      <span class="t">{{ photo.title }}</span>
      <span class="d">{{ photo.date }}</span>
    </figcaption>
  </figure>
</template>