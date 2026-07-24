<script setup>
import { useTheme } from '../composables/useTheme'
const { theme, toggle } = useTheme()
</script>

<template>
  <button
    class="theme-toggle"
    :aria-label="theme === 'dark' ? '切换到白天模式' : '切换到黑夜模式'"
    :title="theme === 'dark' ? '白天 · 相纸模式' : '黑夜 · 暗房模式'"
    @click="toggle"
  >
    <span class="tt-track">
      <span class="tt-icons"><span class="tt-sun">☀</span><span class="tt-moon">☾</span></span>
      <span class="tt-thumb"></span>
    </span>
  </button>
</template>