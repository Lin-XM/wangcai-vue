<template>
    <div>
        <Layout>
            <ol class="tags">
                <li>
                    <span>衣</span>
                    <Icons name="right"/>
                </li>
                <li>
                    <span>食</span>
                    <Icons name="right"/>
                </li>
                <li>
                    <span>住</span>
                    <Icons name="right"/>
                </li>
                <li>
                    <span>行</span>
                    <Icons name="right"/>
                </li>
            </ol>
            <div class="newTags-wrapper">
                <button class="newTags">新建标签</button>
            </div>
        </Layout>
    </div>
</template>

<script lang="ts">
  export default {
    name: 'Labels',
  };
</script>

<style scoped lang="scss">
    .tags{
        font-size: 16px;
        padding-left: 16px;
        >li {
            min-height: 44px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #e6e6e6;
            svg{
                color: #666;
                margin-right: 16px;
                width: 18px;
                height: 18px;
            }
        }

    }
    .newTags{
        background-color: #c0d9ff;
        border-radius: 3px;
        border:none;
        height: 44px;
        padding: 0 16px;
        &-wrapper{
            text-align: center;
            padding: 16px;
            margin-top: 28px;
        }
    }

</style>
