import createId from '@/lib/createId';

const localStorageKeyName = 'tagsList';


const tagStore = {
  tagList: [] as Tag[],

  // 保存 tag
  saveTags() {         // 保存数据
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.tagList));
  },

  // 更新 tag
  updateTag(id: string, name: string) {

    const idList = this.tagList.map(item => item.id);
    if (idList.indexOf(id) >= 0) {
      const names = this.tagList.map(item => item.name);
      if (names.indexOf(name) >= 0) {
        return 'duplicated';
      } else {
        // 导致修改 标签 出现错误的产生bug的地方
        const tag = this.tagList.filter(item => item.id === id)[0];
        tag.name = name;

        this.saveTags();
        return 'success';
      }

    } else {
      return 'not found';
    }
  },

  // 删除tag
  removeTag(id: string) {
    let index = -1;
    for (let i = 0; i < this.tagList.length; i++) {
      if (this.tagList[i].id === id) {
        index = i;
        break;
      }
    }
    this.tagList.splice(index, 1);
    this.saveTags();
    return true;
  },

  // 创建tag
  createTag(name: string) {
    const names = this.tagList.map(item => item.name);

    if (names.indexOf(name) >= 0) {
      window.alert('输入的标签名称重复！');
      return 'duplicated';
    }
    const id = createId().toString();
    this.tagList.push({id, name:name});
    this.saveTags();
    window.alert('标签添加成功！');

    return 'success';
  },

  findTag(id: string) {
    const tag = this.tagList.filter(t => t.id === id)[0];
    return tag;
  },

  fetchTags() {
    // 获取数据
    this.tagList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    return this.tagList;
  }


};

tagStore.fetchTags();
export default tagStore;