import fs from 'fs'

/**
 * 1. 同步写入，会阻塞代码执行
 */
fs.writeFileSync('cba.txt', '我是同步写入的内容')

/**
 * 2. 异步写入，不会阻塞代码执行
 */
fs.writeFile('cba.txt', '我是异步写入的内容', err => {
	if (err) return
	console.log('写入成功')
})

/**
 * 3. promises风格写入，不会阻塞代码执行
 */
fs.promises.writeFile('cba.txt', '我是promises风格写入的内容').then(res => {
	fs.readFile('cba.txt', { encoding: 'utf8' }, (err, data) => {
		console.log('data: 21', data)
	})
})

/**
 * 4. 通过 设置 flag 为 a/a+，可以将新内容写入到内容后
 * */
fs.writeFile('cba.txt', ' 我是追加的内容', { flag: 'a+' }, err => {
	if (err) return
	fs.readFile('cba.txt', { encoding: 'utf8' }, (err2, data) => {
		console.log('data: 31', data)
	})
})
