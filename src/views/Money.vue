<template>
    <div>
        <Layout>
            <div class="tags">
                <ul class="current">
                    <li>衣</li>
                    <li>食</li>
                    <li>住</li>
                    <li>行</li>
                </ul>
                <div class="new">
                    <button>新增标签</button>
                </div>
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
                <div>
                    <button>1</button>
                    <button>2</button>
                    <button>3</button>
                    <button>delete</button>
                    <button>4</button>
                    <button>5</button>
                    <button>6</button>
                    <button>clear</button>
                    <button>7</button>
                    <button>8</button>
                    <button>9</button>
                    <button>OK</button>
                    <button>0</button>
                    <button>.</button>
                    <button>+</button>
                    <button>-</button>
                </div>
            </div>
        </Layout>
    </div>
</template>

<script lang="ts">
  export default {
    name: 'Money',
  };
</script>

<style scoped lang="scss">
    @import "~@/assets/styles/helper.scss";

    .tags {
        font-size: 14px;
        padding: 16px;

        > .current {
            display: flex;

            > li {
                background-color: rgb(192, 217, 255);
                height: 24px;
                line-height: 24px;
                border-radius: (24px/2);
                padding: 0 16px;
                margin-right: 12px;
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
            &.selected::after{
                content: '';
                position: absolute;
                bottom: 0;
                left: 0 ;
                width: 100%;
                height: 3px;
                background-color: #2853d2;
            }
        }
    }

</style>
