import fs from 'fs'

const file = 'abc.txt'

/* 1. 同步读取文件，会阻塞代码执行 */
const fileBuffer = fs.readFileSync(file)
console.log('同步读取文件', fileBuffer)

/**
 * 2. 异步读取文件，不会阻塞代码执行
 * 需要传入一个回调函数，文件读取到结果后，回调这个函数
 * */
fs.readFile(file, (err, data) => {
	console.log('异步读取文件', data)
})

/**
 * 3. promises风格读取文件，不会阻塞代码执行
 * 需要传入一个回调函数，文件读取到结果后，回调这个函数
 * */
fs.promises.readFile(file).then(data => {
	console.log('promises风格读取文件', data)
})
