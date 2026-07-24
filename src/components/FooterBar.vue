<script setup>
import { site } from '../data/photos'
</script>

<template>
  <footer class="footer">
    <div class="container footer-inner">
      <p class="mono">© {{ site.since }} <b>{{ site.owner }}</b> // 底片已扫描，版权所有</p>
      <div class="socials">
        <a v-for="s in site.socials" :key="s.label" :href="s.href" target="_blank" rel="noopener">{{ s.label }} ↗</a>
      </div>
      <p class="mono">POWERED BY <b>VUE3 + VITE</b> // <span class="nz-char-wrap"><span class="nz-night">夜</span><span class="nz-day">日</span>光档案</span></p>
    </div>
  </footer>
</template>
