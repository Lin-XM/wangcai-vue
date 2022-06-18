import recordStore from '@/store/RecordStore';
import tagStore from '@/store/TagsStore';

const store = {
  ...recordStore,
  ...tagStore,
};

console.log(store);

export default store;