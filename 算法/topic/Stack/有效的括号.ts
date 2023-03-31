/**
 * 题目: 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。
 * 1. 左括号必须用相同类型的右括号闭合。
 * 2. 左括号必须以正确的顺序闭合。
 * 3. 每个右括号都有一个对应的相同类型的左括号。
 *
 * 思路: 一一对应，循环去查找左括号，如果是括号就将对应的右括号压入栈中，
 * 如果是右括号就将栈顶的元素取出对比当前的右括号是否一致，不一致就说明不是有效的括号
 */

import ArrayStack from '../../code/stack/ArrayStack'

function isVaild(str: string): boolean {
	const stack = new ArrayStack<string>()
	const length = str.length
	for (let i = 0; i < length; i++) {
		const s = str[i]
		switch (s) {
			case '(':
				stack.push(')')
				break
			case '{':
				stack.push('}')
				break
			case '[':
				stack.push(']')
				break
			default:
				if (stack.pop() !== s) return false
				break
		}
	}
	return stack.isEmpty()
}

console.log(isVaild('()'))
console.log(isVaild('()[]{}'))
console.log(isVaild('(]'))
