<script setup>
import { ref } from 'vue'
import { albums, photosOf, countOf } from '../data/photos'
import PhotoCard from '../components/PhotoCard.vue'
import PhotoLightbox from '../components/PhotoLightbox.vue'
import { useReveal } from '../composables/useReveal'

const root = ref(null)
useReveal(root)

const lbList = ref([]), lbIndex = ref(0), lbShow = ref(false)
function open(p, list) { lbList.value = list; lbIndex.value = list.indexOf(p); lbShow.value = true }
const latest = photosOf('').slice(0, 5)
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
    <div class="album-thumbs">
      <PhotoCard
        v-for="(p, i) in latest" :key="p.id"
        :photo="p" class="reveal" :style="{ '--delay': `${i * 0.07}s` }"
        @open="open(p, latest)"
      />
    </div>

    <PhotoLightbox
      v-if="lbShow" :list="lbList" :index="lbIndex"
      @close="lbShow = false" @nav="i => lbIndex = i"
    />
  </div>
</template>