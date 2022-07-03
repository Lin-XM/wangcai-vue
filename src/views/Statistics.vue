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


  @Component({
    components: {Tabs, Chart},
  })
  export default class Statistics extends Vue {
    // 控制图表初始为 最右侧
    mounted() {
      (this.$refs.chartWrapper as HTMLDivElement).scrollLeft = 10000;
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


    get x() {
      return {
        grid: {
          left: 0,
          right: 0,
        },
        xAxis: {
          type: 'category',
          data: [
            '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
            '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
            '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
          ]
        },
        yAxis: {
          type: 'value',
          show: false
        },
        series: [{
          data: [
            820, 932, 901, 934, 1290, 1330, 1320,
            820, 932, 901, 934, 1290, 1330, 1320,
            820, 932, 901, 934, 1290, 1330, 1320,
            820, 932, 901, 934, 1290, 1330, 1320, 1, 2
          ],
          type: 'line'
        }],
        tooltip: {show: true}
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

  };
</script>

<style scoped lang="scss">
    .chart-wrapper {
        overflow: auto;

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
