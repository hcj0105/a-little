# react 和 vue 的数据管理和渲染流程？

`vue 会将 template 先编译成 render 函数然后让 h 函数生成虚拟 dom，在这个过程中对一些指令做一些转换。 vue 通过内部对数据劫持监听数据的变化后，去执行 render 函数。`

`react 是直接把 render 函数交给我们，render 函数执行之后通过 Reacr.createElement 生成虚拟 dom。react 通过 this.setState 去手动的修改数据，执行 this.setState 后 react 就知道要重新渲染视图就去执行 render 函数。`

# setState 的用法

用法一: 直接传入一个新对象

```JavaScript
this.state = {
  message: 'Hello World!'
}

this.setState({ message: '你好世界!' })
```

用法二: 传入一个回调函数

```JavaScript
this.state = {
  message: 'Hello World!'
}

// 这个回调函数会接收修改前的state和props
this.setState((state, props) => {
  return { message: '你好世界!' }
})
```

用法二: 传入第二个参数，是一个函数

```JavaScript
this.state = {
  message: 'Hello World!'
}

// 这个回调函数会接收修改后的state，并且在这个回调函数中
// 可以访问this.state是最新的值
this.setState({ message: '你好世界!' }, (state) => {
  console.log(this.state.message) // 你好世界
})
```

# setState 为什么是异步的？

1.  提高渲染效率（批量更新）
2.  state 和 props 数据不一致（同步更新后如果还没来得及执行 render 函数，就会导致数据不一致）

# setState 想要变成同步的怎么办？

在 react18 之前 setTimeout、dom 操作中 setState 是同步的，react18 之后全部都是异步的。
如果想要同步更新可以使用 flushSync ，在函数中使用 setState 更新数据。之后执行的代码获取到的 state 就是最新的。
