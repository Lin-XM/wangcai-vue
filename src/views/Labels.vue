<template>
    <div>
        <Layout>
            <div class="tags">
                <router-link :to="`/labels/edit/${tag.id}`" class="tag" v-for="tag in tags" :key="tag.id">
                    <span>{{tag.name}}</span>
                    <Icons name="right"/>
                </router-link>

            </div>
            <div class="newTags-wrapper">
                <Button class="newTags" @click.native="createTag">新建标签</Button>
            </div>
        </Layout>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Button from '@/components/Button.vue';
  import store from '@/store';

  @Component({
    components: {Button},

  })
  export default class Labels extends Vue {
    get tags() {
      return this.$store.state.tagList
    }

    beforeCreate(){
      this.$store.commit('fetchTags')
    }

    // 此时读取在 window 上
    // 写入却在 tagListRecord.create 上

    createTag() {
      const name = window.prompt('输入你的标签名：');
      if (!name) {
        return window.alert('标签名称不能为空值！！');
      }else if(name.trim() === '' ){
        return window.alert('标签不能为空格！')
      }
      store.commit('createTags', name);
    }
  }
</script>

<style scoped lang="scss">
    .tags {
        font-size: 16px;
        padding-left: 16px;

        > .tag {
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

    .newTags-wrapper {
        text-align: center;
        padding: 16px;
        margin-top: 28px;
    }

</style>
