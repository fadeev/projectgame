<template>
  <div class="icon">
    <div class="image center">
      <svg :class="{star: image == 'star', circle: image == 'circle', center: true}" :fill="color" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
        <path v-if="image == 'star'" d="M15.668 8.626l8.332 1.159-6.065 5.874 1.48 8.341-7.416-3.997-7.416 3.997 1.481-8.341-6.064-5.874 8.331-1.159 3.668-7.626 3.669 7.626zm-6.67.925l-6.818.948 4.963 4.807-1.212 6.825 6.068-3.271 6.069 3.271-1.212-6.826 4.964-4.806-6.819-.948-3.002-6.241-3.001 6.241z"/>
        <path v-if="image == 'circle'" d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11z"/>
      </svg>
    </div>
    <div class="text center" :style="{color: color}">
      <transition name="text" tag="span">
        <span v-if="show" class="number">{{text}}</span>
      </transition>
    </div>
  </div>
</template>

<style scoped>
  .icon { font-family: "Bree Serif"; font-weight: bold; font-size: 15px; position: relative; margin: 0 2px; width: 30px; height: 30px; display: flex; justify-content: center; align-items: center; }
  .image { position: absolute; }
  .text { position: absolute; }
  .center { display: flex; align-content: center; justify-content: center; }
  .star { width: 30px; margin-top: -2px; }
  .circle { width: 26px; margin-top: 2px; }
  svg { height: 30px; }

  .number { transition: 1s all; }

  .text-leave-active { transform: scale(.5); opacity: 0; }
  .text-enter { transform: scale(1.5); opacity: 1; }
</style>

<script>
  export default {
    name: "Icon",
    props: ["color", "image", "text"],
    data: () => {
      return {
        show: true,
      }
    },
    watch: {
      text: function () {
        this.show = false;
        setTimeout(() => { this.show = true }, 500)
      },
    },
  }
</script>