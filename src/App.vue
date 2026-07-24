<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BootScreen from './components/BootScreen.vue'
import CustomCursor from './components/CustomCursor.vue'
import CrtOverlay from './components/CrtOverlay.vue'
import NavBar from './components/NavBar.vue'
import FooterBar from './components/FooterBar.vue'
import PageShutter from './components/PageShutter.vue'
import ScrollProgress from './components/ScrollProgress.vue'

const booted = ref(false)

// 页面切换：先播放快门帘，再执行路由跳转
const router = useRouter()
const shutter = ref(null)
router.beforeEach((to, from, next) => {
  if (to.path === from.path) return next()
  // shutter ref 可能在首次导航时尚未挂载，此时跳过动画直接跳转
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
</template>