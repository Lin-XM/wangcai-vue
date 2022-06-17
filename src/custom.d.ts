// 用来表示 下面类型为 自定义类型

type RecordItem = {
  tags: string[]      // 除了数据类型，还可以些构造函数，也就是类
  notes: string
  type: string
  amount: number
  createAt?: Date
}

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

// 声明全局变量类型
interface Window {
  tagList: Tag[];
  createTag: (name: string) => void
  removeTag: (id: string) => boolean
  updateTag: (id: string, name: string) => 'success' | 'not found' | 'duplicated'
  findTag: (id: string) => Tag | undefined

  recordList: RecordItem[]
  createRecord: (record: RecordItem) => void
}