<template>
    <div>
        <Layout>
            <ol class="tags">
                <li v-for="tag in tags" :key="tag">
                    <span>{{tag}}</span>
                    <Icons name="right"/>
                </li>

            </ol>
            <div class="newTags-wrapper">
                <button class="newTags" @click="createTag">新建标签</button>
            </div>
        </Layout>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import tagListModel from '@/Models/tagsListModes';

  tagListModel.fetch();
  @Component
  export default class Labels extends Vue {

    tags = tagListModel.data;

    createTag() {
      const name = window.prompt('请输入你的标签名：');
      if (name) {
        const message = tagListModel.create(name);
        if (message === 'duplicated') {
          window.alert('输入的标签名称重复！');
        } else if (message === 'success') {
          window.alert('标签添加成功！');
        }

      }
    }
  }
</script>

<style scoped lang="scss">
    .tags {
        font-size: 16px;
        padding-left: 16px;

        > li {
            min-height: 44px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #e6e6e6;

            svg {
                color: #666;
                margin-right: 16px;
                width: 18px;
                height: 18px;
            }
        }

    }

    .newTags {
        background-color: #c0d9ff;
        border-radius: 3px;
        border: none;
        height: 44px;
        padding: 0 16px;

        &-wrapper {
            text-align: center;
            padding: 16px;
            margin-top: 28px;
        }
    }

</style>
