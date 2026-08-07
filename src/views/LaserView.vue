<script setup>
import LaserFlow from '../components/LaserFlow.vue'
</script>

<template>
  <div class="laser-page">
    <LaserFlow
      :horizontal-beam-offset="0.1"
      :vertical-beam-offset="-0.5"
      color="#39ff88"
    />
  </div>
</template>

<style scoped>
.laser-page {
  height: 100vh;
  position: relative;
  overflow: hidden;
  background-color: #000000;
  cursor: crosshair;
}
</style>
