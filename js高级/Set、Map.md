# Set 和 Map 区别
  - Set和Map保存的数据不会重复
  - Set用于存储值类型，Map用于存储键值对类型。

# Set 和 WeakSet 区别

相同: - 都不能存放重复的值
不同: - Set 是强引用，WeakSet 是弱引用 - WeakSet 只能存放对象 - WeakSet 不能被遍历

# Map 和 WeakMap 区别

相同: - 都是用来存储复杂类型的键值对
不同: - Map 是强引用，WeakMap 是弱引用 - WeakMap 的 key 只能是对象类型 - WeakMap 不能被遍历

# Map 和 对象 区别

对象的 key 只能是 string 类型和 Symbol 类型,Map 可以使用各种类型作为 Key
