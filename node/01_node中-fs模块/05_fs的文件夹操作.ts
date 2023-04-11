import fs from 'fs'

/**
 * 1. 创建文件夹
 */
fs.mkdir('./xxx', err => {
	if (err) return
	console.log('创建成功')
})

/**
 * 2. 读取文件夹信息
 * 如果 withFileTypes 为 true，那么会返回读取文件的目录信息
 */
fs.readdir('./xxx', { withFileTypes: true }, (err, files) => {
	files.forEach(item => {
		// Dirent 类型可以通过 isDirectory 方法判断当前是否是目录
		// 还有其他操作
		console.log(item)
		if (item.isDirectory()) {
			console.log('我是目录', item.name)
		} else {
			console.log('我是文件', item.name)
		}
	})
	console.log(files)
})

/**
 * 3. 重命名
 */
fs.rename('./xxx/ff.txt', './xxx/hhh.txt', err => {
	if (err) {
		console.log('文件不存在')
		fs.writeFile('./xxx/hhh.txt', '我是新文件的内容', { flag: 'a+' }, err2 => {
			console.log('创建文件成功')
		})
	} else {
		console.log('重命名成功')
	}
})
