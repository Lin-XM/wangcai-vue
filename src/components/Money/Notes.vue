<template>
    <div>
        <label class="notes">
            <span class="name">备注:</span>
            <input type="text" placeholder="请输入您的备注">
        </label>
    </div>
</template>

<script>
    export default {
        name: "Notes"
    }
</script>

<style scoped lang="scss">
    @import "~@/assets/styles/helper.scss";

    .notes {
        background-color: #cee7e7;
        font-size: 14px;
        padding-left: 16px;
        display: flex;
        align-items: center;

        .name {
            padding-right: 16px;
        }

        input {
            height: 64px;
            flex-grow: 1;
            background-color: transparent;
            border: none;
            padding-right: 16px;
        }
    }
</style>