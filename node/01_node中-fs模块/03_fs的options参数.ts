import fs from 'fs'

const file = 'abc.txt'

/**
 * 读取文件时，node默认读取完成后返回的是 buffer 类型，也就是二进制存储的
 * 可以通过传入 第二个参数 options 来设置
 * */
fs.readFile(
	file,
	{
		/**
		 * 可以设置 encoding 属性，设置为 utf8 格式
		 *  设置后，读取文件后的内容就会变成 utf8 格式
		 * */
		encoding: 'utf8',
		/**
		 * 设置flag值
		 * w: 打开文件写入, 默认值
		 * w+: 打开文件读写(可读可写), 文件不存在时创建
		 * r: 打开文件读取, 默认值
		 * r+: 打开文件读写(可读可写), 文件不存在时创建
		 * a: 打开文件写入，将内容写入到内容后, 文件不存在时创建
		 * a+: 打开文件读写(可读可写)，将内容写入到内容后, 文件不存在时创建
		 */
		flag: 'r'
	},
	(err, data) => {
		console.log('异步读取文件', data)
	}
)
