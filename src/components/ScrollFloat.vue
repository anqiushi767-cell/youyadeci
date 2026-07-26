<template>
  <h2 ref="containerRef" :class="containerClassName" style="margin:1.25rem 0;overflow:hidden">
    <span :class="textClassName" style="display:inline-block;font-size:clamp(1.6rem,8vw,10rem);line-height:1.5;font-weight:900;text-align:center">
      <span v-for="(char, index) in splitText" :key="index" class="scroll-float-char" style="display:inline-block">
        {{ char }}
      </span>
    </span>
  </h2>
</template>

<script setup>
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { computed, nextTick, onMounted, onUnmounted, useSlots, useTemplateRef, watch } from 'vue';

gsap.registerPlugin(ScrollTrigger);

const props = defineProps({
  scrollContainerRef: { default: null },
  containerClassName: { type: String, default: '' },
  textClassName: { type: String, default: '' },
  animationDuration: { type: Number, default: 1 },
  ease: { type: String, default: 'back.inOut(2)' },
  scrollStart: { type: String, default: 'center bottom+=50%' },
  scrollEnd: { type: String, default: 'bottom bottom-=40%' },
  stagger: { type: Number, default: 0.03 }
});

const slots = useSlots();
const containerRef = useTemplateRef('containerRef');

const text = computed(() => {
  const nodes = slots.default?.() ?? [];
  return nodes.map(node => (typeof node.children === 'string' ? node.children : '')).join('');
});

const splitText = computed(() => text.value.split('').map(char => (char === ' ' ? '\u00A0' : char)));

function resolveScroller(scrollerRef) {
  if (!scrollerRef) return window;
  if (scrollerRef instanceof HTMLElement) return scrollerRef;
  return scrollerRef.value ?? window;
}

let tween = null;
let ctx = null;

function cleanup() {
  tween?.scrollTrigger?.kill();
  tween?.kill();
  tween = null;
  ctx?.revert();
  ctx = null;
}

async function createAnimation() {
  await nextTick();
  const el = containerRef.value;
  if (!el) return;
  const scroller = resolveScroller(props.scrollContainerRef);
  const charElements = el.querySelectorAll('.scroll-float-char');
  cleanup();
  ctx = gsap.context(() => {
    tween = gsap.fromTo(
      charElements,
      {
        willChange: 'opacity, transform',
        opacity: 0,
        yPercent: 120,
        scaleY: 2.3,
        scaleX: 0.7,
        transformOrigin: '50% 0%'
      },
      {
        duration: props.animationDuration,
        ease: props.ease,
        opacity: 1,
        yPercent: 0,
        scaleY: 1,
        scaleX: 1,
        stagger: props.stagger,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: props.scrollStart,
          end: props.scrollEnd,
          scrub: 1.5
        }
      }
    );
  }, el);
  requestAnimationFrame(() => { ScrollTrigger.refresh(); });
}

onMounted(async () => { await nextTick(); await createAnimation(); });

watch(
  () => [props.animationDuration, props.ease, props.scrollStart, props.scrollEnd, props.stagger],
  async () => { await createAnimation(); }
);

watch(
  () => {
    const ref = props.scrollContainerRef;
    if (!ref) return null;
    if (ref instanceof HTMLElement) return ref;
    return ref.value;
  },
  async () => { await createAnimation(); }
);

onUnmounted(() => { cleanup(); });
</script>
