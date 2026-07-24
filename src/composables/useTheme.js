import { ref, readonly } from 'vue'

const theme = ref('dark')
let inited = false

function init() {
  if (inited) return
  inited = true
  theme.value = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
}

function apply(next) {
  const root = document.documentElement
  // 切换瞬间给全站挂过渡类，实现颜色平滑渐变
  root.classList.add('theme-flip')
  root.dataset.theme = next
  theme.value = next
  try { localStorage.setItem('nocturne-theme', next) } catch (e) {}
  document.querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', next === 'dark' ? '#050807' : '#f1f6ef')
  setTimeout(() => root.classList.remove('theme-flip'), 650)
}

export function useTheme() {
  init()
  const toggle = () => apply(theme.value === 'dark' ? 'light' : 'dark')
  const set = t => apply(t)
  return { theme: readonly(theme), toggle, set }
}