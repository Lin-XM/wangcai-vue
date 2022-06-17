<template>
    <Layout class-prefix="layout">
        <NumberPad @updateAmount="onUpdateAmount" @submit="saveRecord"/>
        <Types :type="record.type" @updateTypes="onUpdateType"/>
        <div class="notes">
            <FormItem field-name="备注：" placeholder="你还没有输入备注呢~" @updateNotes="onUpdateNotes"/>

        </div>
        <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
    </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Types from '@/components/Money/Types.vue';
  import FormItem from '@/components/Money/FormItem.vue';
  import Tags from '@/components/Money/Tags.vue';
  import {Component, Watch} from 'vue-property-decorator';
  import recordListModel from '@/Models/RecordListModel.ts';
  import tagListModel from '@/Models/tagsListModes';


  const recordList = recordListModel.fetch();


  @Component({
    components: {Tags, FormItem, Types, NumberPad},
  })
  export default class Money extends Vue {
    tags = window.tagList;


    recordList: RecordItem[] = recordList;
    record: RecordItem = {tags: [], notes: '', type: '-', amount: 0};


    // tagsInfo(name: string) {
    //   this.tags.push(name);
    // }

    onUpdateTags(value: string[]) {
      this.record.tags = value;
    }

    onUpdateNotes(notes: string) {
      console.log(notes);
      this.record.notes = notes;
    }

    onUpdateType(types: string) {
      console.log(types);
      this.record.type = types;
    }

    onUpdateAmount(amount: string) {
      console.log(amount);
      this.record.amount = parseFloat(amount);
    }

    saveRecord() {
      recordListModel.create(this.record);
    }

    @Watch('recordList')
    onRecordListChange() {

      recordListModel.save();
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
