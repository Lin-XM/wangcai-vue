import clone from '@/Models/clone';

const localStorageKeyName = 'recordList';


const recordListModel = {
  data: [] as RecordItem[],
  fetch() {        // 获取数据
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    return this.data;
  },
  save() {         // 保存数据
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  },
  clone(data: RecordItem[] | RecordItem) {
    return JSON.parse(JSON.stringify(data));
  },
  create(record: RecordItem) {
    const recordClone: RecordItem = clone(record);

    recordClone.createAt = new Date();

    this.data.push(recordClone);
  }

};

export default recordListModel;