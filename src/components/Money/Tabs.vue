<template>
    <div>
        <ul class="tabs">
            <li v-for="item in dataSource" :key="item.value"
                :class="{[classPrefix+'-tabs-item']:classPrefix,selected:item.value === value}"
                @click="select(item)">{{item.text}}
            </li>
        </ul>
    </div>

</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  type DataSourceItem = {
    // text:天/周/月   value:day/week/month
    text: string, value: string
  }
  @Component
  export default class Tabs extends Vue {
    @Prop({required: true, type: Array}) dataSource!: DataSourceItem[];

    @Prop(String) readonly value!: string;      //选中哪行
    @Prop(String) classPrefix?: string;                      // 类型前缀

    // liClass (item:DataSourceItem){
    //     [this.classPrefix+'-tabs-item']:this.classPrefix,
    //     selected:item.value === this.value
    // }

    select(item: DataSourceItem) {
      this.$emit('update:value', item.value);
    }

  }
</script>

<style scoped lang="scss">
    @import "~@/assets/styles/helper.scss";

    .tabs {
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