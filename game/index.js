const { Body, Game, Scene, Point, Line, Container } = GameEngine

const mainScene = new Scene({
	// имя сцены
    name: 'mainScene',
    autoStart: true,

	// загружаем ресурсы используемые в сцене
    loading (loader) {
        loader.addImage('bunny', 'static/bunny.jpeg')
        loader.addJson('persons', 'static/persons.json')
	},
	


	// создаём спрайт единожды
    init () {
		const bunnyTexture = this.parent.loader.getImage('bunny')
		// создаём контейнер для добавления в него элементов, которые необходимо отрисовать последними
		// const graphicContainer = new Container

        this.bunny = new Body(bunnyTexture, {
            scale: 0.25,
            anchorX: 0.5,
            anchorY: 0.5,
            x: this.parent.renderer.canvas.width / 2,
            y: this.parent.renderer.canvas.height / 2,
			debug: true,
			// задаём какая часть теля будет реагировать на столкновение
            body: {
                x: 0,
                y: 0.5,
                width: 1,
                height: 0.5
            }
		})
		// console.log(this.bunny.body)
		
		// задаём не через this, поэтому манипулировать с элементом нельзя
		this.point = new Point({
			// x: 10,
			// y: 10
			x: this.parent.renderer.canvas.width / 2,
            y: this.parent.renderer.canvas.height / 2
		})

		// graphicContainer(this.bunny, point)

        this.add(this.point)
        // this.add(this.bunny, point)
		// this.add(this.bunny)
		
		// отрисовываем элементы из graphicContainer в последнюю очередь
		// this.add(graphicContainer)
		


	},
	
	// удаляем отжившие сцены
	// beforeDestroy () {
	// 	delete this.bunny
	// },

	// манипуляция спрайтом
    update (timestamp) {
		const { keyboard } = this.parent
		// console.log(this)
		// console.log(this.point.speedMove)
		this.point.timeMemoryBack = this.point.timeMemoryBack || {left: 0}
		this.point.timeMemoryForward = this.point.timeMemoryForward || {left: 0}
		this.point.speedMoveForward = this.point.speedMoveForward || {left: 0}
		this.point.speedMove = this.point.speedMove || {left: 0}

		
		let speedRotation = keyboard.space ? Math.PI / 100 : Math.PI / 200
		// let pointSpeedDown = keyboard.arrowDown ? 
		// this.point.timeMemory = this.point.timestamp || timestamp
		// this.point.speedMoveDown = timestamp - this.point.timeMemory
		// function f(obj) {
		// 	console.log(obj)
		// }
		// f(this)
		
        if (keyboard.arrowUp) {
			this.point.timeMemoryUpBack = null
			this.point.timeMemoryUpForward = this.point.timeMemoryUpForward || timestamp
			this.point.speedMoveUpForward = timestamp - this.point.timeMemoryUpForward
			this.point.speedMoveUp = this.point.speedMoveUpForward / 500
			this.point.y -= this.point.speedMoveUp
        } else if (this.point.speedMoveUpForward && this.point.speedMoveUp > 0) {
			this.point.timeMemoryUpForward = null
			this.point.timeMemoryUpBack = this.point.timeMemoryUpBack || timestamp
			this.point.speedMoveUpBack = (this.point.speedMoveUp > 0) ? timestamp - this.point.timeMemoryUpBack : 0
			this.point.speedMoveUp = (this.point.speedMoveUpForward - this.point.speedMoveUpBack) / 500
			this.point.y -= this.point.speedMoveUp
		} 
		
        if (keyboard.arrowDown) {
			this.point.timeMemoryDownBack = null
			this.point.timeMemoryDownForward = this.point.timeMemoryDownForward || timestamp
			this.point.speedMoveDownForward = timestamp - this.point.timeMemoryDownForward
			this.point.speedMoveDown = this.point.speedMoveDownForward / 500
			this.point.y += this.point.speedMoveDown
        } else if (this.point.speedMoveDownForward && this.point.speedMoveDown > 0) {
			this.point.timeMemoryDownForward = null
			this.point.timeMemoryDownBack = this.point.timeMemoryDownBack || timestamp
			this.point.speedMoveDownBack = (this.point.speedMoveDown > 0) ? timestamp - this.point.timeMemoryDownBack : 0
			this.point.speedMoveDown = (this.point.speedMoveDownForward - this.point.speedMoveDownBack) / 500
			this.point.y += this.point.speedMoveDown
		} 

		if (keyboard.arrowRight) {
			// this.point.timeMemoryRightBack = null
			// this.point.timeMemoryRightForward = this.point.timeMemoryRightForward || timestamp
			// this.point.speedMoveRightForward = timestamp - this.point.timeMemoryRightForward
			// this.point.speedMoveRight = this.point.speedMoveRightForward / 500
			// this.point.x += this.point.speedMoveRight
			this.point.x += movePointForvard('right', this)
        } else if (this.point.speedMoveForward.right && this.point.speedMove.right > 0) {
			// this.point.timeMemoryRightForward = null
			// this.point.timeMemoryRightBack = this.point.timeMemoryRightBack || timestamp
			// this.point.speedMoveRightBack = (this.point.speedMoveRight > 0) ? timestamp - this.point.timeMemoryRightBack : 0
			// this.point.speedMoveRight = (this.point.speedMoveRightForward - this.point.speedMoveRightBack) / 500
			// this.point.x += this.point.speedMoveRight
			this.point.x += movePointBack ('right', this)
		} 

		if (keyboard.arrowLeft) {
			// this.point.timeMemoryLeftBack = null
			// this.point.timeMemoryLeftForward = this.point.timeMemoryLeftForward || timestamp
			// this.point.speedMoveLeftForward = timestamp - this.point.timeMemoryLeftForward
			// this.point.speedMoveLeft = this.point.speedMoveLeftForward / 500
			// this.point.x -= this.point.speedMoveLeft
			this.point.x -= movePointForvard('left', this)
			// this.point.x -= moveforvard.bind(this)
        } else if (this.point.speedMoveForward.left && this.point.speedMove.left > 0) {
			// this.point.timeMemoryLeftForward = null
			// this.point.timeMemoryLeftBack = this.point.timeMemoryLeftBack || timestamp
			// this.point.speedMoveLeftBack = (this.point.speedMoveLeft > 0) ? timestamp - this.point.timeMemoryLeftBack : 0
			// this.point.speedMoveLeft = (this.point.speedMoveLeftForward - this.point.speedMoveLeftBack) / 500
			// this.point.x -= this.point.speedMoveLeft
			this.point.x -= movePointBack ('left', this)
		} 

		// this.point.timeMemoryBack = this.point.timeMemoryBack || {}
		// this.point.timeMemoryForward = this.point.timeMemoryForward || {}
		// this.point.speedMoveForward = this.point.speedMoveForward || {}
		// this.point.speedMove = this.point.speedMove || {}

		// const moveforvard = movePointForvard('left')
		function movePointForvard (direction, scene) {
			// const obj = {speedMoveForward }
			// console.log(obj.point)
			scene.point.timeMemoryBack[direction] = null
			scene.point.timeMemoryForward[direction] = scene.point.timeMemoryForward[direction] || timestamp
			scene.point.speedMoveForward[direction] = timestamp - scene.point.timeMemoryForward[direction]
			scene.point.speedMove[direction] = scene.point.speedMoveForward[direction] / 500
			return scene.point.speedMove[direction]
		}

		function movePointBack (direction, scene) {
			// const obj = {speedMoveForward }
			scene.point.timeMemoryForward[direction] = null
			scene.point.timeMemoryBack[direction] = scene.point.timeMemoryBack[direction] || timestamp
			// obj.point.speedMoveBack[direction] = (obj.point.speedMove[direction] > 0) ? timestamp - scene.point.timeMemoryBack[direction] : 0
			// return (scene.point.speedMoveForward[direction] - ((obj.point.speedMove[direction] > 0) ? timestamp - scene.point.timeMemoryBack[direction] : 0)) / 500
			// obj.point.speedMove[direction] = (scene.point.speedMoveForward[direction] - obj.point.speedMoveBack[direction]) / 500
			scene.point.speedMove[direction] = (scene.point.speedMoveForward[direction] - ((scene.point.speedMove[direction] > 0) ? timestamp - scene.point.timeMemoryBack[direction] : 0)) / 500
			return scene.point.speedMove[direction]
		}

    }
})

const beginScene = new Scene({
	name: 'beginScene',
	autoStart: false,

	loading (loader) {
        loader.addImage('start', 'static/start.jpg')
	},

	init () {
		const startButtonTexture = this.parent.loader.getImage('start')

		this.start = new Body(startButtonTexture, {
            // scale: 1.5,
            anchorX: 0.5,
            anchorY: 0.5,
            x: this.parent.renderer.canvas.width / 2,
			y: this.parent.renderer.canvas.height / 2,
			width: this.parent.renderer.canvas.width,
			height: this.parent.renderer.canvas.height,
			debug: false,
		})
		this.add(this.start)
	},

	update () {
		const { keyboard } = this.parent
		if (keyboard.anyCode) {
			game.addScene(mainScene)
			game.finishScene(beginScene)
			game.startScene(mainScene)
		}
    }

})



// экземпляр класса Game
const game = new Game({
    el: document.body,
    width: 500,
    height: 500,
		background: 'green',
		// массив сцен
    scenes: [mainScene, beginScene]
})