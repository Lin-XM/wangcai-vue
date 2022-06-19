import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/createId';
import router from '@/router';
// 下面的方法会将 store 绑定在 vue.prototype 上
Vue.use(Vuex);
type RootState = {
  recordList: RecordItem[],

  tagList: Tag[],

  currentTag?: Tag,
}

const store = new Vuex.Store({
  // 数据
  state: {
    recordList: [] as RecordItem[],

    tagList: [] as Tag[],

    currentTag: undefined,
  } as RootState,


  // 同步方法
  mutations: {
    createRecord(state, record) {
      const recordClone: RecordItem = clone(record);
      recordClone.createAt = new Date();
      state.recordList && state.recordList.push(recordClone);
      store.commit('saveRecord');
      //saveRecord();
    },
    saveRecord(state) {         // 保存数据
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },
    fetchRecords(state) {        // 获取数据
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]');
    },


    fetchTags(state) {
      // 获取数据
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
    },
    createTags(state, name: string) {
      const names = state.tagList.map(item => item.name);

      if (names.indexOf(name) >= 0) {
        window.alert('输入的标签名称重复！');
        return 'duplicated';
      }
      const id = createId().toString();
      state.tagList.push({id, name: name});
      store.commit('saveTags');
      window.alert('标签添加成功！');

      return 'success';
    },
    saveTags(state) {         // 保存数据
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
    },
    findTag(state, id: string) {
      let tag: Tag;
      tag = state.tagList.filter(t => t.id === id)[0];
      return tag;
    },
    setCurrentTag(state, id: string) {
      state.currentTag = state.tagList.filter(t => t.id === id)[0];
    },
    updateTag(state, payload: { id: string, name: string }) {
      const {id, name} = payload;

      const idList = state.tagList.map(item => item.id);
      if (idList.indexOf(id) >= 0) {
        const names = state.tagList.map(item => item.name);
        if (names.indexOf(name) >= 0) {
          window.alert('标签名称重复！');
        } else {
          // 导致修改 标签 出现错误的产生bug的地方
          const tag = state.tagList.filter(item => item.id === id)[0];
          tag.name = name;

          store.commit('saveTags');
        }

      }
    },

    removeTag(state, id: string) {
      let index = -1;
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i;
          break;
        }
      }
      if (index >= 0) {
        state.tagList.splice(index, 1);
        store.commit('saveTags');
        window.alert('删除成功！');
        router.back();
      } else {
        window.alert('未知错误，删除失败！');
      }

    },
  },

  // 异步、同步动作
  actions: {},

});

// 调用方法
// store.commit('name')

export default store;