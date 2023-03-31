# ES5-面向对象原型继承

## 对象的原型

    1. 获取对象原型的方法?
      - Object.getPrototypeOf(obj) (标准)
      - obj.__proto__ (浏览器自己实现)

    2. 什么是对象的原型?
      每个对象都有一个 [[Prototype]] 属性，这个属性也指向一个对象

    3. 原型的作用?
      在引用对象使用key获取value的时候就会触发这个对象的[[get]]操作，它会先去检查自己的对象有没有对于属性，如果有就使用它，如果没有就会在[[Prototype]]上去查找。

    4. 通过字面量创建的对象也有原型吗？
      有，因为每个对象都会有自己的原型

## 函数的原型

    1. 函数的原型?
      函数的原型可以通过 .prototype 的方式获取到，而这个属性是对象原型没有的，因为它是函数所以有这个属性，函数的原型prototype 又称作 显式原型，对象的原型__proto__ 又叫做 隐式原型。

    2. 函数原型的作用?
      用于在构造函数(new 操作符)创建对象的时候将函数的显式原型赋值给创建对象的隐式原型。

    3. 好处?
      将一些相同的方法设置在原型上，这样在每次通过构造函数创建出来的对象都会共享这些方法

## new 操作符

      new 操作符做了什么
       - 创建一个对象
       - 将this指向这个对象
       - 将构造函数的显式原型赋值给这个对象的隐式原型
       - 执行代码块代码
       - 将这个对象返回

## constructor 属性

    每个构造函数的显示原型上都会有一个 constructor 属性，这个属性指向的是函数本身。

## 原型链

    1. 什么是原型链?
       在查找属性的时候，查找不到属性就会去对象的原型上去查找，如果查找不到就会到原型对象的原型上去查找，这样一层一层的去查找，直到查找到null那么返回undefind。这这样形成的链条就叫做原型链。

## 继承

    1. 原型链继承
      使用 Person 创建的实例对象作为 Student 的显式原型。这样在通过 Student 创建的 stu1对象 想要调用 running 方法的时候，在自己的对象上查找不到，就会去自己的原型上查找，这时候 Student 的显式原型已经变成了 p对象, p对象 的隐式原型又是 Person 的显式原型，所以就会去 Person 的显式原型上查找 running，Person 的显式原型上有 running 属性就直接调用输出 running~。

      缺点: 只能继承方法，无法继承属性
        - Student 不添加自己的 name 和 age 属性，打印 stu1 实例对象的时候，打印的时候看不到这个两个属性，属性并没有被继承过来。但是又可以访问到。
        - 多个实例对象会共享这个 p对象 的属性
        - 每个 Student 创建的实例对象不能够拥有自己的属性

```JavaScript
function Person(name, age) {
  this.name = name
  this.age = age
}

Person.prototype.running = function() {
  console.log('running~')
}
Person.prototype.eating = function() {
  console.log('eating~')
}

function Student(name, age, sno) {
  // 通过原型链继承的方式无法继承 Person 的属性
  // this.name = name // 不添加这行代码
  // this.age = age // 不添加这行代码
  this.sno = sno
}

var p = new Person('小明', 18)
Student.prototype = p
Student.prototype.studying = function() {
  console.log('studying~')
}

var stu1 = new Student('小红', 20, '001')
var stu2 = new Student('小绿', 22, '002')
var stu3 = new Student('小白', 19, '003')

console.log(stu1)
```

    2. 借用构造函数继承
       在 Student 的构造函数中调用 Person 的构造函数，让 Person 的构造函数为我们做一次赋值的操作，每次通过 Student 创建一个实例对象的时候就会调用一次 Person 的构造函数，这样每个 Student 实例对象就可以拥有自己属性。

```JavaScript
function Person(name, age) {
  this.name = name
  this.age = age
}

Person.prototype.running = function() {
  console.log('running~')
}
Person.prototype.eating = function() {
  console.log('eating~')
}

function Student(name, age, sno) {
  // 通过借用 Person 的构造函数来继承 Person 的属性
  Person.call(this, name, age)
  this.sno = sno
}

var p = new Person('小明', 18)
Student.prototype = p
Student.prototype.studying = function() {
  console.log('studying~')
}

var stu1 = new Student('小红', 20, '001')
var stu2 = new Student('小绿', 22, '002')
var stu3 = new Student('小白', 19, '003')

console.log(stu1, stu2, stu3)
```

    3. 组合借用继承
       将 原型链继承 和 借用构造函数继承 组合起来，就是组合借用继承。这样基本就完成了继承。

       缺点:
          - 每次继承的时候都会调用两次父类的构造函数
          - 子类会保存两份父类的属性，一份在 p对象本身当中，一份在子类的隐式原型当中

    4. 原型式继承
       从上面几种继承方式可以得出实现继承的一些结论:
          - 1. 需要创建一个对象
          - 2. 这个对象的隐式原型需要指向父类的显式原型
          - 3. 将这个对象赋值给子类的显式原型
       在原型链继承的方式中，我们使用 Person 创建出来的实例对象作为 Student 的显式原型，对于这个 p对象 感觉很奇怪。原型式继承方式就是提出来解决这个问题的。

```JavaScript
/*
  对于结论3我们很容易实现，那么前2个结论怎么办呢
  创建一个显式原型指向父类显式原型的方法:
*/

// 方法一: 使用 Object.setPrototypeOf 设置对象的原型
const obj = {}
Object.setPrototypeOf(obj, Person) // 设置一个对象的隐式原型
Student.prototype = obj

// 方式二: 创建一个构造函数将这个构造函数的显式原型设置为父类的显式原型
function F() {}
F.prototype = Person.prototype
Student.prototype = new F()

// 方法三: Object.create 方法创建一个隐式原型指向构造函数的显式原型的对象
Student.prototype = Object.create(Person)

```

    5. 寄生组合继承
      通过 原型式继承 的方式我们解决了 组合借用继承 的两个缺点。

```JavaScript
// 用于创建一个隐式原型指向父类显式原型的对象
function create(o) {
  function F() {}
  F.prototype = o
  return new F()
}

// 继承方法
function inherit(subType, superType) {
  const obj = create(superType.prototype)
  subType.prototype = obje
  Object.defineProperty(subType.prototype,'constructor', {
    configurable: true,
    writable: true,
    enumerable: false,
    value: subType
  })
}


// 使用 inherit 方法实现继承

inherit(Student, Person)

const stu1 = new Student('小明', 18)

stu1.running()
console.log(stu1)
console.log(stu1.name, stu1.age)
```
