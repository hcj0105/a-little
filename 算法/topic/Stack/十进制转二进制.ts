import ArrayStack from '../../code/stack/ArrayStack'

/**
 * 题目: 讲十进制数字转换成二进制
 *
 * 思路: 通过将10进制进行2的整除直到结果为0位置，除于2的次数越多就越在前，通过栈的后进先出的特点，
 * 我们将每次除2之后的余数先入栈，等结果为0后在将结果从栈中一个个取出，就可以得到二进制
 */
function decimalToBinary(num: number): string {
	const stack = new ArrayStack<number>()
	while (num) {
		const result = num % 2
		stack.push(result)
		num = Math.floor(num / 2)
	}
	let binary = ''
	while (!stack.isEmpty()) {
		binary += stack.pop()
	}
	return binary
}

console.log(decimalToBinary(35))
console.log('----------------')
console.log(decimalToBinary(100))

export default decimalToBinary
