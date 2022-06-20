<template>
  <div >
    <Layout>
      <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync  ="type" />
      <Tabs class-prefix="interval" :data-source="intervalList" :value.sync  ="interval" height="48px" />
      type:{{type}}
      <br>
      interval:{{interval}}
    </Layout>
  </div>
</template>

<script lang="ts">
  import Vue from "vue"
  import {Component} from 'vue-property-decorator';
  import Tabs from '@/components/Money/Tabs.vue';
  import intervalList from '@/constants/intervalList';
  import recordTypeList from '@/constants/recordTypeList.ts';
@Component({
  components: {Tabs},
})
export default class Statistics extends Vue {
  type='-';
  // 第二列默认
  interval='day';
  intervalList=intervalList;
  recordTypeList = recordTypeList;

};
</script>

<style scoped lang="scss">
::v-deep {
  .type-tabs-item {
    background-color:#59e5cf;

    &.selected {
      background-color: darken(#59e5cf,15%);
      color: white;
      &::after {
        display: none;
      }
    }
  }
  .interval-tabs-item{
    /*height: 48px;*/
    background-color:#59e5cf;
    &.selected{
        background-color: darken(#59e5cf,15%);
      &::after {
        background-color: #5a76dc;
      }
    }
  }
}


</style>
