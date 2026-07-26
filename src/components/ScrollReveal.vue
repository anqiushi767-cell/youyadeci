<template>
  <h2 ref="containerRef" :class="containerClassName" style="margin:1.25rem 0">
    <p :class="textClassName" style="font-size:clamp(1.6rem,4vw,3rem);line-height:1.5;font-weight:600">
      <template v-for="(segment, index) in splitText" :key="index">
        <span v-if="segment.isWord" class="scroll-reveal-word word" style="display:inline-block">{{ segment.text }}</span>
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
  scrollContainerRef: { default: null },
  enableBlur: { type: Boolean, default: true },
  baseOpacity: { type: Number, default: 0.1 },
  baseRotation: { type: Number, default: 3 },
  blurStrength: { type: Number, default: 4 },
  containerClassName: { type: String, default: '' },
  textClassName: { type: String, default: '' },
  rotationEnd: { type: String, default: 'bottom bottom' },
  wordAnimationEnd: { type: String, default: 'bottom bottom' }
});

const slots = useSlots();
const containerRef = useTemplateRef('containerRef');

const text = computed(() => {
  const vnodes = slots.default?.() ?? [];
  const extract = (nodes) =>
    nodes
      .map(vnode => {
        if (typeof vnode.children === 'string') return vnode.children;
        if (Array.isArray(vnode.children)) return extract(vnode.children);
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
  return ref.value ?? window;
}

let tweens = [];

onMounted(async () => {
  await nextTick();
  const el = containerRef.value;
  if (!el) return;

  const scroller = resolveScroller(props.scrollContainerRef);
  const wordElements = el.querySelectorAll('.scroll-reveal-word');

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
          scrub: 1.5
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
          scrub: 1.5
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
            scrub: 1.5
          }
        }
      )
    );
  }

  requestAnimationFrame(() => { ScrollTrigger.refresh(); });
});

onUnmounted(() => {
  tweens.forEach(t => { t.scrollTrigger?.kill(); t.kill(); });
  tweens = [];
});
</script>
