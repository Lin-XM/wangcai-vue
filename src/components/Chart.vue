<template>
    <div class="wrapper" ref="wrapper"></div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import * as echarts from 'echarts';
  import {EChartOption} from 'echarts';

  @Component
  export default class Chart extends Vue {
    @Prop() options?: EChartOption;

    mounted() {
      console.log(this.options);
      if (this.options === undefined) {
        console.log('没有数据');
        return;
      }
      let chart = echarts.init(this.$refs.wrapper as HTMLDivElement);
      chart.setOption(this.options);
    }
  }
</script>

<style scoped lang="scss">
    .wrapper {
        height: 400px;
    }
</style>