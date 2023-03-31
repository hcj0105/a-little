import IStack from './IStack'

class ArrayStack<T> implements IStack<T> {
	private data: T[] = []

	/* 入栈: 尾部添加元素 */
	push(element: T): void {
		this.data.push(element)
	}
	/* 出栈: 头部删除元素，并返回删除的元素 */
	pop(): T | undefined {
		return this.data.pop()
	}
	/* 查看栈尾的元素，并返回查看的元素 */
	peek(): T | undefined {
		return this.data[this.data.length - 1]
	}
	/* 判断栈中是否为空 */
	isEmpty(): boolean {
		return this.data.length === 0
	}
	/* 获取当前栈中的个数 */
	size(): number {
		return this.data.length
	}
}

export default ArrayStack
