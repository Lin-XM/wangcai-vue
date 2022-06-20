<template>
    <Layout class-prefix="layout">
        <!--        <NumberPad @updateAmount="onUpdateAmount" @submit="saveRecord"/>-->
        <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
        <Tabs :data-source="recordTypeList" :value.sync=record.type />
        <div class="notes">
            <FormItem field-name="备注：" placeholder="你还没有输入备注呢~"
                      @update:value="onUpdateNotes"/>

        </div>
        <Tags/>
    </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import FormItem from '@/components/Money/FormItem.vue';
  import Tags from '@/components/Money/Tags.vue';
  import {Component} from 'vue-property-decorator';
  import store from '@/store/index';
  import Tabs from '@/components/Money/Tabs.vue';
  import recordTypeList from '@/constants/recordTypeList';

  @Component({
    components: {Tabs, Tags, FormItem, NumberPad},
  })
  export default class Money extends Vue {
    recordTypeList = recordTypeList;

    get recordList() {
      return this.$store.state.recordList;
    }

    // 当前点击标签，添加数值，不能一起存入 localStorage中


    record: RecordItem = {tags: [], notes: '', type: '-', amount: 0};

    created() {
      store.commit('fetchRecords');
    }


    onUpdateNotes(value: string) {
      this.record.notes = value;
    }

    // onUpdateType(types: string) {
    //   this.record.type = types;
    // }

    // onUpdateAmount(amount: string) {
    //   this.record.amount = parseFloat(amount);
    // }

    saveRecord() {
      this.$store.commit('createRecord', this.record);
    }


  }
</script>
<style lang="scss">
    .layout-body-content {
        display: flex;
        flex-direction: column-reverse;
    }

    .notes {
        background-color: #cee7e7;
        padding: 12px 0;
    }

</style>
