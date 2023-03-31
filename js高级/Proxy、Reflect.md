# Proxy

## Proxy 和 Object.defineProperty 的区别

Object.defineProperty

    1. Object.defineProperty 是为了设置属性描述符，并不是为了去监听某个对象中的所有属性。
    2. Object.defineProperty 如果想监听比较丰富的操作是没办法监听到的，如 delete、in 操作。

Proxy

    1. Proxy 主要就是用于监听某个对象相关的操作。
    2. Proxy 会返回一个代理对象。可以通过这个代理对象去简介的操作目标对象
    3. Proxy 可以监听对象中丰富的操作。如 get、set、in、delete 等 13 个 捕获器

# Reflect

## Reflect 和 Object 的区别

Object
Object 本身在早期的时候的一些设计缺陷，将一些操作对象的方法都添加到 Object 类中，Object 作为一个类是不合适的。在继承的时候对应的方法都会被继承。

Reflect
Reflect 就是用于解决 Object 类的设计缺陷，将对对象的操作都是用 Reflect 来操作。通过语言层面间接的去操作对象。

    好处:
      1. 可以不用直接操作原对象
      2. Reflect的方法有返回值，可以告知这次的操作是否成功
      3. 结合 Proxy 使用的时候可以不操作原对象
      4. 如果 Proxy 在里中的对象有 getter/setter 访问器的话，可以通过 Reflect 去改变内部的 this 指向

```JavaScript
const obj = {
  _name: 'why',
  get name() {
    // 使用Reflect操作对象后，可以改变当前的this指向
    return this._name
  },
  set name(newValue) {
    // 使用Reflect操作对象后，可以改变当前的this指向
    this._name = newValue
  }
}

const proxy = new Proxy(obj, {
  get(target, key, receiver) {
    /*
      好处:
        > 1. 可以通过反射去间接操作对象
        > 2. 可以改变 obj 中 getter访问器 的 this 指向,这样 this 指向的就是代理对象，
              在操作代理对象的时候有会执行一次get捕获器
    */
    Reflect.get(target, key, receiver)
  },
  set(target, key, newValue, receiver) {
    Reflect.set(target, key, newValue, receiver)
  }
})
```
