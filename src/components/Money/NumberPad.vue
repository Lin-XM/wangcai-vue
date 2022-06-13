<template>
    <div class="numberPad">
        <div class="output">{{output ||'0'}}</div>
        <div class="buttons">
            <button @click="inputContent">1</button>
            <button @click="inputContent">2</button>
            <button @click="inputContent">3</button>
            <button @click="remove">C</button>

            <button @click="inputContent">4</button>
            <button @click="inputContent">5</button>
            <button @click="inputContent">6</button>
            <button>+</button>

            <button @click="inputContent">7</button>
            <button @click="inputContent">8</button>
            <button @click="inputContent">9</button>
            <button>-</button>


            <button @click="inputContent">.</button>
            <button @click="inputContent" class="zero">0</button>
            <button @click="clear">CE</button>
            <button @click="ok" class="ok">OK</button>
        </div>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component
  export default class NumberPad extends Vue {
    output = '0';


    inputContent(event: MouseEvent) {               // 事件分为，鼠标事件，键盘事件，用户事件，UI事件
      const button = (event.target as HTMLButtonElement);
      const input = button.textContent as string;
      if (this.output.length === 16) return;
      if (this.output === '0') {                    // 当输入框 为 0
        if ('0123456789'.indexOf(input) >= 0) {     // 用户输入的 不为0
          this.output = input;
          return;
        } else {                                    // 输入的为 。
          this.output += input;
          return;
        }
      }
      if (this.output.indexOf('.') >= 0) {              // 判断是否 有 。
        if (input === '.') return;                      // 判断是否 又输入一个 。
      }

      this.output += input;
    }

    remove() {
      this.output = this.output.slice(0, -1);
      if (this.output.length === 0) {
        this.output = '0';
      }
      /*
        if(this.output.length === 1){
             this.output = '0"
        }else{
            this.output = this.output.slice(0,-1)
        }

      *  */
    }

    clear() {
      this.output = '0';
    }

    ok() {
      this.$emit('updateAmount',this.output)
      this.$emit('submit',this.output)
      this.output =  '0'
    }
  }
</script>

<style scoped lang="scss">
    @import "~@/assets/styles/helper.scss";

    .numberPad {
        > .output {
            font-size: 36px;
            font-family: Consolas, monospace;
            padding: 9px 16px;
            text-align: right;
            background: #59e5cf;
            box-shadow: inset 0 -3px 3px -3px rgba(0, 0, 0, 0.3);
            min-height: 72px;
        }

        .buttons {
            @extend %clearFix;

            button {
                width: 25%;
                height: 64px;
                float: left;
                background-color: transparent;
                border: none;

                &.ok {
                    height: 64px;
                    float: right;
                }

                &.zero {
                }

                $bg: #c0eee2;

                &:nth-child(1) {
                    background-color: $bg
                }

                &:nth-child(2), &:nth-child(5) {
                    background-color: darken($bg, 4%);
                }

                &:nth-child(3), &:nth-child(6), &:nth-child(9) {
                    background-color: darken($bg, 8%);
                }

                &:nth-child(4), &:nth-child(7), &:nth-child(10), &:nth-child(13) {
                    background-color: darken($bg, 12%);
                }

                &:nth-child(8), &:nth-child(11), &:nth-child(14) {
                    background-color: darken($bg, 16%);
                }

                &:nth-child(12), &:nth-child(15) {
                    background-color: darken($bg, 20%);
                }

                &:nth-child(16) {
                    background-color: #59e5cf;

                }
            }
        }
    }

</style>