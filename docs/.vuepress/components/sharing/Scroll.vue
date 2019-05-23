<template>
  <div class="scroll-wrapper">
    <div class="scroll-inner">
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100.6 107.6" id="star-svg" :style="'transform: translateY('+ scrollTop +'px)'">
      <path fill="none" stroke="white" stroke-width="2" id="star-path" d="M43.7,65.8L19.9,83.3c-2.9,1.9-5.1,3.2-7.9,3.2c-5.7,0-10.5-5.1-10.5-10.8
        c0-4.8,3.8-8.2,7.3-9.8l27.9-12L8.8,41.4c-3.8-1.6-7.3-5.1-7.3-9.8c0-5.7,5.1-10.5,10.8-10.5c2.9,0,4.8,1,7.6,3.2l23.8,17.4
        l-3.2-28.2c-1-6.7,3.5-12,9.8-12c6.3,0,10.8,5.1,9.8,11.7L57,41.8l23.8-17.4c2.9-2.2,5.1-3.2,7.9-3.2c5.7,0,10.5,4.8,10.5,10.5
        c0,5.1-3.5,8.2-7.3,9.8L63.9,53.8l27.9,12c3.8,1.6,7.3,5.1,7.3,10.1c0,5.7-5.1,10.5-10.8,10.5c-2.5,0-4.8-1.3-7.6-3.2L57,65.8
        l3.2,28.2c1,6.7-3.5,12-9.8,12c-6.3,0-10.8-5.1-9.8-11.7L43.7,65.8z"/>
    </svg>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scrollTop: 0
    }
  },
  mounted() {
    // Get a reference to the <path>
    var _this = this;
    var wrapper = document.querySelector('.scroll-wrapper');
    var path = document.querySelector('#star-path');

    // Get length of path... ~577px in this case
    var pathLength = path.getTotalLength();

    // Make very long dashes (the length of the path itself)
    path.style.strokeDasharray = pathLength + ' ' + pathLength;

    // Offset the dashes so the it appears hidden entirely
    path.style.strokeDashoffset = pathLength;

    // Jake Archibald says so
    // https://jakearchibald.com/2013/animated-line-drawing-svg/

    // When the page scrolls...
    wrapper.onscroll = function(e) {
      var scrollTop = e.target.scrollTop;
      var scrollHeight = e.target.scrollHeight;
      var wrapperHeight = e.target.clientHeight;
      _this.scrollTop = scrollTop;
      // 滑动的百分比
      var scrollPercentage = scrollTop / (scrollHeight - wrapperHeight);
        
      // Length to offset the dashes
      var drawLength = pathLength * scrollPercentage;
      
      // Draw in reverse
      path.style.strokeDashoffset = pathLength - drawLength;
        
      // 避免收尾不够平滑
      if (scrollPercentage >= 0.99) {
        path.style.strokeDasharray = "none";
        
      } else {
        path.style.strokeDasharray = pathLength + ' ' + pathLength;
      }
      
    };
  }
}
</script>

<style>
.scroll-wrapper {
  position: relative;
  height: 500px;
  overflow-y: scroll;
}
.scroll-inner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5000px;
  background: linear-gradient(to bottom, orange,darkblue);
}
#star-svg {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  display: block;
  width: 150px;
  height: 150px;
}
</style>
