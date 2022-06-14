<template>
    <Layout class-prefix="layout">
        <NumberPad @updateAmount="onUpdateAmount" @submit="saveRecord"/>
        <Types :type="record.type" @updateTypes="onUpdateType"/>
        <Notes @updateNotes="onUpdateNotes"/>
        <Tags :data-source="tags" v-on:getTags="tagsInfo" @updateSelected="onSelect"/>
    </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Types from '@/components/Money/Types.vue';
  import Notes from '@/components/Money/Notes.vue';
  import Tags from '@/components/Money/Tags.vue';
  import {Component, Watch} from 'vue-property-decorator';
  import model from '@/model.ts';


  const recordList = model.fetch();


  @Component({
    components: {Tags, Notes, Types, NumberPad},
  })
  export default class Money extends Vue {
    tags = ['衣', '食', '住', '行', '娱乐'];


    recordList: RecordItem[] = recordList;
    record: RecordItem = {tags: [], notes: '', type: '-', amount: 0};


    tagsInfo(name: string) {
      this.tags.push(name);
    }

    onSelect(selectTags: string[]) {
      console.log(selectTags);
      this.record.tags = selectTags;
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
      const recordClone: RecordItem = model.clone(this.record);
      recordClone.createAt = new Date();
      this.recordList.push(recordClone);
    }

    @Watch('recordList')
    onRecordListChange() {

      model.save(this.recordList);
    }

  }
</script>
<style lang="scss">
    .layout-body-content {
        display: flex;
        flex-direction: column-reverse;
    }
</style>
