<template>
    <Layout class-prefix="layout">
        <NumberPad @updateAmount="onUpdateAmount" @submit="saveRecord"/>
        <Types :type="record.type" @updateTypes="onUpdateType"/>
        <div class="notes">
            <FormItem field-name="备注：" placeholder="你还没有输入备注呢~"
                      @update:value="onUpdateNotes"/>

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

  @Component({
    components: {Tags, FormItem, Types, NumberPad},
  })
  export default class Money extends Vue {
    tags = window.tagList;


    recordList = window.recordList;
    record: RecordItem = {tags: [], notes: '', type: '-', amount: 0};


    onUpdateTags(value: string[]) {
      this.record.tags = value;
    }

    onUpdateNotes(value: string) {
      console.log('xxxx');
      this.record.notes = value;
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
      window.createRecord(this.record);
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
