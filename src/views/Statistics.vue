<template>
  <div>
    <Layout>
      <Types class="x" :type.sync="yyy" />
    </Layout>
  </div>
</template>

<script lang="ts">
  import Vue from "vue"
import Types from '@/components/Money/Types.vue';
  import {Component} from 'vue-property-decorator';
@Component({
  components: {Types},
})
export default class Statistics extends Vue {
  yyy='-'

};
</script>

<style scoped lang="scss">
  .x ::v-deep li{
    background-color: #59e5cf;
    &.selected{
      background-color: #42b983;
      &::after{
        display: none;
      }
    }
  }

</style>
