<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { site, photos, albums, countOf } from '../data/photos'
import GlitchText from '../components/GlitchText.vue'
import MarqueeBar from '../components/MarqueeBar.vue'
import PhotoCard from '../components/PhotoCard.vue'
import PhotoLightbox from '../components/PhotoLightbox.vue'
import { useReveal } from '../composables/useReveal'

const router = useRouter()
const root = ref(null)
useReveal(root)

const stack = computed(() => photos.slice(0, 3))
const featured = computed(() => photos.slice(3, 9))
const featuredClass = ['fg-a', 'fg-b', 'fg-c', 'fg-c', 'fg-b', 'fg-a']

const lbList = ref([]), lbIndex = ref(0), lbShow = ref(false)
function open(p, list) { lbList.value = list; lbIndex.value = list.indexOf(p); lbShow.value = true }
</script>

<template>
  <div ref="root">
    <section class="container home-hero">
      <div>
        <p class="hero-kicker reveal">[ PERSONAL PHOTO ARCHIVE — EST.{{ site.since }} ]</p>
        <h1 class="hero-title reveal" style="--delay:.08s">
          <GlitchText :text="site.name" /> <br />
          <span class="hollow nz-char-wrap"><span class="nz-night">夜</span><span class="nz-day">日</span>光档案</span>
        </h1>
        <p class="hero-sub reveal" style="--delay:.16s">
          {{ site.slogan }}这里存放 <b>{{ photos.length }}</b> 张底片的数字扫描件，
          分为 <b>{{ albums.length }}</b> 个专辑。支持<b>白天 / 黑夜</b>双模式，
          右上角随时切换显影液。
        </p>
        <div class="hero-actions reveal" style="--delay:.24s">
          <button class="btn solid" @click="router.push('/gallery')">进入暗房 →</button>
          <button class="btn" @click="router.push('/archive')">查看目录</button>
        </div>
        <div class="hero-stats reveal" style="--delay:.32s">
          <div class="stat"><div class="num">{{ photos.length }}</div><div class="lab">PHOTOS</div></div>
          <div class="stat"><div class="num">{{ albums.length }}</div><div class="lab">ALBUMS</div></div>
          <div class="stat"><div class="num">ISO 3200</div><div class="lab">NIGHT MODE</div></div>
          <div class="stat"><div class="num">2 MODES</div><div class="lab">DAY / NIGHT</div></div>
        </div>
      </div>

      <div class="hero-stack reveal" style="--delay:.2s">
        <div class="viewfinder"><i></i><span class="rec-dot">REC</span></div>
        <div v-for="p in stack" :key="p.id" class="stack-card" @click="open(p, stack)">
          <img :src="p.src" :alt="p.title" loading="eager" decoding="async" />
          <p class="cap">▸ {{ p.title }} — {{ p.date }}</p>
        </div>
      </div>
    </section>

    <MarqueeBar />

    <section class="container" style="padding: 70px 0 30px">
      <div class="section-head reveal">
        <span class="idx">SEC.01</span>
        <h2><GlitchText text="精选底片" /></h2>
        <span class="rule"></span>
        <button class="btn" @click="router.push('/gallery')">全部照片 →</button>
      </div>
      <div class="featured-grid">
        <PhotoCard
          v-for="(p, i) in featured" :key="p.id"
          :photo="p" :class="['reveal', featuredClass[i]]"
          :style="{ '--delay': `${i * 0.07}s` }"
          @open="open(p, featured)"
        />
      </div>
    </section>

    <section class="container" style="padding: 40px 0 90px">
      <div class="section-head reveal">
        <span class="idx">SEC.02</span>
        <h2>专辑索引</h2>
        <span class="rule"></span>
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
    </section>

    <PhotoLightbox
      v-if="lbShow" :list="lbList" :index="lbIndex"
      @close="lbShow = false" @nav="i => lbIndex = i"
    />
  </div>
</template>