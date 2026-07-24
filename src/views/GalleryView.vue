<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { albums, photosOf } from '../data/photos'
import PhotoCard from '../components/PhotoCard.vue'
import PhotoLightbox from '../components/PhotoLightbox.vue'
import { useReveal } from '../composables/useReveal'

const route = useRoute(), router = useRouter()
const root = ref(null)
const { refresh } = useReveal(root)

const active = computed(() => route.query.album ?? '')
const keyword = ref('')

const list = computed(() => {
  let l = photosOf(active.value)
  const k = keyword.value.trim().toLowerCase()
  if (k) l = l.filter(p => p.title.toLowerCase().includes(k) || p.date.includes(k))
  return l
})

// 搜索/筛选后 DOM 更新了，重新扫描 .reveal 元素
watch(list, () => nextTick(refresh))

const lbIndex = ref(0), lbShow = ref(false)
function open(p) { lbIndex.value = list.value.indexOf(p); lbShow.value = true }

watch(() => route.query.album, () => { lbShow.value = false })
function pick(id) { router.replace(id ? { query: { album: id } } : { query: {} }) }
</script>

<template>
  <div ref="root" class="container">
    <div class="gallery-head">
      <p class="mono reveal" style="color:var(--green);font-size:13px;letter-spacing:.2em">[ DARKROOM // 全部底片 ]</p>
      <h1 class="gallery-title reveal" style="--delay:.08s">
        照片<em>展示区</em><span style="color:var(--muted)">_</span>
      </h1>

      <div class="toolbar reveal" style="--delay:.16s">
        <button class="chip" :class="{ active: !active }" @click="pick('')">全部</button>
        <button
          v-for="a in albums" :key="a.id"
          class="chip" :class="{ active: active === a.id }"
          @click="pick(a.id)"
        >{{ a.name }}</button>
        <label class="search-box">
          <span>⌕</span>
          <input v-model="keyword" placeholder="搜索标题 / 日期..." />
        </label>
      </div>
    </div>

    <p class="mono" style="color:var(--muted);font-size:12px;margin-bottom:22px">
      > 共检索到 <b style="color:var(--green)">{{ list.length }}</b> 张底片 ——
      点击放大 · 电脑端 ← → 切换 / ESC 关闭 · 手机端左右滑动
    </p>

    <div v-if="list.length" class="masonry">
      <PhotoCard
        v-for="(p, i) in list" :key="p.id"
        :photo="p" class="reveal" :style="{ '--delay': `${(i % 6) * 0.06}s` }"
        @open="open"
      />
    </div>
    <div v-else class="empty">> 没有匹配的底片。<b>换个关键词试试？</b></div>

    <PhotoLightbox
      v-if="lbShow" :list="list" :index="lbIndex"
      @close="lbShow = false" @nav="i => lbIndex = i"
    />
  </div>
</template>