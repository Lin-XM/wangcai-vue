<template>
    <div class="tags">
        <div class="new">
            <button @click="create">新增标签</button>
        </div>

        <ul class="current">
            <li v-for="tag in tagList" :key="tag.id" @click="toggle(tag)"
                :class="{selected:selectedTags.indexOf(tag) >= 0 } ">
                {{tag.name}}
            </li>

        </ul>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import store from '@/store/index.ts';

  @Component
  export default class Tags extends Vue {
    map: { [key: string]: string } = {
      'tag name duplicated': '标签名重复了'
    };


    get tagList() {
      return this.$store.state.tagList;

    }

    selectedTags: string[] = [];

    beforeCreate() {
      this.$store.commit('fetchTags');
    }

    // 是否选中标签
    toggle(tag: string) {
      const index = this.selectedTags.indexOf(tag);
      if (index >= 0) {
        this.selectedTags.splice(index, 1);
      } else {
        this.selectedTags.push(tag);
      }
      // 导致不能传递标签
      this.$emit('update:value', this.selectedTags);

    }

    // 创建标签
    create() {
      const name = window.prompt('输入你的标签名：');
      if (!name) {
        return window.alert('标签名称不能为空值！！');
      }else if(name.trim() === '' ){
        return window.alert('标签不能为空格！')
      }
      store.commit('createTags', name);
      if (this.$store.state.createTagError) {
        window.alert(this.map[this.$store.state.createTagError.message] || '未知错误');
      }
    }
  }


</script>

<style scoped lang="scss">
    @import "~@/assets/styles/helper.scss";

    .tags {
        font-size: 14px;
        padding: 16px;
        flex-grow: 1;
        display: flex;
        flex-direction: column-reverse;
        flex-wrap: wrap;

        > .current {
            display: flex;
            flex-wrap: wrap;

            > li {
                $bg: rgb(181, 246, 216);
                background-color: $bg;
                height: 24px;
                line-height: 24px;
                border-radius: 12px;
                padding-left:16px;
                padding-right: 16px;
                padding-top: 1px;
                margin-right: 12px;
                margin-top: 4px;

                &.selected {
                    background-color: darken($bg, 40%);
                }
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
</style>