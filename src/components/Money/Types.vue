<template>
    <div>
        <ul class="types">
            <li :class="type ==='-' && 'selected' " @click="selectedType('-')">支出</li>
            <li :class="type === '+' && 'selected' " @click="selectedType('+')">收入</li>
        </ul>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  // vue-property-decorator 是一个比官方好一些的第三方库
  import {Component} from 'vue-property-decorator';

  @Component
  export default class Types extends Vue {
    // initial data
    type = '-';        // '-' 表示支出， ‘+’ 表示收入
    selectedType(type: string) {
      if (type !== '-' && type !== '+') {
        throw new Error('type is unknown!!');
      }
      this.type = type;
    }
  }
</script>

<style scoped lang="scss">
    @import "~@/assets/styles/helper.scss";

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

            &.selected::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 3px;
                background-color: #2853d2;
            }
        }
    }

</style>