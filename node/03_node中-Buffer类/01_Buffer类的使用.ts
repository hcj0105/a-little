/**
 * 1. 通过 from 方法创建一个buffer对象
 * buffer是用于保存二进制，我们可以使用 buffer 对象对文件内容进行精准的操作
 * Buffer.from 方法，默认创建的时候会分配 8*1024个字节大小，就是8kb
 * */
const buffer = Buffer.from('我是文字!')

console.log(buffer)
console.log(buffer.toString())

/**
 * 2. 通过 alloc 方法可以创建不同字节长度的 buffer对象, 默认都是 00
 * 一个英文字母2个字节
 * 一个中文3个字节
 * */
const buffer2 = Buffer.alloc(12)
// 可以通过下标的方式去设置不同字节位置的内容，需要传入 ASCII
buffer2[0] = 65
console.log('buffer2', buffer2.toString())
