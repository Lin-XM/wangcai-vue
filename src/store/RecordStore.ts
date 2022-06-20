import clone from "@/lib/clone"
const localStorageKeyName = 'recordList';

const recordStore = {
  recordList: [] as RecordItem[],
  fetchRecord() {        // 获取数据
    this.recordList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    return this.recordList;
  },
  saveRecord() {         // 保存数据
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.recordList));
  },

  createRecord(record: RecordItem) {
    const recordClone: RecordItem = clone(record);

    recordClone.createAt = new Date().toISOString();

    this.recordList && this.recordList.push(recordClone);
    recordStore.saveRecord();
  }
};
recordStore.fetchRecord();
export default recordStore;