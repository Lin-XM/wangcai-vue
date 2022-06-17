<template>
    <layout>
        <div class="navBar">
            <Icons class="leftIcon" name="left" @click.native="goBack"/>
            <span class="title">编辑标签</span>
            <span class="rightIcon"></span>
        </div>
        <div class="form-wrapper">
            <FormItem :value="tag.name" @update:value="updateTag"
                      field-name="标签名" placeholder="请输入标签名"/>

        </div>
        <div class="button-wrapper">
            <Button @click="remove">删除标签</Button>

        </div>
    </layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import FormItem from '@/components/Money/FormItem.vue';
  import Button from '@/components/Button.vue';

  @Component({
    components: {Button, FormItem}
  })
  export default class EditLabel extends Vue {
    tag?: Tag =undefined;

    created() {
      this.tag = window.findTag(this.$route.params.id);

      if (!this.tag) {
        this.$router.replace('/404');
      }
    }

    // 修改标签，还有bug
    updateTag(name: string) {
      console.log('111111');
      if (this.tag) {
        window.updateTag(this.tag.id, name);
      }
    }


    // 删除标签
    remove() {
      if (this.tag) {
        if (window.removeTag(this.tag.id)) {
          this.$router.back();
        } else {
          window.alert('删除失败！');
        }
      }
    }

    goBack() {
      this.$router.back();
    }

  }
</script>

<style lang="scss" scoped>
    .navBar {
        text-align: center;
        font-size: 16px;
        line-height: 48px;
        padding: 0 16px;
        background-color: white;
        display: flex;
        align-items: center;
        justify-content: space-between;

        > .title {

        }

        > .leftIcon {
            width: 24px;
            height: 24px;
        }

        > .rightIcon {
            width: 24px;
            height: 24px;
        }

    }

    .form-wrapper {
        /* money.vue 配置了颜色*/
        background-color: #cee7e7;
        margin-top: 8px;
    }

    .button-wrapper {
        text-align: center;
        padding: 16px;
        margin-top: 28px;
    }
</style>