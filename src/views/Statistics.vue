<template>
    <div>
        <Layout>
            <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
            <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval" height="48px"/>

            <ol>
                <li v-for="(group,index) in result" :key="index">
                    <h3 class="title">{{beautify(group.title)}}</h3>
                    <ol>
                        <li class="record" v-for="item in group.items" :key="item.id">
                            <span>{{tagString(item.tags)}}</span>
                            <span class="itemNotes">{{item.notes}}</span>
                            <span>￥{{item.amount}} </span>
                        </li>
                    </ol>
                </li>
            </ol>

        </Layout>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Tabs from '@/components/Money/Tabs.vue';
  import intervalList from '@/constants/intervalList';
  import recordTypeList from '@/constants/recordTypeList.ts';
  import dayjs from 'dayjs';

  @Component({
    components: {Tabs},
  })
  export default class Statistics extends Vue {
    tagString(tags: Tag[]) {                                                          // 处理标签
      return tags.length === 0 ? '无' : tags.join(',');
    }

    beautify(string: string) {
      // const date = new Date(Date.parse(string));
      // const m = date.getMonth();
      // const y = date.getFullYear();
      // const d = date.getDate();
      // const now  = new Date()
      // if(now.getFullYear() === y && now.getMonth() === m && now.getDate() === d ){
      //   return '今天'
      // }else{
      //   return string
      // }
      const now = dayjs();
      const day = dayjs(string);
      if (day.isSame(now, 'day')) {
        return '今天';
      } else if (day.isSame(now.subtract(1, 'day'),'day')) {
        return '昨天';
      } else if (day.isSame(now.subtract(2, 'day'),'day')) {
        return '前天';
      }else if(day.isSame(now,'year')){
        return  day.format('MM月DD日')
      }
      else{
        return  day.format('YYYY年MM月DD日')
      }
    }

    get recordList() {
      return (this.$store.state as RootState).recordList;
    }

    get result() {
      const {recordList} = this;
      type hashTableValue = { title: string, items: RecordItem[] };
      const hashTable: { [key: string]: hashTableValue } = {};


      for (let i = 0; i < recordList.length; i++) {
        const [date, time] = recordList[i].createAt!.split('T');

        hashTable[date] = hashTable[date] || {title: date, items: []};              // 设定 date 日期为 key
        hashTable[date].items.push(recordList[i]);

      }
      return hashTable;
    }

    created() {
      this.$store.commit('fetchRecords');
    }

    type = '-';
    // 第二列默认
    interval = 'day';
    intervalList = intervalList;
    recordTypeList = recordTypeList;

  };
</script>

<style scoped lang="scss">
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

        .interval-tabs-item {
            /*height: 48px;*/
            background-color: #59e5cf;

            &.selected {
                background-color: darken(#59e5cf, 15%);

                &::after {
                    background-color: #5a76dc;
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
