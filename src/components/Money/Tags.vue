<template>
    <div class="tags">
        <div class="new">
            <button @click="create">新增标签</button>
        </div>

        <ul class="current">
            <li v-for="tag in dataSource" :key="tag.id" @click="toggle(tag)"
                :class="{selected:selectedTags.indexOf(tag) >= 0 } ">
                {{tag.name}}
            </li>

        </ul>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component
  export default class Tags extends Vue {
    @Prop(Array) readonly dataSource: string[] | undefined;
    selectedTags: string[] = [];

    // 是否选中标签
    toggle(tag: string) {
      const index = this.selectedTags.indexOf(tag);
      if (index >= 0) {
        this.selectedTags.splice(index, 1);
      } else {
        this.selectedTags.push(tag);
      }
      this.$emit('updateSelected',this.selectedTags)
    }

    // 创建标签
    create() {
      const name = window.prompt('输入你的标签名：');
      if (name === '') {
        window.alert('标签名称不能为空值！！');
      } else {
        if (this.dataSource) {
          this.$emit('getTags', [...this.dataSource,name]);
        }
      }
      console.log(name);
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
                $bg: rgb(192, 217, 255);
                background-color: $bg;
                height: 24px;
                line-height: 24px;
                border-radius: (24px/2);
                padding: 0 16px;
                margin-right: 12px;
                margin-top: 4px;

                &.selected {
                    background-color: darken($bg, 20%);
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