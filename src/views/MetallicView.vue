<script setup>
import { useRouter } from 'vue-router'
import MetallicPaint from '../components/MetallicPaint.vue'
import ScrollFloat from '../components/ScrollFloat.vue'
import ScrollReveal from '../components/ScrollReveal.vue'
import SplashCursor from '../components/SplashCursor.vue'

const router = useRouter()

const splashProps = {
  SIM_RESOLUTION: 128,
  DYE_RESOLUTION: 1024,
  SPLAT_FORCE: 5000,
  DENSITY_DISSIPATION: 4,
  VELOCITY_DISSIPATION: 2.5,
  COLOR_UPDATE_SPEED: 8,
  SHADING: true,
  RAINBOW_MODE: false,
  COLOR: '#39ff88'
}
</script>

<template>
  <div class="metal-page">
    <SplashCursor v-bind="splashProps" />
    <!-- Section 1: 金属漆字母 N -->
    <section class="metal-hero">
      <MetallicPaint
        image-src="/metallic-n.svg"
        :scale="3"
        :liquid="0.7"
        :speed="0.25"
        :brightness="2.5"
        :contrast="0.4"
        :refraction="0.012"
        :blur="0.01"
        :fresnel="1.2"
        light-color="#ffffff"
        dark-color="#050807"
        tint-color="#39ff88"
        :mouse-animation="true"
        class="metal-n"
      />
    </section>

    <!-- Section 2: NOCTURNE 标题浮现 -->
    <section class="metal-title">
      <ScrollFloat
        scroll-start="center bottom+=40%"
        scroll-end="bottom bottom-=30%"
        :animation-duration="1"
        :stagger="0.07"
      >
        NOCTURNE
      </ScrollFloat>
      <p class="metal-subtitle">夜光档案</p>
    </section>

    <div class="metal-spacer"></div>

    <!-- Section 3: 简介逐字揭示 -->
    <section class="metal-desc">
      <div class="metal-desc-inner">
        <ScrollReveal
          :base-opacity="0.4"
          :base-rotation="6"
          :enable-blur="true"
          :blur-strength="10"
          rotation-end="center center"
          word-animation-end="center center-=10%"
        >
          在黑暗里收集光。一个黑绿色的个人照片档案站。支持暗房 / 相纸双模式。
        </ScrollReveal>
      </div>
      <button class="metal-btn" @click="router.push('/')">
        进入网站主页 →
      </button>
    </section>
  </div>
</template>

<style scoped>
.metal-page {
  min-height: 100vh;
  background: var(--bg);
}
.metal-hero {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}
.metal-n {
  width: 90vw;
  height: 90vh;
  max-width: 800px;
  max-height: 800px;
}
.metal-title {
  min-height: 120vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 120px 24px;
}
.metal-subtitle {
  font-family: var(--font-mono);
  font-size: 16px;
  color: var(--muted);
  letter-spacing: .2em;
  margin-top: 8px;
}
.metal-spacer {
  height: 60vh;
}
.metal-desc {
  min-height: 120vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 120px 24px 200px;
  max-width: 900px;
  margin: 0 auto;
}
.metal-desc :deep(p) {
  font-size: clamp(2rem, 5vw, 3.5rem) !important;
}
.metal-btn {
  margin-top: 80px;
  padding: 14px 36px;
  font-family: var(--font-mono);
  font-size: 14px;
  letter-spacing: .12em;
  color: var(--green);
  background: transparent;
  border: 1px solid var(--line-strong);
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  isolation: isolate;
  filter: blur(6px);
  opacity: 0;
  animation: btnUnblur .8s var(--ease) 1.2s both;
}
@keyframes btnUnblur {
  to { filter: blur(0); opacity: 1; }
}
.metal-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 6px;
  background: var(--green);
  transform: scale(0);
  transform-origin: center;
  transition: transform .5s var(--ease);
  z-index: -1;
}
.metal-btn::after {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 12px;
  background: transparent;
  box-shadow: 0 0 0 0 var(--green-glow);
  transition: box-shadow .5s var(--ease);
  pointer-events: none;
  z-index: -2;
}
.metal-btn:hover {
  color: var(--green-ink);
  transform: translateY(-2px);
}
.metal-btn:hover::before {
  transform: scale(1);
}
.metal-btn:hover::after {
  box-shadow: 0 0 32px 8px var(--green-glow);
}
</style>
