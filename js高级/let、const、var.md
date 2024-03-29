# 代码执行描述

### ES5:

- 执行上下文栈。 用于执行上下文的栈结构
- 执行上下文。 每段代码执行前都会创建，用于执行代码。
- 变量对象。执行上下文关联的 VO 对象，用于记录变量和函数声明
- 全局对象。全局执行上下文关联的 VO 对象。
- 激活对象。函数执行上下文关联的 VO 对象。
- 作用域链。用于变量的查找。

### ES6

- 词法环境。 用于关联定义函数、变量等标识符
  一个词法环境由 环境记录 和 外层词法环境 组成。

### 全局执行上下文
  全局执行上下文的词法环境由两个环境记录组成。一个是对象记录，一个是声明记录。使用var声明的变量就会放到对象记录种，使用let/const声明的变量就会放到声明记录中。 这也是为什么使用let/const声明的变量无法在windons中看到的原因。

# let/const 和 var 的区别

1. var 允许重复声明，let/const 不允许。
2. let 和 const 没有作用域的提升，var 有作用域提升。但是 let/const 定义的变量，在词法环境创建的时候就已经被创建出来了，但是无法访问到他们。因为在查找变量的时候会做判断，如果是通过 var 定义的那么可以访问，如果是 let/const 定义的就无法访问。

# 暂时性死区

在 let/const 定义变量是会形成作用域，而在这个作用域内，从开始到 let/const 定义的变量被赋值前，这一段区域就叫做暂时性死区。

```JavaScript
function foo() { // 这里

  // 都这里 称为暂时性死区。
  const name = '小明'
}
```

# let/const会生成块级作用域

