<template>
  <div class="tutorial">
    <div class="desc">
      <div>Распределите задачи между исполнителями</div>
    </div>
    <div>
      <div class="box">
        <Icon image="star" color="#000">●</Icon>
        <div>Сложность</div>
        <Icon image="circle" color="#000">●</Icon>
        <div>Время</div>
      </div>
      <svg class="cursor" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="black"><path d="M18.536 7.555c-1.188-.252-4.606-.904-5.536-1.088v-3.512c0-1.629-1.346-2.955-3-2.955s-3 1.326-3 2.955v7.457c-.554-.336-1.188-.621-1.838-.715-1.822-.262-3.162.94-3.162 2.498 0 .805.363 1.613 1.022 2.271 3.972 3.972 5.688 5.125 6.059 9.534h9.919v-1.748c0-5.154 3-6.031 3-10.029 0-2.448-1.061-4.157-3.464-4.668zm.357 8.022c-.821 1.483-1.838 3.319-1.891 6.423h-6.13c-.726-3.82-3.81-6.318-6.436-8.949-.688-.686-.393-1.37.442-1.373 1.263-.006 3.06 1.884 4.122 3.205v-11.928c0-.517.458-.955 1-.955s1 .438 1 .955v6.948c0 .315.256.571.572.571.314 0 .57-.256.57-.571v-.575c0-.534.49-.938 1.014-.833.398.079.686.428.686.833v1.273c0 .315.256.571.571.571s.571-.256.571-.571v-.83c0-.531.487-.932 1.008-.828.396.078.682.424.682.828v1.533c0 .315.256.571.571.571s.571-.256.571-.571v-.912c0-.523.545-.867 1.018-.646.645.305 1.166.932 1.166 2.477 0 1.355-.465 2.193-1.107 3.354z"/></svg>
    </div>
    <div class="ok">
      <div @click="close">Продолжить →</div>
    </div>
  </div>
</template>

<style scoped>
  .tutorial { overflow: hidden; max-width: 450px; margin: 0 auto; position: fixed; top: 0; bottom: 0; left: 0; right: 0; background: rgba(0,0,0,.75); }
  .desc { color: white; position: absolute; top: 0; display: flex; justify-content: center; left: 0; right: 0; padding: 20px 0; font-family: "PT Sans"; font-size: 16px; font-weight: bold; text-align: center; }
  .tutorial .box { overflow: hidden;  font-family: "PT Sans"; font-size: 16px; font-weight: bold; display: flex; align-items: center; position: absolute; top: 340px; left: 30px; border-radius: 3px; padding: 5px 10px; background: white; animation: box 5s 2s infinite forwards normal; }
  .tutorial .box > * { margin-right: 5px; }
  .tutorial .cursor { background: white; padding: 5px; border-radius: 100px; border: 2px solid black; position: absolute; top: 375px; left: 80px; animation: cursor 5s 2s infinite forwards; }
  .ok { padding-bottom: 40px; position: absolute; display: flex; justify-content: center; left: 0; right: 0; background: rgba(0,0,0,.5); box-shadow: 0 0 50px 20px rgba(0,0,0,.5); bottom: 0; font-family: "Bad Script"; color: white; font-size: 30px; }

  @keyframes box {
    0% { top: 340px; left: 30px; transform: scale(1) rotate(0deg); opacity: 1; }
    10% { top: 340px; left: 30px; transform: scale(1) rotate(0deg); opacity: 1; }
    20% { top: 340px; left: 30px; transform: scale(1) rotate(5deg); opacity: 1; }
    50% { top: 240px; left: 140px; transform: scale(1) rotate(5deg); opacity: 1; }
    80% { top: 100px; left: 140px; transform: scale(1) rotate(5deg); opacity: 1; }
    90% { top: 100px; left: 140px; transform: scale(1) rotate(5deg); opacity: 0; }
    100% { top: 100px; left: 140px; transform: scale(1) rotate(5deg); opacity: 0; }
  }

  @keyframes cursor {
    0% { top: 375px; left: 80px; transform: scale(1); opacity: 1; }
    10% { top: 355px; left: 80px; transform: scale(.75); opacity: 1; }
    20% { top: 355px; left: 80px; transform: scale(.75); opacity: 1; }
    50% { top: 255px; left: 190px; transform: scale(.75); opacity: 1; }
    80% { top: 115px; left: 190px; transform: scale(.75); opacity: 1; }
    90% { top: 115px; left: 190px; transform: scale(1); opacity: 1; }
    100% { top: 115px; left: 190px; transform: scale(1); opacity: 0; }
  }
</style>

<script>
  import Icon from './Icon.vue'

  export default {
    components: { Icon },
    methods: {
      close() {
        this.$emit("close", true)
      }
    }
  }
</script>
