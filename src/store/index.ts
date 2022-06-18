import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/createId';
// 下面的方法会将 store 绑定在 vue.prototype 上
Vue.use(Vuex);

const store = new Vuex.Store({
  // 数据
  state: {
    recordList: [] as RecordItem[],

    tagList: [] as Tag[],
  },


  // 同步方法
  mutations: {
    createRecord(state, record) {
      const recordClone: RecordItem = clone(record);
      recordClone.createAt = new Date();
      state.recordList && state.recordList.push(recordClone);
      store.commit('saveRecord');
      console.log(state.recordList);
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
  },

  // 异步、同步动作
  actions: {},

});

// 调用方法
// store.commit('name')

export default store;