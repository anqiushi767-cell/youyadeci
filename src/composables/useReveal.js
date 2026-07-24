import { onMounted, onBeforeUnmount } from 'vue'

export function useReveal(rootRef) {
  let io = null

  function scan() {
    const root = rootRef.value?.$el ?? rootRef.value
    if (!root || !io) return
    // 只观察还没显示的 .reveal 元素
    root.querySelectorAll('.reveal:not(.is-visible)').forEach(el => io.observe(el))
  }

  onMounted(() => {
    const root = rootRef.value?.$el ?? rootRef.value
    if (!root) return
    io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target) }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' }
    )
    scan()
  })

  onBeforeUnmount(() => io?.disconnect())

  return { refresh: scan }
}