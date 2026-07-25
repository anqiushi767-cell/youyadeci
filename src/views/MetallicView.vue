<script setup>
import MetallicPaint from '../components/MetallicPaint.vue'
import ScrollFloat from '../components/ScrollFloat.vue'
import ScrollReveal from '../components/ScrollReveal.vue'
</script>

<template>
  <div class="metal-page">
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

    <!-- Section 2: 标题浮现 -->
    <section class="metal-title">
      <ScrollFloat>
        NOCTURNE
      </ScrollFloat>
      <p class="metal-subtitle">夜光档案</p>
    </section>

    <!-- Section 3: 简介揭示 -->
    <section class="metal-desc">
      <ScrollReveal>
        <p class="metal-text">
          在黑暗里收集光。
        </p>
        <p class="metal-text dim">
          一个黑绿色的个人照片档案站。
        </p>
        <p class="metal-text dim">
          支持暗房 / 相纸双模式。
        </p>
      </ScrollReveal>
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
  width: 80vw;
  height: 80vh;
  max-width: 600px;
  max-height: 600px;
}

.metal-title {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px 24px;
}

.metal-subtitle {
  font-family: var(--font-mono);
  font-size: 16px;
  color: var(--muted);
  letter-spacing: .2em;
  margin-top: 24px;
}

.metal-desc {
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px 24px 120px;
}

.metal-text {
  font-family: var(--font-body);
  font-size: clamp(18px, 3vw, 28px);
  color: var(--text);
  margin: 12px 0;
  max-width: 600px;
  line-height: 1.8;
}

.metal-text.dim {
  color: var(--muted);
  font-size: clamp(14px, 2vw, 20px);
}
</style>
