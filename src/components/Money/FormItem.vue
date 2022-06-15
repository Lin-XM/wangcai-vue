<template>
    <div>
        <label class="formItem">
            <span class="name">{{this.fieldName}}</span>
            <input type="text" :placeholder="this.placeholder" :value="value" @input="onInput">
        </label>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop, Watch} from 'vue-property-decorator';



  @Component
  export default class FormItem extends Vue {
    value = '';

    // 接收外面传递的数据
    @Prop({required:true}) fieldName!:string
    @Prop() placeholder?:string

    @Watch('value')
    onValueChanged(value: string) {
      this.$emit('updateNotes', value);
    }

    onInput(event: KeyboardEvent) {
      const input = (event.target as HTMLInputElement);
      this.value = input.value;
    }
  }
</script>

<style scoped lang="scss">
    @import "~@/assets/styles/helper.scss";

    .formItem {
        font-size: 14px;
        padding-left: 16px;
        display: flex;
        align-items: center;

        .name {
            padding-right: 16px;
        }

        input {
            height: 40px;
            flex-grow: 1;
            background-color: transparent;
            border: none;
            padding-right: 16px;
        }
    }
</style>