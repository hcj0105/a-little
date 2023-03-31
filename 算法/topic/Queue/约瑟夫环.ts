/**
 * 题目: 0,1,···,n-1这n个数字排成一个圆圈，从数字0开始，每次从这个圆圈里删除第m个数字（删除后从下一个数字开始计数）。求
 *      出这个圆圈里剩下的最后一个数字。
 *
 * 例子: 例如，0、1、2、3、4这5个数字组成一个圆圈，从数字0开始每次删除第3个数字，则删除的前4个数字依次是2、0、4、1，
 *       因此最后剩下的数字是3。
 *
 * 思路: 通过队列的特点将所有值添加道队列中，然后循环，将数到指定数字的人删除
 *       没有数到数字的人从头部删除添加到尾部
 */

import ArrayQueue from '../../code/queue/ArrayQueue'

function leftRemaining(n: number, m: number): number {
	const queue = new ArrayQueue<number>()

	for (let i = 0; i < n; i++) {
		queue.enqueue(i)
	}

	while (queue.size() > 1) {
		for (let i = 0; i < m; i++) {
			queue.enqueue(queue.dequeue()!)
		}
		queue.dequeue()
	}

	return queue.dequeue()!
}

console.log(leftRemaining(5, 3))
console.log(leftRemaining(7, 2))
