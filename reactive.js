// 传入对象obj，给他定义一个属性key，它的初始值是val
// 该属性未来的访问会被拦截，这样就实现了响应式

function defineReactive(obj, key, val) {
  // 继续向下观察
  observe(val)
  // 监测数据
  Object.defineProperty(obj, key, {
    get(){
      console.log('get');
      return val
    },
    set(newVal) {
      console.log('set');
      if (newVal !== val) {
        val = newVal
      }
    }
  })
}


function observe(obj) {
  if (typeof obj !== 'object' || obj === null) return;
  Object.keys(obj).forEach(key =>{
    defineReactive(obj, key, obj[key])
  })
}

// 对新数据的监控
function set(obj, key, val) {
  defineReactive(obj, key, val)
}

// 测试代码
const obj = {
  a: 1,
  b: {
    c: 12
  }
}
// defineReactive(obj, 'a', 1)

observe(obj)
// obj.a
// obj.b
// obj.b.c
// 直接给对象添加新属性，没有响应
// obj.d = 12
// obj.d


// 调用set 重新响应下
set(obj, 'd', 12)
obj.d
obj.d = 12