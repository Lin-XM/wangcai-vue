<template>
    <nav>
        <router-link to="/money" class="item" active-class="selected">
            <Icons class="icon" name="money"/>
            记账
        </router-link>
        <router-link to="/labels" class="item" active-class="selected">
            <Icons class="icon" name='label'/>
            标签
        </router-link>
        <router-link to="/statistics" class="item" active-class="selected">
            <Icons class="icon" name="statistics"/>
            统计
        </router-link>
    </nav>
</template>

<script lang="ts">
  export default {
    name: 'Nav'
  };
</script>

<style scoped lang="scss">
    nav {
        display: flex;
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
        flex-direction: row;
        background-color: rgb(192, 217, 255);

        > .item {
            padding: 2px;
            width: 33.33333%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            color: rgb(157, 131, 37);
            font-size: 12px;
            .icon {
                width: 32px;
                height: 32px;
            }
        }
        > .item.selected{
            color: #0887e8;
        }
    }
</style>