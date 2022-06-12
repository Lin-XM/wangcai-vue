<template>
        <Layout class-prefix="layout">
            <div class="tags">
                <div class="new">
                    <button>新增标签</button>
                </div>

                <ul class="current">
                    <li>衣</li>
                    <li>食</li>
                    <li>住</li>
                    <li>行</li>
                </ul>


            </div>

            <div>
                <label class="notes">
                    <span class="name">备注:</span>
                    <input type="text" placeholder="请输入您的备注">
                </label>
            </div>
            <div>
                <ul class="types">
                    <li class="selected">支出</li>
                    <li>收入</li>
                </ul>
            </div>

            <div class="numberPad">
                <div class="output">100</div>
                <div class="buttons">
                    <button>1</button>
                    <button>2</button>
                    <button>3</button>
                    <button>+</button>
                    <button>4</button>
                    <button>5</button>
                    <button>6</button>
                    <button>-</button>
                    <button>7</button>
                    <button>8</button>
                    <button>9</button>
                    <button class="ok">OK</button>
                    <button>.</button>
                    <button class="zero">0</button>
                    <button>CE</button>
                </div>
            </div>
        </Layout>
</template>

<script lang="ts">
  export default {
    name: 'Money',
  };
</script>
<style lang="scss">
    .layout-body-wrapper{
        border:1px solid red;
        display: flex;
        flex-direction:column-reverse ;
    }

</style>

<style scoped lang="scss">
    @import "~@/assets/styles/helper.scss";

    .numberPad {
        > .output {
            font-size: 36px;
            font-family: Consolas, monospace;
            padding: 9px 16px;
            text-align: right;
            background: #59e5cf;
            box-shadow: inset 0 -3px 3px -3px rgba(0, 0, 0, 0.3);
        }

        .buttons {
            @extend %clearFix;

            button {
                width: 25%;
                height: 64px;
                float: left;
                background-color: transparent;
                border: none;

                &.ok {
                    height: 64px*2;
                    float: right;
                }

                &.zero {
                }

                $bg: #c0eee2;

                &:nth-child(1) {
                    background-color: $bg
                }

                &:nth-child(2), &:nth-child(5) {
                    background-color: darken($bg, 4%);
                }

                &:nth-child(3), &:nth-child(6), &:nth-child(9) {
                    background-color: darken($bg, 8%);
                }

                &:nth-child(4), &:nth-child(7), &:nth-child(10), &:nth-child(13) {
                    background-color: darken($bg, 12%);
                }

                &:nth-child(8), &:nth-child(11), &:nth-child(14) {
                    background-color: darken($bg, 16%);
                }

                &:nth-child(15) {
                    background-color: darken($bg, 20%);
                }

                &:nth-child(12) {
                    background-color: darken($bg, 24%);

                }
            }
        }
    }

    .tags {
        font-size: 14px;
        padding: 16px;
        flex-grow: 1 ;
        display: flex;
        flex-direction: column-reverse;
        > .current {
            display: flex;
            float-wrap: wrap;
            > li {
                background-color: rgb(192, 217, 255);
                height: 24px;
                line-height: 24px;
                border-radius: (24px/2);
                padding: 0 16px;
                margin-right: 12px;
                margin-top: 4px;
            }
        }

        > .new {
            padding-top: 16px;

            button {
                background-color: transparent;
                border: none;
                color: #999;
                border-bottom: 1px solid;
                padding: 0 4px;
            }
        }
    }

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

    .types {
        background-color: lightseagreen;
        display: flex;
        text-align: center;
        font-size: 24px;

        > li {
            width: 50%;
            height: 64px;
            display: flex;
            justify-content: center;
            align-items: center;
            vertical-align: top;
            position: relative;

            &.selected::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 3px;
                background-color: #2853d2;
            }
        }
    }

</style>
