import { onMounted, onBeforeUnmount } from 'vue'

export function useReveal(rootRef) {
  let io = null
  let fallback = null

  function scan() {
    const root = rootRef.value?.$el ?? rootRef.value
    if (!root || !io) return
    root.querySelectorAll('.reveal:not(.is-visible)').forEach(el => io.observe(el))
  }

  function forceShow() {
    const root = rootRef.value?.$el ?? rootRef.value
    if (!root) return
    root.querySelectorAll('.reveal:not(.is-visible)').forEach(el => {
      el.classList.add('is-visible')
    })
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
    // 兜底：2.5 秒后如果还有 .reveal 没显示，强制可见
    fallback = setTimeout(forceShow, 2500)
  })

  onBeforeUnmount(() => {
    io?.disconnect()
    clearTimeout(fallback)
  })

  return { refresh: scan }
}