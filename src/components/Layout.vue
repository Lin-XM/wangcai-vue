<template>
  <div class="nav-wrapper">
    <div class="content">
      <slot></slot>
    </div>
    <Nav class="Nav" />
  </div>
</template>

<script>
export default {
  name: "Layout",
};
</script>

<style scoped lang="scss">
.nav-wrapper {
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
