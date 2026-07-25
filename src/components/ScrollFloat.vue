<template>
  <h2 ref="containerRef" class="sf-container" :class="containerClassName">
    <span class="sf-text" :class="textClassName">
      <span v-for="(char, index) in splitText" :key="index" class="sf-char">
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
  scrollContainerRef: null,
  containerClassName: '',
  textClassName: '',
  animationDuration: 1,
  ease: 'back.inOut(2)',
  scrollStart: 'center bottom+=50%',
  scrollEnd: 'bottom bottom-=40%',
  stagger: 0.03
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

  if (scrollerRef instanceof HTMLElement) {
    return scrollerRef;
  }

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

  const charElements = el.querySelectorAll('.sf-char');

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
          scrub: true
        }
      }
    );
  }, el);

  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });
}

onMounted(async () => {
  await nextTick();
  await createAnimation();
});

watch(
  () => [props.animationDuration, props.ease, props.scrollStart, props.scrollEnd, props.stagger],
  async () => {
    await createAnimation();
  }
);

watch(
  () => {
    const ref = props.scrollContainerRef;

    if (!ref) return null;

    if (ref instanceof HTMLElement) {
      return ref;
    }

    return ref.value;
  },
  async () => {
    await createAnimation();
  }
);

onUnmounted(() => {
  cleanup();
});
</script>

<style scoped>
.sf-container { margin: 1.25rem 0; overflow: hidden; }
.sf-text { display: inline-block; font-size: clamp(1.6rem, 8vw, 10rem); line-height: 1.5; font-weight: 900; text-align: center; }
.sf-char { display: inline-block; }
</style>
