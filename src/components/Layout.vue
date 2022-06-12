<template>
  <div class="layout-wrapper" :class="classPrefix && `${classPrefix}-body-wrapper`">
    <div class="content"  :class="classPrefix && `${classPrefix}-body-content`">
      <slot></slot>
    </div>
    <Nav class="Nav" />
  </div>
</template>

<script>
export default {
  name: "Layout",
  props:["classPrefix"]
};
</script>

<style scoped lang="scss">
.layout-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.Nav {
  display: flex;
  justify-content: space-around;
}

.content {
  flex-grow: 1;
  overflow: auto;
}
</style>
