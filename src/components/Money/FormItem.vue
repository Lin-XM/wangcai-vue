<template>
    <div>
        <label class="formItem">
            <span class="name">{{this.filedName}}</span>
            <input type="text"
                   :placeholder="placeholder"
                   :value="value"
                   @input="onValueChanged($event.target.value)">
        </label>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';


  @Component
  export default class FormItem extends Vue {
    @Prop({default: ''}) readonly value!: string;

    // 接收外面传递的数据
    @Prop({required: true}) filedName!: string;
    @Prop() placeholder?: string;

    onValueChanged(value: string) {
      this.$emit('update:value', value);
    }

    // onInput(event: KeyboardEvent) {
    //   const input = (event.target as HTMLInputElement);
    //   this.value = input.value;
    // }
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