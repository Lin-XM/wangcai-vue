<template>
    <div>
        <Layout>
            <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
            <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval" height="48px"/>

            <ol>
                <li v-for="(group,index) in groupList" :key="index">
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
  import clone from '@/lib/clone';

  @Component({
    components: {Tabs},
  })
  export default class Statistics extends Vue {
    tagString(tags: Tag[]) {                                                          // 处理标签
      return tags.length === 0 ? '无' : tags.join(',');
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

    get recordList() {
      return (this.$store.state as RootState).recordList;
    }

    get groupList() {
      const {recordList} = this;
      if (recordList.length === 0) { return []; }

      // 对创建时间 进行排序
      const newList = clone(recordList).sort((a, b) => dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf());

      const result = [{title: dayjs(newList[0].createAt).format('YYYY-MM-DD'), items: [newList[0]]}];      // 将newList 的第一项放进去
      for (let i = 0; i < newList.length; i++) {
        const currentItem = newList[i];
        const last = result[result.length - 1];
        // 如果当前项和 groupList 最后一项是同一天
        if (dayjs(last.title).isSame(dayjs(currentItem.createAt), 'day')) {
          last.items.push(currentItem);
        } else {
          result.push({title: dayjs(currentItem.createAt).format('YYYY-MM-DD'), items: [currentItem]});
        }
      }

      console.log(result);
      return result;
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
