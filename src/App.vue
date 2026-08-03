<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import BootScreen from './components/BootScreen.vue'
import CustomCursor from './components/CustomCursor.vue'
import CrtOverlay from './components/CrtOverlay.vue'
import NavBar from './components/NavBar.vue'
import FooterBar from './components/FooterBar.vue'
import PageShutter from './components/PageShutter.vue'
import ScrollProgress from './components/ScrollProgress.vue'

const booted = ref(false)
const showBrowserTip = ref(false)

onMounted(() => {
  const ua = navigator.userAgent
  // 国产套壳浏览器
  const domestic = /QQBrowser|MQQBrowser|360SE|360EE|Sogou|SE\s|MetaSr|UCBrowser|UCWEB|LieBao|baidubrowser/i.test(ua)
  // 旧版 Chrome (< 100) 或 Microsoft Edge 旧内核
  const oldChrome = /Chrome\/(\d+)/.test(ua) && parseInt(RegExp.$1) < 100
  if (domestic || oldChrome) showBrowserTip.value = true
})

// 页面切换：先播放快门帘，再执行路由跳转
const router = useRouter()
const shutter = ref(null)
router.beforeEach((to, from, next) => {
  if (to.path === from.path) return next()
  if (!shutter.value) return next()
  shutter.value.play(() => next())
})
</script>

<template>
  <BootScreen v-if="!booted" @done="booted = true" />
  <CustomCursor />
  <CrtOverlay />
  <ScrollProgress />
  <PageShutter ref="shutter" />
  <NavBar />
  <main>
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
  <FooterBar />
  <Transition name="toast">
    <div v-if="showBrowserTip" class="browser-tip">
      <span>⚠️ 您的浏览器版本过低，可能无法正常显示本站效果。</span>
      <a href="https://www.google.cn/chrome/" target="_blank">下载最新版 Chrome →</a>
      <button @click="showBrowserTip = false">✕</button>
    </div>
  </Transition>
</template>