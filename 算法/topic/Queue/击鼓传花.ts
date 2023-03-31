/**
 * 题目: 几个朋友一起玩一个游戏，围成一圈，开始数数，数到某个数字的人自动淘汰。
 *      最后剩下的这个人会获得胜利，请问最后剩下的是原来在哪一个位置上的人?
 *
 * 思路: 通过队列的特点将所有值添加道队列中，然后循环，将数到指定数字的人删除
 *       没有数到数字的人从头部删除添加到尾部
 */

import ArrayQueue from '../../code/queue/ArrayQueue'

function hotPotato(names: string[], num: number): number {
	const queue = new ArrayQueue<string>()

	for (const name of names) {
		queue.enqueue(name)
	}

	while (queue.size() > 1) {
		// 从1开始数数，数到指定数字前
		for (let i = 1; i < num; i++) {
			queue.enqueue(queue.dequeue()!)
		}
		// 删除数到指定数字的人
		queue.dequeue()
	}

	// 返回最后一个人的位置
	const lastName = queue.dequeue()!
	console.log('最后一个人', lastName)
	return names.indexOf(lastName)
}

const names = ['ccc', 'aaa', 'bbb', 'ddd', 'ggg']

console.log(hotPotato(names, 5))
