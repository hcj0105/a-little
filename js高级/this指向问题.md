# this 指向

## 1. this 到底指向的是什么？

函数调用时，javascript 会默认给 this 绑定一个值。
this 指向跟函数定义的位置无关。
this 指向函数调用的方式和位置有关。
this 是在运行时绑定的

## 2. this 的绑定规则

默认绑定、隐式绑定、new 绑定、显式绑定（apply、bind、call）

## 3. this 绑定的优先级

new > bind > aplly、call > 隐式绑定 > 默认绑定

## 4. apply、call、bind 的区别

apply 和 call 传递参数的方式不同，apply 为 数组形式，call 为参数个数的形式。apply 和 call 都是绑定 this 并调用函数。bind 是返回一个绑定了新 this 的函数，传递参数也是用参数个数的形式。
