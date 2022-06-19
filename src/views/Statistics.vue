<template>
  <div >
    <Layout>
      <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync  ="type" />
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
  import intervalList from '@/constants/intervalList';
  import recordTypeList from '@/constants/recordTypeList.ts';
@Component({
  components: {Tabs, Types},
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
