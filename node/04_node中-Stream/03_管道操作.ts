import fs from 'fs'

/**
 * 通过 pipe 函数建立一个管道
 * 有时候我们需要将读取的内容写入到新的文件中
 * 可以直接使用 管道的方式，就不需要去读取文件之后再将读取的内容写入到新文件中
 *
 * pipe方法会将两个写入流和读取流建立一个管道，之后读取流读到的内容会通过写入流的写入方法写入到文件中
 *
 * */

const readStream = fs.createReadStream('cba.txt')
const writeStream = fs.createWriteStream('cba(copy).txt')

readStream.pipe(writeStream)
