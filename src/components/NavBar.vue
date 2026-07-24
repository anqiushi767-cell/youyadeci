<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { site } from '../data/photos'
import ThemeToggle from './ThemeToggle.vue'

const route = useRoute()
const now = ref('')
const open = ref(false)
let timer = null

watch(() => route.path, () => { open.value = false })
watch(open, v => { document.body.style.overflow = v ? 'hidden' : '' })

onMounted(() => {
  const tick = () => { now.value = new Date().toLocaleTimeString('zh-CN', { hour12: false }) }
  tick(); timer = setInterval(tick, 1000)
})
onBeforeUnmount(() => { clearInterval(timer); document.body.style.overflow = '' })
</script>

<template>
  <header class="navbar">
    <router-link to="/" class="nav-logo">{{ site.name }}<b>//</b><span class="nz-char-wrap"><span class="nz-night">夜</span><span class="nz-day">日</span>光档案</span></router-link>

    <nav class="nav-links">
      <router-link class="nav-link" to="/">00 首页</router-link>
      <router-link class="nav-link" to="/gallery">01 照片</router-link>
      <router-link class="nav-link" to="/archive">02 目录</router-link>
    </nav>

    <div class="nav-right">
      <div class="nav-clock">DARKROOM <b>{{ now }}</b></div>
      <ThemeToggle />
      <button class="burger" :class="{ open }" aria-label="菜单" @click="open = !open">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>

  <!-- 移动端全屏菜单 -->
  <nav class="mobile-menu" :class="{ open }">
    <router-link class="mm-link" to="/"><small>00</small>首页</router-link>
    <router-link class="mm-link" to="/gallery"><small>01</small>照片</router-link>
    <router-link class="mm-link" to="/archive"><small>02</small>目录</router-link>
    <p class="mm-foot">NOCTURNE // 在黑暗里收集光</p>
  </nav>
</template>