<template>
    <Layout class-prefix="layout">
        <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
        <Tabs :data-source="recordTypeList" :value.sync=record.type />

        <div class="createAt">
            <FormItem field-name="日期：" placeholder="你还没有输入日期呢~"
                      type="date"
                      :value.sync="record.createAt"/>
        </div>
        <div class="notes">
            <FormItem field-name="备注：" placeholder="你还没有输入备注呢~"
                        :value.sync="record.notes"/>

        </div>
        <Tags @update:value = 'record.tags = $event'/>
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
    record: RecordItem = {tags: [], notes: '', type: '-', amount: 0, createAt:new Date().toISOString()};

    get recordList() {
      return this.$store.state.recordList;
    }



    created() {
      store.commit('fetchRecords');
    }


    onUpdateNotes(value: string) {
      this.record.notes = value;
    }

    saveRecord() {
      if(!this.record.tags || this.record.tags.length === 0 ){
        return window.alert("你还没有选择标签呢~")
      }
      this.$store.commit('createRecord', this.record);
      if(this.$store.state.createRecordError === null){
        window.alert('已保存....')
        this.record.notes = ''
      }

    }
  }
</script>
<style lang="scss" >
    .layout-body-content {
        display: flex;
        flex-direction: column-reverse;
    }

    .notes {
        background-color: #cee7e7;
        padding: 12px 0;
    }

</style>
