<template>
    <div class="nav">
        <router-link to="/money">
            <svg>
                <use xlink:href="#label" />
            </svg>
            记账
        </router-link>
        <router-link to="/labels">标签</router-link>
        <router-link to="/statistics">统计</router-link>
    </div>
</template>

<script>
import labels from '@/assets/icons/label.svg'
console.log(labels);
export default {
    name: "Nav"
}
</script>

<style scoped lang="scss">
.nav {
    border: 1px solid green;
}
</style>