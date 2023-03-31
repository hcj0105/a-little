# Iterator

## 什么是迭代器（Iterator）?

迭代器是一个对象，这个对象需要实现 next 方法,这个 next 方法需要返回固定的值也是一个对象 `{ done: false/true, value: undefined/值  }, done 为 true 表示迭代完成，done 为 false 表示还可以继续迭代`。 如果一个对象实现了 next 方法那么这个对象就可以说是一个迭代器。

```JavaScript
// 这个对象就叫做迭代器。
const iterator = {
  next() {
    return { done: true, value: undefined }
  }
}
```

## 迭代器的作用?

迭代器的作用就是帮助我们去迭代某个对象。

```JavaScript
const names = ['小红', '小明', '小光', '小绿']
// 创建一个帮我们迭代names对象的迭代器
let i = 0
const iterator = {
  next() {
    if (i < names.length) {
      return { done: false, value: names[i++] }
    }
    return { done: true }
  }
}
console.log(iterator.next()) // { done: false, value: '小红' }
console.log(iterator.next()) // { done: false, value: '小明' }
console.log(iterator.next()) // { done: false, value: '小光' }
console.log(iterator.next()) // { done: false, value: '小绿' }
console.log(iterator.next()) // { done: true, value: 'undefined' }
```

## 可迭代对象

1. 什么是可迭代对象？

   在上面迭代器的实现会发现，迭代的对象跟迭代器不是一体。如果可以把 对象 和 迭代器 变成一个整体的话，那么这个对象就叫做可迭代对象。 也就是说如果一个对象实现了迭代器，那么这个对象就可以说是可迭代对象。

2. 怎么实现可迭代对象？

   需要让一个对象实现一个特定名称的方法 `[Symbol.ierator]`，这个方法的返回值需要是一个迭代器。

```JavaScript
const obj = {
  name: '小光',
  age: 18,
  sex: '男',
  [Symbol.iterator]() {
    let i = 0
    const keys = Object.keys(this)
    return {
      next: () => {
        if (i < keys.length) {
          return { done: false, value: keys[i++] }
        }
        return { done: true }
      }
    }
  }
}
// 而这个obj对象实现了 [Symbol.iterator] 方法，那么这个 obj 对象就可以叫做可迭代对象。
const iterator = obj[Symbol.iterator]()
console.log(iterator.next()) // { done: false, value: 'name' }
console.log(iterator.next()) // { done: false, value: 'age' }
console.log(iterator.next()) // { done: false, value: 'sex' }
console.log(iterator.next()) // { done: true, value: undefined }
```

3. 可迭代对象的好处?

   如果一个对象变成了可迭代对象的话，那么这个对象就可以进行可迭代的操作。如 `for of`。

```JavaScript
// 我们实现了 obj 对象的迭代器，这样 obj 就可以使用 forof 进行迭代
for (const key of obj) {
  console.log(key) // name、age、sex
}
```

# 生成器

## 什么是生成器(Generator)?

生成器是一个特殊的迭代器，他可以更加灵活的控制函数的 继续执行、暂停执行。而生成器函数的返回值就是一个生成器。

生成器函数和普通函数的区别？

1.  生成器函数需要在 function 关键字后面加上一个*。 `function* 方法名() {}`
2.  生成器函数，在函数执行的时候可以通过 `yield` 关键字暂停函数的执行。
3.  生成器函数的返回值是一个生成器，生成器是一种特殊的迭代器。

## 生成器函数的执行

生成器函数执行后，不会执行函数内部的代码，会返回一个生成器，需要调用生成器的 next 方法来让函数执行，在函数执行的过程中如果碰到 yield 关键字就会暂停执行，等到下一次 next 方法调用就会继续执行下面的代码。

```JavaScript
function* foo(res) {

  console.log('第一次调用next传递的参数res:', res)
  console.log('我在第一次执行next方法的时候执行')
  const res2 = yield '我是第一次调用next方法的返回值'

  console.log('第二次调用next传递的参数res:', res2)
  console.log('我在第二次执行next方法的时候执行')
  const res3 = yield '我是第二次调用next方法的返回值'

  console.log('第二次调用next传递的参数res2:', res3)
  console.log('我在第三次执行next方法的时候执行')
}

const generator = foo(1)
console.log(generator.next()) // { value: "我是第一次调用next方法的返回值", done: false }
console.log(generator.next(2)) // { value: "我是第二次调用next方法的返回值", done: false }
console.log(generator.next(3)) // { value: "我是第三次调用next方法的返回值", done: false }
```

## 生成器函数用于解决异步代码嵌套问题(异步处理方案)

在开发中可能会遇到这次的请求需要用到上一次请求回来的值，这时候就会产生回调地狱的问题。

```JavaScript
function getData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(url)
    }, 1000)
  })
}

// 在这段代码我们看到下次的请求需要等到上一次请求回来的数据进行下一次请求
// 所以需要等到 Promise 的 then 方法中 去执行，如果依赖过多就会形成回调地狱
getData('http://').then(res => {
  getData(res + 'wwww.').then(res2 => {
    getData(res2 + 'baidu.com').then(res3 => {
      console.log(res3) // http://www.baidu.com
    })
  })
})
```

通过生成器函数进行解决

```JavaScript
function getData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(url)
    }, 1000)
  })
}

// 在代码执行过程中我们可以像处理同步函数一样顺序的去处理每个异步函数。
function* generFn() {
  const res = yield getData('http://')
  const res2 = yield getData(res + 'www.')
  const res3 = yield getData(res2 + 'baidu.com')
  console.log('res3:', res3)
}

// 生成器函数会返回一个生成器
const generator = generFn()
// 调用 next 方法可以得到 yield 返回的 value 值，是一个 Promise
// 通过 then 来监听 Promise 的 resolve
generator.next().value.then(res => {
  generator.next(res).value.then(res2 => {
    generator.next(res2).value.then(res3 => {
      generator.next(res3)
    })
  })
})
```

对代码进行进一步的优化

```JavaScript
function getData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(url)
    }, 1000)
  })
}

function* generFn() {
  const res = yield getData('http://')
  const res2 = yield getData(res + 'www.')
  const res3 = yield getData(res2 + 'baidu.com')
  // 有了自动执行函数之后我们不管添加几次 yield 关键字 都可以帮我们去执行，不需要我们去手动在回调中去调用next方法
  console.log('res3:', res3)
}

// 封装一个自动执行 生成器 函数的方法，只用于 yield 返回值是 Promise 的情况
function execGener(genFn) {
  const generator = genFn()
  function exec(res) {
    const result = generator.next(res)
    if (result.done) return result.value
    result.value.then(res => {
      exec(res)
    })
  }
  exec()
}

execGener(generFn)
```
