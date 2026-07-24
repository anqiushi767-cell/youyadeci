<script setup>
import { computed } from 'vue'
import { useTheme } from '../composables/useTheme'

const { theme } = useTheme()
const items = computed(() => [
  'NOCTURNE ARCHIVE',
  theme.value === 'dark' ? '夜光档案' : '日光档案',
  'FILM · DIGITAL · NIGHT',
  '在黑暗里收集光',
  '35MM FOREVER'
])
</script>

<template>
  <div class="marquee" aria-hidden="true">
    <div class="marquee-track">
      <span v-for="n in 2" :key="n">
        <template v-for="t in items" :key="t + n">{{ t }}<i>◆</i></template>
      </span>
    </div>
  </div>
</template>
