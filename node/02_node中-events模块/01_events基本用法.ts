import EventEmitter from 'events'

const eventEmitter = new EventEmitter()

function handler(name: string, age: number) {
	console.log('接收到的参数', name, age)
}

// 1. on 方法用于监听事件
eventEmitter.on('click', handler)

// 2. off 方法用于取消事件监听
eventEmitter.off('click', handler)

setTimeout(() => {
	// 3. emit 方法用于发出事件
	eventEmitter.emit('click', 'zzz', 19)
}, 1000)
