import fs, { read } from 'fs'

/**
 * 1. 通过 readFile、writeFile 都是一次性写入或读取文件，
 * 无法精准的对文件进行操作，比如：暂停读取、恢复读取、在什么位置开始读、写到什么位置、读取文件过大时一点一点读取
 *
 * 2. stream 就可以做到这些，可以精准的对二进制进行操作
 *
 */

/**
 * 通过 fs.createReadStream 创建一个读取流
 * */
const readStream = fs.createReadStream('abc.txt', {
	start: 0, // 读取开始的位置
	end: 8, // 读取结束的位置
	encoding: 'utf8', // 读取后转换成的编码格式
	highWaterMark: 3 // 一次性读取的字节的长度，默认值为 64kb, 中文为3个字节、英文为2个字节
})

// 1. 通过 open 事件可以监听文件被打开
readStream.on('open', fd => {
	console.log('文件被打开, 文件描述符为:', fd)
})

// 2. 通过监听 data 事件可以监听读取到的数据
readStream.on('data', data => {
	console.log('读取到的数据', data)

	readStream.pause()

	setTimeout(() => {
		readStream.resume()
		console.log('2秒后恢复读取')
	}, 2000)
})

// 3. 通过监听 end 事件可以监听读取文件结束
readStream.on('end', () => {
	console.log('文件读取完成')
})

// 4. 通过监听 close 事件可以监文件关闭
readStream.on('close', () => {
	console.log('文件已关闭')
})

// 5. 通过 pause 函数可以让流暂停读取
readStream.pause()

// 6. 通过 resume 函数可以让流恢复读取
readStream.resume()
