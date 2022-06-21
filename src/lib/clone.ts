// T 表示 data传过来什么类型，传出去也是什么类型的
function clone<T>(data: T) :T {
  return JSON.parse(JSON.stringify(data));
}

export default clone;