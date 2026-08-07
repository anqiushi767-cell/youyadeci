<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { albums, photosOf, countOf } from '../data/photos'
import PhotoCard from '../components/PhotoCard.vue'
import PhotoLightbox from '../components/PhotoLightbox.vue'
import { useReveal } from '../composables/useReveal'

const root = ref(null)
useReveal(root)

const lbList = ref([]), lbIndex = ref(0), lbShow = ref(false)
function open(p, list) { lbList.value = list; lbIndex.value = list.indexOf(p); lbShow.value = true }
const latest = photosOf('').slice(-5).reverse()
const latestVert = latest.filter(p => p.ratio !== '16/9')
const latestHorz = latest.filter(p => p.ratio === '16/9')

// 竖图高度对齐右列（两张横图叠高），宽度按各自比例反推，避免 flex 压缩裁切
const thumbsWrap = ref(null)
let resizeTimer = 0
function alignThumbHeights() {
  const wrap = thumbsWrap.value
  if (!wrap) return
  const wideCol = wrap.querySelector('.thumb-col-wide')
  const row = wrap.querySelector('.thumb-row')
  if (!wideCol || !row || !wideCol.offsetHeight) return
  const totalH = wideCol.offsetHeight
  row.querySelectorAll('.photo-card').forEach(card => {
    const meta = card.querySelector('.photo-meta')
    const frame = card.querySelector('.photo-frame')
    if (!meta || !frame) return
    const frameH = totalH - meta.offsetHeight
    if (frameH <= 0) return
    const [w, h] = (frame.style.aspectRatio || '3/4').split('/').map(Number)
    if (w && h) frame.style.width = frameH * w / h + 'px'
  })
}
onMounted(() => {
  alignThumbHeights()
  window.addEventListener('resize', onResize)
})
function onResize() {
  clearTimeout(resizeTimer)
  resizeTimer = setTimeout(alignThumbHeights, 150)
}
onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
})
</script>

<template>
  <div ref="root" class="container">
    <div class="archive-head">
      <p class="mono reveal" style="color:var(--green);font-size:13px;letter-spacing:.2em">[ INDEX // 档案目录 ]</p>
      <h1 class="gallery-title reveal" style="--delay:.08s">目<em>录</em>_</h1>
      <p class="reveal" style="--delay:.14s;color:var(--muted);margin-top:14px;max-width:52ch;line-height:1.9">
        所有底片按专辑归档。点击任意一行进入对应照片集。
      </p>
    </div>

    <div>
      <router-link
        v-for="(a, i) in albums" :key="a.id"
        :to="`/gallery?album=${a.id}`"
        class="album-row reveal" :style="{ '--delay': `${i * 0.08}s` }"
      >
        <span class="album-idx">A.0{{ i + 1 }}</span>
        <div>
          <div class="album-name">{{ a.name }} <span style="color:var(--muted);font-size:.6em">{{ a.en }}</span></div>
          <div class="album-desc">{{ a.desc }}</div>
        </div>
        <span class="album-count">[ {{ countOf(a.id) }} 张 ]</span>
        <span class="album-arrow">→</span>
      </router-link>
    </div>

    <div class="section-head reveal" style="margin-top:70px">
      <span class="idx">LATEST</span>
      <h2>最近入库</h2>
      <span class="rule"></span>
    </div>
    <div class="album-thumbs" ref="thumbsWrap">
      <div class="thumb-row">
        <PhotoCard
          v-for="(p, i) in latestVert" :key="p.id"
          :photo="p" class="reveal" :style="{ '--delay': `${i * 0.07}s` }"
          @open="open(p, latest)"
        />
      </div>
      <div class="thumb-col-wide">
        <PhotoCard
          v-for="(p, i) in latestHorz" :key="p.id"
          :photo="p" class="reveal" :style="{ '--delay': `${(i + latestVert.length) * 0.07}s` }"
          @open="open(p, latest)"
        />
      </div>
    </div>

    <PhotoLightbox
      v-if="lbShow" :list="lbList" :index="lbIndex"
      @close="lbShow = false" @nav="i => lbIndex = i"
    />
  </div>
</template>