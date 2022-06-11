<template>
  <div id="app">
    <router-view></router-view>
    <hr>
  </div>
</template>
<script>
  export default {
    name:"App",
  }
</script>
<style lang="scss">
  @import "~@/assets/styles/reset.scss";
  @import "~@/assets/styles/helper.scss";
  body{
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #333;
    line-height: 1.5;
    font-family: $font-hei;
  }
</style>
