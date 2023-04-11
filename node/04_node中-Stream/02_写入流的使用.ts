import fs from 'fs'

/**
 * 通过 fs.createWriteStream 创建一个写入流
 */
const writeStream = fs.createWriteStream('cba.txt')

// 1. 通过监听 open 事件监听文件被打开
writeStream.on('open', fd => {
	console.log('文件被打开，文件描述符为: ', fd)
})

// 2. 通过 write 函数对文件进行写入
writeStream.write('我写入内容', () => {
	console.log('写入成功')
})

// 3. 通过监听 finish 事件监听写入完成
writeStream.on('finish', () => {
	console.log('写入完成')
})

// 4. 通过监听 close 事件监听文件关闭
writeStream.on('close', () => {
	console.log('文件被关闭')
})

// 写入文件时需要手动关闭文件, 告诉 node 写入完成让他关闭文件
// writeStream.close()

// 5. 通过 end 函数可以一次性完成 write、close事件，比较常用
writeStream.end('再次写入的内容', () => {
	console.log('再次写入成功')
})
