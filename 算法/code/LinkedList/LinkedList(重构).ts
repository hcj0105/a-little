class LinkedNode<T> {
	value: T
	next: LinkedNode<T> | null = null
	constructor(value: T) {
		this.value = value
	}
}

class LinkedList<T> {
	private head: LinkedNode<T> | null = null
	private size: number = 0

	get length() {
		return this.size
	}

	// 获取节点，传入位置
	private getNode(posistion: number): LinkedNode<T> | null {
		let current = this.head
		let index: number = 0
		while (index++ < posistion && current) {
			current = current.next
		}
		return current
	}

	// 追加方法:
	append(value: T) {
		const newNode = new LinkedNode<T>(value)
		// 1. 链表中为空
		if (!this.head) {
			this.head = newNode
		} else {
			// 2. 链表中不为空插入尾部
			let current = this.head
			while (current.next) {
				current = current.next
			}
			current.next = newNode
		}
		this.size++
	}

	// 链表遍历方法:
	traverse() {
		const data: T[] = []
		let current = this.head
		// 循环链表中的节点
		while (current) {
			data.push(current.value)
			current = current.next
		}
		console.log(data.join('->'))
	}

	// 插入方法:
	insert(value: T, position: number): boolean {
		// 判断position是否越界，不能小于0、大于size，
		// 因为可以插入到最后一个元素的位置，所以可以等于size
		if (position < 0 || position > this.size) return false

		const newNode = new LinkedNode<T>(value)
		let current = this.head
		// 1. 如果插入在头部
		if (position === 0) {
			// 将 head 指向插入的新节点
			this.head = newNode
			// 将 新head 的下一个节点指向 旧head
			this.head.next = current
		} else {
			// 2. 插入其他位置
			const previous = this.getNode(position - 1)
			// 让新节点的next指向当前，让当前节点的上一个节点的next指向新节点
			newNode.next = previous?.next ?? null
			previous!.next = newNode
		}
		this.size++
		return true
	}

	// 移除方法:
	removeAt(position: number): T | null {
		// 判断 position 是否越界，不能小于0、大于或等于size
		if (position < 0 || position >= this.length) return null

		let current = this.head
		// 1. 删除第一个节点
		if (position === 0) {
			// 让 head 等于 第二个节点即可
			this.head = current?.next ?? null
		} else {
			// 2. 删除其他节点
			// 2.1 直接找到当前位置的上一个节点
			const previous = this.getNode(position - 1)
			// 2.2 让current节点的上一个节点的next指向current节点的next即可
			previous!.next = previous?.next?.next ?? null
			current = previous?.next ?? null
		}
		this.size--
		return current!.value
	}

	// 获取元素方法:
	get(position: number): T | null {
		// 判断 posistion 是否越界
		if (position < 0 || position > this.size) return null
		return this.getNode(position)?.value ?? null
	}

	// 更新节点值方法:
	update(value: T, posistion: number): boolean {
		// 1. 判断 posistion 是否越界
		if (posistion < 0 || posistion >= this.size) return false

		// 2. 获取节点
		const current = this.getNode(posistion)

		// 3. 判断节点是否为null
		if (!current) return false

		// 4. 修改值
		current.value = value

		return true
	}

	// 根据值获取元素位置:
	indexOf(value: T): number {
		let current = this.head
		let index: number = 0
		while (current) {
			if (current.value === value) return index
			index++
			current = current.next
		}
		index = -1
		return index
	}

	// 根据内容删除元素:
	remove(value: T): T | null {
		const posistion = this.indexOf(value)
		return this.removeAt(posistion)
	}

	// 链表是否为空:
	isEmpty(): boolean {
		return this.size === 0
	}
}

const linkedList = new LinkedList<string>()

console.log('------------ 测试append ------------')
linkedList.append('aaa')
linkedList.append('bbb')
linkedList.append('ccc')
linkedList.append('ddd')
linkedList.traverse()

console.log('------------ 测试insert ------------')
linkedList.insert('eee', 0)
linkedList.insert('sss', 3)
linkedList.insert('zzz', 5)
linkedList.traverse()

console.log('------------ 测试removeAt ------------')
console.log(linkedList.removeAt(0))
console.log(linkedList.removeAt(3))
console.log(linkedList.removeAt(5))
linkedList.traverse()

console.log('------------ 测试get ------------')
console.log(linkedList.get(0))
console.log(linkedList.get(1))
linkedList.traverse()

console.log('------------ 测试update ------------')
console.log(linkedList.update('xxx', 0))
console.log(linkedList.update('ggg', 1))
linkedList.traverse()

console.log('------------ 测试indexOf ------------')
console.log(linkedList.indexOf('xxx'))
console.log(linkedList.indexOf('ggg'))
console.log(linkedList.indexOf('ccc'))
linkedList.traverse()

console.log('------------ 测试remove ------------')
console.log(linkedList.remove('xxx'))
linkedList.traverse()

export default {}
