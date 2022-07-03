<template>
    <div>
        <Layout>
            <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>

            <div class="chart-wrapper" ref="chartWrapper">
                <Chart class="chart" :options="x"/>
            </div>

            <ol v-if="groupList.length>0">
                <li v-for="(group,index) in groupList" :key="index">
                    <h3 class="title">{{beautify(group.title)}}<span>￥{{group.total}}</span></h3>
                    <ol>
                        <li class="record" v-for="item in group.items" :key="item.id">
                            <span>{{tagString(item.tags)}}</span>
                            <span class="itemNotes">{{item.notes}}</span>
                            <span>￥{{item.amount}} </span>
                        </li>
                    </ol>

                </li>
            </ol>
            <div v-else class="noResult">
                目前没有相关记录
            </div>

        </Layout>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Tabs from '@/components/Money/Tabs.vue';
  import recordTypeList from '@/constants/recordTypeList.ts';
  import dayjs from 'dayjs';
  import clone from '@/lib/clone';
  import Chart from '@/components/Chart.vue';
  import _ from 'lodash';


  @Component({
    components: {Tabs, Chart},
  })
  export default class Statistics extends Vue {
    // 控制图表初始为 最右侧
    mounted() {
      const div = (this.$refs.chartWrapper as HTMLDivElement);
      div.scrollLeft = div.scrollWidth;
    }


    tagString(tags: Tag[]) {                                                          // 处理标签
      return tags.length === 0 ? '无' : tags.map(t => t.name).join(',');
    }

    beautify(string: string) {
      const now = dayjs();
      const day = dayjs(string);
      if (day.isSame(now, 'day')) {
        return '今天';
      } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
        return '昨天';
      } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
        return '前天';
      } else if (day.isSame(now, 'year')) {
        return day.format('MM月DD日');
      } else {
        return day.format('YYYY年MM月DD日');
      }
    }

    get y() {

      const today = new Date();
      const array = [];
      for (let i = 0; i <= 29; i++) {
        let dateString = dayjs(today).subtract(i, 'day').format('YYYY-MM-DD');
        let found = _.find(this.recordList, {createAt: dateString});
        array.push({
          date: dateString,
          value: found ? found.amount : 0
        });
      }
      console.log(array);
      array.sort((a, b) => {
        if (a.date < b.date) {
          return 1;
        } else if (a.date === b.date) {
          return 0;
        } else {
          return -1;
        }
      });
      return array;
    }


    get x() {

      console.log(this.recordList.map(r => _.pick(r, ['createAt', 'amount'])));

      const keys = this.y.map(item => item.date);
      const values = this.y.map(item => item.value);

      return {
        grid: {
          left: 0,
          right: 0,
        },
        xAxis: {
          type: 'category',
          data: keys,
          axisTick: {
            alignWithLabel: true,
          },
          axisLine: {
            lineStyle: {
              color: '#666'
            }
          }
        },
        yAxis: {
          type: 'value',
          show: false
        },
        series: [{
          symbol: 'circle',
          symbolSize: 10,
          itemStyle: {borderWidth: 1, color: '#666', borderColor: '#666'},

          data: values,
          type: 'line'
        }],

        tooltip: {
          show: true,
          triggerOn: 'click',
          formatter: '{c}',
          position: 'top',
        }

      };
    }

    get recordList() {
      return (this.$store.state as RootState).recordList;
    }

    get groupList() {
      const {recordList} = this;

      type Result = {
        title: string,
        total?: number,
        items: RecordItem[]
      }[]


      // 对创建时间 进行排序
      const newList = clone(recordList)
        .filter(record => record.type === this.type)
        .sort((a, b) => dayjs(b.createAt)
          .valueOf() - dayjs(a.createAt).valueOf());

      if (newList.length === 0) { return []; }


      const result: Result = [{title: dayjs(newList[0].createAt).format('YYYY-MM-DD'), items: [newList[0]]}];      // 将newList 的第一项放进去

      for (let i = 1; i < newList.length; i++) {
        const currentItem = newList[i];
        const last = result[result.length - 1];
        // 如果当前项和 groupList 最后一项是同一天
        if (dayjs(last.title).isSame(dayjs(currentItem.createAt), 'day')) {
          last.items.push(currentItem);
        } else {
          result.push({title: dayjs(currentItem.createAt).format('YYYY-MM-DD'), items: [currentItem]});
        }
      }


      // 算出一天的支出/收入 总价格
      result.map(group => {
        group.total = group.items.reduce((sum, item) => {return sum + item.amount;}, 0);
      });

      return result;
    }

    created() {
      this.$store.commit('fetchRecords');
    }

    type = '-';
    // 第二列默认
    recordTypeList = recordTypeList;

  }
</script>

<style scoped lang="scss">
    .chart-wrapper {
        overflow: auto;

        &::-webkit-scrollbar {
            display: none;
        }

        > .chart {
            width: 430%;
            overflow: hidden;
        }
    }


    .noResult {
        padding: 16px;
        text-align: center;
    }

    ::v-deep {
        .type-tabs-item {
            background-color: #59e5cf;

            &.selected {
                background-color: darken(#59e5cf, 15%);
                color: white;

                &::after {
                    display: none;
                }
            }
        }


    }

    %item {
        padding: 8px 16px;
        line-height: 24px;

        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .title {
        @extend %item;
    }

    .record {
        @extend %item;
        background-color: white;
        position: relative;

        &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: #bce3e8;
        }
    }

    .itemNotes {
        margin-right: auto;
        margin-left: 16px;
        background-color: white;
        color: grey;
    }


</style>
