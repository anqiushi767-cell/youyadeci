<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import GlitchText from '../components/GlitchText.vue'

const router = useRouter()

// 闪烁的扫描线状态
const flicker = ref(false)
let timer = null
onMounted(() => {
  timer = setInterval(() => {
    flicker.value = !flicker.value
  }, 120 + Math.random() * 200)
})
onBeforeUnmount(() => clearInterval(timer))

// 随机模拟终端噪声行
const noiseLines = ref([])
onMounted(() => {
  const chars = '░▒▓█▀▄■□▪▫●○◘◙♦♣♠♥☺☻☼▬▲▼►◄↕‼¶§'
  for (let i = 0; i < 6; i++) {
    let line = ''
    for (let j = 0; j < 10 + Math.random() * 30; j++) {
      line += chars[Math.floor(Math.random() * chars.length)]
    }
    noiseLines.value.push(line)
  }
})
</script>

<template>
  <div class="nf-404">
    <!-- 终端日志区 -->
    <div class="nf-log">
      <p class="nf-line" style="--d:0s">> 初始化显影液 ............. OK</p>
      <p class="nf-line" style="--d:.12s">> 加载底片目录 ............. OK</p>
      <p class="nf-line" style="--d:.24s">> 检索请求路径 ............. <span class="nf-err">FAILED</span></p>
      <p class="nf-line" style="--d:.36s">> 底片编号 {{ $route.path }} ............ <span class="nf-err">MISSING</span></p>
      <p class="nf-line nf-dim" style="--d:.5s">> 扫描暗房底片柜 ...</p>
      <p class="nf-line nf-dim" style="--d:.62s">> ████████████████████ 100%</p>
      <p class="nf-line" style="--d:.76s">> 结论：<b>该底片不存在或已损坏</b></p>
    </div>

    <!-- 大 404 -->
    <div class="nf-hero" :class="{ flicker: flicker }">
      <GlitchText text="404" />
    </div>

    <!-- 提示信息 -->
    <p class="nf-msg">
      <span class="nf-tag">[ NEGATIVE NOT FOUND ]</span><br />
      你试图冲洗一张不存在的底片。<br />
      它可能已被归档、销毁，或者从未被拍摄。
    </p>

    <!-- 噪声条 -->
    <div class="nf-noise">
      <span v-for="(l, i) in noiseLines" :key="i" class="nf-noise-line" :style="{ '--dy': `${(i - 2.5) * 28}px`, '--dx': `${(i % 3 - 1) * 14}px` }">{{ l }}</span>
    </div>

    <!-- 返回按钮 -->
    <div class="nf-actions">
      <button class="btn solid" @click="router.push('/')">返回暗房 →</button>
      <button class="btn" @click="router.back()">← 退回上一页</button>
    </div>

    <p class="nf-foot">NOCTURNE OS v2.6 — ERR_CODE: NEG_404</p>
  </div>
</template>

<style scoped>
.nf-404 {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 24px 60px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

/* 终端日志 */
.nf-log {
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 2.2;
  color: var(--muted);
  text-align: left;
  margin-bottom: 50px;
}
.nf-line {
  opacity: 0;
  animation: nfTypeIn .4s var(--ease) var(--d) forwards;
}
@keyframes nfTypeIn { to { opacity: 1; } }
.nf-err {
  color: #ff5f56;
  font-weight: 700;
}
.nf-dim { color: var(--muted); opacity: .5; }

/* 大 404 — 用 GlitchText + 额外闪烁叠加 */
.nf-hero {
  font-family: var(--font-display);
  font-weight: 900;
  font-size: clamp(100px, 20vw, 200px);
  line-height: .85;
  color: var(--text);
  position: relative;
  transition: opacity .08s steps(1);
  user-select: none;
}
.nf-hero.flicker { opacity: .15; }

/* 副标题框 */
.nf-tag {
  font-family: var(--font-mono);
  font-size: 14px;
  letter-spacing: .2em;
  color: var(--green);
  display: inline-block;
  border: 1px solid var(--line-strong);
  padding: 6px 18px;
  margin-bottom: 18px;
}
.nf-msg {
  font-family: var(--font-body);
  font-size: 15px;
  color: var(--muted);
  line-height: 2;
  max-width: 480px;
  margin: 20px 0 40px;
}

/* 噪声装饰 */
.nf-noise {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  opacity: .12;
}
.nf-noise-line {
  position: absolute;
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--green);
  white-space: nowrap;
  left: 50%;
  top: 50%;
  transform: translate(calc(-50% + var(--dx)), var(--dy));
}

/* 按钮区 */
.nf-actions {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  justify-content: center;
}

/* 底部状态行 */
.nf-foot {
  margin-top: 60px;
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--muted);
  letter-spacing: .15em;
}

/* 去重 CRT / 导航（这些已由 App.vue 全局覆盖） */
</style>
