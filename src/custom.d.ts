// 用来表示 下面类型为 自定义类型

type RecordItem = {
  tags: string[]      // 除了数据类型，还可以些构造函数，也就是类
  notes: string
  type: string
  amount: number
  createAt?:Date
}