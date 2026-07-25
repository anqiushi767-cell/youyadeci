<template>
  <h2 ref="containerRef" class="sr-container" :class="containerClassName">
    <p class="sr-text" :class="textClassName">
      <template v-for="(segment, index) in splitText" :key="index">
        <span v-if="segment.isWord" class="sr-word">{{ segment.text }}</span>
        <template v-else>{{ segment.text }}</template>
      </template>
    </p>
  </h2>
</template>

<script setup>
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { computed, nextTick, onMounted, onUnmounted, useSlots, useTemplateRef } from 'vue';

gsap.registerPlugin(ScrollTrigger);


const props = defineProps({
  scrollContainerRef: null,
  enableBlur: true,
  baseOpacity: 0.1,
  baseRotation: 3,
  blurStrength: 4,
  containerClassName: '',
  textClassName: '',
  rotationEnd: 'bottom bottom',
  wordAnimationEnd: 'bottom bottom'
});

const slots = useSlots();
const containerRef = useTemplateRef('containerRef');

const text = computed(() => {
  const vnodes = slots.default?.() ?? [];
  const extract = (nodes) =>
    nodes
      .map(vnode => {
        if (typeof vnode.children === 'string') return vnode.children;
        if (Array.isArray(vnode.children))
          return extract(vnode.children);
        return '';
      })
      .join('');
  return extract(vnodes);
});

const splitText = computed(() =>
  text.value.split(/(\s+)/).map(segment => ({
    text: segment,
    isWord: !segment.match(/^\s+$/)
  }))
);

function resolveScroller(ref) {
  if (!ref) return window;
  if (ref instanceof HTMLElement) return ref;
  return (ref).value ?? window;
}

let tweens = [];

onMounted(async () => {
  await nextTick();

  const el = containerRef.value;
  if (!el) return;

  const scroller = resolveScroller(props.scrollContainerRef);
  const wordElements = el.querySelectorAll('.sr-word');

  tweens.push(
    gsap.fromTo(
      el,
      { transformOrigin: '0% 50%', rotate: props.baseRotation },
      {
        ease: 'none',
        rotate: 0,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: 'top bottom',
          end: props.rotationEnd,
          scrub: true
        }
      }
    )
  );

  tweens.push(
    gsap.fromTo(
      wordElements,
      { opacity: props.baseOpacity, willChange: 'opacity' },
      {
        ease: 'none',
        opacity: 1,
        stagger: 0.05,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: 'top bottom-=20%',
          end: props.wordAnimationEnd,
          scrub: true
        }
      }
    )
  );

  if (props.enableBlur) {
    tweens.push(
      gsap.fromTo(
        wordElements,
        { filter: `blur(${props.blurStrength}px)` },
        {
          ease: 'none',
          filter: 'blur(0px)',
          stagger: 0.05,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: 'top bottom-=20%',
            end: props.wordAnimationEnd,
            scrub: true
          }
        }
      )
    );
  }
});

onUnmounted(() => {
  tweens.forEach(t => {
    t.scrollTrigger?.kill();
    t.kill();
  });
  tweens = [];
});
</script>

<style scoped>
.sr-container { margin: 1.25rem 0; }
.sr-text { font-size: clamp(1.6rem, 4vw, 3rem); line-height: 1.5; font-weight: 600; }
.sr-word { display: inline-block; }
</style>
