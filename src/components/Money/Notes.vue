<template>
    <div>
        <label class="notes">
            <span class="name">备注:</span>
            <input type="text" placeholder="请输入您的备注" :value="value" @input="onInput">
        </label>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class Notes extends Vue {
    value = '';

    onInput(event: KeyboardEvent) {
      const input = (event.target as HTMLInputElement);
      this.value = input.value;
    }
  }
</script>

<style scoped lang="scss">
    @import "~@/assets/styles/helper.scss";

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
</style>