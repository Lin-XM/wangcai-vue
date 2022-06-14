const localStorageKeyName = 'recordList';

const model = {
  fetch() {        // 获取数据
    return JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
  },
  save(data: RecordItem[]) {         // 保存数据
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(data));
  },
  clone(data:RecordItem[] | RecordItem ){
    return JSON.parse(JSON.stringify(data))
  }

};

export default model;