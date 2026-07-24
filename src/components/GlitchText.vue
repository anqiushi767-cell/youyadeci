<script setup>
defineProps({ text: String })
</script>

<template>
  <span class="glitch" :data-text="text">{{ text }}</span>
</template>