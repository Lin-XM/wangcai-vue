<template>
        <button class="button" @click="$emit('click',$event)">
                <slot />
        </button>
</template>

<script lang="ts">
    import Vue from "vue"
    import {Component} from 'vue-property-decorator';
    @Component
    export default class Button extends Vue {
    }
</script>

<style scoped lang="scss">
    .button {
        background-color:#59e5cf;
        border-radius: 3px;
        border: none;
        height: 44px;
        padding: 0 16px;


    }
</style>