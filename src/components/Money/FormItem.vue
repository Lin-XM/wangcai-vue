<template>
    <div>
        <label class="formItem">
            <span class="name">{{this.fieldName}}</span>`

            <template v-if="type=== 'date' ">
                <input :type="type || 'text' "
                       :placeholder="placeholder"
                       :value="x(value)"
                       @input="onValueChanged($event.target.value)">
            </template>

            <template v-else>
                <input :type="type || 'text' "
                       :placeholder="placeholder"
                       :value="value"
                       @input="onValueChanged($event.target.value)">
            </template>

        </label>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';
  import dayjs from 'dayjs';


  @Component
  export default class FormItem extends Vue {
    @Prop({default: ''}) readonly value!: string;

    // 接收外面传递的数据
    @Prop({required: true}) fieldName!: string;
    @Prop() placeholder?: string;
    @Prop() type?:string;

    onValueChanged(value: string) {
      this.$emit('update:value', value);
    }

    x(isoString:string){
      const fuck = dayjs(isoString).format('YYYY-MM-DD')
      console.log(fuck);
      return fuck
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