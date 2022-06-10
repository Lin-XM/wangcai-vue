<template>
    <div class="nav">
        <router-link to="/money" class="icon">
            <Icons name="money" />
            记账
        </router-link>
        <router-link to="/labels" class="icon">
            <Icons name='label' />
            标签
        </router-link>
        <router-link to="/statistics" class="icon">
            <Icons name="statistics" />
            统计
        </router-link>
    </div>
</template>

<script lang="ts">
export default {
    name: "Nav"
}
</script>

<style scoped lang="scss">
.nav {
    border: 1px solid green;

}

.icon {
    display: flex;
    flex-direction: row;
}
</style>