<template>
  <div class="path-animate">
    <svg :class="{'active': isPlay}" width="300px" height="175px" version="1.1">
      <path class="path" fill="transparent" stroke="#000000" stroke-width="4" d="M10 80 Q 77.5 10, 145 80 T 280 80"></path>
    </svg>
    <button @click="play">播放</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isPlay: false
    }
  },
  methods: {
    play() {
      console.log('play')
      this.isPlay = true
      setTimeout(() => {
        this.isPlay = false
      }, 2000)
    }
  }
}
</script>

<style scoped>
svg {
  display: block;
  width: 300px;
}
svg.active .path{
  animation: dash 2s linear;
}
.path {
  stroke-dasharray: 320;
  stroke-dashoffset: 0;
}
@keyframes dash {
  from {
    stroke-dashoffset: 320;
  }
  to {
    stroke-dashoffset: 0;
  }
}
</style>
