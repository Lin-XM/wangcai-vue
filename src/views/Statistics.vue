<template>
  <div >
    <Layout>
      <Tabs class-prefix="type" :data-source="typesList" :value.sync  ="type" />
      <Tabs class-prefix="interval" :data-source="intervalList" :value.sync  ="interval" />
      type:{{type}}
      <br>
      interval:{{interval}}
    </Layout>
  </div>
</template>

<script lang="ts">
  import Vue from "vue"
import Types from '@/components/Money/Types.vue';
  import {Component} from 'vue-property-decorator';
  import Tabs from '@/components/Money/Tabs.vue';
@Component({
  components: {Tabs, Types},
})
export default class Statistics extends Vue {
  type='-';
  // 第二列默认
  interval='day';
  intervalList=[
          {text:'天',value:'day'},
          {text:'周',value:'week'},
          {text:'月',value:'month'},
          ]
  typesList = [
    {text:'支出',value:'-'},
    {text:'收入',value:'+'},
  ]

};
</script>

<style scoped lang="scss">
::v-deep .type-tabs-item{
    background-color: #59e5cf;
    &.selected{
      background-color: #42b983;
      &::after{
        display: none;
      }
    }
  }

</style>
