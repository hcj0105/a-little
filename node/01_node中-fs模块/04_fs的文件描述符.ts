import fs from 'fs'

/**
 * file descriptors(文件描述符)
 * 在每个进程中，内核都维护着一张文件和资源的表格，每个打开的文件都会被分配一个标识，这个标识就是文件描述符，是一个简单的数字
 * 所有的文件操作都是使用这个文件描述符来进行跟踪文件
 */

// 1. 手动打开文件 通过 open 方法可以获取打开文件的 fd
fs.open('abc.txt', 'r', (err, fd) => {
	console.log('fd', fd)
	// 2. 通过 fstat 方法传入 fd 可以获取对应文件的信息
	fs.fstat(fd, (err2, state) => {
		console.log('state', state)

		// 3. 通过手动打开文件的方式需要手动关闭，使用 close 方法进行关闭
		// 或者在进程结束时也会关闭
		fs.close(fd)
	})
})
