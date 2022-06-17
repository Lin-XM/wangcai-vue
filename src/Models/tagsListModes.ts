import createId from '@/lib/createId';

const localStorageKeyName = 'tagsList';
type Tag = {
  id: string
  name: string
}

type TagListModel = {
  data: Tag[]
  fetch: () => Tag[]
  create: (name: string) => 'success' | 'duplicated'   // success:表示成功， duplicated：表示标签名称重复
  save: () => void
  update: (id: string, name: string) => 'success' | 'not found' | 'duplicated'
  remove: (id: string) => boolean
}


const tagListModel: TagListModel = {
  data: [],
  fetch() {
    // 获取数据
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    return this.data;
  },
  save() {         // 保存数据
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  },

  update(id, name) {
    const idList = this.data.map(item => item.id);
    if (idList.indexOf(id) >= 0) {
      const names = this.data.map(item => item.name);
      if (names.indexOf(name) >= 0) {
        return 'duplicated';
      } else {
        // 导致修改 标签 出现错误的产生bug的地方
        const tag = this.data.filter(item => item.id === id)[0];
        tag.name = name;

        this.save();
        return 'success';
      }

    } else {
      return 'not found';
    }
  },

  remove(id: string) {
    let index = -1;
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].id === id) {
        index = i;
        break;
      }
    }
    this.data.splice(index, 1);
    this.save();
    return true;
  },


  create(name: string) {
    const names = this.data.map(item => item.name);

    if (names.indexOf(name) >= 0) {
      return 'duplicated';
    }
    const id = createId().toString()
    this.data.push({id, name});
    this.save();
    return 'success';
  }
};

export default tagListModel;