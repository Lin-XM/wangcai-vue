<template >
    <svg class="icons" @click="$emit('click',$event)">
        <use :xlink:href="'#' + name" />
    </svg>
</template>
<script lang="ts">
let importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext)
try {
    importAll(require.context('../assets/icons/', true, /\.svg$/));
} catch (error) { console.log(error); }
export default {
    name: "Icons",
    props: ['name']
}
</script>
<style lang="scss" scoped>
.icons {
    width: 32px;
    height: 32px;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
</style>