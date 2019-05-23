<template>
  <svg width="320" height="320" xmlns="http://www.w3.org/2000/svg" onclick="if (this.paused != true) { this.pauseAnimations(); this.paused = true; } else  { this.unpauseAnimations(); this.paused = false; }">
    <g transform="rotate(218.5 160 160)">
      <text font-family="microsoft yahei" font-size="120" y="160" x="160">🐷</text>
      <animateTransform attributeName="transform" begin="0s" dur="10s" type="rotate" from="0 160 160" to="360 160 160" repeatCount="indefinite"></animateTransform>
    </g>
  </svg>
</template>

<script>
export default {

}
</script>

<style scoped>
svg {
  cursor: pointer;
}
</style>
